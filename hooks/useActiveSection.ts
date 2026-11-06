'use client'
import { useEffect, useState } from 'react'

const SECTIONS = ['home', 'about', 'projects', 'experience', 'expertise', 'contact']

export function useActiveSection(): string {
  const [active, setActive] = useState('home')
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.42
      let current = 'home'
      for (const id of SECTIONS) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= line) current = id
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && document.getElementById('contact')) current = 'contact'
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return active
}
