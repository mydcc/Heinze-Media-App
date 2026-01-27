# 🌟 HEINZE MEDIA - Modernized Web Application

> **Cutting-Edge XR/AR/VR Solutions & Metaverse Integration**

A bleeding-edge SvelteKit application featuring **Svelte 5 Runes**, **Tailwind CSS v4 CSS-First**, and a comprehensive SEO framework for immersive 3D web experiences.

## 🚀 Tech Stack

- **Framework:** Svelte 5.45.6 (Full Runes Syntax - `$props()`, `$derived()`, `$state()`, `$effect()`)
- **Build Tool:** Vite 7.2.6 (Rolldown Bundler)
- **Styling:** Tailwind CSS 4.1.18 (CSS-First - @theme directives)
- **Runtime:** Node 20.19+ (ESM)
- **CMS:** Content Loader (Markdown + YAML frontmatter)
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

## ✨ Features Completed ✅

### Phase 1: Content Migration ✅

- ✅ WordPress XML → Svelte 5 Migration (20 pages, 4 blog posts, 5 portfolio items)
- ✅ Image organization (12 images, 2024-2026, auto-categorized by date)
- ✅ Markdown + YAML frontmatter content system
- ✅ Dynamic routing for `/[slug]`, `/blog/[slug]`, `/work/[slug]`

### Phase 2: Theme System ✅

- ✅ **4 Theme Variants:** Meteorite (Purple), Steel (Blue), Ever (Green), Insight (Red)
- ✅ Tailwind v4 @theme CSS-First Configuration (no config.js)
- ✅ Dark/Light Mode Support in each theme
- ✅ CSS Variables for colors, typography, spacing, shadows
- ✅ Interactive Theme Switcher in Footer

### Phase 3: SEO & Metadata ✅

- ✅ **SEOHead Component** with Open Graph, Twitter Cards, JSON-LD
- ✅ Canonical URLs & DSGVO Compliance
- ✅ Sitemap Support
- ✅ Reading Time Calculation
- ✅ Dynamic Meta Tags per page

### Phase 4: UI Component Library ✅

**Svelte 5 Runes-based, Tailwind v4 Styled:**

**Layout:**

- `Container` - Responsive container with padding & max-width
- `Grid` - Flexible grid system (1-4 columns)
- `Section` - Full-width section with header & background variants
- `Hero` - Large hero banner with CTA buttons

**Content:**

- `Button` - 4 variants (primary, secondary, ghost, outline), 3 sizes
- `Card` - Universal card with border & hover effects
- `FeatureCard` - Content card with icon & link support
- `Badge` - Status badges (5 color variants)
- `Tag` - Small labels/pills
- `CTA` - Call-to-action section with buttons

**Navigation & Forms:**

- `Navigation` - Sticky nav with mobile menu & active states
- `Input` - Form inputs (text, email, tel, number, textarea) with validation
- `SEOHead` - Meta tags & schema.org JSON-LD

**Utils:**

- `Footer` - 6-column footer with links, social, theme switcher
- `components/index.ts` - Barrel export for all components

### Phase 5: SEO Infrastructure ✅

- ✅ Dynamic meta tags & Open Graph
- ✅ JSON-LD structured data (Article, Organization, LocalBusiness, Breadcrumb)
- ✅ Responsive Open Graph images
- ✅ Canonical URLs
- ✅ Mobile-first indexing ready
- ✅ DSGVO (GDPR) compliance

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/         # Reusable UI Components
│   │   ├── index.ts        # Barrel export
│   │   ├── Button.svelte
│   │   ├── Card.svelte
│   │   ├── Navigation.svelte
│   │   ├── Hero.svelte
│   │   ├── Section.svelte
│   │   └── ... (8+ more)
│   ├── content/            # Content Loader System
│   │   ├── loader.ts       # File-system loader
│   │   ├── render.ts       # Markdown → HTML
│   │   └── types.ts        # TypeScript interfaces
│   └── paraglide/          # i18n translations
├── routes/
│   ├── +page.svelte        # Homepage
│   ├── [slug]/             # Generic pages
│   ├── blog/               # Blog listing
│   │   └── [slug]/         # Blog articles
│   ├── work/               # Portfolio
│   │   └── [slug]/         # Portfolio details
│   ├── components/         # Component library demo
│   ├── brand-guidelines/   # Brand Guide
│   └── corporate-design/   # Design System
├── content/                # Markdown content
│   ├── pages/
│   ├── blog/
│   └── work/
└── app.css                 # Global styles + @theme config

static/
├── images/                 # Organized by date
│   ├── 2024/04/
│   ├── 2025/02/
│   └── 2026/01/
└── robots.txt

build/                       # Production output
```

## 🎨 Design System

### 4 Theme Variants

Each theme includes light & dark modes with CSS variables for:

- **Colors:** Primary, accent, backgrounds, text
- **Typography:** Font families, sizes (xs-5xl), weights
- **Spacing:** 4px base unit (0-24)
- **Border Radius:** sm-xl
- **Shadows:** md-lg

**Current Active:** Meteorite (Purple)

### Fonts

- **Headers:** Montserrat (black, bold)
- **Body:** Inter (semibold, regular, light)

### Responsive Breakpoints

- Mobile: 0px
- Tablet: 768px (md)
- Desktop: 1024px (lg)
- Wide: 1280px (xl)

## 📖 Documentation

- **[COMPONENTS.md](./COMPONENTS.md)** - Component Library Reference
- **[SYSTEM_BRAND_GUIDELINES.md](./SYSTEM_BRAND_GUIDELINES.md)** - Brand Standards
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Dev Quick Reference
- **[CORPORATE_DESIGN.md](./CORPORATE_DESIGN.md)** - Design Guidelines (80+ pages)

## 🔍 SEO Features

- **Meta Tags:** Title, description, keywords, canonical URL
- **Open Graph:** og:title, og:description, og:image, og:url
- **Twitter Cards:** Twitter-specific card format
- **JSON-LD:** Schema.org Article, Organization, LocalBusiness
- **Sitemap:** Auto-generated from dynamic routes
- **Robots.txt:** Configured for optimal crawling
- **Reading Time:** Calculated per article
- **Breadcrumbs:** JSON-LD breadcrumb navigation

## 🚀 Deployment

```bash
# Static site build (ready for Netlify, Vercel, GitHub Pages)
npm run build

# Output directory: build/
# All routes prerendered to static HTML
```

**Prerendering Configuration:**

- handleMissingId: 'warn' (missing anchor tags)
- handleUnseenRoutes: 'warn' (unreachable routes)
- handleHttpError: 'warn' (HTTP errors)
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
