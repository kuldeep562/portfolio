'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'

type Preference = 'auto' | 'light' | 'dark'
const links = [['Home','#home'],['About','#about'],['Projects','#projects'],['Experience','#experience'],['Expertise','#expertise'],['Contact','#contact']]

export default function TopNav({ activeSection }: { activeSection: string }) {
  const [theme, setTheme] = useState<'light'|'dark'>('light')
  const [preference, setPreference] = useState<Preference>('auto')
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const pref = (document.documentElement.dataset.themePreference || 'auto') as Preference
    setPreference(pref)
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])
  useEffect(() => {
    const sync = () => {
      const root = document.documentElement
      let stored: string | null = root.dataset.themePreference || null
      try { stored = localStorage.getItem('portfolio-theme-preference') } catch { /* storage may be unavailable */ }
      const pref: Preference = stored === 'light' || stored === 'dark' ? stored : 'auto'
      const hour = new Date().getHours()
      const resolved = pref === 'auto' ? (hour >= 6 && hour < 18 ? 'light' : 'dark') : pref
      root.dataset.themePreference = pref
      root.dataset.theme = resolved
      setPreference(pref)
      setTheme(resolved)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'portfolio-theme-preference' || event.key === null) sync()
    }
    const timer = window.setInterval(() => {
      if (document.documentElement.dataset.themePreference === 'auto') {
        const hour = new Date().getHours()
        const resolved = hour >= 6 && hour < 18 ? 'light' : 'dark'
        document.documentElement.dataset.theme = resolved
        setTheme(resolved)
      }
    }, 30000)
    window.addEventListener('storage', onStorage)
    document.addEventListener('visibilitychange', sync)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('storage', onStorage)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])
  const choose = (next: Preference) => {
    setPreference(next)
    try { localStorage.setItem('portfolio-theme-preference', next) } catch { /* storage may be unavailable */ }
    const resolved = next === 'auto' ? (new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'light' : 'dark') : next
    setTheme(resolved)
    document.documentElement.dataset.themePreference = next
    document.documentElement.dataset.theme = resolved
  }
  const cycle = () => choose(preference === 'auto' ? 'light' : preference === 'light' ? 'dark' : 'auto')

  return <header className="site-header"><nav className="nav-shell" aria-label="Main navigation">
    <a className="brand" href="#home" aria-label="Kuldeep Solanki home"><span className="brand-mark">KS</span><span>Kuldeep Solanki<span className="brand-period">.</span></span></a>
    <div id="main-nav-links" className={`nav-links${open?' is-open':''}`}>{links.map(([label,href])=><a key={href} href={href} aria-current={activeSection === href.slice(1) ? 'location' : undefined} className={activeSection === href.slice(1) ? 'is-active' : ''} onClick={()=>setOpen(false)}>{label}</a>)}</div>
    <div className="nav-actions"><button className="icon-button theme-toggle" onClick={cycle} aria-label={`Theme preference: ${preference}. Activate to cycle preference`} title={`Theme: ${preference}`}>
      {preference==='auto'?<span className="auto-theme-mark">A</span>:theme==='light'?<Moon size={17}/>:<Sun size={17}/>}
    </button>
    <a className="button button-small button-dark nav-cta" href="#contact">Get in touch <ArrowUpRight size={15}/></a>
    <button ref={menuButton} className="icon-button menu-toggle" aria-controls="main-nav-links" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div>
  </nav><div className="header-rule"/></header>
}
