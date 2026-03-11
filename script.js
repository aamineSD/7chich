/* ── DETECT WEAK DEVICE ── */
const isWeak = (navigator.hardwareConcurrency || 4) <= 4 ||
               /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

/* ── CANVAS BACKGROUND ── */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d', { alpha: false });
let W, H, vW, vH;

function resize() {
  vW = window.innerWidth; vH = window.innerHeight;
  const dpr = isWeak ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width  = vW * dpr; canvas.height = vH * dpr;
  canvas.style.width = vW + 'px'; canvas.style.height = vH + 'px';
  ctx.scale(dpr, dpr);
  W = vW; H = vH;
}
resize();
let rTimer;
window.addEventListener('resize', () => { clearTimeout(rTimer); rTimer = setTimeout(resize, 250); });

const SC = isWeak ? 55  : 130;
const OC = isWeak ? 2   : 4;
const PC = isWeak ? 18  : 45;

const stars = Array.from({length:SC}, () => ({
  x:Math.random(), y:Math.random(), r:Math.random()*.8+.2,
  a:Math.random()*.8+.2, tw:Math.random()*Math.PI*2, sp:Math.random()*.18+.03
}));
const orbs = Array.from({length:OC}, () => ({
  x:Math.random(), y:Math.random(), r:Math.random()*180+80,
  vx:(Math.random()-.5)*.0005, vy:(Math.random()-.5)*.0005,
  hue:Math.random()<.5?'123,47,255':'232,121,249', alpha:Math.random()*.1+.04
}));
const parts = Array.from({length:PC}, () => ({
  x:Math.random(), y:Math.random()+.3, r:Math.random()*1.2+.3,
  vy:-(Math.random()*.0005+.00015), vx:(Math.random()-.5)*.0002,
  a:Math.random()*.6+.2, life:Math.random()
}));

let tick=0, lastFrame=0;
const FPS = isWeak ? 1000/22 : 1000/60;

function drawBG(now) {
  requestAnimationFrame(drawBG);
  if (now - lastFrame < FPS) return;
  lastFrame = now;

  ctx.fillStyle = '#05010f';
  ctx.fillRect(0, 0, W, H);

  orbs.forEach(o => {
    o.x += o.vx; o.y += o.vy;
    if(o.x<0)o.x=1; if(o.x>1)o.x=0; if(o.y<0)o.y=1; if(o.y>1)o.y=0;
    const g = ctx.createRadialGradient(o.x*W,o.y*H,0,o.x*W,o.y*H,o.r);
    g.addColorStop(0, `rgba(${o.hue},${o.alpha})`);
    g.addColorStop(1, `rgba(${o.hue},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x*W,o.y*H,o.r,0,Math.PI*2); ctx.fill();
  });

  stars.forEach(s => {
    s.tw += s.sp * .04;
    const a = s.a * (.5 + .5*Math.sin(s.tw));
    ctx.globalAlpha = a;
    ctx.fillStyle = '#dcc8ff';
    ctx.beginPath(); ctx.arc(s.x*W, s.y*H, s.r, 0, Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha = 1;

  parts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.life += .004;
    if(p.y < -.02 || p.life > 1) { p.y=1.02; p.x=Math.random(); p.life=0; }
    if(p.x<0)p.x=1; if(p.x>1)p.x=0;
    ctx.globalAlpha = p.a * (1 - p.life);
    ctx.fillStyle = '#c882fc';
    ctx.beginPath(); ctx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha = 1;

  if (!isWeak) {
    const sy = tick % H;
    const sg = ctx.createLinearGradient(0, sy-35, 0, sy+35);
    sg.addColorStop(0, 'rgba(168,85,247,0)');
    sg.addColorStop(.5,'rgba(168,85,247,.022)');
    sg.addColorStop(1, 'rgba(168,85,247,0)');
    ctx.fillStyle = sg; ctx.fillRect(0, sy-35, W, 70);
  }
  tick += .5;
}
requestAnimationFrame(drawBG);

/* ── INTRO PARTICLES ── */
const introP = document.getElementById('intro-particles');
const dotCount = isWeak ? 12 : 28;
for(let i=0; i<dotCount; i++) {
  const s = document.createElement('span');
  const sz = Math.random()*4+2;
  s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:${Math.random()*20}%;animation-duration:${Math.random()*3+2}s;animation-delay:${Math.random()*2}s;`;
  introP.appendChild(s);
}
setTimeout(() => document.getElementById('intro-overlay').classList.add('hide'), 2400);

/* ── CARD + REVEALS ── */
const card = document.getElementById('main-card');
setTimeout(() => {
  card.classList.add('visible');
  document.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 85));
}, 2700);

/* ── TYPING NAME ── */
const nameEl = document.getElementById('name-el');
const fullName = 'MA | 7CHICH';
let ni = 0;
setTimeout(() => {
  const t = setInterval(() => {
    nameEl.textContent += fullName[ni++];
    if(ni >= fullName.length) clearInterval(t);
  }, 80);
}, 2900);

/* ── RIPPLE ── */
document.querySelectorAll('.link-item').forEach(link => {
  link.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size/2) + 'px';
    r.style.top  = (e.clientY - rect.top  - size/2) + 'px';
    this.appendChild(r);
    setTimeout(() => r.remove(), 650);
  });
});

/* ── BADGE BURST (desktop only) ── */
if (!isWeak) {
  document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      for(let i=0; i<8; i++) {
        const p = document.createElement('span');
        const angle = (i/8)*Math.PI*2;
        const dist  = Math.random()*26+16;
        p.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;background:var(--neon-bright);pointer-events:none;left:50%;top:50%;transition:transform .5s ease,opacity .5s ease;opacity:1;z-index:10;`;
        this.appendChild(p);
        requestAnimationFrame(() => {
          p.style.transform = `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) scale(0)`;
          p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), 520);
      }
    });
  });
}

/* ── VISIT COUNTER ── */
try {
  const visitEl = document.getElementById('visit-count');
  if (visitEl) {
    let count = parseInt(localStorage.getItem('7chich_visits') || '0', 10);
    count++;
    localStorage.setItem('7chich_visits', count);
    visitEl.textContent = count;
  }
} catch(e) {}