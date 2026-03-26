'use client'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  enabled?: boolean
}

export default function AnimatedCounter({ target, suffix = '', enabled = false }: AnimatedCounterProps) {
  const count = useAnimatedCounter(target, 2000, enabled)

  return (
    <span suppressHydrationWarning>
      {count}{suffix}
    </span>
  )
}
