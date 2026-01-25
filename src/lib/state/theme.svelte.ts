import { browser } from '$app/environment';
import { untrack } from 'svelte';

export type Theme = 'default' | 'steel' | 'meteorite';
export type Mode = 'light' | 'dark';
export type Category = 'default' | 'free' | 'pro' | 'special';

const THEME_KEY = 'hm-theme';
const MODE_KEY = 'hm-mode';

class ThemeState {
    theme = $state<Theme>('default');
    mode = $state<Mode>('dark');
    category = $state<Category>('default'); // Added category state

    constructor() {
        if (browser) {
            const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
            const savedMode = localStorage.getItem(MODE_KEY) as Mode;

            if (savedTheme && ['default', 'steel', 'meteorite'].includes(savedTheme)) {
                this.theme = savedTheme;
            }

            if (savedMode && ['light', 'dark'].includes(savedMode)) {
                this.mode = savedMode;
            } else {
                // Default to dark as requested/implied by "Navy" default
                this.mode = 'dark';
            }

            this.apply();
        }
    }

    setTheme(newTheme: Theme) {
        this.theme = newTheme;
        if (browser) localStorage.setItem(THEME_KEY, newTheme);
        this.apply();
    }

    setCategory(newCategory: Category) {
        untrack(() => {
            if (this.category === newCategory) return;
            this.category = newCategory;
            this.apply();
        });
    }

    toggleMode() {
        this.mode = this.mode === 'dark' ? 'light' : 'dark';
        if (browser) localStorage.setItem(MODE_KEY, this.mode);
        this.apply();
    }

    apply() {
        if (!browser) return;

        const root = document.documentElement;
        // Remove all core theme classes
        root.classList.remove('theme-default', 'theme-steel', 'theme-meteorite');
        // Add current theme class
        root.classList.add(`theme-${this.theme}`);

        // Set mode data attribute
        root.setAttribute('data-mode', this.mode);

        // Set category data attribute (for accent overrides)
        root.setAttribute('data-category', this.category);

        // Optional: Toggle 'dark' class for Tailwind dark mode if using 'class' strategy (though we use CSS variables mostly)
        if (this.mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }
}

export const themeState = new ThemeState();
