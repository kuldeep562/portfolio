'use client'
import { useState } from 'react'
import { Code, Cpu, Layers, Server } from 'lucide-react'
import { skillCategories } from '@/lib/skills'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  code: <Code size={14} />,
  brain: <Cpu size={14} />,
  cpu: <Layers size={14} />,
  server: <Server size={14} />,
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  cyan: { bg: 'var(--glow-cyan)', border: 'rgba(0,200,255,0.2)', color: 'var(--signal-cyan)' },
  purple: { bg: 'rgba(176,96,255,0.1)', border: 'rgba(176,96,255,0.2)', color: 'var(--system-purple)' },
  green: { bg: 'var(--glow-green)', border: 'rgba(0,255,136,0.2)', color: 'var(--signal-green)' },
  amber: { bg: 'var(--glow-amber)', border: 'rgba(255,184,0,0.2)', color: 'var(--signal-amber)' },
}

export default function Skills() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className={`section-header-block reveal ${visible ? 'visible' : ''}`}>
        <span className="section-label">// Skill Set</span>
        <h2 className="section-title section-title-hero">The toolkit.</h2>
      </div>

      <div className="skills-grid">
        {skillCategories.map((cat, i) => {
          const colors = CATEGORY_COLORS[cat.color] || CATEGORY_COLORS.cyan
          const delayClass = `reveal-delay-${i + 1}`

          return (
            <div
              key={cat.id}
              className={`skill-category reveal ${delayClass} ${visible ? 'visible' : ''}`}
            >
              <div className="skill-category-header">
                <div
                  className="skill-category-icon"
                  style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.color }}
                >
                  {CATEGORY_ICONS[cat.icon]}
                </div>
                <span className="skill-category-name">{cat.name}</span>
                <span className="skill-count">{cat.skills.length} skills</span>
              </div>
              <div className="skill-tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
