# HEINZE MEDIA - Development Guide

## 🚀 Quick Start

```bash
# Installation
npm install

# Development Server
npm run dev

# Build Production
npm run build

# Preview Production Build
npm run preview

# Type Check
npm run check

# Watch Mode Type Check
npm run check:watch
```

---

## 📝 Scripts Reference

| Script | Zweck |
|--------|-------|
| `npm run dev` | Start Vite dev server mit HMR |
| `npm run build` | Production build für `build/` |
| `npm run preview` | Preview production build lokal |
| `npm run check` | TypeScript & Svelte Check |
| `npm run check:watch` | TypeScript Check im Watch-Modus |
| `npm run prepare` | SvelteKit Sync |

---

## 🎨 Theme System

### Themes verfügbar

- `theme-meteorite` - Purple/Tech
- `theme-steel` - Blue/Corporate
- `theme-ever` - Green/Community
- `theme-insight` - Red/Offers

### Theme im Code setzen

```typescript
import { themeState } from '$lib/state/theme.svelte';

// Theme setzen
themeState.setTheme('steel');

// Mode togglen (dark/light)
themeState.toggleMode();

// Current theme abrufen
console.log(themeState.theme);        // 'steel'
console.log(themeState.mode);         // 'dark' | 'light'
console.log(themeState.themeName);    // 'Steel (Pro)'
console.log(themeState.isDarkMode);   // true | false
```

---

## 🔍 SEO Integrierung

### Auf jeder Page

```svelte
<script lang="ts">
  import SEOHead from '$lib/components/SEOHead.svelte';
  import type { SEOConfig } from '$lib/seo/schema';

  const seoConfig: SEOConfig = {
    title: 'Page Title | HEINZE MEDIA',
    description: 'Meta description...',
    keywords: ['keyword1', 'keyword2'],
    url: 'https://heinze.media/page',
    type: 'website', // oder 'article'
    image: 'https://heinze.media/og-image.png',
    author: 'HEINZE MEDIA',
    publishDate: '2026-01-25', // Optional für Articles
    modifiedDate: '2026-01-25' // Optional
  };
</script>

<SEOHead config={seoConfig} />
```

### Für dynamische Pages (wie Blog Posts)

```svelte
<script lang="ts">
  let { data } = $props();
  let post = $derived(data.post);

  const seoConfig: SEOConfig = {
    title: `${post.title} | HEINZE MEDIA`,
    description: post.description,
    keywords: post.categories,
    url: `https://heinze.media/blog/${post.slug}`,
    type: 'article',
    image: post.image,
    author: post.author,
    publishDate: post.date
  };
</script>

<SEOHead config={seoConfig} />
```

---

## 🏗️ Komponenten Architektur

### State Management (Svelte 5 Runes)

```typescript
// theme.svelte.ts
class ThemeState {
    // State
    theme = $state<Theme>('meteorite');
    mode = $state<Mode>('dark');
    
    // Derived State
    themeClass = $derived.by(() => `theme-${this.theme}`);
    isDarkMode = $derived(this.mode === 'dark');
    themeName = $derived.by(() => { /* ... */ });
    
    // Effects
    constructor() {
        $effect(() => {
            if (this.initialized) this.applyToDOM();
        });
    }
}
```

### Props mit $props()

```svelte
<script lang="ts">
  interface Props {
    title: string;
    items: string[];
  }
  
  let { title, items } = $props();
</script>
```

---

## 📱 Responsive Design

Tailwind v4 Breakpoints:

- `sm: 640px`
- `md: 768px`
- `lg: 1024px`
- `xl: 1280px`
- `2xl: 1536px`

**Beispiel:**

```html
<div class="text-sm md:text-lg lg:text-2xl">
  Responsive Text
</div>
```

---

## 🎯 Common Patterns

### Conditional Rendering

```svelte
{#if condition}
  <p>Show when true</p>
{:else if otherCondition}
  <p>Show when other true</p>
{:else}
  <p>Show else</p>
{/if}
```

### Loops

```svelte
{#each items as item (item.id)}
  <div>{item.name}</div>
{/each}
```

### Reactive Values

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
  let message = $derived.by(() => {
    return count > 10 ? 'High' : 'Low';
  });
</script>

<button onclick={() => count++}>
  Count: {count}, Doubled: {doubled}
</button>
<p>{message}</p>
```

### Effects

```svelte
<script lang="ts">
  let theme = $state('dark');
  
  $effect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });
</script>
```

---

## 📦 File Conventions

### Routes Structure

```
src/routes/
├── +layout.svelte      # Global Layout
├── +layout.ts          # Layout Data
├── +page.svelte        # Page Component
├── +page.ts            # Page Data
├── [dynamic]/          # Dynamic Routes
│   ├── +page.svelte
│   └── +page.ts
└── api/                # API Routes
    └── endpoint/
        └── +server.ts
```

### +page.ts (Server Load)

```typescript
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  return {
    // data passed to +page.svelte
    post: { /* ... */ }
  };
};
```

### +page.svelte (Page Component)

```svelte
<script lang="ts">
  let { data } = $props();
</script>

<h1>{data.post.title}</h1>
```

---

## 🔐 Environment Variables

Create `.env.local`:

```
VITE_PUBLIC_SITE_URL=https://heinze.media
VITE_PUBLIC_API_URL=https://api.heinze.media
```

Access in code:

```typescript
const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL;
```

---

## 🐛 Debugging

### Browser Console

```javascript
// Check current theme state
window.__THEME__ // Falls globalisiert

// Check Svelte stores
import { page } from '$app/stores';
page.subscribe(p => console.log(p));
```

### VS Code Extensions

- Svelte for VS Code
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

---

## 📚 Resources

- [SvelteKit Docs](https://kit.svelte.dev)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [JSON-LD Guide](https://json-ld.org)

---

## ✅ Best Practices

1. **Always use TypeScript**

   ```svelte
   <script lang="ts">
   ```

2. **Use $props() for Component Props**

   ```typescript
   let { title, items } = $props();
   ```

3. **Use $derived for Computed Values**

   ```typescript
   let doubled = $derived(count * 2);
   ```

4. **Use $effect for Side Effects**

   ```typescript
   $effect(() => { /* side effects */ });
   ```

5. **Type Everything**

   ```typescript
   const seoConfig: SEOConfig = { /* ... */ };
   ```

6. **Use Semantic HTML**

   ```html
   <header>, <nav>, <main>, <article>, <section>, <footer>
   ```

7. **Accessibility First**

   ```html
   <button aria-label="Close menu">×</button>
   <img alt="Description" src="..." />
   ```

---

## 🚀 Performance Tips

1. **Code Splitting** - Vite handhabt es automatisch
2. **Lazy Loading** - Verwende `import()` für schwere Module
3. **Image Optimization** - Verwende next-gen Formate
4. **Font Loading** - @fontsource packages vorhanden
5. **CSS Purging** - Tailwind entfernt unused CSS automatisch

---

## 📞 Häufige Probleme

### "Cannot find module"

```
→ Überprüfe Pfade in tsconfig.json (path aliases)
→ Führe 'npm run check' aus
```

### Theme wird nicht angewendet

```
→ Überprüfe, dass SEOHead/Layout geladen ist
→ Überprüfe Browser Console auf Fehler
```

### Build Fehler

```
→ Führe 'npm run check' aus
→ Überprüfe src/ auf TypeScript Fehler
```

---

**Last Updated:** 25. Januar 2026  
**Version:** 1.0 (Phase 1-3 Complete)
