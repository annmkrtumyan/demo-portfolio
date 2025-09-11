// Tiny fuzzy ranking: token overlap + length penalty
export function rankAnswers(query, pairs){
  const q = norm(query)
  let best = null, bestScore = 0
  for(const p of pairs){
    const score = sim(q, norm(p.question))
    if(score > bestScore){ best = p; bestScore = score }
  }
  return best
}
function norm(s){ return (s||'').toLowerCase().replace(/[^a-z0-9а-яёևքօըՁԱ-ֆ\s]/gi,' ').split(/\s+/).filter(Boolean) }
function sim(aTokens, bTokens){
  const a = new Set(aTokens), b = new Set(bTokens)
  let overlap = 0
  for(const t of a){ if(b.has(t)) overlap++ }
  const denom = Math.sqrt(a.size*b.size) || 1
  return overlap/denom
}
