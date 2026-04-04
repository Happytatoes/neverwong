/* ── PAGE NAVIGATION ──────────────────────────────────────────── */

const pages   = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');

function showPage(id) {
  pages.forEach(p => p.classList.remove('active', 'fade-in'));
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.page === id));

  const target = document.getElementById(id);
  if (!target) return;

  if (id === 'home') {
    target.classList.add('active');
  } else {
    target.classList.add('active', 'fade-in');
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

/* Theme persistence */
if (themeIcon && localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeIcon.textContent = "☀︎";
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
