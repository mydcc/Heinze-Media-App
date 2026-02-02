# Roadmap: Heinze Media CMS Evolution

**Status:** Refactoring abgeschlossen. Das System ist stabil, nutzt `mdsvex`, strikte Validierung und unterstützt 3D-Inhalte.

## Phase 1: Bereinigung & Standardisierung (Cleanup) - [ABGESCHLOSSEN]
*   **Ziel:** Entfernen von technischer Schuld und Konsolidierung der Rendering-Logik.
*   **Tasks:**
    *   [x] **Marked-Entfernung:** `marked` wurde weitgehend durch `mdsvex` ersetzt. Verbleibende Nutzung in `RichText.svelte` ist standardisiert.
    *   [x] **Type-Safety:** `src/lib/server/pages.ts` nutzt strikte Zod-Validierung.

## Phase 2: "The Metaverse Interface" (3D Integration) - [ABGESCHLOSSEN]
*   **Ziel:** Erfüllung der Kernvision "3D directly into Svelte components".
*   **Tasks:**
    *   [x] **Komponente `<Model3D />`:** Erstellen einer Threlte-basierten Komponente, die Pfad, Skalierung und Animation als Props akzeptiert.
    *   [x] **Markdown-Integration:** Testen der Einbindung:
        ```markdown
        # Mein 3D Modell
        <Model3D src="/models/avatar.glb" scale={2} />
        ```
    *   [x] **Draco-Pipeline:** Setup eines Scripts zur automatischen Komprimierung von GLB-Dateien im Build-Prozess.

## Phase 3: "Tailwind via Frontmatter" (Dynamic Design) - [ABGESCHLOSSEN]
*   **Ziel:** Markdown-gesteuerte Themes.
*   **Tasks:**
    *   [x] **Frontmatter-Erweiterung:** Definieren von Farbfeldern im Zod-Schema (z.B. `brandColor`, `accentColor`).
    *   [x] **CSS-Variable Injection:** In `+layout.svelte` oder `+page.svelte` diese Werte als Inline-Styles an `:root` oder den Wrapper binden (`style="--brand: {data.meta.brandColor}"`).
    *   [x] **Tailwind Config:** Sicherstellen, dass Tailwind diese CSS-Variablen nutzt (`colors: { brand: 'var(--brand)' }`).

## Phase 4: Static Search & Performance - [ABGESCHLOSSEN]
*   **Ziel:** Backend-lose Suche und High-Speed Performance.
*   **Tasks:**
    *   [x] **Pagefind Integration:** Setup des `pagefind` Indexers als Post-Build-Step.
    *   [x] **Search UI:** Bauen einer Svelte-Komponente für das Suchfeld.
    *   [x] **Asset-Check:** Script zur Prüfung ist im Ordner `scripts/` vorhanden.

## Phase 5: Wartung & Content (Laufend)
*   **Ziel:** Nutzung der neuen Features und Überwachung der Stabilität.
*   **Tasks:**
    *   [ ] **Content Creation:** Erstellen von Showcase-Seiten mit 3D-Modellen und Custom Branding.
    *   [ ] **Monitoring:** Überwachen der Build-Logs auf Validierungsfehler (Strict Mode ist aktiv).
