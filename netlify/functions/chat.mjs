import OpenAI from 'openai';

export async function handler(event) {
  try {
    const { messages = [], kb = [], langHint = 'en' } = JSON.parse(event.body || '{}');

    const instructions =
`You are Anna's portfolio assistant. Answer ONLY about Anna and her work using FACTS.
If the answer isn't in FACTS, say you don't know and suggest contacting Anna.
Be concise and friendly. If langHint=hy reply in Armenian; otherwise reply in English.`;

    const facts = kb.map((p, i) => `Q${i+1}: ${p.question}\nA${i+1}: ${p.answer}`).join('\n');

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const userText = messages.filter(m => m.role === 'user').map(m => m.content).pop() || '';

    const resp = await client.responses.create({
      model: 'gpt-4o-mini',
      instructions,
      input: [
        { role: 'developer', content: `FACTS:\n${facts}` },
        { role: 'user', content: userText },
        { role: 'system', content: `langHint=${langHint}` }
      ]
    });

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ answer: (resp.output_text || '').trim() })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Server error', detail: String(err && err.message || err) })
    };
  }
}
