document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");

  if (!toggle || !sun || !moon) return;

  function updateIcons(theme) {
    if (theme === "dark") {
      sun.classList.remove("hidden");
      moon.classList.add("hidden");
    } else {
      moon.classList.remove("hidden");
      sun.classList.add("hidden");
    }
  }

  let theme = localStorage.getItem("theme");

  if (!theme) {
    theme = root.getAttribute("data-theme") || "light";
  }

  root.setAttribute("data-theme", theme);
  updateIcons(theme);

  toggle.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcons(newTheme);
  });
});
