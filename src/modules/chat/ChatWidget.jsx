import React, { useEffect, useMemo, useRef, useState } from 'react'
import kbData from './kb.json'
import { rankAnswers } from './fuzzy'

const FN_PATH = '/api/chat' // mapped to Netlify function via redirect

export default function ChatWidget(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Բարև։ Ես Աննայի պորտֆոլիո բոտն եմ։ Հարցրու որևէ բան Աննայի փորձի, հմտությունների կամ նախագծերի մասին։' }
  ])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(() => { listRef.current?.scrollTo(0, listRef.current.scrollHeight) }, [messages])

  async function send(){
    const text = input.trim()
    if(!text) return
    const userMsg = { role: 'user', content: text }
    setMessages(m => [...m, userMsg])
    setInput('')

    // Try online first, else fallback to offline KB
    try {
      const res = await fetch(FN_PATH, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], kb: getMergedFacts() })
      })
      if(!res.ok) throw new Error('offline')
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.answer }])
    } catch {
      const best = rankAnswers(text, kbData.concat(getLocalFacts()))
      const answer = best?.answer || "Չեմ գտնում այդ մասին իմ գիտելիքներում։ Կարամ պատմել Աննայի հմտությունների, գործիքների, փորձի ու demo-ների մասին։"
      setMessages(m => [...m, { role: 'assistant', content: answer }])
    }
  }

  function getLocalFacts(){
    try { return JSON.parse(localStorage.getItem('anna_kb_extra') || '[]') } catch { return [] }
  }
  function saveLocalFact(q, a){
    const arr = getLocalFacts(); arr.unshift({ question: q, answer: a }); localStorage.setItem('anna_kb_extra', JSON.stringify(arr))
  }
  function getMergedFacts(){ return [...kbData, ...getLocalFacts()] }

  return (
    <>
      <button onClick={() => setOpen(v => !v)} className="fixed bottom-5 right-5 z-50 rounded-full px-5 py-3 bg-sky-500 text-ink font-semibold shadow-glow hover:bg-sky-400">
        {open ? 'Close Chat' : 'Chat with Anna AI'}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[min(92vw,420px)] h-[min(70vh,560px)] glass border border-white/10 rounded-2xl shadow-glow flex flex-col">
          <header className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <strong>Anna — Portfolio Chat</strong>
            <Teach onSave={saveLocalFact} />
          </header>
          <div ref={listRef} className="flex-1 overflow-auto px-4 py-3 space-y-2">
            {messages.map((m,i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={'inline-block px-3 py-2 rounded-2xl ' + (m.role === 'user' ? 'bg-white/10' : 'bg-white/5')}>{m.content}</div>
              </div>
            ))}
          </div>
          <footer className="p-3 border-t border-white/10 flex gap-2">
            <input className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2" placeholder="Ask about skills, projects, availability…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} />
            <button onClick={send} className="px-4 py-2 rounded-xl bg-sky-500 text-ink font-semibold hover:bg-sky-400">Send</button>
          </footer>
        </div>
      )}
    </>
  )
}

function Teach({ onSave }){
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('What is Anna especially good at?')
  const [a, setA] = useState('Anna specializes in GSAP/ScrollTrigger and accessible animation systems.')
  return (
    <div className="relative">
      <button onClick={()=>setOpen(v=>!v)} className="text-xs px-3 py-1 rounded-lg border border-white/15 hover:border-white/30">Teach</button>
      {open && (
        <div className="absolute right-0 top-10 w-[min(92vw,360px)] glass border border-white/10 rounded-xl p-3 space-y-2">
          <div className="text-xs text-slate-300">Add a Q→A so the bot learns about you (saved in this browser).</div>
          <input className="w-full rounded-lg bg-white/5 border border-white/10 px-2 py-1" placeholder="Question" value={q} onChange={e=>setQ(e.target.value)} />
          <textarea className="w-full rounded-lg bg-white/5 border border-white/10 px-2 py-2 min-h-[80px]" placeholder="Answer" value={a} onChange={e=>setA(e.target.value)} />
          <div className="flex justify-end gap-2">
            <button onClick={()=>setOpen(false)} className="text-xs px-3 py-1 rounded-lg border border-white/15">Close</button>
            <button onClick={()=>{ onSave(q,a); setOpen(false) }} className="text-xs px-3 py-1 rounded-lg bg-sky-500 text-ink font-semibold">Save</button>
          </div>
        </div>
      )}
    </div>
  )
}
