'use client'

import { ArrowDown, ArrowRight, ArrowUpRight, AudioLines, Check, ChevronDown, Code2, Cpu, ExternalLink, Github, Linkedin, Mail, ShieldCheck, Workflow } from 'lucide-react'
import MountainScene from '@/components/sections/MountainScene'
import AboutSection from '@/components/sections/AboutSection'
import TopNav from '@/components/layout/TopNav'
import DayNightIntro from '@/components/sections/DayNightIntro'
import SmoothScroll from '@/components/providers/SmoothScroll'
import SceneTransitions from '@/components/providers/SceneTransitions'
import { useActiveSection } from '@/hooks/useActiveSection'
import { projects } from '@/lib/projects'
import { experience, education } from '@/lib/experience'
import { skillCategories } from '@/lib/skills'
import { links } from '@/lib/links'

// Project descriptions are intentionally limited to the documented scope of each workstream.
const caseStudies = [
  { slug: 'swasth-saarthi', focus: 'Multilingual pre-consultation', detail: 'A clinical conversation workflow combining structured outputs, risk rules and speech-provider integrations.', architecture: 'Django and FastAPI services connect conversation state, clinical memory, structured LLM outputs and speech providers.', contribution: 'Develop backend conversation workflows, integrate providers and contribute to safety-related features.' },
  { slug: 'consultai', focus: 'Decision support & review', detail: 'A consultation workflow bringing together note extraction, safety checks and review.', architecture: 'A modular Django service combines extraction, terminology enrichment, safety modules and a pharmacist review workflow.', contribution: 'Contribute to clinical decision-support workflows, speech integration and safety-related features.' },
  { slug: 'voxmesh', focus: 'Speech infrastructure', detail: 'A shared interface for transcription providers, with REST and streaming WebSocket access.', architecture: 'FastAPI exposes provider adapters through REST and WebSockets, with language-aware routing and backpressure.', contribution: 'Integrate transcription providers and streaming interfaces into shared speech infrastructure.' },
  { slug: 'meddetect-jetson', focus: 'Vision at the edge', detail: 'Medicine detection and counting using an optimized inference path for Jetson hardware.', architecture: 'A camera-to-inference path uses ONNX and TensorRT, followed by post-processing and a FastAPI entry point.', contribution: 'Contribute to computer-vision inference and hardware-aware optimization.' },
  { slug: 'lis-integration', focus: 'Laboratory systems', detail: 'Desktop interface and analyzer communication work across laboratory integration protocols.', architecture: 'A PyQt interface and integration workflows support TCP, serial and file communication alongside HL7 and ASTM.', contribution: 'Contribute to LIS interface enhancements and laboratory analyzer integration.' },
] as const

export default function HomePage() {
  const activeSection = useActiveSection()
  return <SmoothScroll>
    <DayNightIntro />
    <SceneTransitions />
    <div id="portfolio-content">
    <TopNav activeSection={activeSection} />
    <main aria-label="Kuldeep Solanki portfolio">
      <section id="home" data-scene className="hero-section page-container" aria-label="Home">
        <div className="scene-visual" data-scene-visual>
          <div className="hero-copy">
            <p className="eyebrow" data-reveal="heading">AI / ML ENGINEERING · APPLIED AI · SYSTEMS INTEGRATION</p>
            <h1 data-reveal="heading">Building AI systems for <span>real-world needs.</span></h1>
            <p className="hero-description" data-reveal="body">I’m an AI/ML engineer working across healthcare, computer vision and speech. I bring models, backend services and interfaces together to solve practical problems.</p>
            <div className="hero-actions" data-reveal="item"><a href="#projects" className="button button-dark">Explore projects <ArrowRight size={16} /></a><a href="#about" className="button button-light">About me <ArrowDown size={15} /></a></div>
            <div className="hero-proof" data-reveal="item"><div><strong>Healthcare AI</strong><span>Clinical workflows & safety</span></div><div><strong>Speech systems</strong><span>Provider integration & streaming</span></div><div><strong>Edge vision</strong><span>Detection & inference optimization</span></div></div>
          </div>
          <div className="hero-system-detail" aria-label="Engineering approach"><p className="hero-system-label">ENGINEERING APPROACH</p><ol className="hero-system-steps"><li><span>01</span> Understand the problem</li><li><span>02</span> Connect models and software</li><li><span>03</span> Build for real constraints</li></ol><p className="hero-system-caption">From an idea to a working system.</p></div>
          <a className="hero-scroll" href="#about"><span>Scroll to explore</span><span className="scroll-line"/></a>
          <MountainScene />
        </div>
      </section>

      <AboutSection />

      <section id="projects" data-scene className="section section-soft" aria-labelledby="projects-heading"><div className="scene-visual" data-scene-visual><div className="page-container">
        <div className="section-topline"><div className="section-heading"><p className="eyebrow" data-reveal="heading">SELECTED ENGINEERING WORK</p><h2 id="projects-heading" data-reveal="heading">Selected work,<br/><span>real-world challenges.</span></h2></div><p className="section-intro" data-reveal="body">A closer look at projects across healthcare AI, speech, computer vision and laboratory systems.</p></div>
        <div className="case-study-list">{caseStudies.map(({ slug, focus, detail, architecture, contribution }, index) => {
          const project = projects.find(item => item.slug === slug)
          if (!project) return null
          return <article className={`case-study case-study--${slug} ${index % 2 ? 'case-study--reverse' : ''}`} data-reveal="item" key={slug}>
            <div className="case-study-heading"><span className="case-study-number">{String(index + 1).padStart(2, '0')} / {project.category}</span><h3>{project.name}</h3><p className="case-study-focus">{focus}</p><span className="status">{project.status}</span></div>
            <div className="case-study-body"><p className="case-study-summary">{detail}</p><div className="case-study-detail"><h4>System approach</h4><p>{architecture}</p></div><div className="case-study-detail"><h4>Contribution</h4><p>{contribution}</p></div><div className="tag-row">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div>
          </article>
        })}</div>
        <details className="project-archive"><summary>More projects <span>Explore the archive</span></summary><div className="project-archive-list">{projects.filter(project => !caseStudies.some(study => study.slug === project.slug)).map(project => <article className="project-archive-item" key={project.slug}><div><h3>{project.name}</h3><span>{project.category} · {project.status}</span></div><p>{project.summary}</p><div className="tag-row">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></article>)}</div></details>
      </div></div></section>

      <section id="experience" data-scene className="section page-container" aria-labelledby="experience-heading"><div className="scene-visual" data-scene-visual>
        <div className="section-topline"><div className="section-heading"><p className="eyebrow" data-reveal="heading">PROFESSIONAL EXPERIENCE</p><h2 id="experience-heading" data-reveal="heading">Experience that<br/><span>shapes my work.</span></h2></div><p className="section-intro" data-reveal="body">The teams, projects and learning experiences behind my work.</p></div>
        <div className="experience-list">{experience.map(item=><article className="experience-item" data-reveal="item" key={item.role}><div className="experience-date">{item.period}</div><div className="experience-main"><div className="experience-title-row"><h3>{item.role}</h3><span className="status">{item.status}</span></div><p className="experience-company">{item.organization}</p><p>{item.summary}</p><ul>{item.contributions.map(point=><li key={point}><Check size={15}/>{point}</li>)}</ul></div></article>)}</div>
        <div className="education-row" data-reveal="body"><span className="eyebrow">EDUCATION</span><div>{education.map(item=><article key={item.name}><strong>{item.name}</strong><span>{item.institution} · {item.period}</span></article>)}</div></div>
      </div></section>

      <section id="expertise" data-scene className="section section-soft expertise-section" aria-labelledby="expertise-heading"><div className="scene-visual" data-scene-visual><div className="page-container"><div className="section-topline"><div className="section-heading"><p className="eyebrow" data-reveal="heading">TECHNICAL EXPERTISE</p><h2 id="expertise-heading" data-reveal="heading">Tools, skills<br/><span>and what I’m learning.</span></h2></div><p className="section-intro" data-reveal="body">The technologies I use across projects, alongside the areas I’m continuing to explore.</p></div><div className="expertise-grid">{skillCategories.map((category,i)=>{const Icon=[Cpu,ShieldCheck,AudioLines,Code2,Workflow,ExternalLink][i] || Code2;return <article className="expertise-card" data-reveal="item" key={category.name}><div className="expertise-icon"><Icon size={19} strokeWidth={1.7}/></div><h3>{category.name}</h3><p>{category.description}</p><div className="tag-row">{category.skills.map(skill=><span key={skill}>{skill}</span>)}</div>{category.projects.length > 0 && <div className="expertise-projects"><span>RELATED WORK</span><p>{category.projects.join(' · ')}</p></div>}</article>})}</div></div></div></section>

      <section id="contact" data-scene className="contact-section page-container" aria-labelledby="contact-heading"><div className="scene-visual" data-scene-visual><div className="contact-card"><div className="contact-art" aria-hidden="true"><div className="contact-sun"/><svg viewBox="0 0 600 180" preserveAspectRatio="none"><path d="M0 140 100 80l58 48 90-90 85 92 72-55 75 66 120-88v127H0Z"/><path d="m0 155 115-47 76 41 100-58 78 49 91-42 140 51v31H0Z"/></svg></div><div className="contact-content"><p className="eyebrow" data-reveal="heading">OPEN TO A CONVERSATION</p><h2 id="contact-heading" data-reveal="heading">Let’s talk about<br/><span>what we can build.</span></h2><p className="contact-copy" data-reveal="body">Have an opportunity, a project idea or a question about my work? I’d be glad to hear from you.</p><div className="contact-actions" data-reveal="item"><a className="button button-dark" href={`mailto:${links.email}`}><Mail size={16}/> Email me <ArrowUpRight size={15}/></a><a className="button button-light" href={links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a className="button button-light" href={links.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a></div></div></div><footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark">KS</span><span>Kuldeep Solanki<span className="brand-period">.</span></span></a><p></p><a className="back-top" href="#home">Back to top <ChevronDown size={14}/></a></footer></div></section>
    </main>
    </div>
  </SmoothScroll>
}
