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

<div class="relative min-h-screen w-full">
    <!-- Background: 3D Galaxy -->
    <div class="fixed inset-0 z-0">
        <HeroContact heightClass="h-screen" viewMode="full" />
    </div>

    <!-- Fixed Glass Tile at Bottom -->
    <div
        class="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 ease-out"
        class:opacity-0={!mounted}
        class:translate-y-10={!mounted}
        class:opacity-100={mounted}
        class:translate-y-0={mounted}
    >
        <a
            href="mailto:{contactEmail}"
            class="block backdrop-blur-xl bg-bg-body/30 border border-white/10 rounded-2xl px-10 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-white/20 transition-all duration-500 group"
        >
            <div class="text-center relative">
                <p class="text-[10px] uppercase tracking-[0.5em] text-accent font-black mb-3 opacity-80">
                    {metadata.tagline || "GET IN TOUCH"}
                </p>
                <div
                    class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white transition-all duration-300 block tracking-tight whitespace-nowrap"
                    style="font-size: clamp(1rem, 5vw, 1.875rem);"
                >
                    {contactEmail}
                </div>
            </div>
        </a>
    </div>
</div>

{#if blocks.length > 0}
    <!-- Optional: Add blocks below the hero if needed -->
    <div class="relative z-20 bg-bg-body">
        <BlockRenderer {blocks} />
    </div>
{/if}
