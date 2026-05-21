// ============================================================
//  ClassicaLens — UI Utilities & Shared Logic
// ============================================================

// ─── Custom Cursor ───
function initCursor() {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  };
  animateRing();

  document.querySelectorAll('a, button, .glass-card, .btn, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

// ─── Scroll Reveal ───
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Nav Scroll Effect ───
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ─── Active Nav Link ───
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href.includes(current) || (current === '' && href === 'index.html'));
  });
}

// ─── Toast Notifications ───
function showToast(message, type = 'info', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', info: 'ℹ️', warning: '⚠️', error: '❌' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '🎵'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(30px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// ─── Animated Number Counter ───
function animateCount(el, target, duration = 1500) {
  const start = 0;
  const step = target / (duration / 16);
  let current = start;
  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current);
    if (current < target) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ─── Render Tradition Card ───
function renderTraditionCard(tradition, onClick) {
  const card = document.createElement('div');
  card.className = 'glass-card tradition-card reveal';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Explore ${tradition.name}`);
  card.style.setProperty('--card-color', tradition.color);

  card.innerHTML = `
    <div class="tradition-card-header" style="background: linear-gradient(135deg, ${tradition.color}22, ${tradition.color}08);">
      <div class="tradition-emoji">${tradition.emoji}</div>
      <div class="tradition-flag">${tradition.flag}</div>
    </div>
    <div class="tradition-card-body">
      <h3 class="tradition-name">${tradition.name}</h3>
      <p class="tradition-subtitle text-muted">${tradition.subtitle}</p>
      <div class="tradition-meta">
        <span class="tag tag-purple">🌍 ${tradition.country}</span>
        <span class="tag">${tradition.period}</span>
      </div>
      <div class="tradition-moods mt-2">
        ${tradition.moodTags.map(m => `<span class="tag">${m}</span>`).join('')}
      </div>
      <div class="tradition-instruments mt-2">
        <small class="text-muted">Instruments: ${tradition.instruments.slice(0, 3).join(', ')}</small>
      </div>
    </div>
    <div class="tradition-card-footer">
      <span class="btn-explore">Explore →</span>
    </div>
  `;

  const activate = () => onClick && onClick(tradition);
  card.addEventListener('click', activate);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
  return card;
}

// ─── Render Analysis Result ───
function renderResult(result, container) {
  const { primary, alternatives, mood, confidence, explanation, features } = result;

  container.innerHTML = `
    <div class="result-hero glass-card" style="border-color: ${primary.color}44;">
      <div class="result-badge" style="background: ${primary.color}22; border: 1px solid ${primary.color}55;">
        <span class="result-emoji">${primary.emoji}</span>
        <span class="result-confidence">${confidence}% Match</span>
      </div>
      <h2 class="result-tradition-name">${primary.name}</h2>
      <p class="result-subtitle">${primary.subtitle} &bull; <span class="tag-gold">${primary.flag} ${primary.country}</span></p>
      <div class="result-mood-label">
        <span class="mood-chip" style="background: ${primary.color}22; border: 1px solid ${primary.color}44;">
          🎭 Mood: <strong>${mood.charAt(0).toUpperCase() + mood.slice(1)}</strong>
        </span>
        <span class="mood-chip">📅 Period: ${primary.period}</span>
      </div>
      <div class="result-analysis-bar">
        <div class="analysis-stat">
          <span class="stat-label">Energy</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${Math.round((features.energy || 0.5)*100)}%"></div></div>
        </div>
        <div class="analysis-stat">
          <span class="stat-label">Tempo ~${features.tempo || '--'} BPM</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(Math.round((features.tempo||80)/2.5),100)}%"></div></div>
        </div>
      </div>
      <p class="result-explanation">${explanation}</p>
    </div>

    <div class="result-sections">
      ${result.apiResult ? `
        <div class="result-section glass-card reveal" style="border-color: #E84393; background: linear-gradient(135deg, rgba(232,67,147,0.1), transparent);">
          <h4 style="color: #E84393; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">🎧</span> Audio Match Identified
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
            <div><strong>Song:</strong> ${result.apiResult.song}</div>
            <div><strong>Artist:</strong> ${result.apiResult.artist}</div>
            <div><strong>Album:</strong> ${result.apiResult.album}</div>
          </div>
          <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px; border-left: 3px solid #E84393; font-style: italic;">
            ${result.apiResult.note}
          </div>
        </div>
      ` : ''}
      <div class="result-section glass-card reveal">
        <h4>🎵 What is ${primary.name}?</h4>
        <p>${primary.culturalContext}</p>
      </div>
      <div class="result-section glass-card reveal">
        <h4>💡 For Beginners</h4>
        <p>${primary.beginnerExplanation}</p>
      </div>
      <div class="result-section glass-card reveal">
        <h4>🎼 Key Characteristics</h4>
        <ul class="characteristics-list">
          ${primary.characteristics.map(c => `<li>✦ ${c}</li>`).join('')}
        </ul>
      </div>
      <div class="result-section glass-card reveal">
        <h4>🎤 Key Artists</h4>
        <div class="artist-chips">
          ${primary.keyArtists.map(a => `<span class="tag tag-purple">👤 ${a}</span>`).join('')}
        </div>
      </div>
      <div class="result-section glass-card reveal">
        <h4>🎵 Famous Works</h4>
        <div class="works-list">
          ${primary.famousWorks.map((w, i) => `
            <div class="work-item">
              <span class="work-number">${i + 1}</span>
              <span class="work-name">${w}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ${alternatives && alternatives.length > 0 ? `
        <div class="result-section glass-card reveal">
          <h4>🔗 You Might Also Enjoy</h4>
          <p class="text-muted mb-2">These traditions share similarities with ${primary.name}:</p>
          <div class="alt-traditions">
            ${alternatives.map(a => `
              <a href="explorer.html#${a.id}" class="alt-card">
                <span class="alt-emoji">${a.emoji}</span>
                <div>
                  <strong>${a.name}</strong>
                  <small class="text-muted">${a.country}</small>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Re-init scroll reveal for new elements
  setTimeout(() => initScrollReveal(), 100);
}

// ─── Floating Music Notes Animation ───
function createFloatingNotes(container, count = 12) {
  const notes = ['♩', '♪', '♫', '♬', '🎵', '🎶', '🎼', '🎹', '🎸', '🎻'];
  for (let i = 0; i < count; i++) {
    const note = document.createElement('span');
    note.className = 'floating-note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 1.5 + 0.8}rem;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.3 + 0.05};
      animation: floatNote ${Math.random() * 10 + 8}s ease-in-out infinite;
      animation-delay: -${Math.random() * 10}s;
      pointer-events: none;
      user-select: none;
    `;
    container.appendChild(note);
  }
}

// ─── Init All Shared UI ───
function initUI() {
  initCursor();
  initScrollReveal();
  initNavScroll();
  setActiveNav();
  // Add floating note animation keyframes
  if (!document.getElementById('floating-note-styles')) {
    const style = document.createElement('style');
    style.id = 'floating-note-styles';
    style.textContent = `
      @keyframes floatNote {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
        25% { transform: translateY(-30px) rotate(10deg); opacity: 0.2; }
        75% { transform: translateY(20px) rotate(-10deg); opacity: 0.05; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', initUI);

// Expose globally
window.UI = { showToast, renderTraditionCard, renderResult, createFloatingNotes, initScrollReveal, animateCount };
