'use client'
import { useEffect, useState } from 'react'
import { ArrowDown, ExternalLink, Mail } from 'lucide-react'
import { heroContent, metrics } from '@/lib/links'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [counterEnabled, setCounterEnabled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setCounterEnabled(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid-bg" aria-hidden="true" />

      {/* Floating particles */}
      <div className="hero-particles" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`hero-particle hero-particle-${i + 1}`} />
        ))}
      </div>

      <div className="hero-content">
        {/* Name */}
        <h1 className={`hero-name ${mounted ? 'visible' : ''}`}>
          {heroContent.name}
        </h1>

        {/* Role */}
        <p className={`hero-role ${mounted ? 'visible' : ''}`}>
          {heroContent.role}
        </p>

        {/* Headline */}
        <h2 className={`hero-headline ${mounted ? 'visible' : ''}`}>
          I build AI that{' '}
          <span className="hero-headline-accent">actually ships.</span>
          <br />
          <span className="hero-headline-sub">In production.</span>
        </h2>

        {/* Proof line */}
        <div className={`hero-proof-line ${mounted ? 'visible' : ''}`}>
          {heroContent.proofItems.map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="hero-proof-sep">·</span>}
              {item}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className={`hero-ctas ${mounted ? 'visible' : ''}`}>
          <a href="#featured" className="btn-primary">
            View Work <ExternalLink size={13} />
          </a>
          <a href="mailto:solanki.kuldeep@icloud.com" className="btn-secondary">
            <Mail size={13} /> Get in Touch
          </a>
        </div>

        {/* Metrics strip */}
        <div className={`hero-metrics ${mounted ? 'visible' : ''}`}>
          {metrics.map((m) => (
            <div key={m.label} className="hero-metric">
              <div className="hero-metric-value counter-value">
                <AnimatedCounter target={m.value} suffix={m.suffix} enabled={counterEnabled} />
              </div>
              <div className="hero-metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Availability */}
        <div className={`hero-availability ${mounted ? 'visible' : ''}`}>
          <div className="hero-availability-dot" />
          {heroContent.availability}
        </div>

        {/* Scroll hint */}
        <a href="#featured" className="hero-scroll-hint">
          <span className="hero-scroll-arrow">
            <ArrowDown size={12} />
          </span>
          scroll to explore
        </a>
      </div>
    </section>
  )
}
