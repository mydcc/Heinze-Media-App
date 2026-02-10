<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";

    let { metadata, children } = $props<{ metadata: any, children?: any }>();

    const features = $derived(metadata.features || []);
    const stats = $derived(metadata.stats || {});
</script>

<div class="pt-20 pb-32">
    <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                {#if metadata.tagline}
                    <span class="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">
                        {metadata.tagline}
                    </span>
                {/if}
                
                <h1 class="text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-text-main">
                    {@html metadata.title}
                </h1>
                
                <p class="text-lg text-text-muted mb-8 leading-relaxed">
                    {metadata.description}
                </p>

                {#if features.length > 0}
                    <ul class="space-y-4 mb-10">
                        {#each features as item}
                            <li class="flex items-center gap-3 text-text-main">
                                <div class="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                {item}
                            </li>
                        {/each}
                    </ul>
                {/if}

                {#if metadata.ctaText}
                    <a href={metadata.ctaLink || "/contact"} class="inline-block px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-all shadow-lg shadow-accent/25">
                        {metadata.ctaText}
                    </a>
                {/if}
            </div>

            <div class="relative">
                <div class="aspect-square rounded-3xl bg-surface-2 border border-border-color overflow-hidden relative group">
                    <div class="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-50"></div>
                    
                    {#if metadata.image}
                        <img src={metadata.image} alt={metadata.title} class="w-full h-full object-cover" />
                    {:else}
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-text-muted text-sm">[ {metadata.imagePlaceholder || "No Visual available"} ]</span>
                        </div>
                    {/if}

                    {#if stats.title}
                        <!-- Floating Card -->
                        <div class="absolute bottom-8 left-8 right-8 bg-surface/90 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold">
                                    {stats.value || "A+"}
                                </div>
                                <div>
                                    <h4 class="font-bold text-text-main">{stats.title}</h4>
                                    <p class="text-xs text-text-muted">{stats.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
        
        <!-- Main Content (Markdown Body) -->
        {#if metadata.showContent !== false && children}
            <article class="mt-24 prose prose-invert max-w-4xl mx-auto">
                {@render children()}
            </article>
        {/if}
    </div>
</div>
