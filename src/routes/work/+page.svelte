<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";

    let { data } = $props();

    const seoConfig: SEOConfig = {
        title: "Portfolio - Our Work | HEINZE MEDIA",
        description:
            "Entdecken Sie unsere erfolgreichen Projekte im Bereich XR, Metaverse und 3D Web. Von Virtual Production bis zur Metaverse-Integration - professionelle Lösungen für zukunftsorientierte Marken.",
        keywords: [
            "Portfolio",
            "Work",
            "XR Projects",
            "Metaverse",
            "Cases",
            "3D Web",
        ],
        url: "https://heinze.media/work",
        type: "website",
        image: "https://heinze.media/og-work.png",
        author: "HEINZE MEDIA",
    };
</script>

<SEOHead config={seoConfig} />

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<div class="container mx-auto px-6 py-24">
    <h1 class="text-4xl md:text-5xl font-bold mb-12 text-center">
        Selected <span class="text-brand-cyan">Work</span>
    </h1>

    <div class="grid md:grid-cols-2 gap-8">
        {#each data.posts as post}
            <a
                href="/work/{post.slug}"
                class="group block relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/5"
            >
                {#if post.image}
                    <img
                        src={post.image}
                        alt={post.title}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                {/if}
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 opacity-90 group-hover:opacity-100 transition-opacity"
                >
                    <h2
                        class="text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors"
                    >
                        {post.title}
                    </h2>
                    {#if post.categories}
                        <p class="text-sm text-white/70 mt-2">
                            {post.categories.join(", ")}
                        </p>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</div>
