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