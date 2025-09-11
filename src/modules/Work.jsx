import React from 'react'

const projects = [
  {
    title: "GSAP Motion Lab",
    year: "2025",
    tags: ["GSAP", "ScrollTrigger", "Swup"],
    blurb: "A set of production-style motion demos: parallax, pinned panels, micro-interactions, and page transitions.",
    link: "./demos/index.html"
  },
  {
    title: "Headless WP + Next",
    year: "2024",
    tags: ["Next.js", "WordPress", "SSR"],
    blurb: "Marketing site with headless WP, incremental static revalidation, and choreographed Lottie + GSAP.",
    link: "#"
  },
  {
    title: "Design System Motions",
    year: "2024",
    tags: ["Design Tokens", "GSAP"],
    blurb: "A catalog of motion tokens and reusable, accessible interaction primitives.",
    link: "#"
  }
]

export default function Work(){
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 pb-16">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-semibold">Selected work</h2>
        <div className="text-sm text-slate-400">More on request</div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
          <a key={idx} href={p.link} className="group block rounded-2xl border border-white/10 glass p-5 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400">
            <div className="text-xs uppercase tracking-wide text-slate-400">{p.year}</div>
            <h3 className="mt-1 font-semibold text-lg group-hover:text-white">{p.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{p.blurb}</p>
            <div className="mt-3 flex gap-2 text-[11px] text-slate-300 flex-wrap">
              {p.tags.map(t => <span key={t} className="px-2 py-1 rounded-full bg-white/10">{t}</span>)}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
