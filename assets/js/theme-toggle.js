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

  // Set initial aria-label based on current theme
  toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);

  toggle.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcons(newTheme);

    // Update button label
    toggle.setAttribute("aria-label", `Switch to ${newTheme === "dark" ? "light" : "dark"} theme`);

    // Announce theme change to screen readers
    const liveAnnouncer = document.getElementById('live-announcer');
    if (liveAnnouncer) {
      liveAnnouncer.textContent = `Theme switched to ${newTheme} mode`;
    }
  });
});
