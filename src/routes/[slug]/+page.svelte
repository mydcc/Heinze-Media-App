<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import BlockRenderer from "$lib/components/cms/BlockRenderer.svelte";
    import HeroContact from "$lib/components/3d/HeroContact.svelte";
    import HeroModule from "$lib/components/cms/HeroModule.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const metadata = $derived(data.metadata);
    const html = $derived(data.html);
    const seoMeta = $derived(data.seoMeta);
    const jsonLD = $derived(data.jsonLD);
    const blocks = $derived(data.blocks || []);
    const layout = $derived(metadata?.layout || "default");

    // Animation states
    let mounted = $state(false);
    import { onMount } from "svelte";
    onMount(() => {
        mounted = true;
    });
</script>

<SEOHead
    title={`${metadata.title} | Heinze Media`}
    description={seoMeta.description}
    ogImage={seoMeta.image}
    {jsonLD}
/>

{#if layout === "contact"}
    <div class="relative h-screen w-full overflow-hidden">
        <!-- Background: Canvas -->
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
                    <p
                        class="text-[10px] uppercase tracking-[0.4em] text-accent font-black mb-2 opacity-70"
                    >
                        Get in Touch
                    </p>
                    <a
                        href="mailto:kontakt@heinze-media.de"
                        class="text-xl md:text-2xl font-black text-white hover:text-accent transition-all duration-300 block"
                    >
                        kontakt@heinze-media.de
                    </a>
                    <div
                        class="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/5"
                    >
                        <span
                            class="text-[10px] text-text-muted uppercase tracking-widest"
                            >Berlin</span
                        >
                        <span class="w-1 h-1 rounded-full bg-accent/30"></span>
                        <span
                            class="text-[10px] text-text-muted uppercase tracking-widest"
                            >Remote</span
                        >
                        <span class="w-1 h-1 rounded-full bg-accent/30"></span>
                        <span
                            class="text-[10px] text-text-muted uppercase tracking-widest"
                            >Metaverse</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <main class="min-h-screen pb-24">
        {#if blocks.length > 0}
            <BlockRenderer {blocks} />
        {:else}
            <div class="pt-32 pb-16 md:pt-48 md:pb-24">
                <div class="container mx-auto px-6">
                    <div class="max-w-4xl mx-auto">
                        <header class="mb-16">
                            <h1
                                class="text-5xl md:text-7xl font-black text-text-main mb-8 tracking-tighter leading-none"
                            >
                                {metadata.title}
                            </h1>
                            {#if metadata.description}
                                <p
                                    class="text-xl md:text-2xl text-text-muted leading-relaxed max-w-2xl"
                                >
                                    {metadata.description}
                                </p>
                            {/if}
                        </header>
                        <article
                            class="prose prose-invert max-w-none prose-headings:text-text-main prose-p:text-text-muted prose-strong:text-accent prose-a:text-accent"
                        >
                            {@html html}
                        </article>
                    </div>
                </div>
            </div>
        {/if}
    </main>
{/if}
