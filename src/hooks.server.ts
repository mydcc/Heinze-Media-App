import { handle as paraglideHandle } from "$lib/paraglide/adapter.js";
import { getLocale, locales, baseLocale, cookieName, extractLocaleFromUrl } from "$lib/paraglide/runtime.js";
import { sequence } from "@sveltejs/kit/hooks";
import { redirect, type Handle } from "@sveltejs/kit";

const redirectHook: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;
    const cookieLocale = event.cookies.get(cookieName);
    
    // 1. Detect current URL locale
    const isDePath = pathname.startsWith('/de/') || pathname === '/de';
    const urlLocale = isDePath ? 'de' : 'en';

    // 2. Handle Root Redirects (Only on '/' or '/de')
    // This ensures that when a user visits the site, they get their preferred language.
    if (pathname === '/' || pathname === '/de' || pathname === '/de/') {
        const acceptLanguage = event.request.headers.get('accept-language') || '';
        const prefersGerman = acceptLanguage.toLowerCase().includes('de');
        
        // If no cookie exists, use browser preference
        const targetLocale = cookieLocale || (prefersGerman ? 'de' : 'en');

        if (targetLocale === 'de' && !isDePath) {
            throw redirect(307, '/de');
        } else if (targetLocale === 'en' && isDePath) {
            throw redirect(307, '/');
        }
    }

    return resolve(event);
};

const langHook: Handle = async ({ event, resolve }) => {
    const locale = getLocale();
    
    // ALWAYS sync the cookie with the current resolved locale from the URL
    // This makes the "URL choice" persistent immediately.
    event.cookies.set(cookieName, locale, {
        path: '/',
        maxAge: 31536000, // 1 year
        httpOnly: false,
        sameSite: 'lax'
    });

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', locale)
    });
};

export const handle = sequence(paraglideHandle, redirectHook, langHook);
