(function(){
  'use strict';

  let _lastFocused = null;
  let _keydownHandler = null;

  function enableAnalytics() {
    const scripts = document.querySelectorAll('script[type="text/plain"][data-cookie-consent="analytics"]');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) newScript.src = script.src;
      newScript.text = script.innerText;
      newScript.async = script.async;
      document.head.appendChild(newScript);
    });
  }

  function setConsent(mode) {
    // mode: 'all' | 'necessary' | 'denied'
    localStorage.setItem('cookies-consent', mode);
    localStorage.setItem('cookies-settings', JSON.stringify({analytics: mode === 'all'}));
  }

  function applyConsent(mode) {
    if (mode === 'all') {
      enableAnalytics();
    }
  }

  function applyTranslations() {
    try {
      const translations = window.__translations || {};
      // detect runtime language from saved language, document <html lang="..."> or navigator
      let lang = localStorage.getItem('site-language') || document.documentElement.lang || (navigator.language && navigator.language.split('-')[0]) || 'en';
      lang = lang.toLowerCase();
      const t = translations[lang] || translations['en'] || null;
      console.debug('cookie-consent: detected lang', lang, 'translations available:', !!t);
      if (!t || !t.cookie) return;

      const modal = document.getElementById('cookie-banner');
      if (!modal) return;

      const title = modal.querySelector('.cookie-modal__title');
      const desc = modal.querySelector('.cookie-modal__desc');
      const btnAll = modal.querySelector('#accept-all');
      const btnNecessary = modal.querySelector('#accept-necessary');
      const btnDeny = modal.querySelector('#deny-all');

      if (title && t.cookie.title) title.textContent = t.cookie.title;
      if (desc && t.cookie.description) desc.innerHTML = t.cookie.description;
      if (btnAll && t.cookie.accept_all) btnAll.textContent = t.cookie.accept_all;
      if (btnNecessary && t.cookie.necessary_only) btnNecessary.textContent = t.cookie.necessary_only;
      if (btnDeny && t.cookie.deny_all) btnDeny.textContent = t.cookie.deny_all;
    } catch (e) {
      // fail silently but log
      console.warn('cookie-consent: translations apply failed', e);
    }
  }

  function getFocusableElements(container) {
    if (!container) return [];
    const nodes = container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    return Array.prototype.slice.call(nodes);
  }

  function handleKeydown(e, modal) {
    if (!modal) return;
    const focusable = getFocusableElements(modal);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === 'Escape') {
      setConsent('necessary');
      hideModal();
      return;
    }

    if (e.key === 'Tab') {
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  }

  function showModal() {
    const modal = document.getElementById('cookie-banner');
    if (!modal) return;
    _lastFocused = document.activeElement;
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');

    const focusable = getFocusableElements(modal);
    if (focusable.length) focusable[0].focus();

    _keydownHandler = function(e){ handleKeydown(e, modal); };
    document.addEventListener('keydown', _keydownHandler);
  }

  function hideModal() {
    const modal = document.getElementById('cookie-banner');
    if (!modal) return;
    modal.setAttribute('hidden', '');
    modal.setAttribute('aria-hidden', 'true');

    if (_keydownHandler) {
      document.removeEventListener('keydown', _keydownHandler);
      _keydownHandler = null;
    }

    if (_lastFocused && typeof _lastFocused.focus === 'function') {
      _lastFocused.focus();
    }
    _lastFocused = null;
  }

  document.addEventListener('DOMContentLoaded', function(){
    // ensure modal text matches runtime language (document.lang may be set client-side)
    applyTranslations();

    const acceptAll = document.getElementById('accept-all');
    const acceptNecessary = document.getElementById('accept-necessary');
    const denyAll = document.getElementById('deny-all');

    const current = localStorage.getItem('cookies-consent');
    if (current) {
      applyConsent(current);
      return; // don't show modal
    }

    showModal();

    if (acceptAll) acceptAll.addEventListener('click', function(){
      setConsent('all');
      applyConsent('all');
      hideModal();
    });

    if (acceptNecessary) acceptNecessary.addEventListener('click', function(){
      setConsent('necessary');
      hideModal();
    });

    if (denyAll) denyAll.addEventListener('click', function(){
      setConsent('denied');
      hideModal();
    });
  });
})();
