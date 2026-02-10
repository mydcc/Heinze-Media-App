<script lang="ts">
    import HeroContact from "$lib/components/3d/HeroContact.svelte";
    import BlockRenderer from "$lib/components/cms/BlockRenderer.svelte";
    import { onMount } from "svelte";

    let { metadata } = $props<{ metadata: any }>();

    let mounted = $state(false);
    onMount(() => {
        mounted = true;
    });

    const blocks = $derived(metadata.blocks || []);
    const contactEmail = $derived(metadata.contactEmail || "kontakt@heinze-media.de");
</script>

<div class="relative min-h-screen w-full overflow-hidden">
    <!-- Background: 3D Galaxy -->
    <div class="fixed inset-0 z-0">
        <HeroContact heightClass="h-screen" viewMode="full" />
    </div>

    <!-- Floating HUD Overlay -->
    <div
        class="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end items-center pb-[148px] transition-all duration-1000 ease-out"
        class:opacity-0={!mounted}
        class:translate-y-4={!mounted}
        class:opacity-100={mounted}
        class:translate-y-0={mounted}
    >
        <div
            class="pointer-events-auto backdrop-blur-2xl bg-bg-body/40 border border-white/10 rounded-2xl px-8 py-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t-white/20 transition-all duration-500 hover:border-accent/40 group"
        >
            <div class="text-center">
                <p class="text-[10px] uppercase tracking-[0.4em] text-accent font-black mb-2 opacity-70">
                    {metadata.tagline || "Get in Touch"}
                </p>
                <a
                    href="mailto:{contactEmail}"
                    class="text-xl md:text-2xl font-black text-white hover:text-accent transition-all duration-300 block"
                >
                    {contactEmail}
                </a>
                <div class="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/5">
                    {#each (metadata.locations || ["Berlin", "Remote", "Metaverse"]) as loc}
                        <span class="text-[10px] text-text-muted uppercase tracking-widest">{loc}</span>
                        {#if loc !== metadata.locations?.at(-1)}
                            <span class="w-1 h-1 rounded-full bg-accent/30"></span>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

{#if blocks.length > 0}
    <!-- Optional: Add blocks below the hero if needed -->
    <div class="relative z-20 bg-bg-body">
        <BlockRenderer {blocks} />
    </div>
{/if}
