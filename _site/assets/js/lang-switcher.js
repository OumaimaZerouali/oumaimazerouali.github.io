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

      // Announce language change to screen readers
      const liveAnnouncer = document.getElementById('live-announcer');
      if (liveAnnouncer) {
        liveAnnouncer.textContent = 'Switching to English';
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

      // Announce language change to screen readers
      const liveAnnouncer = document.getElementById('live-announcer');
      if (liveAnnouncer) {
        liveAnnouncer.textContent = 'Switching to Dutch';
      }

      window.location.href = newPath;
    }
  });

  // Add keyboard support for language buttons
  const langButtons = document.querySelectorAll('.lang-link');
  langButtons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});

