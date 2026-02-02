# Architektur-Analysebericht: Heinze Media Svelte-CMS

**Datum:** 24. Mai 2024
**Status:** Analyse abgeschlossen
**Referenz:** AGENT.md (Aktualisierte Anforderungen)

## 1. Einleitung
Dieser Bericht analysiert den aktuellen Status der Codebasis nach dem Refactoring im Hinblick auf Stabilität, Robustheit und Übereinstimmung mit den neuen Anforderungen aus `AGENT.md`. Ziel ist es, Diskrepanzen aufzudecken, die die "neue Umgebung" gefährden könnten.

## 2. Status Quo Analyse

### 2.1 Headless CMS Core (`src/lib/server/pages.ts`)
*   **Aktuelle Implementierung:** Das System nutzt `glob` Imports für Markdown-Dateien und verarbeitet diese mit `gray-matter` (Frontmatter) und `marked` (Content zu HTML).
*   **Problem:** Die Nutzung von `marked` generiert statisches HTML String-Material.
*   **Kritische Lücke:** `AGENT.md` fordert explizit die Nutzung von **`mdsvex`**, um "interaktive Svelte-Komponenten und Three.js Canvases direkt in .md Dateien" zu ermöglichen. Mit der aktuellen `marked`-Lösung ist dies **technisch unmöglich**. Svelte-Komponenten im Markdown werden als reiner Text oder defektes HTML gerendert.
*   **Rendering:** In `src/routes/[slug]/+page.svelte` wird `{@html html}` verwendet. Dies bestätigt, dass keine Hydration von Komponenten innerhalb des Contents stattfindet.

### 2.2 Validierung & Build-Sicherheit (`src/lib/server/pages.ts`)
*   **Aktuelle Implementierung:** Es wird ein Zod-Schema (`frontmatterSchema`) verwendet. Fehler beim Parsen werden jedoch abgefangen (`try...catch`), geloggt (`console.error`), und die Seite wird übersprungen (`continue`).
*   **Kritische Lücke:** `AGENT.md` fordert "Strict Validation". Wenn eine Datei invalide ist, muss der Build **abbrechen** ("throw an error to stop the build process"). Das aktuelle Verhalten ("Swallowing Errors") führt dazu, dass invalide Seiten einfach "verschwinden", ohne dass der Entwickler es zwingend merkt, was die Robustheit untergräbt.

### 2.3 State Management (`src/lib/state`)
*   **Status:** Positiv.
*   **Implementierung:** Die Stores (z.B. `theme.svelte.ts`) nutzen korrekt Svelte 5 Runes (`$state`, `$derived`), wie gefordert.
*   **Binding:** Das Theme-Management wirkt sauber und reaktiv.

### 2.4 Internationalisierung (I18n)
*   **Aktuelle Implementierung:** Das Projekt nutzt `@inlang/paraglide-sveltekit` (`vite.config.ts`, `package.json`, `pages.ts`).
*   **Diskrepanz:** Interne Informationen deuteten auf einen Wechsel zu `svelte-i18n` hin. Die Codebasis spiegelt dies **nicht** wider. Paraglide ist tief integriert.
*   **Empfehlung:** Falls Paraglide gewünscht ist, ist die Implementierung okay. Falls `svelte-i18n` gefordert war, ist die Migration noch nicht erfolgt.

### 2.5 Mapping & Bindings
*   **Mapping:** Das Mapping der Slugs in `pages.ts` ist logisch aufgebaut (`src/content/{lang}/{type}/{slug}.md`).
*   **Fallback-Logik:** Es gibt eine Logik, die auf 'de' zurückfällt, wenn 'en' fehlt. `AGENT.md` erwähnt dies nicht explizit als Fehler, aber die Validierung (`validator.ts`) prüft nur auf fehlende Dateien, bricht aber den Build nicht ab.

## 3. Zusammenfassung der Defizite (Risk Assessment)

| Bereich | Anforderung (AGENT.md) | Ist-Zustand | Risiko |
| :--- | :--- | :--- | :--- |
| **Markdown Engine** | `mdsvex` (Svelte im Content) | `marked` (Nur HTML) | **Hoch** (Features fehlen) |
| **Validation** | Build-Abbruch bei Fehler | Log & Skip | **Mittel** (Silent Failures) |
| **Interaktivität** | 3D in Markdown möglich | Nicht möglich | **Hoch** (Vision verfehlt) |
| **I18n** | Unklar (Paraglide vs svelte-i18n) | Paraglide | **Niedrig** (Funktioniert, aber evtl. falsch) |

## 4. Empfohlene Maßnahmen (Next Steps)

Um die geforderte Stabilität und Robustheit herzustellen, sind folgende Schritte zwingend:

1.  **Migration zu mdsvex:**
    *   Entfernen von `marked`.
    *   Installation und Konfiguration von `mdsvex` in `svelte.config.js`.
    *   Anpassung des Loaders in `pages.ts` (Import als Component statt Raw String).
2.  **Härtung der Validierung:**
    *   Entfernen des `try...catch` Blocks in `getAllPages` (bzw. Ersetzen durch expliziten `throw`).
    *   Sicherstellen, dass `check:content` Scripts im Build-Prozess (Pre-Build) laufen.
3.  **Bereinigung I18n:**
    *   Entscheidung treffen: Paraglide beibehalten oder Migration durchführen. (Empfehlung: Bei Paraglide bleiben, da es Type-Safe ist, sofern keine Blockade besteht).

Diese Maßnahmen transformieren das aktuelle "Loose CMS" in das geforderte "Robust Headless CMS".
