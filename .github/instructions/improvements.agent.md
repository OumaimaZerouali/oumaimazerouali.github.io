---
description: 'Expert assistant for improving this blog'
model: Claude Haiku 4.5 
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

# Jekyll Website Improvement Instructions

### Context

## 2️⃣ Add commenting system (Giscus)

**Goal:** Enable user comments using **Giscus**.

**Instructions:**

* Add the official Giscus script in the post layout (`post.html`) or after post content:

```html
<div id="comments">
  <script src="https://giscus.app/client.js"
          data-repo="YOUR_USERNAME/YOUR_REPO"
          data-repo-id="REPO_ID"
          data-category="Comments"
          data-category-id="CATEGORY_ID"
          data-mapping="pathname"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-theme="preferred_color_scheme"
          crossorigin="anonymous"
          async>
  </script>
</div>
```

* Replace placeholders (`YOUR_USERNAME/YOUR_REPO`, `REPO_ID`, `CATEGORY_ID`) with Giscus repository info.
* Style the `#comments` container to match your site.

---

## 3️⃣ Add Google Analytics

**Goal:** Track pageviews and user behavior.

**Instructions:**

* Use **GA4**.
* Add the official Google Analytics script to `_includes/head.html` or `_layouts/default.html` inside `<head>`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID', { 'anonymize_ip': true });
</script>
```

* Replace `GA_MEASUREMENT_ID` with your GA tracking ID.
* Optionally, respect cookie consent before firing analytics events.

---

## 4️⃣ Cookie consent (“We use analytics”) banner

**Goal:** Inform users about analytics and get consent (Dutch / English).

**Instructions:**

* Add a **cookie banner component** (can be a partial `_includes/cookie-banner.html`):

```html
<div id="cookie-banner" class="cookie-banner">
  <p data-lang-en>We use cookies to improve your experience. Can we use analytics cookies?</p>
  <p data-lang-nl>We gebruiken cookies om je ervaring te verbeteren. Mogen we analytics-cookies gebruiken?</p>
  <button id="cookie-accept">Yes</button>
  <button id="cookie-decline">No</button>
</div>
```

* Use JS to store consent in `localStorage` or `cookies`.
* Only load **Google Analytics / Giscus** if consent given.
* Respect language: toggle `data-lang-en` / `data-lang-nl` based on `current_lang`.
* Style banner to be visible but non-intrusive.
* They can always change their consent later via a link in the footer.
* Add link to the footer to the left so that footer does not change

---

## 5️⃣ Additional Frontend / CSS improvements

Make sure every post detail page is mobile friendly and looks good on all screen sizes. Test and adjust CSS as necessary.
I have tested it on my phone and some are good others need adjustments.

I want the tags and date on the post cards to always be at the bottom of the card, regardless of content height. Ensure the CSS uses flexbox or grid to achieve this layout. But only for the posts page cards, not the featured posts on the homepage.

We also want to add related posts in a post detail, so that at the end of each blog post, there are links to 3 related posts based on shared tags. Please implement this feature in the post layout.

We want to be able to copy code snippets easily. Please add a "copy" button to each code block in the blog posts that allows users to copy the code to their clipboard.

Maybe also the posibility to create a PR for suggested changes in blog posts directly from the blog post page. Add a button that opens a new PR on GitHub with the changes.

Finally, ensure that all images in blog posts are responsive and scale correctly on different screen sizes. Update the CSS or HTML as necessary to achieve this.

