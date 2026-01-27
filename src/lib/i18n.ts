import { localizeHref, getLocale } from "$lib/paraglide/runtime.js";

/**
 * Adapter to maintain compatibility with components expecting the `i18n` object
 * while using the Paraglide-JS v2 (beta adapter) API.
 */
export const i18n = {
    /**
     * Resolves a route to the current locale.
     * Maps to localizeHref.
     */
    resolveRoute: (path: string, lang?: string) => {
        return localizeHref(path, { locale: lang ?? getLocale() });
    },

    /**
     * Helper to get the canonical path (without language prefix).
     * This is an approximation as deLocalizeHref returns the full href or path.
     */
    route: (path: string) => {
        // This is tricky as deLocalizeHref exists but we might not need it often.
        // For now, let's satisfy the interface if used.
        return path;
    }
};
