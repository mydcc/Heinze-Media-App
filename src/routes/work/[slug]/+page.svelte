<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";

    let { data } = $props();
    // Use derived to access destructured values
    let post = $derived(data.post);

    // Generate SEO config for work/case study
    const seoConfig: SEOConfig = {
        title: `${post.title} | Case Study | HEINZE MEDIA`,
        description:
            post.description || `Entdecken Sie das Projekt ${post.title}`,
        keywords: (post.categories as string[]) || [
            "XR",
            "Case Study",
            "Portfolio",
        ],
        url: `https://heinze.media/work/${post.slug}`,
        type: "website",
        image: post.image || "https://heinze.media/og-work.png",
        author: "HEINZE MEDIA",
    };
</script>

<SEOHead config={seoConfig} />

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<div class="pt-24 pb-12 bg-brand-navy">
    <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">{post.title}</h1>
        {#if post.categories}
            <div class="flex gap-2 justify-center mb-8">
                {#each post.categories as cat}
                    <span
                        class="text-sm border border-brand-cyan text-brand-cyan px-3 py-1 rounded-full"
                        >{cat}</span
                    >
                {/each}
            </div>
        {/if}
    </div>
</div>

{#if post.image}
    <div class="w-full h-[60vh] max-h-[800px] overflow-hidden">
        <img
            src={post.image}
            alt={post.title}
            class="w-full h-full object-cover"
        />
    </div>
{/if}

<div class="container mx-auto px-6 py-20">
    <div class="prose prose-invert prose-xl max-w-4xl mx-auto">
        {@html post.contentHtml}
    </div>
</div>
