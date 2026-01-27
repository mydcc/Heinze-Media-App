---
title: "CMS Guide"
description: "Anleitung zur Pflege der Inhalte bei Heinze Media"
layout: "default"
published: true
---

## Einleitung

Willkommen im CMS von Heinze Media. Dieses System basiert auf Markdown-Dateien im Ordner `src/content`.

## Mehrsprachigkeit (i18n)

Die Website unterstützt Deutsch (`de`) und Englisch (`en`). Englisch ist die Standardsprache.

### Inhaltsseiten (Markdown)

Um eine Seite in mehreren Sprachen anzubieten, nutzen wir Sprach-Suffixe im Dateinamen:

- `meine-seite.en.md` (Englische Version)
- `meine-seite.de.md` (Deutsche Version)

**Wichtig:**

- Beide Dateien müssen den **gleichen Basisnamen** haben, damit sie denselben "Slug" (URL) teilen.
- Wenn eine Sprache fehlt, wird automatisch auf die englische Version (Fallback) zurückgegriffen.
- Existiert nur eine Datei ohne Suffix (z.B. `info.md`), wird diese für alle Sprachen geladen.

### UI-Texte (Paraglide)

Texte, die global auf jeder Seite vorkommen (Menüs, Footer, Buttons), werden in den JSON-Dateien im Ordner `/messages` verwaltet:

- `messages/en.json`
- `messages/de.json`

## Grundlagen

Jede Seite (`.md`) besteht aus einem **Frontmatter** (Metadaten zwischen `---`) und dem eigentlichen **Inhalt**.

### Standard Metadaten

```yaml
---
title: "Mein Seitentitel"
description: "Kurze Beschreibung für SEO"
layout: "default"
published: true
---
```

## Layouts & Blöcke (Modulares CMS)

Sie können Seiten flexibel aus Blöcken aufbauen. Wenn das Feld `blocks` definiert ist, wird der normale Markdown-Text ignoriert.

### Beispiel für eine modulare Seite

```yaml
---
title: "Services"
blocks:
  - type: "hero"
    data:
      title: "Unsere Services"
      subtitle: "Wir bauen digitale Galaxien."
      theme: "accent"
  - type: "features"
    data:
      title: "Was wir tun"
      items:
        - title: "3D Web Apps"
          description: "Interaktive Erlebnisse im Browser."
          icon: "🌐"
```

## Verfügbare Blöcke

1. **hero**: Großer Header (title, subtitle, buttonText, buttonLink, image, theme).
2. **infobox**: Einzelne Box (title, text, icon, color).
3. **testimonials**: Kundenstimmen (items: [name, role, text, avatar]).
4. **features**: Feature-Raster (title, description, items: [title, description, icon]).
5. **cta**: Call-to-Action Banner (title, subtitle, buttonText, buttonLink).
6. **process**: Prozess-Schritte (items: [title, text]).
7. **techstack**: Technologie-Boxen (items: [name, category, desc]).
8. **gallery**: Bilder-Galerie (items: [src, alt, label]).
9. **richtext**: Markdown-Inhaltsblock (content).
10. **sectionheader**: Überschrift für Sektionen (title, tagline, align).

## Tipps für Konsistenz

- Nutzen Sie vordefinierte Themes (accent, dark, light).
- Achten Sie darauf, Bilder in `static/images/` abzulegen.
