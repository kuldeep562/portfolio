'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { NAV_ITEMS } from '@/lib/constants'

export default function TopNav() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('light', initial === 'light')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('portfolio-theme', next)
    document.documentElement.classList.toggle('light', next === 'light')
  }

  const handleNavClick = (_id: string) => {
    setMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="top-nav" aria-label="Main navigation">
        {/* Left: Monogram */}
        <a href="#hero" className="topnav-monogram" aria-label="Kuldeep Solanki — home">
          KS
        </a>

        {/* Center: Nav links */}
        <div className="topnav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleNavClick(item.id)}
              className={`topnav-link${active === item.id ? ' active' : ''}`}
              aria-current={active === item.id ? 'page' : undefined}
            >
              {item.label}
              {active === item.id && <span className="topnav-link-dot" />}
            </a>
          ))}
        </div>

        {/* Right: Theme + Status */}
        <div className="topnav-right">
          <button className="topnav-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <div className="topnav-status" title="Open to work">
            <span className="topnav-status-dot" />
            <span className="topnav-status-label">Open</span>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => handleNavClick(item.id)}
            className={`mobile-nav-item${active === item.id ? ' active' : ''}`}
            aria-current={active === item.id ? 'page' : undefined}
          >
            <MobileNavIcon id={item.id} />
            <span className="mobile-nav-label">{item.label}</span>
            {active === item.id && <span className="mobile-nav-indicator" />}
          </a>
        ))}
      </nav>
    </>
  )
}

function MobileNavIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    hero: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 9L9 3L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 7V14H13V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    featured: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    systems: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 2V4.5M9 13.5V16M2 9H4.5M13.5 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    experience: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 9.5H12M6 12.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    skills: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M5 14L2 16L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 4L16 2L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13L14 16L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 5L4 2L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    contact: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 6L9 11L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }
  return <>{icons[id] || null}</>
}
