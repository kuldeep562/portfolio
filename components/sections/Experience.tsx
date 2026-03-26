'use client'
import { CheckCircle2 } from 'lucide-react'
import { experiences, certifications, experienceStory } from '@/lib/experience'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Experience() {
  const { ref, visible } = useScrollReveal(0.1)

  const work = experiences.filter((e) => e.type === 'work')
  const education = experiences.filter((e) => e.type === 'education')

  const storyParagraphs = experienceStory.split('<br/><br/>')

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className={`section-header-block reveal ${visible ? 'visible' : ''}`}>
        <span className="section-label">// Experience</span>
        <h2 className="section-title section-title-hero">The journey.</h2>
      </div>

      <div className="experience-layout">
        {/* Timeline — work entries ONLY */}
        <div className={`experience-timeline reveal reveal-delay-1 ${visible ? 'visible' : ''}`}>
          {work.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="experience-dot" />
              <div className="experience-item-info">
                <div className="experience-item-header">
                  <div className="experience-item-title-group">
                    <h3 className="experience-item-title">{exp.title}</h3>
                    {exp.current && (
                      <span className="exp-current-badge">Current</span>
                    )}
                  </div>
                  <span className="experience-item-date">{exp.date}</span>
                </div>
                <div className="experience-item-company">
                  {exp.company}
                  {exp.location && ` · ${exp.location}`}
                </div>
                <div className="experience-item-points">
                  {exp.points.map((point, j) => (
                    <div
                      key={j}
                      className="experience-point"
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar — Education, The Path, Certifications */}
        <div className="experience-sidebar">
          {/* Education card */}
          <div className={`experience-sidebar-card reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
            <div className="experience-sidebar-title">// Education</div>
            <div className="edu-sidebar-list">
              {education.map((edu) => (
                <div key={edu.id} className="edu-sidebar-item">
                  <div className="edu-sidebar-degree">{edu.title}</div>
                  <div className="edu-sidebar-school">{edu.company}</div>
                  <div className="edu-sidebar-date">{edu.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* The Path — story hook */}
          <div className={`experience-sidebar-card reveal reveal-delay-3 ${visible ? 'visible' : ''}`}>
            <div className="experience-sidebar-title">// The Path</div>
            <div className="experience-story">
              {storyParagraphs.map((para, i) => (
                <p key={i} className="exp-story-para" dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className={`experience-sidebar-card reveal reveal-delay-4 ${visible ? 'visible' : ''}`}>
            <div className="experience-sidebar-title">// Certifications</div>
            <div className="certifications-list">
              {certifications.map((cert, i) => (
                <div key={i} className="cert-item">
                  <CheckCircle2 size={12} style={{ color: 'var(--signal-green)', flexShrink: 0 }} />
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: 12 }}>{cert.name}</div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: 10 }}>{cert.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
