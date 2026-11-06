'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Crossfade adjacent visuals at their boundary without pinning their sections. */
export default function SceneTransitions() {
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]:not([data-slide])'))
        .map(scene => ({ scene, visual: scene.querySelector<HTMLElement>('[data-scene-visual]') }))
        .filter((item): item is { scene: HTMLElement; visual: HTMLElement } => !!item.visual)
      const states = scenes.map(() => ({ entry: 1, exit: 0 }))
      let hasSceneFocus = scenes.some(({ scene }) => scene.contains(document.activeElement))
      let focusFrame = 0

      const render = (index: number) => {
        const { entry, exit } = states[index]
        // The two visuals travel into the same boundary region. Only their
        // visual boxes move; section heights and the document scroll remain natural.
        const distance = Math.min(window.innerHeight * 0.65, 520)
        // Place the outgoing section above the next section's background
        // while their visuals overlap, without moving the section itself.
        gsap.set(scenes[index].scene, {
          zIndex: !hasSceneFocus && exit > 0 && exit < 1 ? 3 : '',
          backgroundColor: !hasSceneFocus && exit > 0 && exit < 1 ? 'transparent' : '',
        })
        gsap.set(scenes[index].visual, {
          y: hasSceneFocus ? 0 : -distance * (0.2 * exit + (1 - entry)),
          opacity: hasSceneFocus ? 1 : Math.min(entry, 1 - exit),
        })
      }

      const triggers = scenes.slice(1).map(({ scene }, index) => {
        const update = (progress: number) => {
          // Long sections must remain fully readable while their content scrolls
          // through the viewport; only overlap viewport-scale neighbours.
          // Experience and Expertise contain dense, independently readable content.
          // Translating whole wrappers across their boundary causes text to overlap.
          const denseBoundary = (scenes[index].scene.id === 'experience' && scene.id === 'expertise') ||
            (scenes[index].scene.id === 'expertise' && scene.id === 'contact')
          const eligible = !denseBoundary && scenes[index].scene.offsetHeight <= window.innerHeight * 1.35 &&
            scenes[index + 1].scene.offsetHeight <= window.innerHeight * 1.35
          states[index].exit = eligible ? progress : 0
          states[index + 1].entry = eligible ? progress : 1
          render(index)
          render(index + 1)
        }
        return ScrollTrigger.create({
          trigger: scene,
          start: 'top bottom',
          end: 'top 35%',
          onUpdate: self => update(self.progress),
          onRefresh: self => update(self.progress),
        })
      })

      // Never obscure a keyboard user's focused control, including during tabbing.
      const updateFocus = () => {
        hasSceneFocus = scenes.some(({ scene }) => scene.contains(document.activeElement))
        scenes.forEach((_, index) => render(index))
      }
      const onFocusIn = () => { cancelAnimationFrame(focusFrame); updateFocus() }
      const onFocusOut = () => { cancelAnimationFrame(focusFrame); focusFrame = requestAnimationFrame(updateFocus) }
      document.addEventListener('focusin', onFocusIn)
      document.addEventListener('focusout', onFocusOut)
      ScrollTrigger.refresh()
      return () => {
        cancelAnimationFrame(focusFrame)
        document.removeEventListener('focusin', onFocusIn)
        document.removeEventListener('focusout', onFocusOut)
        triggers.forEach(trigger => trigger.kill())
        scenes.forEach(({ scene, visual }) => {
          gsap.set(visual, { clearProps: 'transform,opacity' })
          gsap.set(scene, { clearProps: 'zIndex,backgroundColor' })
        })
      }
    })

    // Expanded archives change the document positions of later boundaries.
    let refreshFrame = 0
    const refreshLayout = (event: Event) => {
      if (!(event.target instanceof HTMLDetailsElement)) return
      cancelAnimationFrame(refreshFrame)
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    document.addEventListener('toggle', refreshLayout, true)
    return () => {
      document.removeEventListener('toggle', refreshLayout, true)
      cancelAnimationFrame(refreshFrame)
      media.revert()
    }
  }, [])
  return null
}
