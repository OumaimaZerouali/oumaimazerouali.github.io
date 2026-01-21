---
applyTo: '**'
description: 'description'
---
## 1. Vision & Design Principles

**Goal:**
Create a personal blog that feels like a “personal space / studio”, not a post feed.

Principles:

* Minimal but warm
* Curated, not infinite scrolling
* One accent color only
* No visual noise
* Every page must reach:

    * **Accessibility: 100**
    * **SEO: 100**
    * **Best Practices: 100**
    * **Performance: 95–100** (realistic)

No:

* Infinite vertical list of posts
* Heavy animations
* Low-contrast text
* Decorative but useless elements

---

## 2. Site Structure

### Pages

* `/` → Landing (posts + intro)
* `/about` → About + Now + Timeline
* `/post/:slug` → Blog post page
* `/tags/:tag` (optional, SEO bonus)

### Navigation

Top header only:

* Logo / Name (h1 on homepage, span elsewhere)
* Links: Home · About · RSS

No hamburger menu on desktop.

---

## 3. Landing Page Layout (Grid Studio Style)

### Structure

```
<header>
  Site name + nav
</header>

<main>
  <section class="hero">
    h1: Your name or blog name
    p: One sentence about what you write
  </section>

  <section class="grid">
    [ Post Card ]  [ About Card ]
    [ Post Card ]  [ Post Card  ]
  </section>
</main>
```

Rules:

* Max 4–6 cards visible
* One permanent “About me” card
* No infinite scroll (SEO + UX win)

---

## 4. About Page Layout

Sections in order:

1. `<h1>About</h1>`
2. Intro paragraph (who you are)
3. **Now section** (h2: “Now”)
4. Skills / Interests
5. Timeline or Projects

All content must be:

* Text-first
* Semantic HTML
* No walls of text (max 70ch width)

---

## 5. Color & Typography Constraints (Accessibility Safe)

### Color Palette Rules

Choose ONE accent color only.

#### Example (Dark theme)

* Background: `#0f1117`
* Surface cards: `#161a22`
* Text primary: `#f2f2f2`
* Text secondary: `#b3b3b3`
* Accent (choose one):

    * Cyan `#5ddcff`
    * Purple `#a78bfa`
    * Orange `#f59e0b`

Rules:

* All text contrast ratio ≥ **4.5:1**
* Headings ≥ **7:1**
* Never use accent for body text

---

### Typography

* Base font size: `16px` minimum
* Line height: `1.6`
* Max width text: `65–75ch`

Fonts:

* Sans-serif only (good accessibility):

    * Inter
    * Source Sans 3
    * System UI stack

---

## 6. Accessibility Requirements (Lighthouse 100)

### Semantic HTML (MANDATORY)

Use only:

* `<header>`
* `<nav>`
* `<main>`
* `<article>`
* `<section>`
* `<footer>`

Posts must be:

```html
<article>
  <h1>Post title</h1>
  <time datetime="2026-01-21">Jan 21, 2026</time>
  <p>...</p>
</article>
```

---

### Headings

* Exactly ONE `<h1>` per page
* No skipping levels (`h1 → h2 → h3` only)

---

### Images

All images:

```html
<img src="..." alt="Meaningful description">
```

If decorative:

```html
<img src="..." alt="" role="presentation">
```

---

### Keyboard & Focus

* All links & buttons reachable with `Tab`
* Visible focus style:

```css
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}
```

No removing outlines.

---

### Motion & Animations

* Prefer `opacity` + `transform`
* Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
    transition: none;
  }
}
```

---

## 7. SEO Requirements (Lighthouse 100)

### Metadata (Every Page)

Angular Head setup:

```html
<title>Post Title – Your Blog</title>
<meta name="description" content="Short 140–160 char summary">

<link rel="canonical" href="https://yourdomain.com/post/slug">
```

---

### Open Graph + Twitter

Every post page:

```html
<meta property="og:title" content="Post title">
<meta property="og:description" content="Post summary">
<meta property="og:type" content="article">
<meta property="og:url" content="...">

<meta name="twitter:card" content="summary_large_image">
```

---

### Structured Data (Huge SEO Boost)

Add JSON-LD for blog posts:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post title",
  "datePublished": "2026-01-21",
  "author": {
    "@type": "Person",
    "name": "Your Name"
  }
}
</script>
```

---

### Content Rules

* One `<article>` per post
* Titles ≤ 60 characters
* Description 140–160 chars
* Use real text, no text in images
* Internal links between posts

---

## 8. Performance Rules (to keep SEO + UX high)

* No images > 300kb
* Use:

    * `loading="lazy"` on images
    * `decoding="async"`

Angular:

* Enable SSR (Angular Universal) → HUGE SEO win
* Use route-level meta resolvers

---

## 9. Angular Component Architecture

Recommended structure:

```
/core
  header.component
  footer.component

/pages
  landing.component
  about.component
  post.component

/components
  post-card.component
  now-widget.component
  tag-pill.component
```

Each card:

```html
<article class="post-card">
  <h2>
    <a [routerLink]="['/post', post.slug]">
      {{ post.title }}
    </a>
  </h2>
  <p>{{ post.excerpt }}</p>
  <time [attr.datetime]="post.dateISO">{{ post.dateHuman }}</time>
</article>
```

---

## 10. Lighthouse Final Checklist (Before Launch)

### Accessibility

* [ ] All images have alt
* [ ] Contrast ≥ 4.5:1
* [ ] One h1 per page
* [ ] Keyboard navigation works
* [ ] Focus visible

### SEO

* [ ] Title + description on all pages
* [ ] Canonical URLs
* [ ] JSON-LD present
* [ ] Semantic HTML
* [ ] SSR enabled

### Best Practices

* [ ] HTTPS
* [ ] No console errors
* [ ] No deprecated APIs
