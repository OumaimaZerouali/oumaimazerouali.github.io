// Code block copy button functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add copy buttons to all code blocks
  const codeBlocks = document.querySelectorAll('.post-content pre');

  codeBlocks.forEach(block => {
    // Skip if button already exists (check for any button element)
    if (block.querySelector('button')) return;
    if (block.querySelector('.copy-button')) return;

    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.setAttribute('type', 'button');

    button.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const code = block.querySelector('code');
      const text = code ? code.textContent : block.textContent;

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied!';

        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        button.textContent = 'Failed';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    });

    block.style.position = 'relative';
    block.appendChild(button);
  });
});

