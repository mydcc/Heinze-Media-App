<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const workItems = $derived(data.workItems || []);
</script>

<SEOHead
    title="Portfolio - Case Studies & Projects | Heinze Media"
    description="Entdecken Sie unsere erfolgreichen XR, Metaverse und 3D Web Projekte"
    ogImage="/images/og-work.png"
/>

<div class="relative py-20 md:py-28 overflow-hidden">
    <div
        class="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent"
    ></div>
    <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                Portfolio
            </h1>
            <p class="text-lg text-white/70">
                Erfolgreiche Projekte in XR, Metaverse und 3D Web
            </p>
        </div>
    </div>
</div>

<div class="container mx-auto px-6 py-16 md:py-24">
    {#if workItems.length === 0}
        <div class="text-center py-12">
            <p class="text-white/60">
                Noch keine Portfolio-Projekte verfügbar.
            </p>
        </div>
    {:else}
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
            {#each workItems as project (project.slug)}
                <article
                    class="group rounded-lg bg-gradient-to-br from-white/5 to-white/0 hover:from-white/10 hover:to-accent/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 transition-all overflow-hidden"
                >
                    <a href={`/work/${project.slug}`} class="block p-6">
                        <div class="flex flex-col h-full">
                            <h3
                                class="text-xl font-bold mb-3 group-hover:text-accent transition-colors"
                            >
                                {project.title}
                            </h3>
                            <p class="text-white/60 text-sm flex-grow mb-4">
                                {project.description ||
                                    "Kein Description verfügbar"}
                            </p>
                            {#if project.date}
                                <time
                                    class="text-xs text-accent/70 font-semibold uppercase tracking-widest mb-4"
                                >
                                    {new Date(project.date).toLocaleDateString(
                                        "de-DE",
                                    )}
                                </time>
                            {/if}
                            <div
                                class="flex items-center text-accent text-sm font-semibold"
                            >
                                Projekt ansehen
                                <svg
                                    class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </div>
                        </div>
                    </a>
                </article>
            {/each}
        </div>
    {/if}
</div>
