# HEINZE MEDIA - Corporate Design Manual

**Visuelle Identität & Anwendungsrichtlinien**  
*Version 1.0 - Januar 2026*

---

## 📋 Inhalt

1. [Über dieses Dokument](#über-dieses-dokument)
2. [Logo & Markenzeichen](#logo--markenzeichen)
3. [Farbsystem](#farbsystem)
4. [Typografie](#typografie)
5. [Bildwelt & Fotografie](#bildwelt--fotografie)
6. [Layout & Grid](#layout--grid)
7. [Grafische Elemente](#grafische-elemente)
8. [Anwendungsbeispiele](#anwendungsbeispiele)
9. [Do's & Don'ts](#dos--donts)

---

## 📖 Über dieses Dokument

### Unterschied: Corporate Design vs. Brand Guidelines

**Corporate Design** (dieses Dokument):

- Fokus auf **visuelle Anwendung**
- Logo-Nutzung, Farben, Typografie
- Layout-Regeln, Spacing
- Print & Digital Assets
- Praktische Do's & Don'ts

**Brand Guidelines** ([SYSTEM_BRAND_GUIDELINES.md](SYSTEM_BRAND_GUIDELINES.md)):

- Umfassendes Design System
- Technische Implementierung (Svelte 5, Tailwind CSS v4)
- Code-Patterns, Komponenten
- SEO & Accessibility
- Development-Fokus

**Dieses Dokument** richtet sich an:

- Grafik Designer
- Marketing Team
- Partner & Agenturen
- Externe Dienstleister

---

## 🎨 Logo & Markenzeichen

### Logo-Varianten

#### Primäres Logo (Horizontal)

```
┌──────────────────────────┐
│  HEINZE    MEDIA         │
│  [Purple] [White]        │
└──────────────────────────┘
```

**Dateien:**

- `/static/images/brand/logo.png` (Standard, Transparent BG)
- `/static/images/brand/logo-white.png` (Weiß für dunkle BGs)
- `/static/images/brand/logo-dark.png` (Dunkel für helle BGs)

**Größen:**

- Minimum: 120px Breite
- Empfohlen Web: 180-240px Breite
- Print: Mindestens 40mm Breite

---

### Schutzraum (Clear Space)

**Regel:** Mindestens **X-Höhe** (Höhe des "H") als Abstand ringsum

```
        ← X →
    ↑  ┌─────────────┐
    X  │             │
    ↓  │  HEINZE     │  ← Logo
       │    MEDIA    │
    ↑  │             │
    X  └─────────────┘
    ↓      ← X →
```

**Niemals:**

- ❌ Logo auf gemustertem Hintergrund ohne Kontrast
- ❌ Logo verzerren oder schräg stellen
- ❌ Farben ändern (außer definierte Varianten)
- ❌ Effekte hinzufügen (Schatten, 3D, Neon)

---

### Logo-Farben nach Kontext

| Kontext | Logo-Variante | Farbe | Datei |
|---------|--------------|-------|-------|
| **Dark Mode** | Standard | Purple + White | `logo.png` |
| **Light Mode** | Dark | Purple + Meteorite | `logo-dark.png` |
| **Print (4c)** | Standard | CMYK 60/100/0/0 | `logo-cmyk.eps` |
| **Print (1c)** | Schwarz | K 100% | `logo-black.eps` |
| **Negativ** | Weiß | White 100% | `logo-white.png` |

---

## 🌈 Farbsystem

### Primäre Markenfarben

#### Purple (Meteorite Theme)

```css
Purple:     #4e21e7  |  RGB 78, 33, 231   |  CMYK 60/100/0/0
Meteorite:  #433f65  |  RGB 67, 63, 101   |  CMYK 82/77/33/23
```

**Verwendung:**

- Hauptfarbe für Brand Kommunikation
- Logo, Headlines, Call-to-Actions
- Blog, generische Content-Pages

#### Blue PRO (Steel Theme)

```css
Blue PRO:   #334eff  |  RGB 51, 78, 255   |  CMYK 100/20/10/0
```

**Verwendung:**

- Service-Pages, B2B-Kommunikation
- XR Studio, Professional Services
- Vertrauen & Expertise vermitteln

#### Green Free (Ever Theme)

```css
Green Free: #0da49a  |  RGB 13, 164, 154  |  CMYK 78/9/46/0
```

**Verwendung:**

- Community-Features, Open-Source
- Kostenlose Angebote, Tools
- Wachstum & Nachhaltigkeit

#### Red Insights (Insight Theme)

```css
Red Insights: #ee485f  |  RGB 238, 72, 95  |  CMYK 0/83/48/0
```

**Verwendung:**

- Special Deals, zeitlich begrenzte Angebote
- High-Conversion Landing Pages
- Dringlichkeit & Exklusivität

---

### Sekundäre Farben

#### Neutrals

```css
White:       #ffffff  |  RGB 255, 255, 255  |  CMYK 0/0/0/0
Light Grey:  #f8f9fb  |  RGB 248, 249, 251  |  CMYK 2/1/0/0
Meteorite:   #433f65  |  RGB 67, 63, 101    |  CMYK 82/77/33/23
```

#### Dark Modes

```css
Purple Dark:    #0c082f  |  RGB 12, 8, 47     |  CMYK 100/97/46/66
Blue Dark:      #08103f  |  RGB 8, 16, 63     |  CMYK 100/94/43/53
Green Dark:     #002039  |  RGB 0, 32, 57     |  CMYK 100/83/48/58
Red Dark:       #0f0523  |  RGB 15, 5, 35     |  CMYK 99/95/49/75
```

---

### Farbhierarchie

**Priorität 1 - Dominanz (60%):**

- Backgrounds (Dark/Light je nach Theme)
- Große Flächen

**Priorität 2 - Akzent (30%):**

- Primary Brand Color (Purple/Blue/Green/Red)
- Buttons, Links, CTAs

**Priorität 3 - Highlights (10%):**

- Hover-States, Icons, Badges
- Subtile Akzente

---

### Farb-Kombinationen (Approved)

#### Meteorite Theme

```
Background:    #0c082f (Purple Dark)
Surface:       #1a1442 (Slightly lighter)
Text:          #ede8fd (Purple Light)
Accent:        #4e21e7 (Purple)
Hover:         #7383f5 (Purple Highlight)
```

#### Steel Theme (Professional)

```
Background:    #08103f (Blue Dark)
Surface:       #0f1854
Text:          #eaedff (Blue Light)
Accent:        #334eff (Blue PRO)
Hover:         #80b8f2 (Blue Highlight)
```

#### Light Mode (Alle Themes)

```
Background:    #f8f9fb (Light Grey)
Surface:       #ffffff (White)
Text:          #433f65 (Meteorite)
Accent:        [Theme-specific]
Border:        #e2e8f0 (Light Border)
```

---

## ✍️ Typografie

### Schriftfamilien

#### Headlines & Display

```
Familie:     Montserrat
Gewichte:    700 (Bold), 600 (SemiBold)
Fallback:    "Helvetica Neue", Arial, sans-serif
Lizenz:      Open Font License (Google Fonts)
```

**Verwendung:**

- H1-H4 (Alle Headlines)
- Logo-Texte
- Call-to-Action Buttons
- Feature-Titles

#### Body Text & UI

```
Familie:     Inter
Gewichte:    400 (Regular), 500 (Medium), 600 (SemiBold)
Fallback:    -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
Lizenz:      Open Font License (Google Fonts)
```

**Verwendung:**

- Fließtext, Paragraphen
- Navigation, UI-Elemente
- Listen, Captions
- Formulare, Inputs

---

### Typografie-Skala

#### Headlines (Montserrat Bold)

```
H1:  80px / 5rem      | Line-Height: 80px  | Desktop Hero
H2:  54px / 3.375rem  | Line-Height: 54px  | Section Headers
H3:  34px / 2.125rem  | Line-Height: 34px  | Subsections
H4:  22px / 1.375rem  | Line-Height: 26px  | Card Titles
```

#### Body Text (Inter)

```
Subtitle 1:  24px / 1.5rem    | Line-Height: 36px  | Lead Paragraphs
Subtitle 2:  20px / 1.25rem   | Line-Height: 28px  | Subheadings
Body:        16px / 1rem      | Line-Height: 24px  | Standard Text
Small:       14px / 0.875rem  | Line-Height: 20px  | Captions, Meta
Tiny:        12px / 0.75rem   | Line-Height: 18px  | Footnotes
```

---

### Typografie-Regeln

**1. Zeilenlänge (Line Length):**

- Optimal: 60-80 Zeichen pro Zeile
- Maximum: 90 Zeichen
- Minimum: 40 Zeichen

**2. Zeilenhöhe (Line Height):**

- Headlines: 1.0 - 1.2 (tight)
- Body Text: 1.5 (normal)
- Lead Text: 1.75 (relaxed)

**3. Buchstabenabstand (Letter Spacing):**

- Headlines: -0.02em (tight)
- Body: 0 (normal)
- Uppercase Text: 0.1em - 0.3em (wide)

**4. Hierarchie:**

```
H1 (Hero)
  ↓ 2rem Abstand
H2 (Section)
  ↓ 1.5rem Abstand
Body Text
  ↓ 1rem Abstand zwischen Paragraphen
```

---

### Text-Farben nach Kontext

#### Dark Mode

```css
Primary Text:    #ede8fd  (Purple Light / Theme-specific)
Secondary Text:  #c2befa  (Purple Alt / Muted)
Tertiary Text:   #433f65  (Meteorite / Low emphasis)
Links:           #7383f5  (Highlight Color)
```

#### Light Mode

```css
Primary Text:    #433f65  (Meteorite)
Secondary Text:  #5a587a  (Darker Grey)
Tertiary Text:   #9ca3af  (Light Grey)
Links:           #4e21e7  (Purple / Theme-specific)
```

---

## 📸 Bildwelt & Fotografie

### Fotografie-Stil

**Ästhetik:**

- ✅ Modern, Tech-orientiert
- ✅ Futuristisch, aber zugänglich
- ✅ Hoher Kontrast, satte Farben
- ✅ Dark Backgrounds mit Neon-Akzenten
- ✅ 3D-Renderings, Sci-Fi Elemente

**Themen:**

- XR/AR/VR Technologie
- Metaverse-Welten
- Digitale Transformation
- Futuristische Städte (Blade Runner Ästhetik)
- Code, Screens, UI-Elemente

**Vermeiden:**

- ❌ Generische Stock-Photos
- ❌ Überbelichtete, flache Bilder
- ❌ Klischee-Business-Fotos (Handshake, etc.)

---

### Bild-Behandlung

#### Color Grading

```
Temperatur:     Kalt (4500-5000K)
Kontrast:       +20 bis +30
Sättigung:      +10 bis +15
Schatten:       Tiefschwarz (#0c082f)
Highlights:     Theme-Color Tint (Purple/Blue/Green/Red)
```

#### Overlay-Effekte

```css
/* Gradient Overlay für Hero-Images */
background: linear-gradient(
  135deg,
  rgba(12, 8, 47, 0.8) 0%,
  rgba(78, 33, 231, 0.4) 100%
);
```

---

### Bildformate & Größen

#### Web

```
Hero Images:       1920x1080px  (16:9)  |  WebP, JPEG Quality 85%
Card Images:       800x450px    (16:9)  |  WebP, JPEG Quality 80%
Blog Featured:     1200x630px   (OG)   |  WebP, JPEG Quality 85%
Thumbnails:        400x400px    (1:1)  |  WebP, JPEG Quality 75%
Icons/Logos:       SVG (vector) oder PNG 2x (Retina)
```

#### Print

```
Broschüren:        300 DPI  |  CMYK  |  PDF/X-3
Visitenkarten:     300 DPI  |  CMYK  |  mit Beschnitt 3mm
Roll-Ups:          150 DPI  |  RGB → CMYK Konversion prüfen
```

---

### Aspect Ratios

```
16:9  →  Standard (Video, Hero, Cards)
4:3   →  Portfolio-Items, Screenshots
1:1   →  Social Media, Thumbnails
21:9  →  Ultrawide Hero Sections
9:16  →  Mobile Stories, Vertical Video
```

---

## 📐 Layout & Grid

### Grid-System

**Desktop (1280px Container):**

```
Columns:      12
Gutter:       24px (1.5rem)
Margins:      24px (1.5rem)
Max-Width:    1280px
```

**Tablet (768px):**

```
Columns:      8
Gutter:       20px
Margins:      20px
```

**Mobile (375px):**

```
Columns:      4
Gutter:       16px
Margins:      16px
```

---

### Spacing-System

**Basis:** 4px Increment (0.25rem)

```
4px   (0.25rem)   →  Micro Spacing (Icon Gaps)
8px   (0.5rem)    →  Tight Spacing (Button Padding)
12px  (0.75rem)   →  Small Gaps
16px  (1rem)      →  Standard Spacing (Paragraphs)
24px  (1.5rem)    →  Gutter (Component Gaps)
32px  (2rem)      →  Section Spacing
48px  (3rem)      →  Large Section Gaps
64px  (4rem)      →  Hero Padding
96px  (6rem)      →  Extra Large Spacing
```

**Anwendung:**

```css
/* Component Padding */
padding: 1.5rem;  /* 24px */

/* Section Spacing */
margin-block: 4rem;  /* 64px top & bottom */

/* Element Gaps */
gap: 1rem;  /* 16px zwischen Kindern */
```

---

### Responsive Breakpoints

```css
/* Mobile First */
/* Base: 375px+ */

@media (min-width: 640px) {  /* Small */
  /* Tablets */
}

@media (min-width: 768px) {  /* Medium */
  /* Tablets Landscape, Small Desktop */
}

@media (min-width: 1024px) { /* Large */
  /* Desktop */
}

@media (min-width: 1280px) { /* XL */
  /* Large Desktop */
}

@media (min-width: 1536px) { /* 2XL */
  /* Ultra Wide */
}
```

---

### Layout-Patterns

#### Hero Section

```
┌─────────────────────────────────────┐
│  [100vh min-height]                 │
│                                     │
│         HERO TITLE (H1)             │
│         Subtitle Text               │
│         [CTA Button]                │
│                                     │
│  [3D Background / Threlte Scene]    │
└─────────────────────────────────────┘
```

#### Content Section

```
┌─────────────────────────────────────┐
│  [Container: max-width 1280px]      │
│                                     │
│  Section Heading (H2)               │
│  ────────────────                   │
│                                     │
│  ┌─────┐  ┌─────┐  ┌─────┐         │
│  │Card │  │Card │  │Card │         │
│  │     │  │     │  │     │         │
│  └─────┘  └─────┘  └─────┘         │
│                                     │
└─────────────────────────────────────┘
```

#### Blog Post Layout

```
┌─────────────────────────────────────┐
│  [Hero Image 16:9]                  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  [Container: max-width 800px]       │
│                                     │
│  Article Title (H1)                 │
│  Meta: Date • Reading Time          │
│  ────────────────                   │
│                                     │
│  Body Text (16px, 1.5 line-height)  │
│                                     │
│  Paragraph...                       │
│                                     │
│  ## Subheading (H2)                 │
│  More content...                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Grafische Elemente

### Dots Pattern (Hintergrund-Dekoration)

**CSS Implementation:**

```css
.dots-pattern {
  background-image: radial-gradient(
    circle,
    var(--core-primary) 1px,
    transparent 1px
  );
  background-size: 40px 40px;
  opacity: 0.1;
  position: absolute;
  inset: 0;
}
```

**Verwendung:**

- Subtile Hintergründe für Sections
- Hero-Bereiche (sehr geringe Opacity)
- Niemals auf Fließtext

---

### Gradient Overlays

**Radial Gradient (Hero)**

```css
background: radial-gradient(
  farthest-side at top,
  #2b1f99,  /* Gradient Light */
  #0c082f   /* Gradient Dark */
);
```

**Linear Gradient (Cards)**

```css
background: linear-gradient(
  135deg,
  var(--bg-surface) 0%,
  var(--bg-surface-2) 100%
);
```

---

### Glow Effects

**Button Hover:**

```css
box-shadow: 0 0 20px rgba(78, 33, 231, 0.5);
```

**Theme-Specific Glows:**

```css
/* Purple */
--shadow-glow-purple: 0 0 20px rgba(78, 33, 231, 0.5);

/* Blue */
--shadow-glow-blue: 0 0 20px rgba(51, 78, 255, 0.5);

/* Green */
--shadow-glow-green: 0 0 20px rgba(13, 164, 154, 0.5);

/* Red */
--shadow-glow-red: 0 0 20px rgba(238, 72, 95, 0.5);
```

---

### Icons & Symbole

**Stil:**

- Outline (2px Stroke)
- Rounded Corners
- 24x24px Base Size
- Skalierbar (SVG)

**Farbe:**

- Default: `currentColor` (inherit)
- Accent: Theme-specific Primary
- Inactive: 50% Opacity

**Quellen:**

- [Heroicons](https://heroicons.com/) (Primary)
- [Lucide Icons](https://lucide.dev/) (Alternative)
- Custom SVGs (brand-specific)

---

### Arrows & Indicators

**Button Arrow (Standard):**

```svg
<svg width="9" height="10" viewBox="0 0 9 10">
  <path 
    d="M1 1L7 5L1 9" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round"
  />
</svg>
```

**Animiert (Hover):**

```css
.btn-arrow {
  transition: transform 150ms ease;
}

.btn:hover .btn-arrow {
  transform: translateX(3px);
}
```

---

## 🖼️ Anwendungsbeispiele

### Print-Materialien

#### Visitenkarte (85x55mm)

```
Vorderseite:
┌─────────────────────────────────────┐
│  HEINZE                             │
│  MEDIA                              │
│                                     │
│  [Purple Background]                │
│  [Pattern dezent]                   │
│                                     │
│  Name                               │
│  Position                           │
└─────────────────────────────────────┘

Rückseite:
┌─────────────────────────────────────┐
│  [White/Light Background]           │
│                                     │
│  ☎  +49 30 123 456 78               │
│  ✉  mail@heinze.media               │
│  🌐  heinze.media                   │
│                                     │
│  Berlin, Germany                    │
└─────────────────────────────────────┘
```

---

#### Briefpapier (A4)

```
┌─────────────────────────────────────┐
│  [Logo Top Left]                    │
│                                     │
│                                     │
│  [Content Area]                     │
│                                     │
│                                     │
│                                     │
│                                     │
│  ─────────────────────              │
│  HEINZE MEDIA | Berlin              │
│  heinze.media | mail@heinze.media   │
└─────────────────────────────────────┘
```

---

### Digital Assets

#### Social Media Posts (1080x1080px)

```
┌─────────────────────────────────────┐
│  [Dark Background with Gradient]    │
│                                     │
│         Bold Statement              │
│         (Montserrat Bold, 48px)     │
│                                     │
│  [Accent Element / Icon]            │
│                                     │
│  heinze.media                       │
│  [Logo Bottom Right]                │
└─────────────────────────────────────┘
```

**Farben:**

- Background: Theme Dark Color
- Text: White / Light
- Accent: Theme Primary Color

---

#### Email Signature

```html
<table style="font-family: Inter, sans-serif; font-size: 14px;">
  <tr>
    <td style="padding-right: 20px;">
      <img src="logo.png" width="120" alt="HEINZE MEDIA">
    </td>
    <td>
      <strong style="color: #4e21e7;">Max Mustermann</strong><br>
      <span style="color: #433f65;">Lead Developer</span><br>
      <br>
      <span style="color: #5a587a;">
        ☎ +49 30 123 456 78<br>
        ✉ max@heinze.media<br>
        🌐 heinze.media
      </span>
    </td>
  </tr>
</table>
```

---

### Präsentationen (PowerPoint/Keynote)

#### Titelfolie

```
┌─────────────────────────────────────┐
│  [Dark Background]                  │
│  [Dots Pattern]                     │
│                                     │
│         PRESENTATION TITLE          │
│         (Montserrat Bold, 64pt)     │
│                                     │
│         Subtitle                    │
│         (Inter Regular, 24pt)       │
│                                     │
│  [Logo Bottom Left]                 │
│  Date | Event                       │
└─────────────────────────────────────┘
```

#### Content-Folie

```
┌─────────────────────────────────────┐
│  Section Title (32pt)               │
│  ────────────────                   │
│                                     │
│  • Bullet Point 1                   │
│  • Bullet Point 2                   │
│  • Bullet Point 3                   │
│                                     │
│  [Visual Element / Image]           │
│                                     │
│  [Page Number Bottom Right]         │
└─────────────────────────────────────┘
```

---

## ✅ Do's & Don'ts

### Logo-Verwendung

**DO:**
✅ Verwende die bereitgestellten Logo-Dateien
✅ Halte den Schutzraum ein (X-Höhe)
✅ Verwende korrekte Varianten (Dark/Light)
✅ Skaliere proportional
✅ Platziere auf kontrastreichen Hintergründen

**DON'T:**
❌ Logo verzerren oder schräg stellen
❌ Farben ändern (außer definierte Varianten)
❌ Schatten, 3D-Effekte, Neon-Glow hinzufügen
❌ Logo auf gemustertem Hintergrund ohne Kontrast
❌ Logo kleiner als 120px (Web) / 40mm (Print)
❌ Logo-Elemente trennen ("HEINZE" von "MEDIA")

---

### Farbverwendung

**DO:**
✅ Nutze Theme-spezifische Farben konsistent
✅ Achte auf Kontrast (min. 4.5:1 für Text)
✅ Verwende Primärfarbe für CTAs
✅ Halte Farbhierarchie ein (60/30/10)
✅ Teste Light & Dark Mode

**DON'T:**
❌ Zufällige Farben außerhalb der Palette
❌ Zu viele Akzentfarben auf einer Seite
❌ Niedriger Kontrast (unleserlich)
❌ Neon-Farben außer als subtile Glows
❌ Themes mischen (Purple + Blue gleichzeitig)

---

### Typografie

**DO:**
✅ Verwende Montserrat für Headlines
✅ Verwende Inter für Body-Text
✅ Halte Zeilenlänge bei 60-80 Zeichen
✅ Verwende Line-Height 1.5 für Fließtext
✅ Nutze Typografie-Hierarchie (H1 > H2 > Body)

**DON'T:**
❌ Comic Sans, Papyrus oder ähnliche Fonts
❌ Zu viele verschiedene Schriftarten (max. 2)
❌ Komplett UPPERCASE Body-Text
❌ Zu schmale Line-Heights (<1.2 für Body)
❌ Zeilen mit >100 Zeichen (unleserlich)

---

### Layout

**DO:**
✅ Nutze 12-Column Grid für Desktop
✅ Halte Spacing konsistent (4px Increment)
✅ Responsive Design (Mobile First)
✅ Whitespace nutzen (Breathing Room)
✅ Zentrale Elemente auf Max-Width Container

**DON'T:**
❌ Elemente willkürlich platzieren (ohne Grid)
❌ Zu viel Content auf einer Seite (Overload)
❌ Inkonsistente Abstände
❌ Zu enge Layouts (Claustrophobic)
❌ Ignorieren von Mobile Breakpoints

---

### Bildwelt

**DO:**
✅ Hochwertige, moderne Tech-Fotografie
✅ Futuristische Ästhetik (Dark + Neon)
✅ Color Grading (kalt, kontrastreich)
✅ WebP Format für Web (Performance)
✅ Responsive Images (srcset)

**DON'T:**
❌ Generische Stock-Photos (Handshake, etc.)
❌ Überbelichtete, flache Bilder
❌ Bilder ohne Alt-Text (Accessibility!)
❌ Zu große Dateien (>500KB Web)
❌ Pixelige, unscharfe Bilder

---

## 📚 Ressourcen & Assets

### Download-Links

**Logo-Paket:**

- `/static/images/brand/` (Web)
- `HEINZE_MEDIA_Logo_Package.zip` (Print: EPS, PDF, AI)

**Brand Assets:**

- `/brand_guidelines/` (17 Seiten Guideline-PDFs)
- Pattern SVGs: `/static/assets/`

**Fonts:**

```bash
# Web (Google Fonts)
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap');

# Desktop (Download)
- Montserrat Bold (OTF/TTF)
- Inter Regular/Medium/SemiBold (OTF/TTF)
```

---

### Weitere Dokumentation

- **[SYSTEM_BRAND_GUIDELINES.md](SYSTEM_BRAND_GUIDELINES.md)** - Technisches Design System
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Schnellreferenz für Entwickler
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development Guide
- **[ROADMAP.md](ROADMAP.md)** - Projekt-Roadmap

---

### Support & Kontakt

**Design-Fragen:**
📧 <design@heinze.media>

**Technische Fragen:**
📧 <dev@heinze.media>

**Partner & Agenturen:**
📧 <partners@heinze.media>

---

## 🔄 Changelog

**v1.0 - Januar 2026**

- Initiale Version
- 4-Theme System definiert
- Logo-Regeln dokumentiert
- Typografie-System etabliert
- Layout-Guidelines erstellt

---

*Dieses Corporate Design Manual ist ein Living Document und wird bei Bedarf aktualisiert.*

**Letzte Aktualisierung:** 25. Januar 2026
