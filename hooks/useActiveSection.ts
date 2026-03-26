'use client'
import { useEffect, useState } from 'react'

const SECTIONS = ['hero', 'featured', 'systems', 'experience', 'skills', 'contact']

export function useActiveSection(): string {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    let rafId: number

    const detect = () => {
      // Find the last section whose top is AT or ABOVE the middle of viewport
      const midY = window.scrollY + window.innerHeight * 0.38
      let current = 'hero'

      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top } = el.getBoundingClientRect()
        const absTop = top + window.scrollY
        // If section top is at or above the detection line, it's the active one
        if (absTop <= midY) {
          current = id
        }
      }

      setActive(current)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(detect)
    }

    detect()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return active
}
