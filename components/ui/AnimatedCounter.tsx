'use client'

interface AnimatedCounterProps { target: number; suffix?: string; enabled?: boolean }

export default function AnimatedCounter({ target, suffix = '', enabled = true }: AnimatedCounterProps) {
  return <span>{enabled ? target : 0}{suffix}</span>
}
