'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import TopNav from '@/components/layout/TopNav'
import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Projects from '@/components/sections/Projects'
import SystemOverview from '@/components/sections/SystemOverview'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Chatbot from '@/components/ui/Chatbot'

const Loader = dynamic(() => import('@/components/loader/Loader'), { ssr: false })

export default function Page() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <div className="app-shell">
          <TopNav />
          <main className="main-content">
            <Hero />
            <FeaturedProjects />
            <Projects />
            <SystemOverview />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Chatbot />
        </div>
      )}
    </>
  )
}
