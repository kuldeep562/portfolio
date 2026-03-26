'use client'
import { useEffect, useRef, useState } from 'react'

interface MetricBarProps {
  label: string
  value: string
  barPercent: number
  animate?: boolean
  delay?: number
}

export default function MetricBar({ label, value, barPercent, animate = false, delay = 0 }: MetricBarProps) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) {
      setWidth(barPercent)
      return
    }

    const timer = setTimeout(() => {
      setWidth(barPercent)
    }, delay)

    return () => clearTimeout(timer)
  }, [animate, barPercent, delay])

  return (
    <div className="featured-project-metric-bar" ref={ref}>
      <span className="metric-bar-label">{label}</span>
      <div className="metric-bar-track">
        <div
          className="metric-bar-fill"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="metric-bar-value">{value}</span>
    </div>
  )
}
