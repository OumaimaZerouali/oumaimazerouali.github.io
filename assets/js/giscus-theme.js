// Handle Giscus theme switching when site theme changes
document.addEventListener('DOMContentLoaded', function() {
  const html = document.documentElement;

  // Function to get current theme
  function getCurrentTheme() {
    const theme = html.getAttribute('data-theme');
    return theme === 'dark' ? 'dark' : 'light';
  }

  // Function to update Giscus theme
  function updateGiscusTheme() {
    const giscusTheme = getCurrentTheme();
    const iframe = document.querySelector('iframe.giscus-frame');

    if (iframe) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: giscusTheme } } },
        'https://giscus.app'
      );
    }
  }

  // Set initial theme by updating the script's data-theme attribute before Giscus loads
  const giscusScript = document.querySelector('script[src*="giscus.app"]');
  if (giscusScript) {
    giscusScript.setAttribute('data-theme', getCurrentTheme());
  }

  // Watch for theme changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        updateGiscusTheme();
      }
    });
  });

  observer.observe(html, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // Update theme once Giscus iframe is loaded
  const checkGiscusLoaded = setInterval(function() {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (iframe) {
      clearInterval(checkGiscusLoaded);
      updateGiscusTheme();
    }
  }, 500);

  // Clear interval after 10 seconds to avoid infinite checking
  setTimeout(function() {
    clearInterval(checkGiscusLoaded);
  }, 10000);
});
