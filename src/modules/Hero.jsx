import React, { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Hero(){
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    gsap.fromTo('.blob1', { y: 20, x: -10 }, { y: -20, x: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.fromTo('.blob2', { y: -10, x: 20 }, { y: 20, x: -20, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-16 md:pt-10 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="reveal text-4xl md:text-6xl font-extrabold leading-tight">
              Motion‑first front‑end.<br/>Built for <span className="text-sky-400">60fps</span> & accessibility.
            </h1>
            <p className="reveal mt-4 text-slate-300 max-w-xl">
              I design & ship production UI with <strong>GSAP</strong>, <strong>ScrollTrigger</strong>, and <strong>Tailwind</strong> — from hero scenes & page transitions to micro‑interactions.
            </p>
            <div className="reveal mt-6 flex flex-wrap gap-3">
              <a href="#work" className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold transition">See work</a>
              <a href="#contact" className="px-5 py-3 rounded-2xl glass border border-white/10 hover:border-white/20">Contact</a>
            </div>
          </div>
          <div className="relative">
            <div className="h-64 md:h-80 rounded-[28px] glass border border-white/10 shadow-glow p-1">
              <div className="h-full w-full rounded-[24px] bg-gradient-to-br from-sky-500/20 via-fuchsia-500/10 to-indigo-500/20"></div>
            </div>
            <div className="blob1 absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-sky-400/20 blur-xl"></div>
            <div className="blob2 absolute -top-8 -right-8 w-32 h-32 rounded-full bg-fuchsia-400/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
