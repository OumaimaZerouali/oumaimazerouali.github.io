document.addEventListener('DOMContentLoaded', function() {
  const tagSelect = document.getElementById('tag-select');
  const postCards = document.querySelectorAll('.post-card');
  const liveAnnouncer = document.getElementById('live-announcer');

  if (!tagSelect) return;

  tagSelect.addEventListener('change', function() {
    const selectedTag = this.value;
    let visibleCount = 0;

    postCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags');

      if (selectedTag === 'all') {
        card.style.display = 'flex';
        setTimeout(() => card.style.opacity = '1', 10);
        visibleCount++;
      } else if (cardTags && cardTags.split(',').includes(selectedTag)) {
        card.style.display = 'flex';
        setTimeout(() => card.style.opacity = '1', 10);
        visibleCount++;
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 200);
      }
    });

    if (liveAnnouncer) {
      const message = selectedTag === 'all'
        ? `Showing all ${visibleCount} posts`
        : `Filtered to ${visibleCount} post${visibleCount !== 1 ? 's' : ''} with tag ${selectedTag}`;
      liveAnnouncer.textContent = message;
    }
  });
});
