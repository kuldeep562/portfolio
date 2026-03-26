'use client'
import { Mail, Github, Linkedin } from 'lucide-react'
import { links } from '@/lib/links'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Contact() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className={`contact-inner reveal ${visible ? 'visible' : ''}`}>
        <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>
          // Let's Connect
        </span>

        <div className="contact-availability contact-avail-top">
          <div className="contact-availability-dot" />
          Available for hire
        </div>

        <p className="contact-tagline">
          Whether it's a production ML system, a bold research idea, or just a conversation about AI — my inbox is open.
        </p>

        <div className="contact-ctas">
          <a href="mailto:solanki.kuldeep@icloud.com" className="btn-primary">
            <Mail size={13} /> Send Email
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Linkedin size={13} /> LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Github size={13} /> GitHub
          </a>
        </div>
      </div>

      {/* Footer — centered */}
      <footer className="footer footer-center">
        <div className="footer-brand">
          kuldeep.solanki() · built with Next.js · {new Date().getFullYear()}
        </div>
      </footer>
    </section>
  )
}
