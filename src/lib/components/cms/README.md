# CMS Module für Heinze Media

Wiederverwendbare Komponenten für das Mini-CMS.

## HeroModule.svelte

Flexibles Hero-Modul mit 3D-Scene-Integration für verschiedene Seitenbereiche.

### Props

| Prop | Typ | Default | Beschreibung |
|------|-----|---------|--------------|
| `title` | `string` | `""` | Haupttitel |
| `titleAccent` | `string` | `""` | Akzent-Titel (mit Gradient) |
| `subtitle` | `string` | `""` | Untertitel/Beschreibung |
| `cta1` | `{ text: string; href: string }` | `undefined` | Primärer Call-to-Action Button |
| `cta2` | `{ text: string; href: string }` | `undefined` | Sekundärer Call-to-Action Button |
| `height` | `"compact" \| "medium" \| "full"` | `"full"` | Höhe des Moduls |
| `showScene` | `boolean` | `true` | 3D-Scene anzeigen |
| `backgroundGradient` | `string` | `"from-accent/20 to-accent/5"` | Tailwind Gradient-Klassen |

### Höhen-Varianten

- **compact**: `200px` - Ideal für Seitenheader
- **medium**: `400-500px` - Für mittlere Hero-Sections
- **full**: `100vh` - Für vollbildige Landing-Pages

### Verwendungsbeispiele

#### Kompakter Header (200px) - Kontaktseite

```svelte
<HeroModule 
    title="Kontakt"
    height="compact"
    showScene={true}
/>
```

#### Medium Hero - Services-Seite

```svelte
<HeroModule 
    title="Unsere Dienstleistungen"
    titleAccent="Digital Excellence"
    subtitle="Von Web-Entwicklung bis XR-Experiences"
    height="medium"
    showScene={true}
/>
```

#### Vollbild Landing Page

```svelte
<HeroModule 
    title="Willkommen bei"
    titleAccent="Heinze Media"
    subtitle="Wir entwickeln digitale Erlebnisse, die begeistern und überzeugen."
    cta1={{ text: "Projekte ansehen", href: "/work" }}
    cta2={{ text: "Kontakt aufnehmen", href: "/contact" }}
    height="full"
    showScene={true}
/>
```

#### Ohne 3D-Scene (Performance)

```svelte
<HeroModule 
    title="Blog"
    height="medium"
    showScene={false}
    backgroundGradient="from-blue-500/20 to-purple-600/10"
/>
```

### Features

- ✅ **Svelte 5 Runes-Syntax** (`$state`, `$derived`, `$props`)
- ✅ **3D-Scene-Integration** (optional, lazy-loaded)
- ✅ **Responsive Design** (mobile-first)
- ✅ **Theme-aware** (nutzt CSS-Variablen)
- ✅ **Performance-optimiert** (Code-Splitting)
- ✅ **Accessibility** (semantisches HTML)

### Integration in andere Seiten

```svelte
<script lang="ts">
    import HeroModule from "$lib/components/cms/HeroModule.svelte";
</script>

<HeroModule 
    title="Deine Seite"
    height="medium"
/>
```

### Anpassungen

Das Modul nutzt Tailwind CSS v4 Variablen:

- `--color-accent` - Primärfarbe
- `--color-bg-body` - Hintergrundfarbe
- `--color-text-main` - Textfarbe

Alle Farben werden automatisch an dein Theme angepasst.
