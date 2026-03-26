'use client'
import { useEffect, useRef, useState } from 'react'

export function useAnimatedCounter(target: number, duration = 2000, enabled = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setCount(0)
      cancelAnimationFrame(rafRef.current)
      startTimeRef.current = null
      return
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    startTimeRef.current = null
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, enabled])

  return count
}
