<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";
    import { sitemapData } from "$lib/data/sitemap";
    import { adminState } from "$lib/state/admin.svelte";

    const seoConfig: SEOConfig = {
        title: "Sitemap | HEINZE MEDIA",
        description:
            "Vollständige Sitemap und Navigation aller Seiten von HEINZE MEDIA",
        url: "https://heinze.media/sitemap",
        type: "website",
        author: "HEINZE MEDIA",
    };

    // Derived list of visible routes
    let visibleRoutes = $derived(
        sitemapData.filter((route) => route.public || adminState.isAdmin),
    );
</script>

<SEOHead config={seoConfig} />

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<div class="pt-32 pb-20">
    <div class="container mx-auto px-6 max-w-4xl">
        <h1
            class="text-4xl font-bold mb-12 text-text-main flex items-center gap-4"
        >
            Sitemap
            {#if adminState.isAdmin}
                <span
                    class="text-xs bg-red-600 text-white px-2 py-1 rounded uppercase tracking-wider font-bold"
                    >Admin Mode Active</span
                >
            {/if}
        </h1>

        <div class="grid gap-4">
            {#each visibleRoutes as route}
                <a
                    href={route.path}
                    class="block p-6 rounded-xl bg-surface border border-border-color hover:border-accent transition-all group relative overflow-hidden"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-center gap-3 mb-1">
                                <h2
                                    class="text-xl font-bold text-text-main group-hover:text-accent transition-colors"
                                >
                                    {route.title}
                                </h2>
                                {#if !route.public}
                                    <span
                                        class="text-[10px] uppercase font-bold text-red-500 border border-red-500/30 px-1.5 py-0.5 rounded"
                                        >Draft</span
                                    >
                                {/if}
                                {#if route.category && route.category !== "default"}
                                    <span
                                        class="text-[10px] uppercase font-bold opacity-60 px-1.5 py-0.5 rounded border border-border-color"
                                    >
                                        {route.category}
                                    </span>
                                {/if}
                            </div>
                            <div
                                class="text-sm text-text-muted font-mono opacity-60 mb-2"
                            >
                                {route.path}
                            </div>
                            {#if route.description}
                                <p class="text-sm text-text-muted">
                                    {route.description}
                                </p>
                            {/if}
                        </div>

                        <!-- Arrow Icon -->
                        <div
                            class="text-border-color group-hover:text-accent group-hover:translate-x-1 transition-all"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><line x1="5" y1="12" x2="19" y2="12"
                                ></line><polyline points="12 5 19 12 12 19"
                                ></polyline></svg
                            >
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>
