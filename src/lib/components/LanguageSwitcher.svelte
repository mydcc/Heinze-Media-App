<script lang="ts">
    import {
        getLocale as languageTag,
        locales as availableLanguageTags,
    } from "$lib/paraglide/runtime.js";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { i18n } from "$lib/i18n";

    /**
     * Get the relative href for a language
     */
    function getHref(lang: string) {
        const path = i18n.resolveRoute($page.url.pathname, lang);
        // Avoid accessing url.search during prerendering/server-side to prevent build errors
        if (!browser) return path;
        return path + $page.url.search;
    }
</script>

<div class="flex gap-4 items-center">
    <span class="text-xs font-bold uppercase tracking-widest opacity-50"
        >Language</span
    >
    <div class="flex gap-2">
        {#each availableLanguageTags as lang}
            <a
                href={getHref(lang)}
                class="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-xs font-black uppercase tracking-widest transition-all duration-300 relative
                {languageTag() === lang
                    ? 'bg-accent text-white shadow-[0_0_15px_rgba(var(--color-accent),0.4)] scale-110 z-10'
                    : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-white hover:scale-105'}"
                aria-current={languageTag() === lang ? "page" : undefined}
            >
                {lang}
                {#if languageTag() === lang}
                    <span
                        class="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse border border-bg-footer"
                    ></span>
                {/if}
            </a>
        {/each}
    </div>
</div>
