const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

/* Theme persistence — default is light */
if (localStorage.getItem('theme') !== 'dark') {
  body.classList.add('light');
  if (themeIcon) themeIcon.textContent = '☀︎';
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

/* ── TABLE OF CONTENTS ──────────────────────────────────────────── */

(function buildTOC() {
  const article = document.querySelector('.article');
  if (!article) return;

  const headings = [...article.querySelectorAll('h2, h3')];
  if (headings.length < 2) return;

  // Ensure each heading has an id for scroll targeting
  headings.forEach(h => {
    if (!h.id) {
      h.id = h.textContent.trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/, '');
    }
  });

  // Build the nav
  const toc = document.createElement('nav');
  toc.className = 'toc';
  toc.setAttribute('aria-label', 'Article outline');

  headings.forEach(h => {
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    a.className = 'toc-link';
    a.addEventListener('click', e => {
      e.preventDefault();
      const y = h.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
    toc.appendChild(a);
  });

  document.body.appendChild(toc);

  // Highlight active heading via IntersectionObserver
  const links = toc.querySelectorAll('.toc-link');

  const setActive = id => {
    links.forEach(a => a.classList.toggle('toc-active', a.getAttribute('href') === '#' + id));
  };

  // Track which headings are intersecting; use the topmost visible one
  const visible = new Set();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    // Pick the heading closest to the top of the viewport
    const topmost = [...visible].sort((a, b) =>
      a.getBoundingClientRect().top - b.getBoundingClientRect().top
    )[0];
    if (topmost) setActive(topmost.id);
  }, { rootMargin: '0px 0px -60% 0px' });

  headings.forEach(h => observer.observe(h));
})();