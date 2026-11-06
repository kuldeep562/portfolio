'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MountainScene() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const media = gsap.matchMedia()
    media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const trigger = element.closest('section') || element
        const timeline = gsap.timeline({
          scrollTrigger: { trigger, start: 'top top', end: 'bottom top', scrub: true },
        })
        timeline.fromTo('.hero-mountain-night', { opacity: 0.7 }, { opacity: 0, ease: 'none' }, 0)
          .fromTo('.hero-mountain-stars, .hero-moon', { opacity: 0.8 }, { opacity: 0, ease: 'none' }, 0)
          .fromTo('.hero-clouds', { xPercent: 0, opacity: 0.35 }, { xPercent: 4, opacity: 0.55, ease: 'none' }, 0)
          .fromTo('.hero-sun-glow', { y: 22, opacity: 0.2 }, { y: -22, opacity: 0.8, ease: 'none' }, 0)
          .fromTo('.hero-sun', { y: 45, opacity: 0.4 }, { y: -20, opacity: 1, ease: 'none' }, 0)
          .to('.hero-mountain-back', { y: -12, ease: 'none' }, 0)
          .to('.hero-mountain-mid', { y: -4, ease: 'none' }, 0)
          .to('.hero-mountain-front', { y: 8, ease: 'none' }, 0)
      }, element)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  return <div ref={root} className="hero-mountain" aria-hidden="true">
    <div className="hero-mountain-sky"/><div className="hero-mountain-night"/>
    <div className="hero-mountain-stars"><i/><i/><i/><i/><i/><i/></div>
    <div className="hero-moon"/><div className="hero-clouds"><i/><i/></div>
    <div className="hero-sun-glow"/><div className="hero-sun"/>
    <svg className="hero-mountain-layer hero-mountain-back" viewBox="0 0 1440 430" preserveAspectRatio="none"><path d="M0 255 155 172l104 70 180-155 132 130 124-95 115 96 151-142 143 132 95-65 141 112v175H0Z"/></svg>
    <svg className="hero-mountain-layer hero-mountain-mid" viewBox="0 0 1440 430" preserveAspectRatio="none"><path d="M0 300 130 225l135 78 160-125 155 134 130-112 140 107 155-116 150 111 130-77 155 100v105H0Z"/></svg>
    <svg className="hero-mountain-layer hero-mountain-front" viewBox="0 0 1440 430" preserveAspectRatio="none"><path d="m0 325 160-99 138 113 145-95 148 90 130-115 154 125 138-95 130 83 125-85 172 101v107H0Z"/></svg>
    <style jsx>{`
      .hero-mountain-night { position:absolute; inset:0; background:linear-gradient(180deg, #243b5a, #758aa6); opacity:0; }
      .hero-mountain-stars { position:absolute; inset:0; opacity:0; }
      .hero-mountain-stars i { position:absolute; width:3px; height:3px; border-radius:50%; background:#fff; box-shadow:0 0 7px #fff; }
      .hero-mountain-stars i:nth-child(1) { left:15%; top:20%; }
      .hero-mountain-stars i:nth-child(2) { left:30%; top:9%; }
      .hero-mountain-stars i:nth-child(3) { left:48%; top:27%; }
      .hero-mountain-stars i:nth-child(4) { left:61%; top:12%; }
      .hero-mountain-stars i:nth-child(5) { left:81%; top:22%; }
      .hero-mountain-stars i:nth-child(6) { left:92%; top:8%; }
      .hero-moon { position:absolute; left:76%; top:15%; width:30px; height:30px; border-radius:50%; background:#f3f3e9; box-shadow:0 0 24px rgba(255,255,240,.5); opacity:0; }
      .hero-clouds { position:absolute; inset:0; opacity:.55; }
      .hero-clouds i { position:absolute; width:14%; height:8%; border-radius:50%; background:rgba(255,255,255,.7); filter:blur(9px); }
      .hero-clouds i:first-child { left:20%; top:24%; }
      .hero-clouds i:last-child { left:57%; top:35%; width:19%; }
      .hero-mountain-mid path { fill:#bacde0; }
    `}</style>
  </div>
}
