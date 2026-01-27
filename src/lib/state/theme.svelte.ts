import { browser } from '$app/environment';
import { resolvePathToTheme, type Theme } from './themeRouter.svelte';

export type { Theme };
export type Mode = 'light' | 'dark';
export type ThemeOverride = 'auto' | 'manual';

const THEME_KEY = 'hm-theme';
const MODE_KEY = 'hm-mode';
const OVERRIDE_KEY = 'hm-theme-override';
const VALID_THEMES: Theme[] = ['meteorite', 'steel', 'ever', 'insight', 'gold'];
const VALID_MODES: Mode[] = ['light', 'dark'];

class ThemeStore {
    theme = $state<Theme>('meteorite');
    mode = $state<Mode>('dark');
    override = $state<ThemeOverride>('auto');
    private initialized = false;
    private lastAppliedPath: string | null = null; // Track to prevent duplicate applies

    // Derived computed state (only works in components, so mark as computed getters)
    get themeClass(): string {
        return `theme-${this.theme}`;
    }

    get isDarkMode(): boolean {
        return this.mode === 'dark';
    }

    get themeName(): string {
        const themeLabels: Record<Theme, string> = {
            'meteorite': 'Meteorite (Tech)',
            'steel': 'Steel (Pro)',
            'ever': 'Ever (Free)',
            'insight': 'Insight (Offer)',
            'gold': 'Gold (Luxury)'
        };
        return themeLabels[this.theme] || this.theme;
    }

    constructor() {
        if (browser) {
            this.init();
            this.applyToDOM();
            // NICHT applyPageTheme hier! Das wird vom $effect gemacht.
        }
    }

    private init() {
        // Load mode preference only (NOT theme, NOT override)
        // Theme is determined by route, override is always 'auto' on page load
        const savedMode = localStorage.getItem(MODE_KEY) as Mode | null;

        if (savedMode && VALID_MODES.includes(savedMode)) {
            this.mode = savedMode;
        } else {
            this.initSystemMode();
        }

        // CRITICAL: Override is ALWAYS 'auto' on page load
        // This enables automatic route-based theme switching
        this.override = 'auto';

        // Clean up old localStorage entries
        localStorage.removeItem(THEME_KEY);
        localStorage.removeItem(OVERRIDE_KEY);

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
     * 
     * Logik:
     * - Wenn override === 'manual', nicht reagieren
     * - Wenn override === 'auto', Theme via Router auflösen
     * - Caching: Wenn Pathname identisch mit letztem Apply, skip
     */
    applyPageTheme(pathname: string): void {
        if (!browser) return;

        console.log('[ThemeStore] applyPageTheme:', {
            pathname,
            override: this.override,
            lastAppliedPath: this.lastAppliedPath,
            currentTheme: this.theme,
        });

        // Skip wenn Manual-Override aktiv
        if (this.override === 'manual') {
            console.log('[ThemeStore] Skipping - Manual override active');
            return;
        }

        // Skip wenn gleicher Pfad wie zuletzt
        if (this.lastAppliedPath === pathname) {
            console.log('[ThemeStore] Skipping - Same path as last apply');
            return;
        }

        this.lastAppliedPath = pathname;
        const newTheme = resolvePathToTheme(pathname);

        console.log('[ThemeStore] Resolved theme:', newTheme);

        if (newTheme !== this.theme) {
            console.log('[ThemeStore] Theme changed:', { from: this.theme, to: newTheme });
            this.theme = newTheme;
            this.applyToDOM();
        } else {
            console.log('[ThemeStore] Theme unchanged');
        }
    }

    setTheme(newTheme: Theme) {
        this.setThemeManual(newTheme);
    }

    setThemeManual(newTheme: Theme) {
        if (!VALID_THEMES.includes(newTheme)) return;
        this.override = 'manual';
        this.theme = newTheme;
        // NO PERSIST: Manual theme is temporary for current page only
        this.applyToDOM();
    }

    setAuto(pathname?: string) {
        this.override = 'auto';
        const targetPath = pathname ?? (browser ? window.location.pathname : '/');
        this.lastAppliedPath = null; // Reset cache to force re-apply
        this.applyPageTheme(targetPath);
    }

    toggleMode() {
        this.mode = this.mode === 'dark' ? 'light' : 'dark';
        this.applyToDOM();
        if (browser) localStorage.setItem(MODE_KEY, this.mode);
    }

    applyToDOM() {
        if (!browser) return;

        const root = document.documentElement;
        const allThemes = VALID_THEMES.map(t => `theme-${t}`);

        // Apply theme class
        root.classList.remove(...allThemes);
        root.classList.add(this.themeClass);

        // Apply mode attribute
        root.setAttribute('data-mode', this.mode);
        root.classList.toggle('dark', this.isDarkMode);

        // Apply override attribute for debugging / CSS hooks if needed
        root.setAttribute('data-theme-override', this.override);
    }

    // No longer needed: Theme and override are not persisted
}

export const themeState = new ThemeStore();

