'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function DayNightIntro() {
  const root = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'light'|'dark'|null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const content = document.getElementById('portfolio-content')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Do not interrupt focus or override isolation owned by another component.
    if (!content || motion.matches || content.hasAttribute('inert') ||
        content.contains(document.activeElement)) return

    let finished = false
    let timer = 0
    const dismiss = () => {
      if (finished) return
      finished = true
      cleanup()
      setDone(true)
    }
    const onPointer = (event: Event) => {
      event.preventDefault()
      event.stopImmediatePropagation()
      dismiss()
    }
    const onKey = (event: KeyboardEvent) => {
      event.preventDefault()
      event.stopImmediatePropagation()
      dismiss()
    }
    const onComplete = () => dismiss()
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) dismiss()
    }

    const cleanup = () => {
      window.clearTimeout(timer)
      document.removeEventListener('pointerdown', onPointer, true)
      document.removeEventListener('wheel', onPointer, true)
      document.removeEventListener('touchstart', onPointer, true)
      document.removeEventListener('keydown', onKey, true)
      document.removeEventListener('introcomplete', onComplete)
      motion.removeEventListener('change', onMotionChange)
    }

    try {
      timer = window.setTimeout(dismiss, 4500)
      document.addEventListener('pointerdown', onPointer, true)
      document.addEventListener('wheel', onPointer, { capture: true, passive: false })
      document.addEventListener('touchstart', onPointer, { capture: true, passive: false })
      document.addEventListener('keydown', onKey, true)
      document.addEventListener('introcomplete', onComplete)
      motion.addEventListener('change', onMotionChange)
      const pref = document.documentElement.dataset.themePreference || 'auto'
      const hour = new Date().getHours()
      setTheme(pref === 'light' || pref === 'dark' ? pref : (hour >= 6 && hour < 18 ? 'light' : 'dark'))
    } catch {
      dismiss()
    }
    return cleanup
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el || !theme || done) return
    let ctx: gsap.Context | undefined
    try {
      ctx = gsap.context(() => {
      const toDay = theme === 'light'
      const timeline = gsap.timeline({ defaults: { ease: 'sine.inOut' }, onComplete: () => document.dispatchEvent(new Event('introcomplete')) })
      gsap.set('.intro-stars', { opacity: toDay ? 1 : 0 })
      gsap.set('.intro-moon', { opacity: toDay ? 1 : 0, y: toDay ? 0 : 35 })
      gsap.set('.intro-sun', { y: toDay ? 120 : -5, opacity: 1 })
      gsap.set('.intro-sky', { background: toDay ? 'linear-gradient(180deg,#101d35 0%,#213b5c 58%,#725f69 100%)' : 'linear-gradient(180deg,#b8d7f4 0%,#dbeafa 58%,#f3d7b2 100%)' })
      gsap.set('.intro-glow', { opacity: toDay ? 0 : .5 })
      gsap.set('.intro-mountain-back', { fill: toDay ? '#253b59' : '#afc8e8' })
      gsap.set('.intro-mountain-front', { fill: toDay ? '#182b45' : '#91a9c4' })
      gsap.set('.intro-sun', { backgroundColor: toDay ? '#f5c98b' : '#f0bd7f' })
      gsap.set('.intro-brand', { color: toDay ? '#f5f7fb' : '#172033' })
      if (toDay) {
        timeline.to('.intro-stars', { opacity: 0, duration: .35 }, 0)
          .to('.intro-moon', { opacity: 0, y: -20, duration: .32 }, 0)
          .to('.intro-glow', { opacity: .75, duration: .55 }, .25)
          .to('.intro-sun', { y: -82, duration: .95 }, .15)
          .to('.intro-sky', { background: 'linear-gradient(180deg,#cce2f6 0%,#e6f1fb 62%,#f6e6d2 100%)', duration: 1.05 }, .05)
          .to('.intro-mountain-back', { fill: '#ccdaea', duration: .9 }, .15)
          .to('.intro-mountain-front', { fill: '#91a9c4', duration: .9 }, .15)
          .to('.intro-brand', { color: '#172033', duration: .5 }, .55)
      } else {
        timeline.to('.intro-sun', { y: 100, duration: .58 }, 0)
          .to('.intro-glow', { opacity: .2, duration: .5 }, .15)
          .to('.intro-sky', { background: 'linear-gradient(180deg,#f4c68e 0%,#d59f91 48%,#384b69 100%)', duration: .55 }, 0)
          .to('.intro-sky', { background: 'linear-gradient(180deg,#111c33 0%,#1d3452 58%,#35465f 100%)', duration: .48 }, .52)
          .to('.intro-mountain-back', { fill: '#253b59', duration: .85 }, .35)
          .to('.intro-mountain-front', { fill: '#182b45', duration: .85 }, .35)
          .to('.intro-stars', { opacity: 1, duration: .45 }, .65)
          .to('.intro-moon', { opacity: 1, y: 0, duration: .45 }, .7)
          .to('.intro-brand', { color: '#f5f7fb', duration: .5 }, .58)
      }
      timeline.to(el, { opacity: 0, duration: .4, ease: 'power1.out' }, 3.1)
      }, el)
    } catch {
      document.dispatchEvent(new Event('introcomplete'))
    }
    return () => ctx?.revert()
  }, [theme, done])


  if (done || !theme) return null
  const nightToDay = theme === 'light'
  return <div className={`day-night-intro intro-${nightToDay ? 'day' : 'night'}`} ref={root} aria-hidden="true">
    <style jsx global>{`
      /* CSS provides a separate deadline when animation rendering continues without React callbacks. */
      .day-night-intro {
        animation: intro-fail-open 4.5s step-end forwards;
      }
      .day-night-intro ~ #portfolio-content {
        animation: intro-content-release 4.5s step-end forwards;
      }
      @keyframes intro-fail-open {
        from { visibility: visible; }
        to { visibility: hidden; }
      }
      @keyframes intro-content-release {
        from { visibility: hidden; }
        to { visibility: visible; }
      }
      @media (prefers-reduced-motion: reduce) {
        .day-night-intro { visibility: hidden; animation: none; }
        .day-night-intro ~ #portfolio-content { visibility: visible; animation: none; }
      }
    `}</style>
    <div className="intro-sky"/><div className="intro-atmosphere"/><div className="intro-stars"><i/><i/><i/><i/><i/><i/><i/><i/></div>
    <div className="intro-moon"><span/></div><div className="intro-glow"/><div className="intro-sun"/>
    <svg className="intro-mountains" viewBox="0 0 1440 420" preserveAspectRatio="none"><path className="intro-mountain-back" d="M0 242 150 154l115 82 170-142 147 133 124-97 120 100 145-137 145 123 111-67 213 138v133H0Z"/><path className="intro-mountain-front" d="m0 306 150-91 140 109 138-99 158 91 132-111 157 121 143-97 132 85 125-87 165 100v93H0Z"/></svg>
    <div className="intro-brand"><span className="intro-mark">KS</span><span className="intro-brand-copy"><strong>Kuldeep Solanki</strong><small>AI/ML Engineer · Full-Stack Developer</small><em>Applied AI and systems engineering.</em></span></div>
  </div>
}
