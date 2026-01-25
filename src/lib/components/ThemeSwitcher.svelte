<script lang="ts">
    import { themeState, type Theme } from "$lib/state/theme.svelte";

    const themes: { id: Theme; label: string; color: string }[] = [
        { id: "default", label: "Default", color: "#00f2ea" }, // Cyan
        { id: "steel", label: "Steel", color: "#334eff" }, // Blue
        { id: "meteorite", label: "Meteorite", color: "#7c3aed" }, // Purple
    ];
</script>

<div class="flex gap-4 items-center">
    <span class="text-xs font-bold uppercase tracking-wider opacity-60"
        >Theme</span
    >
    <div class="flex gap-2">
        {#each themes as t}
            <button
                onclick={() => themeState.setTheme(t.id)}
                class="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform relative"
                style="background-color: {t.color}"
                aria-label="Set theme to {t.label}"
                title={t.label}
            >
                {#if themeState.theme === t.id}
                    <span
                        class="absolute inset-0 flex items-center justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        >
                    </span>
                {/if}
            </button>
        {/each}
    </div>
</div>
