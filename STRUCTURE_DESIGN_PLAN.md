# Heinze Media – Struktur & Design-Richtlinien (Svelte 5)

Version: 2026-01-25 • Fokus: Svelte 5 Runes, Tailwind v4, Vite 7, SEO, XR/AR/VR

---

**Ziel**

- Migriere die WordPress-Website zu einer performanten, DSGVO-konformen Svelte 5 App.
- Erreiche hervorragende UX, technische SEO (Lighthouse 95–100) und XR-Showcases.

**Scope**

- Gilt für: Text, Bilder, Layout, Navigation, SEO, Performance, XR/AR/VR.
- Stützt sich auf: [SYSTEM_BRAND_GUIDELINES.md](SYSTEM_BRAND_GUIDELINES.md), [CORPORATE_DESIGN.md](CORPORATE_DESIGN.md), [BRAND GUIDELINES.md](BRAND%20GUIDELINES.md).

---

**Information Architecture**

- Hauptnavigation: Home, Services (inkl. XR Studio), Work, Blog, About, Contact.
- Sektionen: Offer (LLP), Products/Solutions, Glossar, Sitemap, Legal (Imprint, Privacy).
- Mapping zu Routen: prüfe und ergänze [src/routes](src/routes) gemäß vorhandenen [content/pages](src/content/pages).
- Content-Quelle: Markdown mit Frontmatter (Title, Excerpt, Cover, Date, Tags, SchemaType).

**Layout & Navigation**

- Header: kompakt, sticky, klare aktive Zustände, mobile Burger mit aria-controls.
- Footer: 3-Spalten (Kontakt, Services, Ressourcen), Newsletter optional DSGVO-konform.
- Grid-System (Tailwind v4): 12 Spalten, Container `max-w-screen-xl`, Gaps via CSS-Variablen.
- Breadcrumbs: für Blog/Work/Service-Detail, semantisch `nav[aria-label="breadcrumb"]`.
- Skip-Links: `a.skip-to-content` vor Header, erhält Fokus bei Tab.

**Content (Text)**

- Tonalität: professionell, klar, deutsch/englisch; aktive Sprache.
- Struktur: H1 pro Seite, H2/H3 logisch; kurze Einleitungen; Bullet-Listen für Scannability.
- Komponenten: Intro/Hero, Feature-List, Case-Study, CTA, FAQ, Glossar Terms.
- i18n: nutze bestehende DE/EN Messages in [messages/](messages); Inhalte parallel pflegen.

**Bilder & Medien**

- Bildarten: Cover, Inline (Content), UI/Icons, Hero, OG/Share.
- Formate: AVIF bevorzugt, fallback WebP, fallback JPEG; SVG für Icons.
- Responsive: `srcset` Stufen 480/768/1024/1440/1920; lazy loading; `decoding="async"`.
- Pfade: konsistente Struktur unter [static/images](static/images) nach Bereich (brand/hero/services/work/blog/ui).
- Optimierung: Preprocessing-Script (sharp) in [scripts/](scripts) erzeugt Größen + Formate.

**SEO**

- Head: Title-Strategie `Page — Heinze Media`; Meta Description ≤ 160 Zeichen; Canonical.
- Open Graph/Twitter Cards: OG images unter `static/images/brand/og-image.png`.
- JSON-LD: `WebSite`, `Organization`, `BreadcrumbList`, `Article`/`BlogPosting`/`CreativeWork`.
- Sitemaps: HTML + XML in [build/sitemap](build/sitemap) bzw. generiert im Build.
- Robots: prüfe [static/robots.txt](static/robots.txt); disallow Staging.
- Performance-SEO: LCP < 2.5s, CLS < 0.1, TBT < 200ms.

**Performance**

- Bundling: Vite 7 (Rolldown); Code-Splitting per Route; prefetch nur für Hover-intent.
- Assets: `rel="preload"` für Fonts, `rel="preconnect"` zu erforderlichen Origins.
- CSS-First: Tailwind v4 via [src/app.css](src/app.css) mit `@theme` Variablen; keine tailwind.config.js.
- Images: proporzielle Größen, `aspect-ratio`, `content-visibility: auto` für lange Listen.
- Budgets: Gesamt-JS ≤ 180KB gz, kritisches CSS ≤ 12KB; vermeiden großer 3D Assets außerhalb XR.

**XR/AR/VR**

- Route: `/services/xr-studio` mit Threlte (Three.js) Showcase.
- Fallback: Server-side Feature-Detection; bei fehlendem WebGL/WebXR render statische Visuals.
- Performance: reduzierte Polygonzahl, instancing, `dpr` adaptiv; UI-Controls pausable.
- Content: kurze Erklärtexte, CTA zu Beratung; Case-Studies verlinkt.

**Accessibility & GDPR**

- Kontrast ≥ WCAG AA; Fokus-Indikatoren konsistent; Tastatur-Navigation vollständig.
- ARIA: Landmark-Roles, beschriftete Controls, Live-Regions nur bei Bedarf.
- Consent: Leichter Consent-Dialog (analytics optional), keine Third-Party Fonts/CDN Trackers.
- Fonts: Self-hosted unter `static/assets/fonts`; `font-display: swap`.

---

**Implementation Notes (Svelte 5 Runes + Tailwind v4)**

- Komponenten erhalten Props über `$props()`; interne Zustände via `$state()`.
- Derivationen mit `$derived()`; Side-Effects (z.B. DOM/resize) via `$effect()`.
- Snippets für Slots: `children: import('svelte').Snippet` und `{@render children()}`.
- Styles: Tailwind v4 nur via CSS-Dateien; Tokens in `@theme` (Farben, Typo, Radii, Shadow).

Pseudo-Code Muster (Runes-validiert):

```svelte
<!-- Button.svelte (Runes) -->
<script lang="ts">
  type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
  type Size = 'sm' | 'md' | 'lg';
  let { variant = 'primary', size = 'md', href, disabled = false, children, class: cls = '' } = $props();
  const Tag = href ? 'a' : 'button';
</script>

<svelte:element this={Tag} class={`btn btn-${variant} btn-${size} ${cls}`} {href} {disabled}>
  {@render children()}
</svelte:element>
```

```css
/* app.css – Tailwind v4 CSS-First */
@theme {
  --color-primary: oklch(65% 0.15 25);
  --radius-md: 0.5rem;
  --shadow-md: 0 6px 20px color-mix(in oklab, var(--color-primary) 10%, transparent);
}

.btn { display: inline-flex; align-items: center; gap: 0.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md); }
```

---

**Roadmap & Milestones**

- M1: Struktur-Plan und Tokens festgelegt (dieses Dokument).
- M2: Navigation/Header/Footer als Runes-Komponenten; Breadcrumbs + Skip-Links.
- M3: SEO-Head + JSON-LD Templates; Sitemap/Robots geprüft.
- M4: Bild-Pipeline und responsive Strategie integriert; Content migriert.
- M5: XR-Showcase `/services/xr-studio` mit Fallbacks.
- M6: PWA (Manifest + SW) und Performance-Budgets; Lighthouse ≥ 95.

**Verknüpfungen**

- Vite Config: [vite.config.ts](vite.config.ts)
- Svelte Config: [svelte.config.js](svelte.config.js)
- App Shell: [src/app.html](src/app.html), [src/app.css](src/app.css)
- Inhalte: [src/content](src/content)
- Assets: [static](static)
