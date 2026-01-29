<script lang="ts">
    import { locale } from "svelte-i18n";

    const availableLanguageTags = ['en', 'de'];

    function changeLanguage(lang: string) {
        locale.set(lang);
    }
</script>

<div class="flex gap-4 items-center">
    <span class="text-xs font-bold uppercase tracking-widest opacity-50"
        >Language</span
    >
    <div class="flex gap-2">
        {#each availableLanguageTags as lang}
            <button
                onclick={() => changeLanguage(lang)}
                class="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all duration-300 relative cursor-pointer
                {$locale === lang
                    ? 'bg-accent text-white shadow-[0_0_15px_rgba(var(--color-accent),0.4)] scale-110 z-10'
                    : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-white hover:scale-105'}"
                aria-current={$locale === lang ? "page" : undefined}
            >
                {lang}
                {#if $locale === lang}
                    <span
                        class="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse border border-bg-footer"
                    ></span>
                {/if}
            </button>
        {/each}
    </div>
</div>
