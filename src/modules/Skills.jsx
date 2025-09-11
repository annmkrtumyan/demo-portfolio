import React from 'react'

const skills = [
  { name: "GSAP / ScrollTrigger", level: 5 },
  { name: "Swup / Barba.js", level: 4 },
  { name: "Tailwind / CSS", level: 5 },
  { name: "React / Vite", level: 4 },
  { name: "WordPress (headless)", level: 4 },
  { name: "Accessibility (WCAG)", level: 4 },
]

export default function Skills(){
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      <ul className="grid md:grid-cols-2 gap-3">
        {skills.map((s) => (
          <li key={s.name} className="flex items-center justify-between rounded-xl border border-white/10 glass px-4 py-3">
            <span>{s.name}</span>
            <Meter value={s.level} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Meter({ value }){
  return (
    <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden">
      <div style={{ width: `${(value/5)*100}%` }} className="h-full bg-sky-400"></div>
    </div>
  )
}
