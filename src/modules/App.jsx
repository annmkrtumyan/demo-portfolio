import React, { useEffect } from 'react'
import Hero from './Hero'
import Work from './Work'
import Skills from './Skills'
import About from './About'
import Contact from './Contact'
import ChatWidget from './chat/ChatWidget'
import { gsap } from 'gsap'

export default function App(){
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    gsap.set('.reveal', { y: 16, opacity: 0 })
    gsap.to('.reveal', { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.1 })
  }, [])

  return (
    <div className="min-h-screen grad">
      <Header />
      <main>
        <Hero />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

function Header(){
  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <a className="flex items-center gap-3" href="#top">
        <span className="inline-grid place-items-center w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/30 font-bold">AM</span>
        <span className="font-semibold tracking-wide">Anna Mkrtumyan</span>
      </a>
      <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
        <a className="hover:text-white" href="#work">Work</a>
        <a className="hover:text-white" href="#skills">Skills</a>
        <a className="hover:text-white" href="#about">About</a>
        <a className="hover:text-white" href="#contact">Contact</a>
      </nav>
    </header>
  )
}

function Footer(){
  return (
    <footer className="max-w-6xl mx-auto px-6 pb-10 text-sm text-slate-400">
      <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Anna Mkrtumyan — MIT</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-white" href="https://portfolio-anna-mkrtumyan.netlify.app/" target="_blank" rel="noreferrer">Portfolio</a>
          <a className="hover:text-white" href="mailto:YOUR_EMAIL">Contact</a>
        </div>
      </div>
    </footer>
  )
}
