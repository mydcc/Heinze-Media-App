<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import { JSONLDBuilder } from "$lib/seo/schema";
    import type { SEOConfig } from "$lib/seo/schema";

    let { data } = $props();
    // Use derived to access destructured values
    let post = $derived(data.post);

    // Generate SEO config for blog post
    const seoConfig: SEOConfig = {
        title: `${post.title} | HEINZE MEDIA Blog`,
        description: post.description || post.title,
        keywords: (post as any).tags || [
            "XR",
            "Metaverse",
            "3D Web",
            "Digital",
        ],
        url: `https://heinze.media/blog/${post.slug}`,
        type: "article",
        image: post.image || "https://heinze.media/og-blog.png",
        author: (post as any).author || "HEINZE MEDIA",
        publishDate: post.date,
        modifiedDate: (post as any).modified_date || post.date,
    };
</script>

<SEOHead config={seoConfig} />

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<article class="min-h-screen">
    <!-- Hero Section -->
    <div class="relative w-full h-[50vh] min-h-[400px]">
        {#if post.image}
            <img
                src={post.image}
                alt={post.title}
                class="w-full h-full object-cover opacity-50"
            />
        {:else}
            <div class="w-full h-full bg-brand-navy/50"></div>
        {/if}
        <div
            class="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent"
        ></div>

        <div class="absolute bottom-0 w-full p-6 md:p-12">
            <div class="container mx-auto">
                <div
                    class="text-brand-cyan mb-4 font-bold tracking-widest uppercase"
                >
                    {new Date(post.date).toLocaleDateString("de-DE")}
                </div>
                <h1
                    class="text-4xl md:text-6xl font-bold max-w-4xl leading-tight"
                >
                    {post.title}
                </h1>
            </div>
        </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 py-12 md:py-20">
        <div
            class="prose prose-invert prose-lg max-w-3xl mx-auto prose-a:text-brand-cyan hover:prose-a:text-white prose-headings:font-bold prose-img:rounded-xl"
        >
            {@html post.contentHtml}
        </div>
    </div>
</article>
