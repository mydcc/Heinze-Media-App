<script lang="ts">
    import { page } from "$app/stores";
    import type { SEOConfig } from "$lib/seo/schema";
    import {
        JSONLDBuilder,
        getCanonicalUrl,
        getOpenGraphTags,
        getTwitterCardTags,
        getMetaTags,
    } from "$lib/seo/schema";

    let { config }: { config?: SEOConfig } = $props();

    // Fallback config if not provided
    const seoConfig = $derived.by(() => {
        return (
            config || {
                title: "HEINZE MEDIA - XR/AR/VR Solutions & Metaverse",
                description:
                    "Partner für immersive 3D-Web-Erlebnisse, Metaverse-Lösungen und XR-Studios der nächsten Generation.",
                keywords: ["XR", "AR", "VR", "Metaverse", "3D Web", "Berlin"],
                url: getCanonicalUrl($page.url.pathname),
                type: "website" as const,
                image: "https://heinze.media/og-default.png",
            }
        );
    });

    // Generate structured data
    const schemas = $derived.by(() => [
        JSONLDBuilder.organization(),
        JSONLDBuilder.website(),
        JSONLDBuilder.localBusiness(),
        JSONLDBuilder.breadcrumb([
            { name: "Home", url: "https://heinze.media" },
            { name: "Current Page", url: seoConfig.url },
        ]),
    ]);

    // Generate meta tags
    const metaTags = $derived(getMetaTags(seoConfig));
    const ogTags = $derived(getOpenGraphTags(seoConfig));
    const twitterTags = $derived(getTwitterCardTags(seoConfig));
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{seoConfig.title}</title>
    <meta name="description" content={seoConfig.description} />
    {#if seoConfig.keywords && seoConfig.keywords.length > 0}
        <meta name="keywords" content={seoConfig.keywords.join(", ")} />
    {/if}
    <meta name="author" content={seoConfig.author || "HEINZE MEDIA"} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="charset" content="UTF-8" />
    <meta name="robots" content="index, follow" />

    <!-- Canonical URL -->
    <link rel="canonical" href={seoConfig.url} />

    <!-- Open Graph / Facebook -->
    {#each Object.entries(ogTags) as [key, value]}
        <meta property={key} content={value} />
    {/each}

    <!-- Twitter -->
    {#each Object.entries(twitterTags) as [key, value]}
        <meta name={key} content={value} />
    {/each}

    <!-- HREFLANG for multi-language support -->
    <link rel="alternate" hreflang="de" href={seoConfig.url} />
    <link
        rel="alternate"
        hreflang="en"
        href={seoConfig.url.replace("/de/", "/en/") || seoConfig.url}
    />

    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
    />
    <!-- JSON-LD Structured Data -->
    {#each schemas as schema (schema["@type"])}
        <script type="application/ld+json">
			{JSON.stringify(schema)}
        </script>
    {/each}

    <!-- Favicon & App Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#334eff" />
    <meta name="application-name" content="HEINZE MEDIA" />
    <meta name="apple-mobile-web-app-title" content="HEINZE MEDIA" />
</svelte:head>
