document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('.post-content pre');

  codeBlocks.forEach(block => {
    // Create wrapper for positioning
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span class="copy-text">Copy</span>
    `;

    wrapper.appendChild(copyButton);

    // Copy functionality
    copyButton.addEventListener('click', async () => {
      const code = block.querySelector('code');
      const text = code.textContent;

      try {
        await navigator.clipboard.writeText(text);

        // Success feedback
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="copy-text">Copied!</span>
        `;
        copyButton.classList.add('copied');

        // Announce to screen readers
        const liveAnnouncer = document.getElementById('live-announcer');
        if (liveAnnouncer) {
          liveAnnouncer.textContent = 'Code copied to clipboard';
        }

        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="copy-text">Copy</span>
          `;
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);

        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
          document.execCommand('copy');
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        } catch (fallbackErr) {
          console.error('Fallback copy failed:', fallbackErr);
        }

        document.body.removeChild(textArea);
      }
    });
  });
});
