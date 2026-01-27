/**
 * THEME ROUTER - Robust Route-to-Theme Mapping
 * 
 * Zentrale, skalierbare Logik für alle Seite → Theme-Zuordnungen.
 * Kann erweitert werden ohne die Store-Logik zu beeinflussen.
 */

export type Theme = 'meteorite' | 'steel' | 'ever' | 'insight';

/**
 * Kategorie-Hierarchie: Definiert, welches Theme für welche Route gilt.
 * Format: "segment" → Theme
 * Die Logik läuft von spezifisch zu allgemein.
 */
const ROUTE_THEME_CONFIG: Record<string, Theme> = {
    // HOME (STEEL)
    '': 'steel', // root /
    'home': 'steel',

    // CORPORATE (STEEL)
    'about': 'steel',
    'contact': 'steel',
    'solutions': 'steel',
    'services': 'steel',
    'work': 'steel',
    'consulting': 'steel',

    // CONVERSION (INSIGHT)
    'offer': 'insight',
    'special': 'insight',

    // CONTENT & INNOVATION (METEORITE)
    'metaverse': 'meteorite',
    'xr-studio': 'meteorite',
    'blog': 'meteorite',

    // COMMUNITY (EVER)
    'free': 'ever',

    // LEGAL & UTILITY (METEORITE)
    'imprint': 'meteorite',
    'privacy-policy': 'meteorite',
    'terms': 'meteorite',
    'sitemap': 'meteorite',
};

/**
 * RESOLVEPATHTOTHEME - Kernlogik für alle Route-basiertes Theme-Lookups
 * 
 * Aggressiv: Versucht zuerst exakt, dann progressiv fallback.
 * Input: "/blog/my-post/slug" → Output: 'meteorite'
 * Input: "/unknown/path" → Output: 'meteorite' (DEFAULT)
 */
export function resolvePathToTheme(pathname: string): Theme {
    if (!pathname || pathname === '/') {
        return ROUTE_THEME_CONFIG[''] || 'meteorite';
    }

    // Normalisiere: "/about/" → "about"
    const normalized = pathname
        .split('/')
        .filter((s) => s.length > 0)
        .map((s) => s.toLowerCase())[0];

    if (!normalized) {
        return ROUTE_THEME_CONFIG[''] || 'meteorite';
    }

    // Direkter Lookup
    if (normalized in ROUTE_THEME_CONFIG) {
        return ROUTE_THEME_CONFIG[normalized];
    }

    // DEFAULT
    return 'meteorite';
}

/**
 * CANADDROUTE - Helper zum Erweitern der Config (z. B. von außen)
 */
export function canAddRoute(segment: string, theme: Theme): void {
    if (segment && !ROUTE_THEME_CONFIG[segment]) {
        ROUTE_THEME_CONFIG[segment] = theme;
    }
}

/**
 * GETALLROUTES - Debug/Introspection
 */
export function getAllRoutes(): Record<string, Theme> {
    return { ...ROUTE_THEME_CONFIG };
}
