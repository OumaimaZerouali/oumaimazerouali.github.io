// Cookie Consent Management
(function() {
  const CONSENT_KEY = 'cookie-consent';
  const CONSENT_ACCEPTED = 'accepted';
  const CONSENT_DECLINED = 'declined';

  // Check if consent has been given
  function getConsent() {
    return localStorage.getItem(CONSENT_KEY);
  }

  // Set consent
  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
  }

  // Load Google Analytics
  function loadAnalytics() {
    // Create and load gtag script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-6X9TVDQMN7';
    document.head.appendChild(gtagScript);

    // Execute GA initialization script
    const gaScript = document.getElementById('ga-script');
    if (gaScript) {
      const scriptContent = gaScript.textContent;
      const newScript = document.createElement('script');
      newScript.textContent = scriptContent;
      document.head.appendChild(newScript);
    }
  }

  function showBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.removeAttribute('hidden');
      banner.setAttribute('aria-hidden', 'false');
    }
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.setAttribute('hidden', '');
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  function handleAccept() {
    setConsent(CONSENT_ACCEPTED);
    hideBanner();
    loadAnalytics();

    const announcer = document.getElementById('live-announcer');
    if (announcer) {
      announcer.textContent = 'Cookie preferences saved. Analytics enabled.';
    }
  }

  function handleDecline() {
    setConsent(CONSENT_DECLINED);
    hideBanner();

    const announcer = document.getElementById('live-announcer');
    if (announcer) {
      announcer.textContent = 'Cookie preferences saved. Analytics disabled.';
    }
  }

  window.resetCookieConsent = function() {
    localStorage.removeItem(CONSENT_KEY);
    showBanner();
  };

  document.addEventListener('DOMContentLoaded', function() {
    const consent = getConsent();

    if (consent === CONSENT_ACCEPTED) {
      loadAnalytics();
    } else if (consent === CONSENT_DECLINED) {
    } else {
      showBanner();
    }

    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    const settingsLink = document.getElementById('cookie-settings-link');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', handleAccept);
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', handleDecline);
    }

    if (settingsLink) {
      settingsLink.addEventListener('click', function() {
        window.resetCookieConsent();
      });
    }
  });
})();

