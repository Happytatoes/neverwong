const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

if (themeIcon && localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  themeIcon.textContent = '☀︎';
}

function toggleTheme() {
  if (!themeIcon) return;
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  themeIcon.textContent = isLight ? '☀︎' : '☾';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

document.addEventListener('keydown', e => {
  if ((e.code === 'Space' || e.key === ' ') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
    e.preventDefault();
    toggleTheme();
  }
});