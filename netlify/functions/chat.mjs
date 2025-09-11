import OpenAI from 'openai'

export const config = { path: '/api/chat' }

export default async (req, res) => {
  try {
    const body = JSON.parse(req.body || '{}')
    const { messages = [], kb = [], langHint = 'en' } = body

    const instructions = `You are Anna's portfolio assistant. Answer only about Anna and her work.
Use the FACTS below for grounding. If you do not find an answer in FACTS, say you don't know and suggest contacting Anna.
Be concise, friendly, and bilingual if the user writes Armenian. If langHint=hy, reply in Armenian; otherwise in English.`

    const facts = kb.map((p, i) => `Q${i+1}: ${p.question}\nA${i+1}: ${p.answer}`).join('\n')

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const userText = messages.filter(m => m.role === 'user').map(m => m.content).slice(-1)[0] || ""

    const resp = await client.responses.create({
      model: 'gpt-4o-mini',
      instructions,
      input: [
        { role: 'developer', content: `FACTS:\n${facts}` },
        { role: 'user', content: userText }
      ]
    })

    const answer = (resp.output_text || '').trim() || "Sorry, I couldn't generate an answer."
    res.status(200).json({ answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
