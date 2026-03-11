/* ── CUSTOM CURSOR ───────────────────────────── */
const cur = document.getElementById('cursor');
const curR = document.getElementById('cursor-ring');
let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  rx += (mx - rx) * .18; ry += (my - ry) * .18;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  curR.style.left = rx + 'px'; curR.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a,.badge,.link-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hover'); curR.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); curR.classList.remove('hover'); });
});


/* ── CANVAS BACKGROUND ───────────────────────── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const stars = Array.from({ length: 180 }, () => ({
  x: Math.random(), y: Math.random(),
  r: Math.random() * .9 + .2, a: Math.random(),
  twinkle: Math.random() * Math.PI * 2, speed: Math.random() * .3 + .05
}));

const orbs = Array.from({ length: 5 }, () => ({
  x: Math.random(), y: Math.random(),
  r: Math.random() * 200 + 80,
  vx: (Math.random() - .5) * .0008, vy: (Math.random() - .5) * .0008,
  hue: Math.random() < .5 ? '123,47,255' : '232,121,249',
  alpha: Math.random() * .12 + .04
}));

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random(), y: Math.random() + .5,
  r: Math.random() * 1.5 + .5,
  vy: -(Math.random() * .0006 + .0002),
  vx: (Math.random() - .5) * .0003,
  alpha: Math.random() * .7 + .2, life: Math.random()
}));

let tick = 0;

function drawBG() {
  ctx.clearRect(0, 0, W, H);

  // Radial gradient base
  const g = ctx.createRadialGradient(W * .4, H * .3, 0, W * .4, H * .3, W * .9);
  g.addColorStop(0, 'rgba(60,10,120,.55)');
  g.addColorStop(.5, 'rgba(20,5,50,.4)');
  g.addColorStop(1, 'rgba(5,1,15,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // Floating orbs
  orbs.forEach(o => {
    o.x += o.vx; o.y += o.vy;
    if (o.x < 0) o.x = 1; if (o.x > 1) o.x = 0;
    if (o.y < 0) o.y = 1; if (o.y > 1) o.y = 0;
    const og = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r);
    og.addColorStop(0, `rgba(${o.hue},${o.alpha})`);
    og.addColorStop(1, `rgba(${o.hue},0)`);
    ctx.fillStyle = og; ctx.beginPath(); ctx.arc(o.x * W, o.y * H, o.r, 0, Math.PI * 2); ctx.fill();
  });

  // Stars
  stars.forEach(s => {
    s.twinkle += s.speed * .04;
    const a = s.a * (.5 + .5 * Math.sin(s.twinkle));
    ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,200,255,${a})`; ctx.fill();
  });

  // Rising particles
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.life += .004;
    if (p.y < -.02 || p.life > 1) { p.y = 1.02; p.x = Math.random(); p.life = 0; }
    if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
    ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,130,252,${p.alpha * (1 - p.life)})`; ctx.fill();
  });

  // Scan line
  const sy = (tick % H);
  const sg = ctx.createLinearGradient(0, sy - 40, 0, sy + 40);
  sg.addColorStop(0, 'rgba(168,85,247,0)');
  sg.addColorStop(.5, 'rgba(168,85,247,.025)');
  sg.addColorStop(1, 'rgba(168,85,247,0)');
  ctx.fillStyle = sg; ctx.fillRect(0, sy - 40, W, 80);
  tick += .5;

  requestAnimationFrame(drawBG);
}
drawBG();


/* ── INTRO PARTICLES ─────────────────────────── */
const introP = document.getElementById('intro-particles');
for (let i = 0; i < 30; i++) {
  const s = document.createElement('span');
  const sz = Math.random() * 4 + 2;
  s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;bottom:${Math.random() * 20}%;animation-duration:${Math.random() * 3 + 2}s;animation-delay:${Math.random() * 2}s;`;
  introP.appendChild(s);
}
setTimeout(() => document.getElementById('intro-overlay').classList.add('hide'), 2400);


/* ── CARD + STAGGERED REVEALS ────────────────── */
const card = document.getElementById('main-card');
setTimeout(() => {
  card.classList.add('visible');
  document.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 90));
}, 2700);


/* ── TYPING NAME ─────────────────────────────── */
const nameEl = document.getElementById('name-el');
const fullName = 'MA | 7CHICH';
let ni = 0;
setTimeout(() => {
  const t = setInterval(() => {
    nameEl.textContent += fullName[ni++];
    if (ni >= fullName.length) clearInterval(t);
  }, 80);
}, 2900);


/* ── RIPPLE ON LINK CLICK ────────────────────── */
document.querySelectorAll('.link-item').forEach(link => {
  link.addEventListener('click', function (e) {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(r);
    setTimeout(() => r.remove(), 650);
  });
});


/* ── CARD 3D TILT ────────────────────────────── */
card.addEventListener('mousemove', e => {
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  card.style.transition = 'transform .1s ease';
  card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
});
card.addEventListener('mouseleave', () => {
  card.style.transition = 'transform .5s ease';
  card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
});


/* ── BADGE PARTICLE BURST ────────────────────── */
document.querySelectorAll('.badge').forEach(badge => {
  badge.addEventListener('mouseenter', function () {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('span');
      const angle = (i / 8) * Math.PI * 2;
      const dist = Math.random() * 28 + 18;
      p.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;background:var(--neon-bright);pointer-events:none;left:50%;top:50%;transition:transform .5s ease,opacity .5s ease;opacity:1;z-index:10;`;
      this.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px) scale(0)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 520);
    }
  });
});