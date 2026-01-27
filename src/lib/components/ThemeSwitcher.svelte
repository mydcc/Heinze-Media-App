<script lang="ts">
    import { themeState, type Theme } from "$lib/state/theme.svelte";

    const themes: { id: Theme; label: string; color: string }[] = [
        { id: "meteorite", label: "Meteorite", color: "#4e21e7" },
        { id: "steel", label: "Steel Pro", color: "#334eff" },
        { id: "ever", label: "Ever Free", color: "#0da49a" },
        { id: "insight", label: "Insight", color: "#ee485f" },
    ];
</script>

<div class="flex gap-4 items-center">
    <span class="text-xs font-bold uppercase tracking-widest opacity-50"
        >Identity</span
    >
    <div class="flex gap-2.5 items-center">
        {#each themes as t}
            <button
                onclick={() => themeState.setTheme(t.id)}
                class="w-7 h-7 rounded-lg border border-white/10 hover:scale-110 transition-all relative shadow-sm"
                style="background-color: {t.color}"
                aria-label="Set theme to {t.label}"
                title={t.label}
            >
                {#if themeState.override === "manual" && themeState.theme === t.id}
                    <span
                        class="absolute inset-0 flex items-center justify-center bg-white/20 rounded-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            stroke-width="4"
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
