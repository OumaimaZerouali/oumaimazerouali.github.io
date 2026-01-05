document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.editorial-cta, .view-all-link, .editorial-button, .filter-button, .tag-pill');

  buttons.forEach(button => {
    const wrapper = button.querySelector('.button-text-wrapper');
    if (!wrapper) return;

    const original = wrapper.querySelector('.button-text-original');
    const duplicate = wrapper.querySelector('.button-text-duplicate');

    if (!original || !duplicate) return;

    button.addEventListener('mouseenter', () => {
      original.style.transform = 'translateY(-100%)';
      duplicate.style.transform = 'translateY(0%)';
    });

    button.addEventListener('mouseleave', () => {
      original.style.transform = 'translateY(0%)';
      duplicate.style.transform = 'translateY(100%)';
    });
  });

  // Tag filtering functionality
  let activeTag = null;
  const tagPills = document.querySelectorAll('.tag-pill');
  const articleCards = document.querySelectorAll('.editorial-block');

  tagPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const tag = pill.getAttribute('data-tag');

      // Toggle tag
      if (activeTag === tag) {
        activeTag = null;
        tagPills.forEach(p => p.classList.remove('active'));
        // Show all cards
        articleCards.forEach(card => {
          card.style.display = 'block';
        });
      } else {
        activeTag = tag;
        // Update active state
        tagPills.forEach(p => {
          if (p.getAttribute('data-tag') === tag) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });

        // Filter cards
        articleCards.forEach(card => {
          const cardTags = card.getAttribute('data-tags');
          if (cardTags && cardTags.split(',').includes(tag)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });

  // Main filter bar functionality (Everything/Tech/Life)
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Reset tag pills
      activeTag = null;
      tagPills.forEach(p => p.classList.remove('active'));

      // Filter articles
      articleCards.forEach(card => {
        const cardTags = card.getAttribute('data-tags');

        if (filter === 'everything') {
          card.style.display = 'block';
        } else if (filter === 'tech') {
          // Show if card has tech-related tags
          const techTags = ['java', 'spring-boot', 'quarkus', 'kubernetes', 'docker', 'testing', 'angular', 'openapi', 'frontend', 'cloud-native', 'architecture', 'best-practices'];
          const hasTechTag = cardTags && cardTags.split(',').some(tag => techTags.includes(tag.trim()));
          card.style.display = hasTechTag ? 'block' : 'none';
        } else if (filter === 'life') {
          // Show if card has life-related tags
          const lifeTags = ['career', 'community', 'personal'];
          const hasLifeTag = cardTags && cardTags.split(',').some(tag => lifeTags.includes(tag.trim()));
          card.style.display = hasLifeTag ? 'block' : 'none';
        }
      });
    });
  });
});

