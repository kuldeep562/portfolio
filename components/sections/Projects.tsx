'use client'
import { useState } from 'react'
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { regularProjects } from '@/lib/projects'
import StatusBadge from '@/components/ui/StatusBadge'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const FILTERS = ['all', 'deployed', 'experimental', 'research', 'ongoing']

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const { ref, visible } = useScrollReveal(0.1)

  const filtered = filter === 'all'
    ? regularProjects
    : regularProjects.filter((p) => p.status === filter)

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className={`reveal ${visible ? 'visible' : ''}`}>
        <div className="projects-header">
          <div>
            <span className="section-label">// All Systems</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>More work.</h2>
          </div>

          <div className="projects-filter-tabs" role="tablist" aria-label="Filter projects by status">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="projects-grid">
        {filtered.length === 0 ? (
          <p className="projects-empty-state">No projects found for this filter.</p>
        ) : (
          filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))
        )}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: (typeof regularProjects)[0]
  index: number
  visible: boolean
}) {
  const delayClass = `reveal-delay-${Math.min(index + 1, 5)}`
  const [expanded, setExpanded] = useState(false)

  return (
    <article className={`terminal-card project-card reveal ${delayClass} ${visible ? 'visible' : ''} ${expanded ? 'is-expanded' : ''}`}>
      <div className="project-card-header">
        <h3 className="project-card-name">{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="project-card-desc">{project.tagline}</p>

      <div className="project-card-stack">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className="stack-pill" style={{ fontSize: '10px' }}>{tech}</span>
        ))}
      </div>

      <div className="project-card-pipeline">
        <span className="project-card-pipeline-label">pipeline:</span>
        {project.stages.slice(0, 3).map((stage, i) => (
          <span key={stage.id}>
            <span className="pipeline-node" style={{ fontSize: '9px', padding: '2px 6px' }}>
              {stage.label}
            </span>
            {i < 2 && (
              <span className="pipeline-arrow" aria-hidden="true">→</span>
            )}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="project-card-actions">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn project-action-btn-github"
            aria-label="View on GitHub"
          >
            <Github size={11} />
            GitHub
            <ExternalLink size={9} />
          </a>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="project-action-btn project-action-btn-explore"
          aria-expanded={expanded}
        >
          {expanded ? 'Collapse' : 'Explore'}
          {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </button>
      </div>

      {/* Expanded detail section */}
      <div
        className="project-card-expanded"
        style={{
          maxHeight: expanded ? '400px' : '0',
          opacity: expanded ? 1 : 0,
          transition: 'max-height 350ms ease, opacity 250ms ease',
          overflow: 'hidden',
        }}
      >
        {project.explore && (
          <div className="project-explore-text">
            <p className="project-explore-label">// overview</p>
            <p className="project-explore-body">{project.explore}</p>
          </div>
        )}
        {project.challenge && (
          <div className="project-explore-text">
            <p className="project-explore-label">// challenge</p>
            <p className="project-explore-body">{project.challenge}</p>
          </div>
        )}
        {project.solution && (
          <div className="project-explore-text">
            <p className="project-explore-label">// solution</p>
            <p className="project-explore-body">{project.solution}</p>
          </div>
        )}
        {project.impact && (
          <div className="project-explore-text">
            <p className="project-explore-label">// impact</p>
            <p className="project-explore-body">{project.impact}</p>
          </div>
        )}
      </div>
    </article>
  )
}
