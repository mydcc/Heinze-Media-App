# HEINZE MEDIA - Quick Reference Card

**Schnellzugriff für Entwicklung**

---

## 🎨 Theme System

### Theme-Klassen

```html
<body class="theme-meteorite" data-mode="dark">
<body class="theme-steel" data-mode="light">
<body class="theme-ever" data-mode="dark">
<body class="theme-insight" data-mode="dark">
```

### Theme State (Svelte 5)

```typescript
import { themeState } from '$lib/state/theme.svelte';

// Theme setzen
themeState.setTheme('steel');

// Mode togglen
themeState.toggleMode();

// Auslesen
console.log(themeState.theme);      // 'steel'
console.log(themeState.isDarkMode); // true
```

---

## 🎨 Farben (CSS-Variablen)

### Core Colors

```css
--core-primary        /* Theme-spezifisch: Purple/Blue/Green/Red */
--core-base           /* #433f65 - Meteorite (alle Themes) */
```

### Backgrounds

```css
--bg-body            /* Main background mit Gradient */
--bg-surface         /* Card/Component BG */
--bg-surface-2       /* Alternative BG */
--bg-primary         /* Hero/Feature BG */
--bg-footer          /* Footer BG */
```

### Text Colors

```css
--text-main          /* Primary text color */
--text-muted         /* Secondary/muted text */
--text-tertiary      /* Least important text */
```

### Semantic Colors

```css
--color-accent       /* Brand accent (CTA, links) */
--color-border       /* Border color */
--color-success      /* #22c55e */
--color-warning      /* #f59e0b */
--color-error        /* #ef4444 */
--color-info         /* #3b82f6 */
```

### Button Colors

```css
--btn-primary-bg     /* Primary button BG */
--btn-primary-text   /* Primary button text */
--btn-secondary-bg   /* Secondary button BG */
--btn-secondary-text /* Secondary button text */
```

---

## ✍️ Typografie

### Font Families

```css
--font-heading: "Montserrat", sans-serif;
--font-sans: "Inter", sans-serif;
```

### Heading Sizes

```css
--text-h1: 80px;     /* Hero titles */
--text-h2: 54px;     /* Section headers */
--text-h3: 34px;     /* Subsection headers */
--text-h4: 22px;     /* Card titles */
```

### Body Text

```css
--text-base: 1rem;     /* 16px - Standard */
--text-sm: 0.875rem;   /* 14px - Small */
--text-xs: 0.75rem;    /* 12px - Tiny */
--text-lg: 1.25rem;    /* 20px - Large */
--text-xl: 1.5rem;     /* 24px - XL */
```

### Line Heights

```css
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

---

## 📐 Spacing

### Standard Scale

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
```

### Custom Spacing

```css
--spacing-gutter: 1.5rem;   /* 24px - Standard Gutter */
--spacing-section: 4rem;     /* 64px - Section Padding */
```

---

## 🧩 Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 1rem;      /* 16px */
--radius-xl: 1.5rem;    /* 24px */
--radius-full: 9999px;  /* Pills */
```

---

## ✨ Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

/* Glow Effects */
--shadow-glow-purple: 0 0 20px rgba(78, 33, 231, 0.5);
--shadow-glow-blue: 0 0 20px rgba(51, 78, 255, 0.5);
--shadow-glow-green: 0 0 20px rgba(13, 164, 154, 0.5);
--shadow-glow-red: 0 0 20px rgba(238, 72, 95, 0.5);
```

---

## ⏱️ Transitions

```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

/* Easing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

---

## 🧩 Component Patterns (Svelte 5)

### Button

```svelte
<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
</script>

<Button variant="primary" size="md" href="/contact">
  Get Started
</Button>

<Button variant="secondary" onclick={() => alert('Clicked!')}>
  Learn More
</Button>
```

### Card

```svelte
<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
</script>

<Card
  title="Service Title"
  description="Service description..."
  image="/images/services/xr-studio/hero.jpg"
  href="/services/xr-studio"
  theme="steel"
/>
```

### Navigation

```svelte
<script lang="ts">
  import Navigation from '$lib/components/layout/Navigation.svelte';
</script>

<Navigation />
```

---

## 📄 Content Structure

### Page Frontmatter

```yaml
---
title: "Page Title"
slug: "page-slug"
type: "page"
date: "2026-01-25"
excerpt: "Short description"
---
```

### Blog Post Frontmatter

```yaml
---
title: "Blog Post Title"
slug: "blog-post-slug"
type: "post"
date: "2026-01-25"
categories: ["XR", "Metaverse"]
tags: ["webxr", "threlte"]
image: "/images/blog/2024/featured.jpg"
excerpt: "Post excerpt..."
---
```

---

## 🔍 SEO Integration

### SEOHead Component

```svelte
<script lang="ts">
  import SEOHead from '$lib/components/SEOHead.svelte';
  import type { SEOConfig } from '$lib/seo/schema';

  const seoConfig: SEOConfig = {
    title: 'Page Title | HEINZE MEDIA',
    description: 'Meta description...',
    keywords: ['keyword1', 'keyword2'],
    url: 'https://heinze.media/page',
    type: 'website',
    image: 'https://heinze.media/og-image.png',
    author: 'HEINZE MEDIA'
  };
</script>

<SEOHead config={seoConfig} />
```

---

## 📁 File Structure Reference

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/              # Base Components
│   │   │   ├── Button.svelte
│   │   │   ├── Card.svelte
│   │   │   └── Input.svelte
│   │   ├── layout/          # Layout Components
│   │   │   ├── Navigation.svelte
│   │   │   ├── Footer.svelte
│   │   │   └── Hero.svelte
│   │   ├── content/         # Content Components
│   │   │   ├── BlogPostCard.svelte
│   │   │   └── WorkItem.svelte
│   │   └── SEOHead.svelte
│   ├── state/
│   │   └── theme.svelte.ts  # Theme State Management
│   ├── seo/
│   │   └── schema.ts        # JSON-LD Schema
│   └── data/                # Static Data
├── content/
│   ├── pages/               # Markdown Pages
│   ├── blog/                # Blog Posts
│   └── work/                # Portfolio Items
└── routes/
    ├── +layout.svelte       # Root Layout
    ├── +page.svelte         # Homepage
    ├── blog/
    ├── work/
    └── services/
```

---

## 🎯 Theme Zuordnung

| Theme | Verwendung | Primary Color |
|-------|-----------|---------------|
| **Meteorite** | Blog, Generic Pages | Purple `#4e21e7` |
| **Steel** | Services, B2B, XR Studio | Blue `#334eff` |
| **Ever** | Community, Free Offers | Green `#0da49a` |
| **Insight** | Special Deals, LLPs | Red `#ee485f` |

---

## 🚀 Development Commands

```bash
# Start Dev Server
npm run dev

# Build Production
npm run build

# Preview Build
npm run preview

# Type Check
npm run check

# Run Script
node scripts/analyze-xml.js
node scripts/extract-content.js
node scripts/organize-images.js
```

---

## 📚 Key Documents

- `SYSTEM_BRAND_GUIDELINES.md` - Vollständiges Design System
- `DEVELOPMENT.md` - Development Guide
- `BRAND GUIDELINES.md` - Original Brand Guidelines

---

## 🎨 Hex Color Reference

### Meteorite (Purple)

- Primary: `#4e21e7`
- Dark: `#0c082f`
- Light: `#ede8fd`
- Highlight: `#7383f5`

### Steel (Blue)

- Primary: `#334eff`
- Dark: `#08103f`
- Light: `#eaedff`
- Highlight: `#80b8f2`

### Ever (Green)

- Primary: `#0da49a`
- Dark: `#002039`
- Light: `#e6f6f5`
- Highlight: `#48b0b2`

### Insight (Red)

- Primary: `#ee485f`
- Dark: `#0f0523`
- Light: `#feecef`
- Highlight: `#fa9de7`

### Base

- Meteorite: `#433f65`
- White: `#ffffff`
- Light Grey: `#f8f9fb`

---

**Last Updated:** 25. Januar 2026
