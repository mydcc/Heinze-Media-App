import { handle as paraglideHandle } from "$lib/paraglide/adapter.js";
import { getLocale, locales, baseLocale, cookieName, extractLocaleFromUrl } from "$lib/paraglide/runtime.js";
import { sequence } from "@sveltejs/kit/hooks";
import { redirect, type Handle } from "@sveltejs/kit";

const redirectHook: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;

    // 1. Only check for redirects on the root or if no locale prefix is present
    // Paraglide prefix for 'de' is '/de/'. 'en' is default and prefix-less.
    const isDe = pathname.startsWith('/de/') || pathname === '/de';

    if (!isDe) {
        // Check if we should redirect to /de/
        const cookieLocale = event.cookies.get(cookieName);
        const acceptLanguage = event.request.headers.get('accept-language') || '';
        const prefersGerman = acceptLanguage.toLowerCase().includes('de');

        // Redirect if:
        // - Cookie is explicitly 'de'
        // - OR No cookie exists AND browser prefers German
        if (cookieLocale === 'de' || (!cookieLocale && prefersGerman)) {
            // Ensure we don't redirect static assets or internal kit calls
            if (!pathname.includes('.') && !pathname.startsWith('/_')) {
                const newPath = `/de${pathname === '/' ? '' : pathname}`;
                throw redirect(307, newPath);
            }
        }
    }

    return resolve(event);
};

const langHook: Handle = async ({ event, resolve }) => {
    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', getLocale())
    });
};

export const handle = sequence(paraglideHandle, redirectHook, langHook);
