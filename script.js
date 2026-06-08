// ── LOADER ──
const loaderPct = document.getElementById('loader-pct');
let pct = 0;
const loaderInt = setInterval(() => {
  pct = Math.min(pct + Math.random() * 12, 99);
  loaderPct.textContent = Math.floor(pct) + '%';
}, 80);
window.addEventListener('load', () => {
  clearInterval(loaderInt);
  loaderPct.textContent = '100%';
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => { if (loader.parentNode) loader.remove(); }, 500);
    }
  }, 400);
});

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
const mouseGrad = document.getElementById('mouse-gradient');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  mouseGrad.style.left = mx + 'px'; mouseGrad.style.top = my + 'px';
});
function animCursor() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.skill-card,.project-card,.service-card,.blog-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorRing.style.width = '52px'; cursorRing.style.height = '52px'; cursorRing.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; cursorRing.style.opacity = '1';
  });
});

// ── TYPED EFFECT ──
const phrases = ['Web Developer 💻', 'Educator & Mentor 📚', 'WordPress Expert 🔷', 'Database Designer 🗄️', 'Problem Solver 🧩'];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
setTimeout(typeLoop, 1200);

// ── NAV SCROLL ──
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backTop.classList.toggle('visible', window.scrollY > 400);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// ── SKILL BARS ──
const skillBars = document.querySelectorAll('.skill-bar');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.width = e.target.dataset.width + '%'; barObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
skillBars.forEach(b => barObs.observe(b));

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(p * target) + (target >= 100 ? '+' : '');
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target + '+';
  }
  requestAnimationFrame(update);
}
const counters = document.querySelectorAll('.stat-num[data-target]');
const cObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); cObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
counters.forEach(c => cObs.observe(c));

// ── EXPERIENCE TIMELINE ──
const expItems = document.querySelectorAll('.exp-item');
const expObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 120); }
  });
}, { threshold: 0.2 });
expItems.forEach(el => expObs.observe(el));

// ── TILT EFFECT ──
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ── TESTIMONIAL CAROUSEL ──
let slide = 0;
const track = document.getElementById('testi-track');
const dots = document.querySelectorAll('.testi-dot');
function goToSlide(n) {
  slide = n;
  track.style.transform = `translateX(-${n * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === n));
}
setInterval(() => goToSlide((slide + 1) % 3), 4500);

// ── CONTACT FORM ──
const formSubmitBtn = document.getElementById('form-submit');
formSubmitBtn.addEventListener('click', function () {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg = document.getElementById('f-msg').value.trim();
  if (!name || !email || !msg) {
    this.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
    setTimeout(() => { this.style.background = ''; }, 1000);
    return;
  }
  this.textContent = 'Sending...';
  this.disabled = true;
  setTimeout(() => {
    this.style.display = 'none';
    const successEl = document.getElementById('form-success');
    if (successEl) successEl.classList.add('show');
    ['f-name', 'f-email', 'f-subject', 'f-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }, 1200);
});

// ── RIPPLE ──
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;position:absolute;border-radius:50%;`;
    btn.appendChild(r);
    setTimeout(() => { if (r.parentNode) r.remove(); }, 700);
  });
});

// ── LIGHT/DARK MODE ──
const dlBtn = document.getElementById('dark-light-btn');
dlBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  dlBtn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});
document.getElementById('theme-handle').addEventListener('click', () => {
  document.getElementById('theme-panel').classList.toggle('open');
});

// ── VISITOR COUNTER ──
try {
  const visits = parseInt(localStorage.getItem('hw_visits') || '1203', 10) + 1;
  localStorage.setItem('hw_visits', visits);
  const vcEl = document.getElementById('visitor-count');
  if (vcEl) vcEl.textContent = visits.toLocaleString() + ' visitors';
} catch (e) {
  // localStorage may be unavailable in private browsing — fail silently
}

// ── TOUCH SWIPE for projects ──
const pGrid = document.getElementById('projects-grid');
let touchStartX = 0, touchStartY = 0;
pGrid.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });
pGrid.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
  if (Math.abs(dx) > 60 && dy < 50) { pGrid.scrollBy({ left: -dx, behavior: 'smooth' }); }
}, { passive: true });

// ── DOWNLOAD CV ──
document.getElementById('dl-cv').addEventListener('click', e => {
  e.preventDefault();
  const a = document.createElement('a');
  a.href = 'data:text/plain;charset=utf-8,Harris%20Wregbo%20CV%20-%20Web%20Developer%20%7C%20Educator';
  a.download = 'Harris_Wregbo_CV.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});