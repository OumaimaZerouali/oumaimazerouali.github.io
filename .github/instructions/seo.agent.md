---
description: 'Expert assistant for SEO and JSON-LD implementation on a technical blog / portfolio website.'
model: GPT-4.1
tools: ['changes', 'codebase', 'edit/editFiles', 'extensions', 'web/fetch', 'findTestFiles', 'githubRepo', 'new', 'openSimpleBrowser', 'problems', 'runCommands', 'runTasks', 'runTests', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure', 'usages', 'vscodeAPI']
---
# Copilot Instructions — SEO & JSON-LD for this Website

You are an AI coding assistant contributing to this website.

This website is a technical blog / portfolio site focused on software engineering topics.
SEO quality and correct use of structured data (JSON-LD) are mandatory for all pages.

Follow the instructions below strictly whenever you generate or modify HTML, templates, layouts, or components that affect page metadata or structured data.

---

## 1. General SEO Requirements (Always Apply)

For every page that represents a standalone document (blog post, article, landing page, static page):

- Always include:
  - A unique and descriptive `<title>` tag (max ~60 characters).
  - A `<meta name="description">` with a human-readable summary (max ~160 characters).
  - A canonical URL using `<link rel="canonical">`.

- Headings:
  - Exactly one `<h1>` per page.
  - Use semantic heading order (`h2`, `h3`, …) without skipping levels.

- Semantic HTML:
  - Prefer `<article>`, `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>` where appropriate.
  - Avoid div-only layouts when a semantic tag exists.

- Images:
  - Always include meaningful `alt` attributes.
  - Use descriptive file names where possible.

---

## 2. JSON-LD Is Mandatory for Content Pages

Structured data must be added using **JSON-LD only** (never Microdata or RDFa).

JSON-LD must be:

- Placed in the `<head>` or at the end of `<body>`.
- Valid according to https://schema.org.
- Syntactically correct JSON (no trailing commas, no comments).
- Reflecting real visible content (never invent data just for SEO).

JSON-LD is used for **understanding and enrichment**, not as a ranking trick.

---

## 3. Blog Posts / Articles — Required JSON-LD

For every blog post or article page, always generate an `Article` or `BlogPosting` schema.

Minimum required fields:

- `@context`: "https://schema.org"
- `@type`: "BlogPosting" (preferred) or "Article"
- `headline`: exact page title
- `description`: same meaning as meta description
- `author`:
  - `@type`: "Person"
  - `name`: site author name
- `datePublished`: ISO-8601 date string
- `dateModified`: ISO-8601 date string (update when content changes)
- `mainEntityOfPage`: canonical URL
- `publisher`:
  - `@type`: "Organization"
  - `name`: site name
  - `logo` (if available, as ImageObject)
- `image` (if the article has a hero image)

Example pattern:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Exact article title",
  "description": "Short summary shown in meta description",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2026-01-22",
  "dateModified": "2026-01-22",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/posts/slug"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Site Name"
  }
}
````

---

## 4. Homepage — Required JSON-LD

The homepage must include:

* A `WebSite` schema with:

    * `name`
    * `url`
    * `publisher`

If a personal site:

* Also include a `Person` schema describing the site owner.

---

## 5. Do NOT Abuse Structured Data

Strict rules:

* Never add fake reviews, ratings, FAQ, breadcrumbs, or how-to schemas unless the content actually contains them.
* Never add fields that are not visible on the page.
* Never stuff keywords into JSON-LD.
* JSON-LD must reflect the real content exactly.

This site follows the principle:

> “JSON-LD is not an SEO trick. It is a communication layer for search engines.”

---

## 6. Validation Is Required

Whenever JSON-LD is added or modified:

* Ensure it passes:

    * Google Rich Results Test
    * Schema.org validator

Invalid or misleading structured data is considered a bug.

---

## 7. Output Expectations for Copilot

When generating new pages, blog templates, or components:

* Always include:

    * Meta title
    * Meta description
    * Canonical link
    * Correct JSON-LD block

If information (author, date, image, publisher) is missing:

* Ask for it or leave placeholders clearly marked.
* Never invent personal data.

---

End of instructions
