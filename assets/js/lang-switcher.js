document.addEventListener('DOMContentLoaded', function() {
  // ========== Language Switcher ==========
  const currentPath = window.location.pathname;
  const isNL = currentPath.startsWith('/nl');

  if (isNL) {
    document.getElementById('lang-nl')?.classList.add('active');
  } else {
    document.getElementById('lang-en')?.classList.add('active');
  }

  document.getElementById('lang-en')?.addEventListener('click', function() {
    if (currentPath.startsWith('/nl')) {
      let newPath = currentPath.replace('/nl/', '/').replace('/nl', '/');
      // Handle specific routes
      if (newPath.includes('/about')) {
        newPath = '/about/';
      } else if (newPath.includes('/posts')) {
        newPath = '/posts/';
      } else if (newPath === '/' || newPath === '') {
        newPath = '/';
      }
      window.location.href = newPath;
    }
  });

  document.getElementById('lang-nl')?.addEventListener('click', function() {
    if (!currentPath.startsWith('/nl')) {
      let newPath = currentPath;
      if (currentPath === '/' || currentPath === '/index.html') {
        newPath = '/nl/';
      } else if (currentPath.includes('/about')) {
        newPath = '/nl/about/';
      } else if (currentPath.includes('/posts')) {
        newPath = '/nl/posts/';
      } else {
        newPath = '/nl' + currentPath;
      }
      window.location.href = newPath;
    }
  });

  // ========== Theme Toggle ==========
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const htmlElement = document.documentElement;

  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Apply saved theme on load
  if (savedTheme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    htmlElement.removeAttribute('data-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }

  // Toggle theme on button click
  themeToggle?.addEventListener('click', function() {
    const currentTheme = htmlElement.getAttribute('data-theme');

    if (currentTheme === 'light') {
      // Switch to dark
      htmlElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      // Switch to light
      htmlElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  });
});

