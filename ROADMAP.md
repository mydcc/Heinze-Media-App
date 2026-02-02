# Roadmap: Heinze Media CMS Evolution

**Status:** Refactoring (Phase 0) abgeschlossen. Das System nutzt nun `mdsvex` und strikte Validierung.
**Nächste Schritte:** Basierend auf `AGENT.md` und der neuen Architektur.

## Phase 1: Bereinigung & Standardisierung (Cleanup)
*   **Ziel:** Entfernen von technischer Schuld und Konsolidierung der Rendering-Logik.
*   **Tasks:**
    *   [ ] **Marked-Entfernung:** `marked` wird noch in `RichText.svelte`, `render.ts` und anderen Komponenten verwendet. Diese sollten auf `mdsvex` (via Component-Import) umgestellt werden, um eine einheitliche Rendering-Engine zu garantieren.
    *   [ ] **Type-Safety:** Verbesserung der TypeScript-Typen für die Frontmatter-Daten, die nun strikt validiert sind.

## Phase 2: "The Metaverse Interface" (3D Integration)
*   **Ziel:** Erfüllung der Kernvision "3D directly into Svelte components".
*   **Tasks:**
    *   [ ] **Komponente `<Model3D />`:** Erstellen einer Threlte-basierten Komponente, die Pfad, Skalierung und Animation als Props akzeptiert.
    *   [ ] **Markdown-Integration:** Testen der Einbindung:
        ```markdown
        # Mein 3D Modell
        <Model3D src="/models/avatar.glb" scale={2} />
        ```
    *   [ ] **Draco-Pipeline:** Setup eines Scripts zur automatischen Komprimierung von GLB-Dateien im Build-Prozess.

## Phase 3: "Tailwind via Frontmatter" (Dynamic Design)
*   **Ziel:** Markdown-gesteuerte Themes.
*   **Tasks:**
    *   [ ] **Frontmatter-Erweiterung:** Definieren von Farbfeldern im Zod-Schema (z.B. `brandColor`, `accentColor`).
    *   [ ] **CSS-Variable Injection:** In `+layout.svelte` oder `+page.svelte` diese Werte als Inline-Styles an `:root` oder den Wrapper binden (`style="--brand: {data.meta.brandColor}"`).
    *   [ ] **Tailwind Config:** Sicherstellen, dass Tailwind diese CSS-Variablen nutzt (`colors: { brand: 'var(--brand)' }`).

## Phase 4: Static Search & Performance
*   **Ziel:** Backend-lose Suche und High-Speed Performance.
*   **Tasks:**
    *   [ ] **Pagefind Integration:** Setup des `pagefind` Indexers als Post-Build-Step.
    *   [ ] **Search UI:** Bauen einer Svelte-Komponente für das Suchfeld.
    *   [ ] **Asset-Check:** Script zur Prüfung, ob alle in Markdown referenzierten Bilder/Modelle auch tatsächlich existieren (Broken Link Checker).

## Priorisierung
Empfohlener Start mit **Phase 2**, da dies das wichtigste Alleinstellungsmerkmal (USP) des "neuen" CMS ist.
