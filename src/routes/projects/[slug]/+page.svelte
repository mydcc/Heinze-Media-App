<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import BlockRenderer from "$lib/components/cms/BlockRenderer.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const metadata = $derived(data.metadata);
    const ContentComponent = $derived(data.component);
    const seoMeta = $derived(data.seoMeta);
    const blocks = $derived(data.metadata.blocks || []);
</script>

<SEOHead
    title={`${metadata.title} | Heinze Media`}
    description={seoMeta.description}
    ogImage={seoMeta.image}
/>

<main class="min-h-screen pb-24 pt-32">
    <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
            <header class="mb-16">
                <h1 class="text-5xl md:text-7xl font-black text-text-main mb-8">
                    {metadata.title}
                </h1>
                {#if metadata.description}
                    <p class="text-xl md:text-2xl text-text-muted leading-relaxed">
                        {metadata.description}
                    </p>
                {/if}
            </header>

            <article class="prose prose-invert max-w-none">
                <ContentComponent />
            </article>

            {#if blocks.length > 0}
                <div class="mt-16">
                    <BlockRenderer {blocks} />
                </div>
            {/if}
        </div>
    </div>
</main>
