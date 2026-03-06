(function () {
  var form = document.getElementById('guestbook-form');
  var entriesEl = document.getElementById('guestbook-entries');
  if (!form || !entriesEl) return;

  var apiUrl = (form.dataset.api || '').replace(/\/$/, '') + '/api/guestbook';
  var statusEl = document.getElementById('gb-status');
  var submitBtn = form.querySelector('button[type="submit"]');
  var originalBtnText = submitBtn ? submitBtn.textContent : 'Leave a message';

  function setStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'gb-status gb-status--' + (type || '');
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (_) {
      return iso;
    }
  }

  function renderEntries(entries) {
    if (!entries || entries.length === 0) {
      entriesEl.innerHTML = '<p class="guestbook-empty">No messages yet — be the first to sign!</p>';
      return;
    }
    var html = '<ol class="guestbook-list">';
    entries.forEach(function (e) {
      var nameHtml = escapeHtml(e.name || 'Anonymous');
      var msgHtml = escapeHtml(e.message || '');
      var dateHtml = e.date ? '<time datetime="' + escapeAttr(e.date) + '">' + formatDate(e.date) + '</time>' : '';
      var websiteHtml = '';
      if (e.website) {
        websiteHtml = ' &middot; <a href="' + escapeAttr(e.website) + '" target="_blank" rel="noopener noreferrer" class="gb-entry-website">' + escapeHtml(e.website) + '</a>';
      }
      html += '<li class="gb-entry">';
      html += '<div class="gb-entry-header">';
      html += '<span class="gb-entry-name">' + nameHtml + '</span>';
      html += websiteHtml;
      html += dateHtml ? '<span class="gb-entry-date">' + dateHtml + '</span>' : '';
      html += '</div>';
      html += '<p class="gb-entry-message">' + msgHtml + '</p>';
      html += '</li>';
    });
    html += '</ol>';
    entriesEl.innerHTML = html;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;');
  }

  function loadEntries() {
    if (!apiUrl || apiUrl === '/api/guestbook') {
      entriesEl.innerHTML = '<p class="guestbook-empty">Guestbook API not configured yet.</p>';
      return;
    }
    fetch(apiUrl)
      .then(function (r) { return r.json(); })
      .then(function (data) { renderEntries(Array.isArray(data) ? data : []); })
      .catch(function () {
        entriesEl.innerHTML = '<p class="guestbook-error">Could not load messages. Please refresh the page.</p>';
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!apiUrl || apiUrl === '/api/guestbook') {
      setStatus('Guestbook API not configured yet.', 'error');
      return;
    }

    var name = document.getElementById('gb-name').value.trim();
    var message = document.getElementById('gb-message').value.trim();
    var websiteInput = document.getElementById('gb-website');
    var website = websiteInput ? websiteInput.value.trim() : '';

    if (!name) { setStatus('Please enter your name.', 'error'); return; }
    if (!message) { setStatus('Please enter a message.', 'error'); return; }
    if (message.length > 300) { setStatus('Message must be 300 characters or fewer.', 'error'); return; }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending\u2026'; }
    setStatus('', '');

    var payload = { name: name, message: message };
    if (website) payload.website = website;

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (r) {
        return r.json().then(function (data) { return { ok: r.ok, status: r.status, data: data }; });
      })
      .then(function (result) {
        if (result.ok) {
          setStatus('Message received! Thanks for signing the guestbook.', 'success');
          form.reset();
          loadEntries();
        } else {
          setStatus(result.data.error || 'Something went wrong. Please try again.', 'error');
        }
      })
      .catch(function () {
        setStatus('Could not reach the server. Please try again later.', 'error');
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
      });
  });

  loadEntries();
})();
