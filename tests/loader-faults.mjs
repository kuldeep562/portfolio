// Controlled loader fault checks. Node 22+ and Chrome required; TEST_BASE_URL may select an existing server.
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import net from 'node:net'
import assert from 'node:assert/strict'
const sleep = ms => new Promise(r => setTimeout(r, ms))
async function wait(fn, label, timeout = 30000) { const end = Date.now() + timeout; while (Date.now() < end) { try { if (await fn()) return } catch {} await sleep(50) } throw Error(`timeout: ${label}`) }
async function port() { const s = net.createServer(); await new Promise(r => s.listen(0, '127.0.0.1', r)); const p = s.address().port; await new Promise(r => s.close(r)); return p }
class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.handlers = new Map(); ws.onmessage = ({data}) => { const m = JSON.parse(data); if (m.id) { const p = this.pending.get(m.id); if (p) { this.pending.delete(m.id); m.error ? p.reject(Error(m.error.message)) : p.resolve(m.result) } } else this.handlers.get(m.method)?.(m.params) } }
  static async connect(url) { const ws = new WebSocket(url); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j }); return new CDP(ws) }
  send(method, params = {}) { return new Promise((r, j) => { const id = ++this.id; this.pending.set(id, {resolve:r, reject:j}); this.ws.send(JSON.stringify({id, method, params})) }) }
  async eval(expression) { const v = await this.send('Runtime.evaluate', {expression, returnByValue:true}); if (v.exceptionDetails) throw Error(v.exceptionDetails.text); return v.result.value }
}
let server, chrome, profile, cdp
try {
  const p = await port(), base = process.env.TEST_BASE_URL || `http://127.0.0.1:${p}/portfolio/`
  if (!process.env.TEST_BASE_URL) server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '-p', String(p), '-H', '127.0.0.1'], {cwd:process.cwd(), stdio:'ignore'})
  await wait(async () => (await fetch(base)).ok, 'server', 60000)
  profile = await mkdtemp(join(tmpdir(), 'loader-cdp-'))
  chrome = spawn(process.env.CHROME_PATH || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome'), ['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'], {stdio:'ignore'})
  await wait(async () => !!await readFile(join(profile,'DevToolsActivePort')), 'Chrome')
  const debugPort = (await readFile(join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]
  const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, {method:'PUT'})).json()
  cdp = await CDP.connect(target.webSocketDebuggerUrl); await cdp.send('Page.enable'); await cdp.send('Runtime.enable')
  const navigate = async () => { await cdp.send('Page.navigate',{url:base}); await wait(() => cdp.eval(`location.href.startsWith(${JSON.stringify(base)}) && !!document.querySelector('#portfolio-content')`),'document') }
  const active = () => cdp.eval(`!!document.querySelector('.day-night-intro')`)
  const visible = () => cdp.eval(`getComputedStyle(document.querySelector('#portfolio-content')).visibility === 'visible'`)
  // Pause every JS response before execution, then release to allow the original page to hydrate.
  let paused = [], hold = true
  cdp.handlers.set('Fetch.requestPaused', e => { if (hold) paused.push(e.requestId); else cdp.send('Fetch.continueRequest',{requestId:e.requestId}).catch(()=>{}) })
  await cdp.send('Fetch.enable',{patterns:[{urlPattern:'*.js*',requestStage:'Response'}]})
  await navigate(); await wait(() => paused.length > 0, 'intercepted scripts'); await sleep(500)
  assert.equal(await active(),false); assert.equal(await visible(),true); console.log(`PASS delayed hydration: ${paused.length} JS responses held; content visible`)
  hold = false; await Promise.all(paused.map(requestId => cdp.send('Fetch.continueRequest',{requestId}))); await cdp.send('Fetch.disable')
  await wait(active,'intro after hydration'); await wait(async () => !(await active()),'normal completion'); console.log('PASS hydration resumes and intro completes')
  // Throw exactly when intro registers its completion listener, inside its initialization try block.
  const injection = await cdp.send('Page.addScriptToEvaluateOnNewDocument',{source:`(()=>{const original=document.addEventListener; document.addEventListener=function(type,...args){if(type==='introcomplete'){window.__introFault=true; throw Error('injected intro initialization fault')} return original.call(this,type,...args)}})()`})
  await navigate(); await wait(() => cdp.eval('window.__introFault === true'),'injected exception'); await sleep(300)
  assert.equal(await active(),false); assert.equal(await visible(),true); console.log('PASS injected initialization exception fails open')
  await cdp.send('Page.removeScriptToEvaluateOnNewDocument',{identifier:injection.identifier})
  await navigate(); await wait(active,'intro activation'); assert.equal(await visible(),false)
  await cdp.send('Emulation.setScriptExecutionDisabled',{value:true}); await sleep(5200)
  // Re-enable only after the CSS deadline has elapsed; inspect synchronously before timers run.
  await cdp.send('Emulation.setScriptExecutionDisabled',{value:false})
  const state = await cdp.eval(`(()=>{const e=document.querySelector('.day-night-intro'), c=document.querySelector('#portfolio-content'); return {intro:!!e, introVisibility:e&&getComputedStyle(e).visibility, contentVisibility:getComputedStyle(c).visibility}})()`)
  assert.equal(state.contentVisibility,'visible'); console.log('PASS halted scripts CSS deadline:',JSON.stringify(state))
  for (const type of ['key','pointer']) {
    await navigate(); await wait(active,`${type} intro`)
    if (type === 'key') await cdp.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9})
    else await cdp.send('Input.dispatchMouseEvent',{type:'mousePressed',x:30,y:30,button:'left',clickCount:1})
    await wait(async () => !(await active()),`${type} dismissal`); assert.equal(await visible(),true); console.log(`PASS ${type} dismisses intro`)
  }
  await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]}); await navigate(); await sleep(1000)
  assert.equal(await active(),false); assert.equal(await visible(),true); console.log('PASS reduced motion bypasses intro')
} catch (e) { console.error('FAIL',e); process.exitCode = 1 } finally { cdp?.ws.close(); chrome?.kill(); server?.kill(); if (profile) await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200}) }
