import Swup from 'https://unpkg.com/swup@4?module';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const overlay = document.getElementById('overlay');

const swup = new Swup({ animateHistoryBrowsing: true });

function enter() {
  if (reduced) return;
  overlay.style.transform = 'translateY(0%)';
  return gsap.to(overlay, { yPercent: 100, duration: 0.6, ease: 'power3.inOut' });
}
function leave() {
  if (reduced) return;
  return gsap.to(overlay, { yPercent: 0, duration: 0.5, ease: 'power3.inOut' });
}

swup.hooks.on('willNavigate', async () => { await leave(); });
swup.hooks.on('page:view', async () => { await enter(); });
// initial reveal
enter();
