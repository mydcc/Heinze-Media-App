# Theme System Analysis & Restoration Plan

## 1. Problem Identification
*   **Symptom:** Themes switch, but colors are "not authentic". Dark/Light mode toggle has no effect.
*   **Root Cause (Analysis):**
    *   The file `src/app.css` was overwritten during the Phase 3 implementation with a simplified version.
    *   **Missing Selectors:** The current CSS lacks `[data-mode="light"]` selectors. This explains why the toggle button (which correctly sets the attribute) has no visual effect.
    *   **Lost Palette:** The original, complex color definitions (using `color-mix`, gradients, and specific HSL values for Meteorite/Steel/Ever/Insight/Gold) were replaced by generic placeholders.
    *   **Binding:** The dynamic injection in `+layout.svelte` works technically (`style="--color-brand: ..."`) but the underlying CSS variables it relies on are now generic/broken.

## 2. Evidence
Comparison of Current vs. Original (recovered from history):

| Feature | Current `app.css` | Original `app.css` | Impact |
| :--- | :--- | :--- | :--- |
| **Light Mode** | Missing | Defined (e.g. `.theme-meteorite[data-mode="light"]`) | Light mode broken |
| **Palette** | Generic Hex | Specific Brand Colors & Gradients | "Inauthentic" look |
| **Gradients** | None | `radial-gradient(...)` | Flat look |
| **Tailwind 4** | Partial | Full Config via `@theme` | Layout/Spacing issues |

## 3. Restoration Plan
1.  **Restore `src/app.css`:** Revert to the "Authentic" version containing the full Tailwind 4 `@theme` configuration and the detailed theme blocks with Light Mode overrides.
2.  **Verify Binding:** Ensure the restored CSS uses the variable names that `+layout.svelte` injects (`--color-brand`, `--color-accent` are mostly consistent, but the original used `--core-primary`).
    *   *Correction:* The Phase 3 Dynamic Design feature uses `--color-brand` and `--color-accent`. The "Original" CSS uses `--core-primary` and maps `--color-accent: var(--core-primary)`.
    *   *Integration:* I must ensure the **restored** CSS allows the dynamic override.
    *   I will add the dynamic override block to the restored CSS:
        ```css
        @theme {
          /* ... restored values ... */
          --color-brand: var(--color-brand, var(--core-primary));
          --color-accent: var(--color-accent, var(--core-primary));
        }
        ```
3.  **Validate:** Switch themes and toggle light mode to confirm restoration.

## 4. Next Steps
Proceed with restoring the file content.
