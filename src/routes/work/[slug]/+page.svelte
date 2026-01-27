<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const metadata = $derived(data.metadata);
    const html = $derived(data.html);
    const seoMeta = $derived(data.seoMeta);
    const jsonLD = $derived(data.jsonLD);
</script>

<SEOHead
    title={`${metadata.title} | Heinze Media Portfolio`}
    description={seoMeta.description}
    ogImage={seoMeta.image}
    {jsonLD}
/>

<article>
    <!-- Hero Section -->
    <div class="relative py-20 md:py-28 overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent"
        ></div>
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-3xl mx-auto">
                <span
                    class="text-accent text-sm font-semibold uppercase tracking-widest"
                    >Portfolio</span
                >
                <h1
                    class="text-4xl md:text-5xl lg:text-6xl font-black mb-6 mt-4"
                >
                    {metadata.title}
                </h1>
                {#if metadata.description}
                    <p class="text-lg text-white/70 mb-8">
                        {metadata.description}
                    </p>
                {/if}
                <div class="flex flex-wrap gap-6 text-sm text-white/60">
                    {#if metadata.date}
                        <span
                            >📅 {new Date(metadata.date).toLocaleDateString(
                                "de-DE",
                            )}</span
                        >
                    {/if}
                    {#if metadata.author}
                        <span>✍️ {metadata.author}</span>
                    {/if}
                    {#if data.readingTime}
                        <span>⏱️ {data.readingTime} min Lesezeit</span>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 py-16 md:py-24">
        <div class="max-w-3xl mx-auto prose prose-invert dark">
            {@html html}
        </div>
    </div>
</article>
