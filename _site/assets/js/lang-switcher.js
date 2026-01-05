// Language switcher functionality
// Translations loaded from Jekyll data files

const translations = {
  en: {"site":{"title":"Oumi's Corner","tagline":"Working Notes","description":"Reflections on systems, design decisions, and the realities of building things that last."},"nav":{"home":"Home","about":"About","archive":"Archive"},"post":{"read_more":"Read more","min_read":"min read","related_posts":"Related Posts","comments":"Comments","view_all_posts":"View All Posts"},"filter":{"everything":"Everything","tech":"Tech","life":"Life"},"footer":{"copyright":"Built with care"},"meta":{"posted_on":"Posted on"}},
  nl: {"site":{"title":"Oumi's Corner","tagline":"Werkaantekeningen","description":"Reflecties over systemen, ontwerpbeslissingen en de realiteit van het bouwen van duurzame dingen."},"nav":{"home":"Home","about":"Over","archive":"Archief"},"post":{"read_more":"Lees meer","min_read":"min lezen","related_posts":"Gerelateerde Artikelen","comments":"Reacties","view_all_posts":"Bekijk Alle Artikelen"},"filter":{"everything":"Alles","tech":"Tech","life":"Leven"},"footer":{"copyright":"Met zorg gebouwd"},"meta":{"posted_on":"Geplaatst op"}}
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
  return localStorage.getItem('site-language') || 'en';
}

// Set current language
function setLanguage(lang) {
  localStorage.setItem('site-language', lang);
  applyTranslations(lang);
  updateActiveLanguageButton(lang);
  filterPostsByLanguage(lang);
}

// Filter posts by language
function filterPostsByLanguage(lang) {
  const articles = document.querySelectorAll('.editorial-block');

  articles.forEach(article => {
    const articleLang = article.getAttribute('data-lang') || 'en';

    if (articleLang === lang) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

// Apply translations to the page
function applyTranslations(lang) {
  const t = translations[lang];

  // Update editorial heading
  const heading = document.querySelector('.editorial-heading');
  if (heading) heading.textContent = t.site.tagline;

  // Update editorial subheading
  const subheading = document.querySelector('.editorial-subheading');
  if (subheading) subheading.textContent = t.site.description;

  // Update filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    if (filter && t.filter[filter]) {
      btn.textContent = t.filter[filter];
    }
  });

  // Update "Read more" buttons
  document.querySelectorAll('.button-text-original, .button-text-duplicate').forEach(span => {
    const parent = span.closest('.editorial-cta');
    if (parent) {
      span.textContent = t.post.read_more;
    }
  });

  // Update "View All Posts" button
  document.querySelectorAll('.view-all-link .button-text-original, .view-all-link .button-text-duplicate').forEach(span => {
    span.textContent = t.post.view_all_posts;
  });

  // Update "min read" text
  document.querySelectorAll('.editorial-meta').forEach(meta => {
    const text = meta.textContent;
    if (lang === 'nl') {
      meta.textContent = text.replace('min read', 'min lezen');
    } else {
      meta.textContent = text.replace('min lezen', 'min read');
    }
  });

  // Update sidebar titles
  const relatedPostsTitle = document.querySelector('.related-posts h3');
  if (relatedPostsTitle) relatedPostsTitle.textContent = t.post.related_posts;

  const commentsTitle = document.querySelector('.comments-section h3');
  if (commentsTitle) commentsTitle.textContent = t.post.comments;
}

// Update active language button styling
function updateActiveLanguageButton(lang) {
  document.querySelectorAll('.lang-link').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.getElementById(`lang-${lang}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

// Initialize language system
document.addEventListener('DOMContentLoaded', function() {
  const currentLang = getCurrentLanguage();

  // Apply saved language
  applyTranslations(currentLang);
  updateActiveLanguageButton(currentLang);
  filterPostsByLanguage(currentLang);

  // Add click handlers to language buttons
  document.querySelectorAll('.lang-link').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});

