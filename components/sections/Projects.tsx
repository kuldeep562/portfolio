'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { projects, type ProjectCategory } from '@/lib/projects'

const filters: Array<'All' | ProjectCategory> = ['All', 'Healthcare AI', 'Computer Vision', 'Speech AI', 'LLM & GenAI', 'Systems Integration', 'Automation', 'Full-Stack Engineering']

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [query, setQuery] = useState('')
  const results = useMemo(() => projects.filter(project => (filter === 'All' || project.category === filter) && `${project.name} ${project.summary} ${project.technologies.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  return <section className="section section-soft" aria-label="Project directory"><div className="page-container"><div className="project-controls"><div className="filter-list" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} className={`filter-chip${filter === item ? ' active' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="project-search"><Search size={16}/><input aria-label="Search projects" placeholder="Find a project" value={query} onChange={event => setQuery(event.target.value)}/></label></div><motion.div className="project-grid" layout>{results.map(project => <article className="project-card" key={project.slug}><div className="project-card-meta"><span className="project-category">{project.category}</span><span className="status">{project.status}</span></div><h3>{project.name}</h3><p className="project-period">{project.period}</p><p className="project-summary">{project.summary}</p><div className="contribution"><span>MY CONTRIBUTION</span><p>{project.contribution}</p></div><div className="tag-row">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><p className="evidence-note">Source: {project.evidence}</p></article>)}</motion.div></div></section>
}
