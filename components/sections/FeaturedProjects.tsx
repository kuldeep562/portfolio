'use client'
import { useState } from 'react'
import { ArrowRight, Layers, Eye, Zap, Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { featuredProjects } from '@/lib/projects'
import StatusBadge from '@/components/ui/StatusBadge'
import MetricBar from '@/components/ui/MetricBar'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function FeaturedProjects() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="featured" className="featured-projects-section" ref={ref}>
      <div className={`section-header-block reveal ${visible ? 'visible' : ''}`}>
        <span className="section-label">// Featured Systems</span>
        <div className="section-header-row">
          <h2 className="section-title section-title-hero">The work that ships.</h2>
          <a href="#projects" className="section-see-all">
            View all projects <ArrowRight size={13} />
          </a>
        </div>
      </div>

      <div className="featured-grid">
        {featuredProjects.length === 0 ? (
          <p className="projects-empty-state">No featured projects yet.</p>
        ) : (
          featuredProjects.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} visible={visible} />
          ))
        )}
      </div>
    </section>
  )
}

function FeaturedCard({
  project,
  index,
  visible,
}: {
  project: (typeof featuredProjects)[0]
  index: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const icons = [Layers, Eye, Zap]
  const Icon = icons[index % icons.length]

  return (
    <article
      className={`featured-card reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderLeftColor: hovered || expanded ? 'var(--signal-green)' : 'transparent',
        borderLeftWidth: '4px',
        transition: 'border-color 250ms ease, transform 250ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms ease',
        transform: expanded ? 'none' : hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered || expanded
          ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,255,136,0.15), inset 0 1px 0 rgba(0,255,136,0.1)'
          : '0 0 0 1px var(--border)',
      }}
    >
      {/* Animated top line */}
      <div className="featured-card-top-line">
        <div
          className="featured-card-top-line-fill"
          style={{ animationPlayState: hovered || expanded ? 'paused' : 'running' }}
        />
      </div>

      <div className="featured-project-card">
        {/* Left: content */}
        <div className="featured-project-info">
          <div className="featured-project-header">
            <div className="featured-project-title-group">
              <h3 className="featured-project-name">{project.name}</h3>
              <StatusBadge status={project.status} />
            </div>
          </div>

          <p className="featured-project-desc">{project.tagline}</p>

          {/* Impact metric — highlight */}
          <div className="featured-impact-row">
            <span className="featured-impact-value">{project.metrics[0].value}</span>
            <span className="featured-impact-label">{project.metrics[0].label}</span>
          </div>

          {/* Metrics bars */}
          <div className="featured-project-metrics">
            {project.metrics.slice(1).map((m) => (
              <MetricBar
                key={m.label}
                label={m.label}
                value={m.value}
                barPercent={m.barPercent}
                animate={visible}
                delay={index * 150 + 300}
              />
            ))}
          </div>

          {/* Stack */}
          <div className="featured-project-stack">
            {project.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="stack-pill">{tech}</span>
            ))}
            {project.stack.length > 5 && (
              <span className="stack-pill stack-pill-more">+{project.stack.length - 5}</span>
            )}
          </div>

          {/* Pipeline */}
          <div className="featured-project-pipeline">
            {project.stages.slice(0, 4).map((stage, i) => (
              <span key={stage.id}>
                <span className="pipeline-node">{stage.label}</span>
                {i < 3 && (
                  <span className="pipeline-arrow" aria-hidden="true">→</span>
                )}
              </span>
            ))}
            <span className="pipeline-arrow" aria-hidden="true">→</span>
            <span className="pipeline-node pipeline-node-accent">Output</span>
          </div>

          {/* Action buttons */}
          <div className="featured-project-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-action-btn featured-action-btn-github"
                aria-label="View on GitHub"
              >
                <Github size={13} />
                GitHub
                <ExternalLink size={10} />
              </a>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="featured-action-btn featured-action-btn-explore"
              aria-expanded={expanded}
            >
              {expanded ? 'Collapse' : 'Explore'}
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
        </div>

        {/* Right: icon */}
        <div className="featured-project-icon">
          <div
            className="featured-icon-circle"
            style={{
              borderColor: hovered || expanded ? 'rgba(0,255,136,0.4)' : 'var(--border)',
              boxShadow: hovered || expanded ? '0 0 20px var(--glow-green)' : 'none',
              transition: 'border-color 250ms ease, box-shadow 250ms ease',
            }}
          >
            <Icon size={24} />
          </div>
        </div>
      </div>

      {/* Expanded detail section */}
      <div
        className="featured-card-expanded"
        style={{
          maxHeight: expanded ? '600px' : '0',
          opacity: expanded ? 1 : 0,
          transition: 'max-height 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
          overflow: 'hidden',
        }}
      >
        <div className="featured-card-expanded-inner">
          {project.explore && (
            <div className="featured-explore-section">
              <p className="featured-explore-label">// overview</p>
              <p className="featured-explore-text">{project.explore}</p>
            </div>
          )}
          {(project.challenge || project.solution || project.impact) && (
            <div className="featured-story-grid">
              {project.challenge && (
                <div className="featured-story-item">
                  <p className="featured-story-label">// challenge</p>
                  <p className="featured-story-text">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="featured-story-item">
                  <p className="featured-story-label">// solution</p>
                  <p className="featured-story-text">{project.solution}</p>
                </div>
              )}
              {project.impact && (
                <div className="featured-story-item">
                  <p className="featured-story-label">// impact</p>
                  <p className="featured-story-text">{project.impact}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
