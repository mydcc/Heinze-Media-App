<script lang="ts">
    import { page } from "$app/stores";
    import { localizeHref, locales } from "$lib/paraglide/runtime.js";

    interface Props {
        title: string;
        description: string;
        ogImage?: string;
        jsonLD?: object;
    }

    let {
        title = "",
        description = "",
        ogImage = "",
        jsonLD,
    }: Props = $props();

    const siteUrl = "https://heinze-media.com";
    const imageUrl = $derived(
        ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/images/og-default.png`,
    );
    const currentUrl = $derived($page.url.href);

    // Hreflang Tags Generation
    const hreflangs = $derived(
        locales.map((locale) => {
            const path = localizeHref($page.url.pathname, { locale });
            return {
                href: `${siteUrl}${path}`,
                hreflang: locale
            };
        })
    );
</script>

<svelte:head>
    <!-- Essential Meta Tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={currentUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:site_name" content="Heinze Media" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={currentUrl} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={imageUrl} />

    <!-- Canonical -->
    <link rel="canonical" href={currentUrl} />

    <!-- Hreflang Tags for SEO -->
    {#each hreflangs as alt}
        <link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
    {/each}

    <!-- DSGVO / Security -->
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="robots" content="index, follow" />

    <!-- JSON-LD Schema -->
    {#if jsonLD}
        <script type="application/ld+json">
			{JSON.stringify(jsonLD)}
        </script>
    {/if}
</svelte:head>
