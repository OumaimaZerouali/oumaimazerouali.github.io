document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger-toggle');
  const nav = document.querySelector('.site-nav');
  const mobileSwitchTheme = document.getElementById('mobile-switch-theme');
  let lastFocusedElement = null;

  // Get all focusable elements within the navigation
  function getFocusableElements() {
    return nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('active');
    nav.classList.remove('active');

    // Restore focus to the element that opened the menu
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  function openMenu() {
    // Store the currently focused element
    lastFocusedElement = document.activeElement;

    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('active');
    nav.classList.add('active');

    // Focus the first focusable element in the menu
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      setTimeout(() => focusableElements[0].focus(), 100);
    }
  }

  // Handle focus trap when menu is open
  function trapFocus(event) {
    if (!nav.classList.contains('active')) return;

    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Trap focus within menu
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', function(event) {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeMenu(); else openMenu();
      event.stopPropagation();
    });
  }

  document.addEventListener('click', function(event) {
    if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    // Handle escape key
    if (event.key === 'Escape' || event.key === 'Esc') {
      if (nav.classList.contains('active')) {
        closeMenu();
      }
    }

    // Handle focus trap
    trapFocus(event);
  });

  if (mobileSwitchTheme) {
    mobileSwitchTheme.addEventListener('click', function() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);

      // Save to localStorage so it persists across page navigation
      localStorage.setItem('theme', newTheme);

      // Announce theme change to screen readers
      const liveAnnouncer = document.getElementById('live-announcer');
      if (liveAnnouncer) {
        liveAnnouncer.textContent = `Theme switched to ${newTheme} mode`;
      }
    });
  }

  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => link.addEventListener('click', () => setTimeout(closeMenu, 50)));
});
