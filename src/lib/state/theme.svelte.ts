import { browser } from '$app/environment';

export type Theme = 'meteorite' | 'steel' | 'ever' | 'insight';
export type Mode = 'light' | 'dark';

const THEME_KEY = 'hm-theme';
const MODE_KEY = 'hm-mode';
const VALID_THEMES: Theme[] = ['meteorite', 'steel', 'ever', 'insight'];
const VALID_MODES: Mode[] = ['light', 'dark'];

const CATEGORY_THEME_MAP: Record<string, Theme> = {
    // --- BLUE / STEEL (Corporate, Trust, Business) ---
    'home': 'steel',
    'about': 'steel',
    'contact': 'steel',
    'solutions': 'steel',
    'services': 'steel',
    'work': 'steel',
    'consulting': 'steel',

    // --- RED / INSIGHT (Conversion, Offers, Action) ---
    'offer': 'insight',
    'special': 'insight',

    // --- PURPLE / METEORITE (Tech, Innovation, Content) ---
    'metaverse': 'meteorite',
    'xr-studio': 'meteorite',
    'blog': 'meteorite',

    // --- GREEN / EVER (Growth, Free, Community) ---
    'free': 'ever',

    // --- DEFAULTS (Legal, Misc) ---
    'imprint': 'meteorite',
    'privacy-policy': 'meteorite',
    'terms': 'meteorite',
    'sitemap': 'meteorite'
};

class ThemeState {
    theme = $state<Theme>('meteorite');
    mode = $state<Mode>('dark');
    private initialized = $state(false);

    // Derived computed state
    themeClass = $derived.by(() => `theme-${this.theme}`);
    isDarkMode = $derived(this.mode === 'dark');
    themeName = $derived.by(() => {
        const themeLabels: Record<Theme, string> = {
            'meteorite': 'Meteorite (Tech)',
            'steel': 'Steel (Pro)',
            'ever': 'Ever (Free)',
            'insight': 'Insight (Offer)'
        };
        return themeLabels[this.theme] || this.theme;
    });

    constructor() {
        if (browser) {
            this.init();
            // Reactive apply on theme/mode change
            $effect(() => {
                if (this.initialized) {
                    this.applyToDOM();
                }
            });
        }
    }

    private init() {
        // Load from localStorage with validation
        const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
        const savedMode = localStorage.getItem(MODE_KEY) as Mode | null;

        if (savedTheme && VALID_THEMES.includes(savedTheme)) {
            this.theme = savedTheme;
        }

        if (savedMode && VALID_MODES.includes(savedMode)) {
            this.mode = savedMode;
        } else {
            this.initSystemMode();
        }

        this.initialized = true;
    }

    /**
     * Set mode based on system preference
     */
    private initSystemMode() {
        if (!browser) return;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.mode = prefersDark ? 'dark' : 'light';
    }

    /**
     * Apply theme based on page pathname
     */
    applyPageTheme(pathname: string) {
        if (!browser) return;

        if (pathname === '/' || pathname === '/home') {
            this.theme = 'steel';
            return;
        }

        const segment = pathname.split('/')[1]?.toLowerCase();
        if (segment && CATEGORY_THEME_MAP[segment]) {
            this.theme = CATEGORY_THEME_MAP[segment];
        }
    }

    setTheme(newTheme: Theme) {
        if (!VALID_THEMES.includes(newTheme)) return;
        this.theme = newTheme;
        if (browser) localStorage.setItem(THEME_KEY, newTheme);
    }

    toggleMode() {
        this.mode = this.mode === 'dark' ? 'light' : 'dark';
        if (browser) localStorage.setItem(MODE_KEY, this.mode);
    }

    private applyToDOM() {
        if (!browser) return;

        const root = document.documentElement;
        const allThemes = VALID_THEMES.map(t => `theme-${t}`);

        // Apply theme class
        root.classList.remove(...allThemes);
        root.classList.add(this.themeClass);

        // Apply mode attribute
        root.setAttribute('data-mode', this.mode);
        root.classList.toggle('dark', this.isDarkMode);
    }
}

export const themeState = new ThemeState();
