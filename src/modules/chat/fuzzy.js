// Better fuzzy ranking with stopwords & Armenian stemming-lite
const STOP = new Set([
  'the','a','an','and','or','of','to','for','about','tell','me','please','in','on','at','is','are','do','does','what',
  'ասա','խնդրում','մասին','ո','ը','է','եմ','ենք','եք','են','ինչ','որ','թե','մասինն'
]);

const SYN = {
  skills: ['skills','skill','stack','tech','technology','technologies','tools','հմտ','հմտություն','գիտելիք','ստեք','ստեկ'],
  projects: ['projects','project','cases','work','դեպքեր','նախագիծ','նախագծեր','քեյս','քեյսեր'],
  exp: ['experience','exp','background','փորձ','ստաժ'],
};

export function rankAnswers(query, pairs){
  const qTokens = norm(query);
  // quick intents
  if (hasAny(qTokens, SYN.skills)) {
    const hit = pairs.find(p => /skills|հմտ/i.test(p.question));
    if (hit) return hit;
  }
  const scored = pairs.map(p => ({ p, s: sim(qTokens, norm(p.question)) }));
  scored.sort((a,b)=>b.s-a.s);
  return scored[0]?.p;
}

function hasAny(tokens, list){ return tokens.some(t => list.includes(t)); }

function norm(s){
  return (s||'').toLowerCase()
    .replace(/[^a-z0-9Ա-֏\s]/gi,' ')
    .split(/\s+/).filter(Boolean)
    .map(t => stem(t)).filter(t => !STOP.has(t));
}

function stem(t){
  // super light Armenian stems
  t = t.replace(/ները$|ներ$|ից$|ում$|ին$|ը$|ի$|ն$/,''); // plural/case endings
  return t;
}

function sim(aTokens, bTokens){
  const a = new Set(aTokens), b = new Set(bTokens);
  let overlap = 0;
  for(const t of a){ if(b.has(t)) overlap++; }
  const denom = Math.sqrt(a.size*b.size) || 1;
  return overlap/denom;
}
