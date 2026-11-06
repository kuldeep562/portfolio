'use client'

import { ArrowRight } from 'lucide-react'
import { projects } from '@/lib/projects'

export default function FeaturedProjects() {
  return <section className="section page-container"><div className="section-topline"><div className="section-heading"><p className="eyebrow">FEATURED ENGINEERING WORK</p><h2>Selected systems.<br/><span>Real constraints.</span></h2></div><a className="button button-light" href="#projects">All projects <ArrowRight size={15}/></a></div><div className="project-grid">{projects.filter(project => project.featured).map(project => <article className="project-card" key={project.slug}><div className="project-card-meta"><span className="project-category">{project.category}</span><span className="status">{project.status}</span></div><h3>{project.name}</h3><p className="project-summary">{project.summary}</p><div className="tag-row">{project.technologies.slice(0,5).map(tech => <span key={tech}>{tech}</span>)}</div></article>)}</div></section>
}
