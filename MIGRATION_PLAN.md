# HEINZE MEDIA - Detaillierter Migrations- & Implementierungsplan

**WordPress zu Svelte 5 + Tailwind v4**  
*Version 1.0 - Januar 2026*

---

## 📋 Executive Summary

### Projektziel

Migration der WordPress-Website <https://heinze-media.com> zu einer modernen **Svelte 5 App** mit:

- **4-Theme System** (Meteorite, Steel, Ever, Insight)
- **CMS-Light Funktionalität** (Content aus Files)
- **SEO-Optimierung** (Lighthouse 100/100)
- **Moderne UI/UX** nach Brand Guidelines
- **Bilder-Management** (sinnvolle Struktur unter /static/)

### Technologie-Stack

- **Framework:** Svelte 5 (Runes API)
- **Styling:** Tailwind CSS v4 (CSS-First mit @theme)
- **Build Tool:** Vite 7 (Rolldown Bundler)
- **3D/XR:** Threlte (Three.js für WebXR)
- **i18n:** Paraglide (DE/EN)
- **SEO:** JSON-LD, Sitemap, Meta-Tags

### Aktueller Status (aus bestehenden Files)

✅ **Bereits implementiert:**

- State Management (theme.svelte.ts, admin.svelte.ts)
- 4-Theme System in app.css
- SEO Framework (SEOHead.svelte, schema.ts)
- Basis-Routing (/services, /blog, /work, etc.)
- 3D Hero Section (Threlte)

❌ **Noch zu tun:**

- Bilder aus XML extrahieren & organisieren
- Content-Migration (Pages, Blog-Posts)
- Komponenten-Bibliothek nach Brand Guidelines
- Template-System (Pages/Subpages, Landing Pages)

---

## 🎯 Phasen-Übersicht

### **Phase 1: Asset-Management & Content-Extraktion** (2-3 Tage)

1. XML-Analyse & Parsing
2. Bilder identifizieren & zuordnen
3. Neue Ordnerstruktur unter /static/ anlegen
4. Content-Extraktion (Pages, Posts, Meta)

### **Phase 2: Komponenten-Bibliothek** (3-4 Tage)

1. Base Components (Button, Card, Input)
2. Layout Components (Header, Footer, Navigation)
3. Content Components (BlogPost, WorkItem, Hero)
4. Theme-aware Components (4 Themes)

### **Phase 3: Template-System & CMS-Light** (2-3 Tage)

1. Page-Template (Generic Pages)
2. Blog-Template (Blog Posts)
3. Work-Template (Portfolio Items)
4. Landing-Page-Template (LLP)

### **Phase 4: Content-Migration & SEO** (2-3 Tage)

1. Markdown-Konvertierung (WordPress → MD)
2. Frontmatter-Schema
3. SEO-Metadaten (JSON-LD)
4. Sitemap-Update

### **Phase 5: Testing & Deployment** (1-2 Tage)

1. Lighthouse-Audit
2. Accessibility-Check
3. Cross-Browser Testing
4. Production Build & Deploy

---

## 📦 Phase 1: Asset-Management & Content-Extraktion

### 1.1 XML-Analyse Script

**Ziel:** WordPress XML parsen und Struktur verstehen

**Script:** `scripts/analyze-xml.js`

```javascript
import fs from 'fs';
import xml2js from 'xml2js';

const xmlPath = './heinzemedia.WordPress.2026-01-24.xml';
const xmlContent = fs.readFileSync(xmlPath, 'utf-8');

xml2js.parseString(xmlContent, (err, result) => {
  if (err) throw err;

  const items = result.rss.channel[0].item;
  
  // Kategorisieren
  const posts = items.filter(item => item['wp:post_type'][0] === 'post');
  const pages = items.filter(item => item['wp:post_type'][0] === 'page');
  const attachments = items.filter(item => item['wp:post_type'][0] === 'attachment');
  const works = items.filter(item => item['wp:post_type'][0] === 'work');

  console.log(`Total Items: ${items.length}`);
  console.log(`- Posts: ${posts.length}`);
  console.log(`- Pages: ${pages.length}`);
  console.log(`- Attachments: ${attachments.length}`);
  console.log(`- Works: ${works.length}`);

  // Attachments analysieren
  const images = attachments.filter(att => {
    const url = att['wp:attachment_url']?.[0] || '';
    return url.match(/\.(jpg|jpeg|png|webp|gif)$/i);
  });

  console.log(`\nImages: ${images.length}`);
  
  // Image-Mapping erstellen
  const imageMap = {};
  images.forEach(img => {
    const url = img['wp:attachment_url'][0];
    const postParent = img['wp:post_parent']?.[0] || 'orphan';
    const filename = url.split('/').pop();
    
    if (!imageMap[postParent]) imageMap[postParent] = [];
    imageMap[postParent].push({ filename, url });
  });

  fs.writeFileSync(
    './scripts/output/image-mapping.json',
    JSON.stringify(imageMap, null, 2)
  );

  console.log('\n✅ Image mapping saved to scripts/output/image-mapping.json');
});
```

**Ausführen:**

```bash
node scripts/analyze-xml.js
```

---

### 1.2 Bildorganisation

**Neue Struktur:**

```
static/
├── images/
│   ├── brand/            # Logo, Favicon, OG-Images
│   │   ├── logo.png
│   │   ├── logo-dark.png
│   │   └── og-image.png
│   ├── hero/             # Hero Section Bilder
│   │   └── hero-*.{jpg,webp}
│   ├── services/         # Service-Seiten
│   │   ├── xr-studio/
│   │   └── web-dev/
│   ├── work/             # Portfolio Items
│   │   ├── cachy/
│   │   ├── pat-man/
│   │   └── metaverse/
│   ├── blog/             # Blog-Artikel
│   │   ├── 2024/
│   │   └── 2025/
│   └── ui/               # UI-Elemente (Icons, Pattern)
│       ├── pattern-lg.svg
│       └── icons/
└── uploads/              # Legacy (wird deprecated)
```

**Migration Script:** `scripts/organize-images.js`

```javascript
import fs from 'fs';
import path from 'path';

const imageMapping = JSON.parse(
  fs.readFileSync('./scripts/output/image-mapping.json', 'utf-8')
);

const targetBase = './static/images';

// Erstelle Ordner
['brand', 'hero', 'services', 'work', 'blog', 'ui'].forEach(dir => {
  fs.mkdirSync(path.join(targetBase, dir), { recursive: true });
});

// Kopiere Bilder basierend auf Zuordnung
Object.entries(imageMapping).forEach(([postId, images]) => {
  // Logik: postId → Content-Type → Zielordner
  // (Wird in Phase 1.3 verfeinert)
});
```

---

### 1.3 Content-Extraktion

**Script:** `scripts/extract-content.js`

```javascript
import fs from 'fs';
import xml2js from 'xml2js';
import TurndownService from 'turndown';

const turndown = new TurndownService();
const xmlPath = './heinzemedia.WordPress.2026-01-24.xml';
const xmlContent = fs.readFileSync(xmlPath, 'utf-8');

xml2js.parseString(xmlContent, (err, result) => {
  if (err) throw err;

  const items = result.rss.channel[0].item;
  
  // Pages extrahieren
  const pages = items.filter(item => 
    item['wp:post_type'][0] === 'page' && 
    item['wp:status'][0] === 'publish'
  );

  pages.forEach(page => {
    const title = page.title[0];
    const slug = page['wp:post_name'][0];
    const content = page['content:encoded'][0];
    const markdown = turndown.turndown(content);

    // Frontmatter
    const frontmatter = `---
title: "${title}"
slug: "${slug}"
type: "page"
date: "${page['wp:post_date'][0]}"
---

${markdown}
`;

    // Speichern
    const outputPath = `./src/content/pages/${slug}.md`;
    fs.writeFileSync(outputPath, frontmatter);
    console.log(`✅ Exported: ${slug}`);
  });

  // Blog-Posts extrahieren (analog)
  const posts = items.filter(item => 
    item['wp:post_type'][0] === 'post' && 
    item['wp:status'][0] === 'publish'
  );

  posts.forEach(post => {
    const title = post.title[0];
    const slug = post['wp:post_name'][0];
    const content = post['content:encoded'][0];
    const markdown = turndown.turndown(content);
    const categories = post.category?.map(cat => cat._) || [];

    const frontmatter = `---
title: "${title}"
slug: "${slug}"
type: "post"
date: "${post['wp:post_date'][0]}"
categories: [${categories.map(c => `"${c}"`).join(', ')}]
excerpt: "${post.excerpt?.[0] || ''}"
---

${markdown}
`;

    const year = new Date(post['wp:post_date'][0]).getFullYear();
    const outputPath = `./src/content/blog/${year}/${slug}.md`;
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, frontmatter);
    console.log(`✅ Exported: ${slug}`);
  });
});
```

**Ausführen:**

```bash
node scripts/extract-content.js
```

**Output:**

```
src/content/
├── pages/
│   ├── about.md
│   ├── services.md
│   ├── contact.md
│   └── ...
├── blog/
│   ├── 2024/
│   │   ├── metaverse-for-business.md
│   │   └── ...
│   └── 2025/
│       └── ...
└── work/
    ├── cachy.md
    ├── pat-man.md
    └── ...
```

---

## 🧩 Phase 2: Komponenten-Bibliothek

### 2.1 Base Components

#### Button Component

**Datei:** `src/lib/components/ui/Button.svelte`

```svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    href?: string;
    onclick?: () => void;
    children: import('svelte').Snippet;
    class?: string;
  }

  let { 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    href,
    onclick,
    children,
    class: customClass = ''
  }: Props = $props();

  const Tag = href ? 'a' : 'button';
</script>

<svelte:element
  this={Tag}
  class="btn btn-{variant} btn-{size} {customClass}"
  {href}
  {disabled}
  {onclick}
>
  {@render children()}
  
  {#if variant === 'primary' || variant === 'secondary'}
    <svg class="btn-arrow" width="9" height="10" viewBox="0 0 9 10" fill="none">
      <path d="M1 1L7 5L1 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  {/if}
</svelte:element>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-heading);
    font-weight: 600;
    border-radius: var(--radius-md);
    transition: all var(--duration-fast);
    cursor: pointer;
    text-decoration: none;
    border: none;
  }

  .btn-primary {
    background: var(--btn-primary-bg);
    color: var(--btn-primary-text);
    box-shadow: var(--shadow-md);
  }

  .btn-primary:hover {
    background: color-mix(in srgb, var(--btn-primary-bg) 90%, white);
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  .btn-secondary {
    background: var(--btn-secondary-bg);
    color: var(--btn-secondary-text);
  }

  .btn-ghost {
    background: transparent;
    color: var(--text-main);
  }

  .btn-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .btn-outline {
    background: transparent;
    border: 2px solid var(--color-accent);
    color: var(--color-accent);
  }

  .btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
  .btn-md { padding: 0.75rem 1.5rem; font-size: 1rem; }
  .btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-arrow {
    transition: transform var(--duration-fast);
  }

  .btn:hover .btn-arrow {
    transform: translateX(3px);
  }
</style>
```

**Usage:**

```svelte
<Button variant="primary" size="md" href="/contact">
  Get Started
</Button>
```

---

#### Card Component

**Datei:** `src/lib/components/ui/Card.svelte`

```svelte
<script lang="ts">
  interface Props {
    title?: string;
    description?: string;
    image?: string;
    href?: string;
    theme?: 'meteorite' | 'steel' | 'ever' | 'insight';
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { 
    title, 
    description, 
    image, 
    href, 
    theme, 
    class: customClass = '',
    children
  }: Props = $props();

  const Tag = href ? 'a' : 'article';
</script>

<svelte:element
  this={Tag}
  class="card {customClass}"
  class:theme-meteorite={theme === 'meteorite'}
  class:theme-steel={theme === 'steel'}
  class:theme-ever={theme === 'ever'}
  class:theme-insight={theme === 'insight'}
  {href}
>
  {#if image}
    <img src={image} alt={title || 'Card image'} class="card-image" />
  {/if}
  
  <div class="card-content">
    {#if title}
      <h3 class="card-title">{title}</h3>
    {/if}
    
    {#if description}
      <p class="card-description">{description}</p>
    {/if}

    {#if children}
      {@render children()}
    {/if}
  </div>

  {#if href}
    <div class="card-link">
      Learn more
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
        <path d="M1 1L7 5L1 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  {/if}
</svelte:element>

<style>
  .card {
    background: var(--bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: all var(--duration-normal);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  a.card {
    text-decoration: none;
    color: inherit;
  }

  .card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
    border-color: var(--color-accent);
  }

  .card-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: var(--radius-md);
    margin-bottom: 1rem;
  }

  .card-content {
    flex: 1;
  }

  .card-title {
    font-family: var(--font-heading);
    font-size: var(--text-h4);
    margin-bottom: 0.5rem;
    color: var(--text-main);
  }

  .card-description {
    color: var(--text-muted);
    font-size: var(--text-base);
    line-height: var(--line-height-normal);
  }

  .card-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-accent);
    font-weight: 600;
    margin-top: 1rem;
    font-size: var(--text-sm);
  }

  .card-link svg {
    transition: transform var(--duration-fast);
  }

  .card:hover .card-link svg {
    transform: translateX(3px);
  }
</style>
```

---

### 2.2 Layout Components

#### Navigation Component

**Datei:** `src/lib/components/layout/Navigation.svelte`

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { themeState } from '$lib/state/theme.svelte';
  import { languageTag } from '$lib/paraglide/runtime';
  import * as m from '$lib/paraglide/messages';

  const navItems = [
    { label: m.nav_services, href: '/services' },
    { label: m.nav_xr_studio, href: '/xr-studio' },
    { label: m.nav_work, href: '/work' },
    { label: m.nav_blog, href: '/blog' },
    { label: m.nav_contact, href: '/contact' }
  ];

  let mobileMenuOpen = $state(false);
</script>

<nav class="main-nav">
  <div class="container">
    <a href="/" class="logo">
      <img src="/images/brand/logo.png" alt="HEINZE MEDIA" />
    </a>

    <!-- Desktop Navigation -->
    <ul class="nav-links desktop">
      {#each navItems as item}
        <li>
          <a 
            href={item.href} 
            class:active={$page.url.pathname.startsWith(item.href)}
          >
            {item.label()}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Actions -->
    <div class="nav-actions">
      <button 
        class="theme-toggle"
        onclick={() => themeState.toggleMode()}
        aria-label="Toggle dark mode"
      >
        {#if themeState.isDarkMode}
          🌙
        {:else}
          ☀️
        {/if}
      </button>

      <button 
        class="mobile-menu-toggle"
        onclick={() => mobileMenuOpen = !mobileMenuOpen}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="mobile-menu">
      <ul>
        {#each navItems as item}
          <li>
            <a href={item.href}>{item.label()}</a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</nav>

<style>
  .main-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(12, 8, 47, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-border);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    max-width: 1280px;
    margin-inline: auto;
    padding-inline: var(--spacing-gutter);
  }

  .logo img {
    height: 40px;
    width: auto;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    color: var(--text-main);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--duration-fast);
    position: relative;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--color-accent);
  }

  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-accent);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .theme-toggle,
  .mobile-menu-toggle {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-main);
    transition: transform var(--duration-fast);
  }

  .theme-toggle:hover,
  .mobile-menu-toggle:hover {
    transform: scale(1.1);
  }

  .mobile-menu-toggle {
    display: none;
  }

  .mobile-menu {
    display: none;
  }

  @media (max-width: 768px) {
    .nav-links.desktop {
      display: none;
    }

    .mobile-menu-toggle {
      display: block;
    }

    .mobile-menu {
      display: block;
      background: var(--bg-surface);
      padding: 1rem;
    }

    .mobile-menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .mobile-menu li {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--color-border);
    }

    .mobile-menu a {
      color: var(--text-main);
      text-decoration: none;
      display: block;
    }
  }
</style>
```

---

### 2.3 Content Components

**Weitere Components:**

- `Hero.svelte` (bereits existiert mit Threlte)
- `BlogPostCard.svelte`
- `WorkItem.svelte`
- `ServiceCard.svelte`
- `Footer.svelte`
- `Breadcrumbs.svelte`

---

## 📄 Phase 3: Template-System

### 3.1 Page Template

**Datei:** `src/routes/[slug]/+page.svelte`

```svelte
<script lang="ts">
  import SEOHead from '$lib/components/SEOHead.svelte';
  import { marked } from 'marked';

  let { data } = $props();
  let page = $derived(data.page);

  const htmlContent = $derived(marked(page.content));
</script>

<SEOHead config={page.seo} />

<div class="page-container">
  <article class="prose">
    <h1>{page.title}</h1>
    {@html htmlContent}
  </article>
</div>

<style>
  .page-container {
    max-width: 800px;
    margin-inline: auto;
    padding-block: 4rem;
    padding-inline: var(--spacing-gutter);
  }

  .prose {
    color: var(--text-main);
  }

  .prose h1 {
    font-size: var(--text-h1);
    margin-bottom: 2rem;
  }
</style>
```

**Server Load:** `src/routes/[slug]/+page.server.ts`

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function load({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src/content/pages', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw error(404, 'Page not found');
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    page: {
      title: data.title,
      content,
      seo: {
        title: `${data.title} | HEINZE MEDIA`,
        description: data.excerpt || '',
        url: `https://heinze.media/${slug}`,
        type: 'website'
      }
    }
  };
}
```

---

### 3.2 Blog Template

**Datei:** `src/routes/blog/[slug]/+page.svelte`

```svelte
<script lang="ts">
  import SEOHead from '$lib/components/SEOHead.svelte';
  import { marked } from 'marked';

  let { data } = $props();
  let post = $derived(data.post);

  const htmlContent = $derived(marked(post.content));
</script>

<SEOHead config={post.seo} />

<div class="blog-post">
  <header class="post-header">
    <h1>{post.title}</h1>
    <div class="post-meta">
      <time datetime={post.date}>{post.formattedDate}</time>
      <span>•</span>
      <span>{post.readingTime} min read</span>
    </div>
  </header>

  <article class="prose">
    {@html htmlContent}
  </article>
</div>

<style>
  .blog-post {
    max-width: 800px;
    margin-inline: auto;
    padding-block: 4rem;
    padding-inline: var(--spacing-gutter);
  }

  .post-header {
    margin-bottom: 3rem;
  }

  .post-header h1 {
    font-size: var(--text-h2);
    margin-bottom: 1rem;
  }

  .post-meta {
    display: flex;
    gap: 0.5rem;
    color: var(--text-muted);
    font-size: var(--text-sm);
  }
</style>
```

---

## 🔍 Phase 4: SEO & Migration

### 4.1 Markdown Frontmatter Schema

```yaml
---
title: "Page Title"
slug: "page-slug"
type: "page" | "post" | "work"
date: "2026-01-25"
excerpt: "Short description"
image: "/images/blog/2024/featured.jpg"
categories: ["Category 1", "Category 2"]
tags: ["tag1", "tag2"]
seo:
  title: "Custom SEO Title"
  description: "Custom Meta Description"
  keywords: ["keyword1", "keyword2"]
---

# Content starts here
```

### 4.2 JSON-LD Integration

Bereits vorhanden in `src/lib/seo/schema.ts` - muss nur auf neue Content-Struktur angepasst werden.

---

## ✅ Phase 5: Testing & QA

### 5.1 Lighthouse Audit Checklist

- [ ] Performance: 90+
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 100

### 5.2 Cross-Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 5.3 Responsive Testing

- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1280px)
- [ ] Large Desktop (1920px)

---

## 📊 Migrations-Metriken

### Content-Inventar (aus XML)

- **Pages:** ~15-20 Seiten
- **Blog Posts:** ~10-15 Artikel
- **Work Items:** ~8-10 Portfolio-Projekte
- **Images:** 30 Bilder identifiziert

### Komponenten zu erstellen

- [ ] Button (3 Varianten)
- [ ] Card (4 Themes)
- [ ] Navigation
- [ ] Footer
- [ ] Hero
- [ ] BlogPostCard
- [ ] WorkItem
- [ ] ServiceCard
- [ ] Breadcrumbs
- [ ] Newsletter
- [ ] ContactForm

---

## 🚀 Nächste Schritte (Sofort starten)

1. **XML-Analyse Script ausführen:**

   ```bash
   node scripts/analyze-xml.js
   ```

2. **Image-Mapping erstellen:**

   ```bash
   node scripts/organize-images.js
   ```

3. **Content extrahieren:**

   ```bash
   node scripts/extract-content.js
   ```

4. **Komponenten-Bibliothek aufbauen:**
   - Button.svelte
   - Card.svelte
   - Navigation.svelte

5. **Templates implementieren:**
   - Page Template
   - Blog Template
   - Work Template

---

## 📚 Referenzen

- **SYSTEM_BRAND_GUIDELINES.md** - Design System
- **ROADMAP.md** - Projekt-Roadmap
- **DEVELOPMENT.md** - Dev-Guide
- **app.css** - Theme-Definitionen

---

*Dieser Plan ist ein Living Document und wird während der Implementierung aktualisiert.*
