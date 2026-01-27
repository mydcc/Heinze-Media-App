---
title: "CMS Guide"
description: "Instructions for maintaining content at Heinze Media"
layout: "default"
published: true
---

## Introduction

Welcome to the Heinze Media CMS. This system is based on Markdown files located in the `src/content` folder.

## Multi-language (i18n)

The website supports German (`de`) and English (`en`). English is the default language.

### Content Pages (Markdown)

To provide a page in multiple languages, we use language suffixes in the filename:

- `my-page.en.md` (English version)
- `my-page.de.md` (German version)

**Important:**

- Both files must have the **same base name** to share the same slug (URL).
- If a language version is missing, the system will automatically fall back to the English version.
- If only one file exists without a suffix (e.g., `info.md`), it will be used for all languages.

### UI Texts (Paraglide)

Texts that appear globally on every page (menus, footer, buttons) are managed in JSON files in the `/messages` folder:

- `messages/en.json`
- `messages/de.json`

## Basics

Each page (`.md`) consists of a **Frontmatter** (metadata between `---`) and the actual **content**.

### Standard Metadata

```yaml
---
title: "My Page Title"
description: "Short description for SEO"
layout: "default"
published: true
---
```

## Layouts & Blocks (Modular CMS)

You can build pages flexibly using blocks. If the `blocks` field is defined, the normal Markdown text is ignored.

### Modular Page Example

```yaml
---
title: "Services"
blocks:
  - type: "hero"
    data:
      title: "Our Services"
      subtitle: "We build digital galaxies."
      theme: "accent"
  - type: "features"
    data:
      title: "What we do"
      items:
        - title: "3D Web Apps"
          description: "Interactive experiences in the browser."
          icon: "🌐"
```

## Available Blocks

1. **hero**: Large header (title, subtitle, buttonText, buttonLink, image, theme).
2. **infobox**: Single box (title, text, icon, color).
3. **testimonials**: Customer feedback (items: [name, role, text, avatar]).
4. **features**: Feature grid (title, description, items: [title, description, icon]).
5. **cta**: Call-to-action banner (title, subtitle, buttonText, buttonLink).
6. **process**: Process steps (items: [title, text]).
7. **techstack**: Technology boxes (items: [name, category, desc]).
8. **gallery**: Image gallery (items: [src, alt, label]).
9. **richtext**: Markdown content block (content).
10. **sectionheader**: Section heading (title, tagline, align).

## Consistency Tips

- Use predefined themes (accent, dark, light).
- Ensure images are placed in `static/images/`.
