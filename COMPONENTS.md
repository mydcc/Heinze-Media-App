# 🎨 Heinze Media - Svelte 5 Component Library

## Komponenten-Übersicht

Alle Komponenten verwenden **Svelte 5 Runes** (`$props()`, `$derived()`, `$state()`) und **Tailwind CSS v4** (CSS-First).

### Basis-Komponenten

#### `Button.svelte`

Flexible Button-Komponente mit Varianten und Größen.

```svelte
<Button variant="primary" size="md" onclick={() => {}}>
  Click me
</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'ghost' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `fullWidth`: boolean
- `onclick`: () => void
- `children`: Snippet

---

#### `Card.svelte`

Universelle Card-Container mit Border und Hover-Effekten.

```svelte
<Card border="accent" size="md" interactive>
  Dein Content hier
</Card>
```

**Props:**

- `size`: 'sm' | 'md' | 'lg'
- `border`: 'none' | 'subtle' | 'accent'
- `interactive`: boolean
- `hover`: boolean
- `children`: Snippet

---

#### `Badge.svelte`

Status-Badges mit Farbvarianten.

```svelte
<Badge variant="success">Deployed</Badge>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'error'

---

### Layout-Komponenten

#### `Container.svelte`

Responsive Container mit Padding und Max-Width.

```svelte
<Container size="lg" px="md" py="xl">
  Dein Content
</Container>
```

**Props:**

- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `px`: 'sm' | 'md' | 'lg'
- `py`: 'sm' | 'md' | 'lg' | 'xl'

---

#### `Grid.svelte`

Responsive Grid-Layout.

```svelte
<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

**Props:**

- `cols`: 1 | 2 | 3 | 4
- `gap`: 'sm' | 'md' | 'lg'

---

#### `Section.svelte`

Vollbreite Section mit optionalem Header.

```svelte
<Section title="Features" subtitle="What we offer" background="surface">
  Dein Content
</Section>
```

**Props:**

- `title`: string
- `subtitle`: string
- `description`: string
- `background`: 'default' | 'surface' | 'accent' | 'gradient'
- `py`: 'sm' | 'md' | 'lg' | 'xl'

---

### Content-Komponenten

#### `Hero.svelte`

Großer Hero-Banner mit optionalem Bild und CTA.

```svelte
<Hero
  title="Willkommen"
  subtitle="Hero Section"
  description="Das ist eine Beschreibung"
  cta={{ text: "Jetzt starten", href: "/contact" }}
  height="lg"
/>
```

**Props:**

- `title`: string (erforderlich)
- `subtitle`: string
- `description`: string
- `cta`: { text, href, variant? }
- `backgroundImage`: string (URL)
- `height`: 'sm' | 'md' | 'lg' | 'xl'

---

#### `FeatureCard.svelte`

Card mit Icon, Title und Description (mit optionalem Link).

```svelte
<FeatureCard
  icon="🎨"
  title="Design System"
  description="Konsistente Design-Language"
  href="/features/design"
  highlighted
/>
```

**Props:**

- `icon`: string (Emoji oder HTML)
- `title`: string (erforderlich)
- `description`: string (erforderlich)
- `href`: string (optional - macht Card clickable)
- `highlighted`: boolean

---

#### `CTA.svelte`

Call-to-Action Section mit Buttons.

```svelte
<CTA
  title="Ready to build?"
  description="Starte jetzt mit unseren Komponenten"
  alignment="center"
  buttons={[
    { text: "Get Started", href: "/contact" },
    { text: "Learn More", href: "#", variant: "secondary" }
  ]}
/>
```

**Props:**

- `title`: string (erforderlich)
- `description`: string
- `buttons`: Array<{ text, href, variant? }>
- `alignment`: 'left' | 'center' | 'right'

---

#### `Tag.svelte`

Kleine Label/Pill mit Farbvarianten.

```svelte
<Tag label="Featured" variant="accent" size="md" />
```

**Props:**

- `label`: string (erforderlich)
- `variant`: 'default' | 'accent' | 'success' | 'warning' | 'error'
- `size`: 'sm' | 'md'

---

### Navigation & Forms

#### `Navigation.svelte`

Responsive Navigation mit Mobile-Menu.

```svelte
<Navigation
  logo="HEINZE MEDIA"
  logoHref="/"
  links={[
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" }
  ]}
/>
```

**Props:**

- `logo`: string
- `logoHref`: string
- `links`: Array<{ label, href, external? }>

---

#### `Input.svelte`

Form Input mit Label, Error-Handling.

```svelte
<Input
  type="email"
  label="E-Mail"
  placeholder="deine@email.de"
  required
  onchange={(value) => console.log(value)}
  error={error}
/>
```

**Props:**

- `type`: 'text' | 'email' | 'tel' | 'number' | 'textarea'
- `label`: string
- `placeholder`: string
- `required`: boolean
- `value`: string
- `onchange`: (value: string) => void
- `error`: string

---

### Utility-Komponenten

#### `SEOHead.svelte`

Meta-Tags für SEO, Open Graph, Twitter Cards.

```svelte
<SEOHead
  title="Meine Seite"
  description="Seitenbeschreibung"
  ogImage="/og-image.png"
  jsonLD={schemaObject}
/>
```

**Props:**

- `title`: string (erforderlich)
- `description`: string (erforderlich)
- `ogImage`: string (URL)
- `jsonLD`: object (Schema.org Daten)

---

#### `Footer.svelte`

6-Spalten Footer mit Links, Social, Theme-Switcher.

**Automatisch integriert in Layout.**

---

## Theme System

Alle Komponenten nutzen Tailwind v4 `@theme` CSS-Variablen:

```css
@theme {
  --colors-accent: #334eff;
  --colors-bg-body: #0f172a;
  --colors-text-main: #ffffff;
  --colors-text-muted: #a0aec0;
  /* ... weitere Varianten */
}
```

### 4 Theme-Varianten verfügbar

1. **Meteorite** (Purple) - Standard
2. **Steel** (Blue)
3. **Ever** (Green)
4. **Insight** (Red)

---

## Verwendungsbeispiele

### Einfacher Hero + Content

```svelte
<script>
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import FeatureCard from '$lib/components/FeatureCard.svelte';
  import Grid from '$lib/components/Grid.svelte';
</script>

<Hero title="Willkommen" />

<Section title="Features">
  <Grid cols={3}>
    <FeatureCard icon="🎨" title="Design" description="Moderne UI" />
    <FeatureCard icon="⚡" title="Performance" description="Schnell" />
    <FeatureCard icon="📱" title="Responsive" description="Mobile-ready" />
  </Grid>
</Section>
```

---

## Best Practices

### ✅ DO's

- Verwende immer `$props()` für Props
- Verwende `$derived()` für berechnete Werte
- Verwende `$state()` nur für lokale Component-State
- Nutze Snippets (`children`) für flexible Inhalte
- Verwende Tailwind-Klassen statt Inline-Styles

### ❌ DON'Ts

- Kein `export let` (deprecated in Svelte 5)
- Keine `$:` Labels (verwende `$derived()`)
- Keine `@apply` in component Styles (deprecated in Tailwind v4)
- Keine Inline Event Handler (verwende Named Handlers)

---

## Component Library Demo

Besuche `/components` für eine Live-Demo aller Komponenten!

---

## Svelte 5 Runes Referenz

### `$props()`

```svelte
<script>
  interface Props {
    title: string;
    count?: number;
  }
  
  let { title, count = 0 }: Props = $props();
</script>
```

### `$derived()`

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

### `$effect()`

```svelte
<script>
  let name = $state('');
  
  $effect(() => {
    console.log(`Hello ${name}`);
  });
</script>
```

### `{@render ...}`

```svelte
<script>
  let { children } = $props();
</script>

{@render children?.()}
```

---

## Häufig gestellte Fragen

**Q: Wie ändere ich das Theme?**
A: Im Footer befindet sich ein Theme-Switcher. Es können alle 4 Varianten gewählt werden.

**Q: Kann ich Komponenten kombinieren?**
A: Ja! Komponenten sind modular und können beliebig kombiniert werden.

**Q: Wo finde ich die Tailwind-Konfiguration?**
A: In `src/app.css` unter `@theme` - kein `tailwind.config.js` nötig!

**Q: Funktioniert das mit TypeScript?**
A: Ja! Alle Komponenten haben vollständige TypeScript-Unterstützung.

---

## Support & Dokumentation

- **Komponenten Demo:** [/components](/components)
- **Brand Guidelines:** [/brand-guidelines](/brand-guidelines)
- **Corporate Design:** [/corporate-design](/corporate-design)
- **Blog:** [/blog](/blog)

---

**Version:** 1.0.0  
**Framework:** Svelte 5 + SvelteKit  
**Styling:** Tailwind CSS v4  
**Build Tool:** Vite 7 mit Rolldown
