import type { LayoutLoad } from './$types';

export const prerender = true;
export const trailingSlash = 'always';

/**
 * Load-Funktion für Root Layout
 * Gibt den aktuellen Pfad weiter, damit Client-Side das Theme setzen kann
 */
export const load: LayoutLoad = async ({ url }) => {
    return {
        pathname: url.pathname
    };
};
