'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon, Github, Linkedin, Mail } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { NAV_ITEMS } from '@/lib/constants'

export default function SidebarNav() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)
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

  const getIndicatorTop = (id: string) => {
    const index = NAV_ITEMS.findIndex((n) => n.id === id)
    return `calc(24px + ${index * 44}px + 20px)`
  }

  if (!mounted) return null

  return (
    <nav className="sidebar-nav" aria-label="Main navigation">
      {/* Monogram */}
      <a href="#hero" className="sidebar-monogram" aria-label="Kuldeep Solanki — home">
        KS
      </a>

      <div className="sidebar-divider" />

      {/* Nav items */}
      <div className="sidebar-nav-items">
        {active && (
          <div
            className="sidebar-nav-indicator"
            style={{ top: getIndicatorTop(active) }}
          />
        )}
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`sidebar-nav-item${active === item.id ? ' active' : ''}`}
            aria-label={item.label}
            aria-current={active === item.id ? 'page' : undefined}
          >
            <span className="sidebar-nav-tooltip">{item.label}</span>
            <NavIcon id={item.id} />
          </a>
        ))}
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-divider" />

        <button
          className="sidebar-icon-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <a
          href="https://github.com/kuldeep562"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-icon-btn"
          aria-label="GitHub"
        >
          <Github size={16} />
        </a>

        <a
          href="https://linkedin.com/in/kuldeep-solanki-298614276"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-icon-btn"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} />
        </a>

        <a
          href="mailto:solanki.kuldeep@icloud.com"
          className="sidebar-icon-btn"
          aria-label="Email"
        >
          <Mail size={16} />
        </a>

        <div
          className="sidebar-status-dot"
          title="Open to work"
          aria-label="Available"
        />
      </div>
    </nav>
  )
}

function NavIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    hero: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 8L8 2L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 6V13H12V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    featured: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    systems: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 2V4M8 12V14M2 8H4M12 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4.22 4.22L5.64 5.64M10.36 10.36L11.78 11.78M11.78 4.22L10.36 5.64M5.64 10.36L4.22 11.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    experience: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 8H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    skills: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 12L2 14L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 4L14 2L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 12L12 14L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 4L4 2L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    contact: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 5L8 9L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }

  return <>{icons[id] || null}</>
}
