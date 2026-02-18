<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import BlockRenderer from "$lib/components/cms/BlockRenderer.svelte";
    import HeroContact from "$lib/components/3d/HeroContact.svelte";
    import { Hero } from "$lib/components";
    import AboutLayout from "$lib/components/layouts/AboutLayout.svelte";
    import ContactLayout from "$lib/components/layouts/ContactLayout.svelte";
    import ServiceLayout from "$lib/components/layouts/ServiceLayout.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const metadata = $derived(data.metadata);
    // DEBUG: Log metadata to console to verify content loading
    $effect(() => {
        console.log("Page Metadata:", metadata);
        console.log("Current Layout:", metadata?.layout);
        console.log("Content Component Present:", !!data.component);
    });

    // Component is now loaded dynamically via mdsvex
    const ContentComponent = $derived(data.component);

    const seoMeta = $derived(data.seoMeta);
    const jsonLD = $derived(data.jsonLD);
    const blocks = $derived(data.metadata.blocks || []);
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
    <ContactLayout {metadata} />
{:else if layout === "about"}
    <AboutLayout {metadata}>
        {#snippet children()}
            {#if ContentComponent}
                <ContentComponent />
            {/if}
        {/snippet}
    </AboutLayout>
{:else if layout === "service"}
    <ServiceLayout {metadata}>
        {#snippet children()}
            <ContentComponent />
        {/snippet}
    </ServiceLayout>
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
                            <!-- Render the mdsvex component dynamically -->
                            {#if ContentComponent}
                                <ContentComponent />
                            {/if}
                        </article>
                    </div>
                </div>
            </div>
        {/if}
    </main>
{/if}
