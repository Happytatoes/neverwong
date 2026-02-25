const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

/* Navigation */
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

/* Theme persistence */
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeIcon.textContent = "☀︎";
}

/* Toggle theme */
function toggleTheme() {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeIcon.textContent = isLight ? "☀︎" : "☾";
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

themeToggle.addEventListener("click", toggleTheme);

/* Spacebar toggles theme */
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
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