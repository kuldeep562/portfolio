// Browser regression suite. Node 22+ and a local Chrome/Chromium are required.
// Set TEST_BASE_URL to test an already-running server, or CHROME_PATH to select Chrome.
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import assert from 'node:assert/strict'
import net from 'node:net'

const chromePath = process.env.CHROME_PATH || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
async function waitFor(fn, label, timeout = 30000) {
  const end = Date.now() + timeout
  while (Date.now() < end) { try { const value = await fn(); if (value) return value } catch {} await sleep(100) }
  throw new Error(`Timed out waiting for ${label}`)
}
async function freePort() {
  const server = net.createServer(); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port; await new Promise(resolve => server.close(resolve)); return port
}
class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (!m.id) return; const p = this.pending.get(m.id); if (!p) return; this.pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result) }) }
  static async connect(url) { const ws = new WebSocket(url); await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }) }); return new CDP(ws) }
  send(method, params = {}) { return new Promise((resolve, reject) => { const id = ++this.id; this.pending.set(id, { resolve, reject }); this.ws.send(JSON.stringify({ id, method, params })) }) }
  async eval(expression) { const result = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text); return result.result.value }
  close() { this.ws.close() }
}
let server, chrome, cdp, profile
let failures = 0
async function test(name, fn) { try { await fn(); console.log(`PASS ${name}`) } catch (e) { failures++; console.error(`FAIL ${name}: ${e.message}`) } }
try {
  if (typeof WebSocket === 'undefined') throw new Error('Node 22+ with built-in WebSocket is required')
  const port = await freePort()
  const base = (process.env.TEST_BASE_URL || `http://127.0.0.1:${port}/portfolio/`).replace(/\/?$/, '/')
  if (!process.env.TEST_BASE_URL) {
    server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '-p', String(port), '-H', '127.0.0.1'], { cwd: process.cwd(), stdio: 'ignore' })
    server.on('error', e => console.error('Server error:', e.message))
  }
  await waitFor(async () => (await fetch(base)).ok, `server at ${base}`, 60000)
  profile = await mkdtemp(join(tmpdir(), 'portfolio-browser-'))
  chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' })
  chrome.on('error', e => console.error('Chrome error:', e.message))
  const debugPort = await waitFor(async () => (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0], 'Chrome startup')
  const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' })).json()
  cdp = await CDP.connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable')
  async function navigate() {
    const marker = `test-${Date.now()}-${Math.random()}`
    const url = new URL(base); url.searchParams.set('browser-test', marker)
    await cdp.send('Page.navigate', { url: url.href })
    await waitFor(() => cdp.eval(`document.readyState !== 'loading' && new URL(location.href).searchParams.get('browser-test') === ${JSON.stringify(marker)}`), 'page load', 60000)
  }
  async function check(expression, label, timeout = 10000) { await waitFor(() => cdp.eval(expression), label, timeout) }
  await test('no JavaScript: intro does not obscure content', async () => {
    await cdp.send('Emulation.setScriptExecutionDisabled', { value: true }); await navigate()
    assert.equal(await cdp.eval(`!!document.querySelector('main h1')`), true)
    assert.equal(await cdp.eval(`(() => { const e = document.querySelector('.day-night-intro'); if (!e) return true; const s = getComputedStyle(e); return s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0 })()`), true, 'intro remains visibly over the page without JavaScript')
  })
  await cdp.send('Emulation.setScriptExecutionDisabled', { value: false })
  await test('normal intro completes and page is usable', async () => { await navigate(); await check(`!document.querySelector('.day-night-intro')`, 'intro to complete'); assert.equal(await cdp.eval(`!!document.querySelector('main h1')`), true) })
  await test('reduced motion bypasses intro', async () => {
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    try {
      await navigate()
      await check(`document.querySelector('.theme-toggle') && !document.querySelector('#portfolio-content').inert`, 'reduced motion page')
      assert.equal(await cdp.eval(`!!document.querySelector('.day-night-intro')`), false)
    } finally { await cdp.send('Emulation.setEmulatedMedia', { features: [] }) }
  })
  await test('theme button cycles and persists preferences', async () => {
    await cdp.eval(`localStorage.setItem('portfolio-theme-preference', 'auto')`)
    await navigate(); await check(`!document.querySelector('.day-night-intro') && !document.querySelector('#portfolio-content').inert`, 'usable page')
    await sleep(1000)
    assert.equal(await cdp.eval(`document.querySelectorAll('.theme-toggle').length === 1 && !document.querySelector('.site-header select')`), true)
    for (const pref of ['light', 'dark', 'auto']) {
      await cdp.eval(`document.querySelector('.theme-toggle').click()`)
      await check(`document.documentElement.dataset.themePreference === '${pref}' && localStorage.getItem('portfolio-theme-preference') === '${pref}'`, `${pref} preference`)
      assert.equal(await cdp.eval(`document.documentElement.dataset.theme`), pref === 'auto' ? await cdp.eval(`new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'light' : 'dark'`) : pref)
      await navigate(); await check(`!document.querySelector('.day-night-intro') && !document.querySelector('#portfolio-content').inert`, 'reload')
      await sleep(500)
      assert.equal(await cdp.eval(`document.documentElement.dataset.themePreference`), pref)
      assert.equal(await cdp.eval(`document.documentElement.dataset.theme`), pref === 'auto' ? await cdp.eval(`new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'light' : 'dark'`) : pref)
    }
    assert.equal(await cdp.eval(`document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1`), true)
  })
  await test('anchor navigation scrolls to projects', async () => {
    await check(`!document.querySelector('.day-night-intro')`, 'intro to complete')
    await cdp.eval(`document.querySelector('a[href="#projects"]').click()`)
    await check(`location.hash === '#projects' && Math.abs(document.querySelector('#projects').getBoundingClientRect().top) < 180`, 'projects scroll', 12000)
  })
  await test('scroll tracking and browser history', async () => {
    await check(`document.querySelector('.nav-links a[href="#projects"]').getAttribute('aria-current') === 'location'`, 'active projects navigation')
    await cdp.eval(`document.querySelector('.nav-links a[href="#experience"]').click()`)
    await check(`location.hash === '#experience' && Math.abs(document.querySelector('#experience').getBoundingClientRect().top) < 180`, 'experience navigation', 12000)
    await cdp.eval(`history.back()`)
    await check(`location.hash === '#projects' && Math.abs(document.querySelector('#projects').getBoundingClientRect().top) < 180`, 'history back', 12000)
    await cdp.eval(`history.forward()`)
    await check(`location.hash === '#experience' && Math.abs(document.querySelector('#experience').getBoundingClientRect().top) < 180`, 'history forward', 12000)
  })
  await test('experience and expertise remain in separate flow boxes', async () => {
    for (const [width, height] of [[1440, 900], [1366, 768], [2048, 1187], [390, 844]]) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
      await cdp.eval(`document.querySelector('#experience').scrollIntoView({behavior:'instant'})`)
      await sleep(400)
      await cdp.eval(`window.scrollTo(0, document.querySelector('#expertise').getBoundingClientRect().top + scrollY - innerHeight * 0.675)`)
      await sleep(400)
      const geometry = await cdp.eval(`(() => { const a = document.querySelector('#experience [data-scene-visual]'), b = document.querySelector('#expertise [data-scene-visual]'); const x = a.getBoundingClientRect(), y = b.getBoundingClientRect(); return { bottom: x.bottom, top: y.top, opacity: [getComputedStyle(a).opacity, getComputedStyle(b).opacity], overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth } })()`)
      assert.ok(geometry.bottom <= geometry.top + 1, `overlap at ${width}: ${JSON.stringify(geometry)}`)
      assert.deepEqual(geometry.opacity, ['1', '1'])
      assert.ok(geometry.overflow <= 1)
    }
    await cdp.send('Emulation.clearDeviceMetricsOverride')
  })
  await test('contact card and artwork remain separated', async () => {
    try {
      for (const [width, height] of [[1600, 900], [768, 1024], [390, 844]]) {
        await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
        const geometry = await cdp.eval(`(() => { const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width} }; return {card:rect('.contact-card'), content:rect('.contact-content'), art:rect('.contact-art'), footer:rect('.site-footer'), wrapper:rect('#contact>.scene-visual'), overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth} })()`)
        assert.ok(Math.abs(geometry.card.left + geometry.card.right - width) < 2, JSON.stringify(geometry))
        assert.ok(geometry.card.width >= Math.min(1200, width - 2 * Math.max(20, width * .04)) - 2, JSON.stringify(geometry))
        assert.ok(width <= 760 ? geometry.content.bottom <= geometry.art.top + 1 : geometry.content.right <= geometry.art.left + 1, JSON.stringify(geometry))
        assert.ok(Math.abs(geometry.footer.width - geometry.wrapper.width) < 1 && geometry.overflow <= 1, JSON.stringify(geometry))
      }
    } finally { await cdp.send('Emulation.clearDeviceMetricsOverride') }
  })
  await test('project archive expands and collapses', async () => {
    assert.equal(await cdp.eval(`document.querySelector('.project-archive').open`), false)
    await cdp.eval(`document.querySelector('.project-archive summary').click()`)
    assert.equal(await cdp.eval(`document.querySelector('.project-archive').open && document.querySelectorAll('.project-archive-item').length > 0`), true)
    await cdp.eval(`document.querySelector('.project-archive summary').click()`)
    assert.equal(await cdp.eval(`document.querySelector('.project-archive').open`), false)
  })
  await test('projects render all records without filtering controls', async () => {
    const data = await cdp.eval(`(() => { const section = document.querySelector('#projects'); const cards = [...section.querySelectorAll('.case-study, .project-archive-item')]; return { controls: section.querySelectorAll('input, select, .projects-filter, .projects-filter-count').length, text: section.innerText, cards: cards.map(card => ({title: card.querySelector('h3')?.textContent?.trim(), tags: card.querySelectorAll('.tag-row span').length, hidden: card.hidden})) } })()`)
    assert.equal(data.controls, 0)
    assert.doesNotMatch(data.text, /Search projects|All categories|10 projects found/)
    assert.equal(data.cards.length, 10)
    assert.ok(data.cards.every(card => card.title && card.tags > 0 && !card.hidden))
  })
  await test('auto theme respects mocked local-time boundaries', async () => {
    await cdp.eval(`localStorage.removeItem('portfolio-theme-preference')`)
    for (const [hour, minute, expected] of [[5, 59, 'dark'], [6, 0, 'light'], [17, 59, 'light'], [18, 0, 'dark']]) {
      // Override only the local clock accessor before bootstrap, preserving timers and Date.now().
      const script = await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `Date.prototype.getHours = () => ${hour}; Date.prototype.getMinutes = () => ${minute}` })
      try {
        await navigate()
        await check(`document.documentElement.dataset.themePreference === 'auto' && document.documentElement.dataset.theme === '${expected}' && !!document.querySelector('.theme-toggle')`, `auto theme at ${hour}:${minute}`)
        await sleep(500)
        assert.equal(await cdp.eval(`document.documentElement.dataset.theme`), expected, `theme changed after hydration at ${hour}:${minute}`)
      } finally { await cdp.send('Page.removeScriptToEvaluateOnNewDocument', { identifier: script.identifier }) }
    }
  })
  await test('scroll reverses back to the home scene', async () => {
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    try {
      await navigate(); await check(`!document.querySelector('#portfolio-content').inert`, 'usable page')
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 400, y: 300, deltaX: 0, deltaY: 1200 })
      await check(`scrollY > 300`, 'scroll down')
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 400, y: 300, deltaX: 0, deltaY: -2000 })
      await check(`scrollY < 10`, 'scroll back to top', 12000)
      assert.equal(await cdp.eval(`(() => { const e = document.querySelector('#home h1'); const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.bottom > 0 && r.top < innerHeight && s.visibility === 'visible' && Number(s.opacity) > 0 })()`), true, 'home heading is not visible after reversing')
    } finally { await cdp.send('Emulation.setEmulatedMedia', { features: [] }) }
  })
  await test('portrait loads and fits its container at desktop and mobile widths', async () => {
    try {
      for (const [width, height] of [[1280, 800], [375, 812]]) {
        await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 760 })
        await navigate(); await check(`!document.querySelector('#portfolio-content').inert`, 'usable portrait page')
        await cdp.eval(`document.querySelector('#about').scrollIntoView()`)
        await check(`(() => { const i = document.querySelector('.about-portrait img'); return i && i.complete && i.naturalWidth > 0 })()`, 'portrait image loads')
        const portrait = await cdp.eval(`(() => { const i = document.querySelector('.about-portrait img'); const p = i.closest('.about-portrait'); const r = p.getBoundingClientRect(); return { alt: i.alt, width: r.width, height: r.height, left: r.left, right: r.right, fit: getComputedStyle(i).objectFit, src: i.currentSrc } })()`)
        assert.ok(portrait.alt.includes('Kuldeep Solanki'), 'portrait needs descriptive alt text')
        assert.ok(portrait.width > 0 && portrait.height > 0 && portrait.left >= -1 && portrait.right <= width + 1, `portrait outside viewport: ${JSON.stringify(portrait)}`)
        assert.equal(portrait.fit, 'contain')
        assert.ok(new URL(portrait.src).pathname.startsWith('/portfolio/'), 'portrait asset missing base path')
      }
    } finally { await cdp.send('Emulation.clearDeviceMetricsOverride') }
  })
  await test('mobile navigation and local assets', async () => {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true })
    await navigate(); await check(`!document.querySelector('.day-night-intro')`, 'intro to complete')
    await sleep(1000)
    await check(`!document.querySelector('.day-night-intro') && !document.querySelector('#portfolio-content').inert`, 'hydrated intro to complete')
    assert.equal(await cdp.eval(`document.documentElement.scrollWidth <= innerWidth + 1`), true, 'horizontal page overflow')
    await cdp.eval(`document.querySelector('.menu-toggle').focus()`)
    await check(`document.activeElement === document.querySelector('.menu-toggle')`, 'mobile menu receives keyboard focus')
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r', unmodifiedText: '\r' })
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
    await check(`document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true'`, 'keyboard opens mobile menu')
    await sleep(200)
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await check(`document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false' && document.activeElement === document.querySelector('.menu-toggle')`, 'escape closes navigation and restores focus')
    await cdp.eval(`document.querySelector('.menu-toggle').click()`)
    await cdp.eval(`document.querySelector('.nav-links a[href="#about"]').click()`)
    await check(`location.hash === '#about' && document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false'`, 'mobile navigation')
    const images = await cdp.eval(`Array.from(document.images, i => ({src:i.currentSrc, ok:i.complete && i.naturalWidth > 0}))`)
    assert.ok(images.length > 0, 'expected an image to check')
    assert.ok(images.every(i => i.ok && new URL(i.src).pathname.startsWith('/portfolio/')), `broken or incorrectly prefixed images: ${JSON.stringify(images)}`)
    const favicon = await cdp.eval(`document.querySelector('link[rel="icon"]').href`)
    assert.ok(new URL(favicon).pathname.startsWith('/portfolio/'))
    assert.ok((await fetch(favicon)).ok, 'favicon did not load')
  })
} catch (e) { failures++; console.error(`ERROR ${e.stack || e}`) }
finally {
  cdp?.close(); chrome?.kill(); server?.kill()
  if (chrome) await Promise.race([new Promise(resolve => chrome.once('exit', resolve)), sleep(2000)])
  if (profile) await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 })
}
if (failures) process.exitCode = 1
