/* ============================================================
   GUJARAT ADVENTURE 2025 — script.js
   Single file for index.html + all destination pages
   ============================================================ */
'use strict';

// ── Trip Data ─────────────────────────────────────────────────
const TRIP = {
  trains: [
    { num: '19217', name: 'Saurashtra Janta Express', from: 'Bandra Terminus', to: 'Junagadh', dep: '1:45 PM', arr: '4:45 AM+1', cls: 'Sleeper (SL)', fare: 440 },
    { num: '12972', name: 'BVC–BDTS SF Express', from: 'Songadh', to: 'Ahmedabad', dep: '7:06 PM', arr: '11:25 PM', cls: 'Sleeper (SL)', fare: 220 },
    { num: '20947', name: 'Jan Shatabdi Express', from: 'Ahmedabad', to: 'Ekta Nagar', dep: '7:55 AM', arr: '11:30 AM', cls: '2nd Sitting (2S)', fare: 120 },
    { num: '12928', name: 'EKNR–DDR SF Express', from: 'Ekta Nagar', to: 'Dadar', dep: '9:28 PM', arr: '5:30 AM+1', cls: 'Sleeper (SL)', fare: 475 },
  ],
  budget: [
    { icon: '🚆', name: 'Train Fares', perPerson: 1255, group: 3765, pct: 12.8, color: '#c9943a' },
    { icon: '🚗', name: 'Road Transport', perPerson: 2467, group: 7400, pct: 25.2, color: '#e8c06a' },
    { icon: '🏨', name: 'Accommodation', perPerson: 1434, group: 3300, pct: 10.6, color: '#a8d5b5' },
    { icon: '🎟️', name: 'Activities & Entry', perPerson: 1960, group: 5880, pct: 20.0, color: '#88c0e8' },
    { icon: '🍽️', name: 'Food & Misc', perPerson: 3370, group: 10110, pct: 31.4, color: '#e88ab0' },
  ],
  timeline: [
    { day: 1, date: 'Tue, 16 Jun', dest: 'Mumbai → Junagadh', tags: ['Overnight Train', '19217 Express'], link: null },
    { day: 2, date: 'Wed, 17 Jun', dest: 'Junagadh · Girnar', tags: ['Girnar Trek', '~9,999 Steps', 'Dharamshala'], link: 'junagadh.html' },
    { day: 3, date: 'Thu, 18 Jun', dest: 'Gir · Somnath · Palitana', tags: ['Jungle Safari', 'Somnath Temple', 'Road Trip'], link: 'gir.html' },
    { day: 4, date: 'Fri, 19 Jun', dest: 'Palitana', tags: ['Rest Day', 'Explore Bazaar', 'Prepare Trek'], link: 'palitana.html' },
    { day: 5, date: 'Sat, 20 Jun', dest: 'Palitana → Ahmedabad', tags: ['Palitana Trek', '3,800 Steps', 'Manek Chowk'], link: 'palitana.html' },
    { day: 6, date: 'Sun, 21 Jun', dest: 'Ahmedabad Sightseeing', tags: ['Sabarmati Ashram', 'Adalaj Stepwell', 'Akshardham'], link: 'ahmedabad.html' },
    { day: 7, date: 'Mon, 22 Jun', dest: 'Ahmedabad Heritage', tags: ['Sidi Saiyyed Mosque', 'Heritage Walk', 'CG Road'], link: 'ahmedabad.html' },
    { day: 8, date: 'Tue, 23 Jun', dest: 'Ekta Nagar', tags: ['Statue of Unity', 'Valley of Flowers', 'Night Train'], link: 'ekta-nagar.html' },
    { day: 9, date: 'Wed, 24 Jun', dest: 'Dadar, Mumbai 🎉', tags: ['Trip Complete!', 'Home Sweet Home'], link: null },
  ],
  gallery: [
    { src: 'images/junagadh-girnar.png', label: 'Girnar Hills', dest: 'Junagadh', link: 'junagadh.html' },
    { src: 'images/gir-lion.png', label: 'Asiatic Lion', dest: 'Gir Forest', link: 'gir.html' },
    { src: 'images/somnath-temple.png', label: 'Somnath Temple', dest: 'Somnath', link: 'somnath.html' },
    { src: 'images/palitana-temples.png', label: 'Jain Temples', dest: 'Palitana', link: 'palitana.html' },
    { src: 'images/ahmedabad-adalaj.png', label: 'Adalaj Stepwell', dest: 'Ahmedabad', link: 'ahmedabad.html' },
    { src: 'images/ekta-statue.png', label: 'Statue of Unity', dest: 'Ekta Nagar', link: 'ekta-nagar.html' },
    { src: 'images/junagadh-city.png', label: 'Junagadh City', dest: 'Junagadh', link: 'junagadh.html' },
    { src: 'images/gir-park.png', label: 'Gir National Park', dest: 'Gir Forest', link: 'gir.html' },
    { src: 'images/ahmedabad-sabarmati.png', label: 'Sabarmati Riverfront', dest: 'Ahmedabad', link: 'ahmedabad.html' },
    { src: 'images/ekta-valley.png', label: 'Valley of Flowers', dest: 'Ekta Nagar', link: 'ekta-nagar.html' },
    { src: 'images/palitana-jain.png', label: 'Marble Temples', dest: 'Palitana', link: 'palitana.html' },
    { src: 'images/ahmedabad-sidi.png', label: 'Sidi Saiyyed Mosque', dest: 'Ahmedabad', link: 'ahmedabad.html' },
  ],
};

// ── Helpers ───────────────────────────────────────────────────
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Scroll Progress ───────────────────────────────────────────
function initScrollProgress() {
  function update() {
    const s = window.scrollY;
    const t = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--scroll-progress', t > 0 ? (s/t*100)+'%' : '0%');
  }
  window.addEventListener('scroll', update, { passive: true });
}

// ── Sticky Nav ────────────────────────────────────────────────
function initNav() {
  const nav = $('#nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu
  const menuBtn = $('#nav-menu-btn');
  const mobileMenu = $('#mobile-menu');
  const closeBtn = $('#mobile-close');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    closeBtn && closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
    // Close on link click
    $$('.mob-link', mobileMenu).forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }
}

// ── Lightbox ──────────────────────────────────────────────────
function initLightbox() {
  const lb = $('#lightbox');
  if (!lb) return;
  const img = lb.querySelector('img');
  const close = $('#lightbox-close');
  lb.addEventListener('click', e => { if (e.target === lb || e.target === close) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}
window.openLightbox = function(src) {
  const lb = $('#lightbox');
  if (!lb) return;
  lb.querySelector('img').src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeLightbox = function() {
  const lb = $('#lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
};

// ── Scroll Reveal ─────────────────────────────────────────────
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Animate budget bars when visible
        if (e.target.closest('#budget')) animateBudgetBars();
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('.scroll-reveal, .scroll-reveal-stagger').forEach(el => obs.observe(el));
}

// ── Hero Slideshow ────────────────────────────────────────────
function initHeroSlideshow() {
  const container = $('#hero-slideshow');
  if (!container) return;
  const slides = [
    'images/ekta-statue.png',
    'images/somnath-temple.png',
    'images/gir-lion.png',
    'images/palitana-temples.png',
    'images/ahmedabad-sabarmati.png',
  ];
  slides.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'hero-slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url('${src}')`;
    container.appendChild(div);
  });
  let idx = 0;
  setInterval(() => {
    const all = $$('.hero-slide');
    all[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    all[idx].classList.add('active');
  }, 5000);
}

// ── Hero Particles ────────────────────────────────────────────
function initParticles() {
  const container = $('#hero-particles');
  if (!container) return;
  const symbols = ['✈', '🌄', '🦁', '🏔️', '🌊', '🛕', '🌸', '⛰️'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `left:${Math.random()*100}%;top:${60+Math.random()*35}%;font-size:${0.7+Math.random()*0.9}rem;--duration:${4+Math.random()*6}s;--delay:${Math.random()*5}s;--max-opacity:${0.2+Math.random()*0.35};`;
    container.appendChild(p);
  }
}

// ── Counter Animation ─────────────────────────────────────────
function initCounters() {
  const items = [
    { id: 'c-days', target: 9 },
    { id: 'c-cities', target: 7 },
    { id: 'c-km', target: 1400 },
    { id: 'c-budget', target: 10486 },
  ];
  items.forEach(({ id, target }) => {
    const el = document.getElementById(id);
    if (!el) return;
    let v = 0;
    const step = target / 90;
    const timer = setInterval(() => {
      v = Math.min(v + step, target);
      el.textContent = Math.floor(v).toLocaleString('en-IN');
      if (v >= target) clearInterval(timer);
    }, 16);
  });
}

// ── Timeline ──────────────────────────────────────────────────
function buildTimeline() {
  const container = $('#timeline-wrap');
  if (!container) return;
  TRIP.timeline.forEach((item, i) => {
    const isEven = i % 2 === 0;
    const div = document.createElement('div');
    div.className = `tl-item scroll-reveal ${!isEven ? 'tl-right' : ''}`;
    div.style.gridTemplateColumns = '1fr 40px 1fr';

    const tags = item.tags.map(t => `<span class="tl-tag">${t}</span>`).join('');
    const content = `
      <div class="tl-day">Day ${item.day}</div>
      <div class="tl-date">${item.date}</div>
      <div class="tl-dest">${item.link ? `<a href="${item.link}" style="color:inherit;border-bottom:1px solid rgba(201,148,58,0.3);">${item.dest}</a>` : item.dest}</div>
      <div class="tl-tags">${tags}</div>
    `;
    const dotCol = `<div class="tl-dot-col"><div class="tl-dot"></div></div>`;

    if (isEven) {
      div.innerHTML = `<div class="tl-empty"></div>${dotCol}<div class="tl-content">${content}</div>`;
    } else {
      div.innerHTML = `<div class="tl-content">${content}</div>${dotCol}<div class="tl-empty"></div>`;
    }
    container.appendChild(div);
  });
}

// ── Trains ────────────────────────────────────────────────────
function buildTrains() {
  const container = $('#train-grid');
  if (!container) return;
  TRIP.trains.forEach(t => {
    const card = document.createElement('div');
    card.className = 'train-card scroll-reveal';
    card.innerHTML = `
      <div class="train-num">Train ${t.num}</div>
      <div class="train-name">${t.name}</div>
      <div class="train-route">
        <div class="train-station">
          <div class="train-station-name">${t.from}</div>
          <div class="train-station-time">${t.dep}</div>
        </div>
        <div class="train-track"><span class="train-icon">🚂</span></div>
        <div class="train-station" style="text-align:right">
          <div class="train-station-name">${t.to}</div>
          <div class="train-station-time">${t.arr}</div>
        </div>
      </div>
      <div class="train-meta">
        <span class="train-badge">${t.cls}</span>
        <span class="train-fare-badge">₹${t.fare}/person</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// ── Budget ────────────────────────────────────────────────────
function buildBudget() {
  const bars = $('#budget-bars');
  if (!bars) return;
  TRIP.budget.forEach(item => {
    const div = document.createElement('div');
    div.className = 'budget-bar-item scroll-reveal';
    div.innerHTML = `
      <div class="budget-bar-top">
        <span class="budget-bar-name">${item.icon} ${item.name}</span>
        <span class="budget-bar-pp">₹${item.perPerson.toLocaleString('en-IN')}</span>
      </div>
      <div class="budget-track">
        <div class="budget-fill" data-pct="${item.pct}" style="background:linear-gradient(90deg,${item.color},${item.color}cc)"></div>
      </div>
      <div class="budget-bar-meta">${item.pct}% of total · Group: ₹${item.group.toLocaleString('en-IN')}</div>
    `;
    bars.appendChild(div);
  });
  buildDonut();
  buildLegend();
}

function animateBudgetBars() {
  $$('.budget-fill').forEach(bar => {
    if (bar.style.width === '' || bar.style.width === '0%') {
      setTimeout(() => { bar.style.width = bar.dataset.pct + '%'; }, 200);
    }
  });
}

function buildDonut() {
  const canvas = document.getElementById('budget-donut');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 100, cy = 100, r = 75, thickness = 22;
  const total = TRIP.budget.reduce((s, i) => s + i.pct, 0);
  let angle = -Math.PI / 2;

  TRIP.budget.forEach(item => {
    const slice = (item.pct / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.arc(cx, cy, r - thickness, angle + slice, angle, true);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    angle += slice;
  });

  // Center hole
  ctx.beginPath();
  ctx.arc(cx, cy, r - thickness - 2, 0, Math.PI * 2);
  ctx.fillStyle = '#080810';
  ctx.fill();
}

function buildLegend() {
  const legend = $('#budget-legend');
  if (!legend) return;
  TRIP.budget.forEach(item => {
    const div = document.createElement('div');
    div.className = 'legend-item';
    div.innerHTML = `<span class="legend-dot" style="background:${item.color}"></span>${item.icon} ${item.name} — ${item.pct}%`;
    legend.appendChild(div);
  });
}

// ── Gallery ───────────────────────────────────────────────────
function buildGallery() {
  const grid = $('#gallery-grid');
  if (!grid) return;
  TRIP.gallery.forEach(photo => {
    const cell = document.createElement('div');
    cell.className = 'gallery-cell';
    cell.innerHTML = `
      <img src="${photo.src}" alt="${photo.label}" loading="lazy"
        onerror="this.parentElement.classList.add('img-error')">
      <div class="gallery-cell-overlay"></div>
      <div class="gallery-cell-label">${photo.dest} · ${photo.label}</div>
    `;
    cell.addEventListener('click', () => window.openLightbox(photo.src));
    grid.appendChild(cell);
  });
}

// ── Smooth Anchor Scroll ──────────────────────────────────────
function initAnchorScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNav();
  initLightbox();
  initAnchorScroll();

  // Index-only features
  if (document.getElementById('hero')) {
    initHeroSlideshow();
    initParticles();
    initCounters();
    buildTimeline();
    buildTrains();
    buildBudget();
    buildGallery();
  }

  // Scroll reveal fires after everything builds
  setTimeout(initScrollReveal, 100);
});
