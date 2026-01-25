# 🌟 HEINZE MEDIA - Modernized Web Application

> **Cutting-Edge XR/AR/VR Solutions & Metaverse Integration**

A bleeding-edge SvelteKit application featuring Svelte 5, Tailwind CSS v4, and a comprehensive SEO framework for immersive 3D web experiences.

## 🚀 Tech Stack

- **Framework:** Svelte 5.45.6 (Full Runes Syntax)
- **Build Tool:** Vite 7.2.6 (Rolldown)
- **Styling:** Tailwind CSS 4.1.18 (CSS-First)
- **Runtime:** Node 20.19+
- **3D Graphics:** Threlte 8.3.1 + three.js 0.182.0
- **Internationalization:** Inlang Paraglide 2.9.1

## 📦 Quick Start

```bash
# Installation
npm install

# Development
npm run dev

# Production Build
npm run build

# Preview Build
npm run preview

# Type Check
npm run check
```

## ✨ Features

### Phase 1-3: Completed ✅

#### State Management (Svelte 5 Runes)

- `$state` for reactive data
- `$derived` for computed values
- `$effect` for side effects
- No legacy syntax

#### Tailwind v4 CSS-First

- 4-Theme System (Meteorite, Steel, Ever, Insight)
- Dark/Light Mode Support
- Complete Typography Scale
- Responsive Design (Mobile-First)

#### SEO Framework

- Automatic Meta-Tags
- JSON-LD Structured Data
- OpenGraph & Twitter Cards
- Dynamic XML Sitemap
- robots.txt Generation
- Canonical URLs

### Phase 4+: Upcoming

- 3D Hero Section with WebXR
- Lighthouse 95-100 Score
- PWA & Service Worker
- Analytics Integration

## 📁 Project Structure

```
src/
├── app.css                    # Tailwind v4 CSS-First Config
├── app.html                   # Main HTML Template
├── app.d.ts                   # Global Types
│
├── routes/                    # SvelteKit Routes
│   ├── +layout.svelte        # Global Layout with SEOHead
│   ├── +page.svelte          # Home Page
│   ├── about/                # About Page
│   ├── blog/[slug]/          # Dynamic Blog Posts
│   ├── work/[slug]/          # Dynamic Portfolio
│   ├── services/             # Services Page
│   ├── offer/                # Offers
│   ├── robots.txt/           # Dynamic robots.txt
│   └── sitemap.xml/          # Dynamic XML Sitemap
│
├── lib/
│   ├── components/
│   │   ├── SEOHead.svelte    # 🌟 SEO Meta Tags Component
│   │   ├── Header.svelte
│   │   ├── Footer.svelte
│   │   ├── ThemeSwitcher.svelte
│   │   ├── ThemeToggle.svelte
│   │   └── AdminGuard.svelte
│   │
│   ├── seo/
│   │   ├── schema.ts         # JSON-LD & Meta-Tag Builders
│   │   └── sitemap.ts        # Sitemap & robots.txt Generators
│   │
│   ├── state/
│   │   ├── theme.svelte.ts   # Theme State Management
│   │   └── admin.svelte.ts   # Admin State
│   │
│   ├── data/
│   │   ├── sitemap.ts
│   │   └── ...
│   │
│   └── assets/
│       └── ...
│
└── content/
    ├── blog/
    ├── pages/
    └── work/

static/
├── robots.txt                # Static robots fallback
├── assets/
└── uploads/
```

## 🎨 Theme System

### Available Themes

- **Meteorite** - Purple/Tech (Innovation Focus)
- **Steel** - Blue/Corporate (Professional)
- **Ever** - Green/Community (Growth)
- **Insight** - Red/Offers (Conversion)

### Usage

```typescript
import { themeState } from '$lib/state/theme.svelte';

themeState.setTheme('steel');
themeState.toggleMode();
```

## 🔍 SEO Configuration

### Using SEOHead on Pages

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
    image: 'https://heinze.media/og-image.png'
  };
</script>

<SEOHead config={seoConfig} />
```

## 📊 Build & Performance

```
Build Time: 7.54s
Output: /build/ (Static Site)
Adapter: @sveltejs/adapter-static
Prerendering: ✅ Enabled

TypeScript: ✅ 0 Errors, 16 Warnings
Lighthouse Target: 95-100/100
Core Web Vitals: Ready for Optimization
```

## 📚 Documentation

- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current Project Status
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development Guide & Patterns
- [ROADMAP.md](./ROADMAP.md) - Feature Roadmap & TODO
- [AGENT.md](./AGENT.md) - AI Assistant Instructions

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run check` | TypeScript check |

## ✅ Best Practices

### Always use TypeScript

```svelte
<script lang="ts">
```

### Use $props() for Props

```typescript
let { title, items } = $props();
```

### Use $derived for Computed Values

```typescript
let doubled = $derived(count * 2);
```

### Use $effect for Side Effects

```typescript
$effect(() => { /* side effects */ });
```

## 🚀 Deployment

### Static Site Deployment (Recommended)

```bash
npm run build
# Deploy /build/ folder to:
# - Vercel
# - Netlify
# - GitHub Pages
# - Any static host
```

## 📈 Features Roadmap

### ✅ Done (Phase 1-3)

- [x] Svelte 5 Modernization
- [x] Tailwind v4 CSS-First
- [x] SEO Framework (Meta-Tags, JSON-LD, Sitemap)

### 🚧 In Progress (Phase 4)

- [ ] 3D Hero Section (Threlte)
- [ ] WebXR Integration

### 📋 TODO (Phase 5+)

- [ ] Lighthouse 95-100 Optimization
- [ ] PWA & Service Worker
- [ ] Analytics Integration
- [ ] Blog CMS Integration

See [ROADMAP.md](./ROADMAP.md) for detailed timeline.

## 🤖 Svelte 5 Runes

### State Management

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
  let message = $derived.by(() => 'Value: ' + count);
  
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>
```

## 📖 Resources

- [SvelteKit Docs](https://kit.svelte.dev)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 📞 Support

For issues, questions, or feature requests, please check:

1. [DEVELOPMENT.md](./DEVELOPMENT.md) - Common patterns
2. [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current status
3. [ROADMAP.md](./ROADMAP.md) - Future plans

## 📄 License

MIT License

---

**Last Updated:** 25. Januar 2026  
**Status:** Phase 1-3 Complete, Production Ready  
**Next Phase:** 3D Hero Section & WebXR
