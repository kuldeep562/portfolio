'use client'

import portraitSmall from '../../photos/portrait-480.png'
import portraitLarge from '../../photos/portrait-900.png'

const identities = ['AI/ML Engineer', 'Healthcare AI', 'Computer Vision', 'LLMs & RAG', 'Speech AI', 'System Integration', 'Full-Stack Engineering']

export default function AboutSection() {
  return <section id="about" data-scene className="scene-section about-section" aria-label="About Kuldeep">
    <div className="scene-visual" data-scene-visual><div className="about-panel">
      <div className="about-portrait" data-slide-reveal><picture style={{ width: '100%', height: '100%' }}><source srcSet={`${portraitSmall.src} 360w, ${portraitLarge.src} 675w`} sizes="(max-width: 760px) 90vw, 42vw"/><img src={portraitLarge.src} width={portraitLarge.width} height={portraitLarge.height} alt="Kuldeep Solanki, AI/ML Engineer"/></picture><span className="portrait-caption">KULDEEP SOLANKI <i>·</i> ENGINEER</span></div>
      <div className="about-content"><p className="eyebrow" data-slide-reveal><span className="section-indicator"/> ABOUT ME</p><h2 data-slide-reveal>Engineer, builder<br/><span>and problem solver.</span></h2><p className="about-lead" data-slide-reveal>I’m an AI/ML Engineer passionate about building practical, reliable systems—combining AI, data, and software engineering to solve real-world problems.</p><p className="about-support" data-slide-reveal>My work spans healthcare AI, computer vision, speech intelligence, LLM applications, full-stack systems and laboratory integrations. I enjoy understanding complex engineering constraints, designing end-to-end solutions, and turning technical ideas into useful products.</p><div className="identity-tags" data-slide-reveal>{identities.map(tag=><span key={tag}>{tag}</span>)}</div></div>
    </div></div>
  </section>
}
