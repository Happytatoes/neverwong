/* ── PAGE NAVIGATION ──────────────────────────────────────────── */

const pages   = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');

function showPage(id) {
  document.querySelectorAll('.connect-row').forEach(r => r.classList.remove('visible'));
  document.querySelectorAll('.writing-link').forEach(l => l.classList.remove('visible'));
  document.querySelectorAll('.project-card').forEach(c => {
    c.classList.remove('visible');
    c.style.transitionDelay = '';
  });
  document.querySelectorAll('#about h2 span').forEach(s => s.classList.remove('entered'));

  // Clear parallax transforms when leaving home
  if (id !== 'home') {
    document.querySelectorAll('.drink-card').forEach(c => { c.style.transform = ''; });
    const t = document.querySelector('.teahouse-title');
    if (t) t.style.transform = '';
  }

  pages.forEach(p => p.classList.remove('active', 'fade-in'));
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.page === id));

  const target = document.getElementById(id);
  if (!target) return;

  if (id === 'home') {
    target.classList.add('active');
  } else {
    target.classList.add('active', 'fade-in');
  }

  if (id === 'connect') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('.connect-row').forEach(row => row.classList.add('visible'));
      });
    });
  }

  if (id === 'writings') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const links = document.querySelectorAll('.writing-link');
        links.forEach((link, i) => {
          link.style.transitionDelay = `${i * 60}ms`;
          link.classList.add('visible');
        });
        setTimeout(() => {
          links.forEach(link => { link.style.transitionDelay = ''; });
        }, links.length * 60 + 350);
      });
    });
  }

  if (id === 'about') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('#about h2 span').forEach((span, i) => {
          setTimeout(() => span.classList.add('entered'), i * 55);
        });
        initTicker();
      });
    });
  }

  if (id === 'projects') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
          card.style.transitionDelay = `${i * 40}ms`;
          card.classList.add('visible');
        });
        setTimeout(() => {
          cards.forEach(card => { card.style.transitionDelay = ''; });
        }, cards.length * 40 + 400);
      });
    });
  }
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});

document.querySelectorAll('.drink-card').forEach(card => {
  card.addEventListener('click', () => showPage(card.dataset.page));
});


/* ── TITLE COLOR ON DRINK HOVER ───────────────────────────────── */

const title = document.querySelector('.teahouse-title');

document.querySelectorAll('.drink-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (!title) return;
    title.className = `teahouse-title flavor-${card.dataset.flavor}`;
    title.innerHTML = `<i>${card.dataset.label}</i>`;
  });
  card.addEventListener('mouseleave', () => {
    if (!title) return;
    title.className = 'teahouse-title';
  });
});

const drinksRow = document.querySelector('.drinks-row');
const teahouseTitle = document.querySelector('.teahouse-title');

drinksRow.addEventListener('mouseleave', () => {
  teahouseTitle.textContent = '{noah wong / ut austin}';
  teahouseTitle.innerHTML = '<i>{noah wong / ut austin}</i>';
  teahouseTitle.className = 'teahouse-title';
});

/* ── THEME TOGGLE ─────────────────────────────────────────────── */

const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

/* Theme persistence — default is light */
if (localStorage.getItem("theme") !== "dark") {
  body.classList.add("light");
  if (themeIcon) themeIcon.textContent = "☀︎";
}

/* Toggle theme */
function toggleTheme() {
  if (!themeIcon) return;
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeIcon.textContent = isLight ? "☀︎" : "☾";
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

/* Spacebar toggles theme */
document.addEventListener("keydown", e => {
  if ((e.code === "Space" || e.key === " ") && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
    e.preventDefault();
    toggleTheme();
  }
});

/* ── PROJECT CARD FLIP ────────────────────────────────────────── */

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

/* ── HOME EFFECTS: PARALLAX + NEIGHBOR PUSH ──────────────────── */

function initHomeEffects() {
  const title = document.querySelector('.teahouse-title');
  const cards = [...document.querySelectorAll('.drink-card')];
  if (!cards.length) return;

  let mouseX = 0, mouseY = 0, lerpX = 0, lerpY = 0;
  let neighborTarget  = cards.map(() => 0);
  let neighborCurrent = cards.map(() => 0);
  const depths = [7, 12, 9, 14];
  let entranceDone = false;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      neighborTarget = cards.map((_, j) => {
        if (i === j) return 0;
        const dist = Math.abs(i - j);
        return (j < i ? -1 : 1) * (dist === 1 ? 12 : 5);
      });
    });
    card.addEventListener('mouseleave', () => {
      neighborTarget = cards.map(() => 0);
    });
  });

  setTimeout(() => {
    entranceDone = true;
    cards.forEach(c => { c.style.animation = 'none'; c.style.opacity = '1'; });
  }, 1300);

  function tick() {
    if (entranceDone && document.getElementById('home')?.classList.contains('active')) {
      lerpX += (mouseX - lerpX) * 0.07;
      lerpY += (mouseY - lerpY) * 0.07;
      cards.forEach((card, i) => {
        neighborCurrent[i] += (neighborTarget[i] - neighborCurrent[i]) * 0.1;
        const dx = (lerpX * depths[i] + neighborCurrent[i]).toFixed(2);
        const dy = (lerpY * depths[i] * 0.55).toFixed(2);
        card.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      if (title) {
        title.style.transform = `translate(${(lerpX * -9).toFixed(2)}px, ${(lerpY * -5).toFixed(2)}px)`;
      }
    }
    requestAnimationFrame(tick);
  }
  tick();
}

/* ── BOBA BUBBLES ─────────────────────────────────────────────── */

(function spawnBubbles() {
  const container = document.querySelector('.teahouse-bubbles');
  if (!container) return;
  const colors = [
    [192, 132, 252],
    [141, 255, 125],
    [251, 146,  60],
    [255, 214, 156],
  ];
  for (let i = 0; i < 18; i++) {
    const b = document.createElement('div');
    b.className = 'boba-bubble';
    const size = 24 + Math.random() * 48;
    const [r, g, bl] = colors[i % colors.length];
    const alpha = (0.65 + Math.random() * 0.3).toFixed(2);
    b.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${3 + Math.random() * 94}%`,
      `bottom:-${size}px`,
      `background:rgba(${r},${g},${bl},${alpha})`,
      `animation-duration:${7 + Math.random() * 6}s`,
      `animation-delay:${Math.random() * 8}s`,
    ].join(';');
    container.appendChild(b);
  }
})();

/* ── TICKER INIT ──────────────────────────────────────────────── */

function initTicker() {
  const track = document.querySelector('.tagline-track');
  if (!track || track.dataset.initialized) return;
  const original = track.querySelector('span');
  if (!original) return;

  const spanWidth = original.getBoundingClientRect().width;
  if (spanWidth === 0) return;

  const copies = Math.max(Math.ceil((window.innerWidth * 3) / spanWidth), 4);
  const html = original.innerHTML;
  track.innerHTML = '';
  for (let i = 0; i < copies; i++) {
    const s = document.createElement('span');
    s.innerHTML = html;
    track.appendChild(s);
  }

  track.style.setProperty('--ticker-shift', `-${spanWidth}px`);
  track.dataset.initialized = '1';
}

initHomeEffects();

/* ── TIMELINE SCROLL REVEAL ───────────────────────────────────── */

const tlObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.tl-block').forEach(b => tlObserver.observe(b));

document.querySelectorAll('.achieve-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const listId = btn.getAttribute('aria-controls');
    const list = document.getElementById(listId);
    btn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      list.hidden = true;
    } else {
      list.hidden = false;
    }
  });
});
