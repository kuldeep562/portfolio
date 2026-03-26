'use client'
import { Database, Brain, Server, Zap } from 'lucide-react'
import { SYSTEM_LAYERS } from '@/lib/constants'
import { metrics } from '@/lib/links'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const LAYER_ICONS = [Database, Brain, Server, Zap]

export default function SystemOverview() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="systems" className="system-overview-section" ref={ref}>
      <div className={`section-header-block reveal ${visible ? 'visible' : ''}`}>
        <span className="section-label">// Architecture</span>
        <h2 className="section-title section-title-hero">From raw data to deployed edge models.</h2>
      </div>

      {/* Architecture pipeline flow */}
      <div className={`system-pipeline-flow reveal reveal-delay-1 ${visible ? 'visible' : ''}`}>
        {SYSTEM_LAYERS.map((layer, i) => {
          const Icon = LAYER_ICONS[i]
          return (
            <div key={layer.id} className="system-pipeline-step">
              <div className="system-pipeline-step-inner">
                <div className="system-pipeline-icon">
                  <Icon size={20} />
                </div>
                <div className="system-pipeline-step-info">
                  <div className="system-pipeline-step-name">{layer.name}</div>
                  <div className="system-pipeline-step-desc">{layer.desc}</div>
                  <div className="system-pipeline-tools">
                    {layer.tools.map((tool) => (
                      <span key={tool} className="tool-pill">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
              {i < SYSTEM_LAYERS.length - 1 && (
                <div className="system-pipeline-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Stats */}
      <div className={`system-stats-grid reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
        {metrics.map((m, i) => (
          <div key={m.label} className="system-stat-card">
            <div className="system-stat-value counter-value">
              <AnimatedCounter target={m.value} suffix={m.suffix} enabled={visible} />
            </div>
            <div className="system-stat-label">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
