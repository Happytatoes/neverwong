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
    title.textContent = card.dataset.label;
  });
  card.addEventListener('mouseleave', () => {
    if (!title) return;
    title.className = 'teahouse-title';
  });
});

const drinksRow = document.querySelector('.drinks-row');
const teahouseTitle = document.querySelector('.teahouse-title');

drinksRow.addEventListener('mouseleave', () => {
  teahouseTitle.textContent = 'Noah Wong';
  teahouseTitle.className = 'teahouse-title';
});

/* ── THEME TOGGLE ─────────────────────────────────────────────── */

const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

/* Theme persistence — default is dark */
if (localStorage.getItem("theme") === "light") {
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
