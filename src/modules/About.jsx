import React from 'react'

export default function About(){
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-semibold mb-4">About</h2>
      <div className="rounded-2xl border border-white/10 glass p-5 leading-relaxed text-slate-300">
        <p>
          I’m a motion‑first front‑end engineer focused on accessible web animation. I build clean, high‑performance UI
          using GSAP+ScrollTrigger, Swup page transitions, and robust CSS with Tailwind. Content flows are keyboard‑friendly
          and honor <code>prefers-reduced-motion</code>.
        </p>
        <p className="mt-3">
          Outside of work, I like exploring micro‑interaction patterns, choreographing SVG/Lottie sequences, and experimenting with
          smart prefetching for silky navigation.
        </p>
      </div>
    </section>
  )
}
