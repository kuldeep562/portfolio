'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Keeps the document as the scroller, including native anchor and history behavior. */
export default function SmoothScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dispose: (() => void) | undefined

    const configure = () => {
      dispose?.()
      dispose = undefined
      if (motion.matches) return

      const lenis = new Lenis({ smoothWheel: true, syncTouch: false, autoRaf: false, stopInertiaOnNavigate: true })
      const tick = (time: number) => lenis.raf(time * 1000)
      const update = () => ScrollTrigger.update()
      // Stop the old wheel animation before the browser performs native fragment navigation.
      const stopInertia = () => { lenis.stop(); lenis.start() }
      const stopForAnchor = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        const link = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement && !!node.href)
        if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return
        const url = new URL(link.href)
        if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search && url.hash) stopInertia()
      }
      const stopForHistory = () => stopInertia()
      window.addEventListener('click', stopForAnchor)
      window.addEventListener('popstate', stopForHistory)
      window.addEventListener('hashchange', stopForHistory)
      lenis.on('scroll', update)
      gsap.ticker.add(tick)
      ScrollTrigger.refresh()
      dispose = () => {
        gsap.ticker.remove(tick)
        window.removeEventListener('click', stopForAnchor)
        window.removeEventListener('popstate', stopForHistory)
        window.removeEventListener('hashchange', stopForHistory)
        lenis.off('scroll', update)
        lenis.destroy()
      }
    }

    configure()
    motion.addEventListener('change', configure)
    return () => {
      motion.removeEventListener('change', configure)
      dispose?.()
    }
  }, [])

  return <>{children}</>
}
