import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import { browser } from '$app/environment';

register('en', () => import('../locales/en.json'));
register('de', () => import('../locales/de.json'));

export function setupI18n() {
    init({
        fallbackLocale: 'en',
        initialLocale: browser ? (window.navigator.language?.split('-')[0] || 'en') : 'en',
    });
}

// Export locale store for usage in components
export { locale, _, isLoading } from 'svelte-i18n';
