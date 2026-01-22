// Initialize Giscus comments
document.addEventListener('DOMContentLoaded', function() {
  const commentsContainer = document.querySelector('.giscus-wrapper');

  if (!commentsContainer) {
    return;
  }

  // Get current theme
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  // Get current language
  const langMeta = document.querySelector('html').getAttribute('lang') || 'en';

  // Create and configure Giscus script
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', 'OumaimaZerouali/oumaimazerouali.github.io');
  script.setAttribute('data-repo-id', 'R_kgDOLl6lYA');
  script.setAttribute('data-category', 'General');
  script.setAttribute('data-category-id', 'DIC_kwDOLl6lYM4C1TO3');
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'bottom');
  script.setAttribute('data-theme', currentTheme);
  script.setAttribute('data-lang', langMeta);
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;

  // Append script to container
  commentsContainer.appendChild(script);
});
