<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const blogPosts = $derived(data.blogPosts || []);
</script>

<SEOHead
    title="Blog - News & Insights | Heinze Media"
    description="Articles about XR, Metaverse, 3D Web technologies, and digital transformation"
    ogImage="/images/og-blog.png"
/>

<div class="relative py-20 md:py-28 overflow-hidden">
    <div
        class="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent"
    ></div>
    <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                Blog & Insights
            </h1>
            <p class="text-lg text-white/70">
                Latest articles about immersive technologies and digital innovation
            </p>
        </div>
    </div>
</div>

<div class="container mx-auto px-6 py-16 md:py-24">
    {#if blogPosts.length === 0}
        <div class="text-center py-12">
            <p class="text-white/60">No blog posts available yet.</p>
        </div>
    {:else}
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
            {#each blogPosts as post (post.slug)}
                <article
                    class="group rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-accent/30 transition-all overflow-hidden"
                >
                    <a href={`/blog/${post.slug}`} class="block h-full">
                        {#if post.image}
                            <div class="aspect-video overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        {/if}
                        <div class="p-6 flex flex-col h-full">
                            <time
                                class="text-xs text-accent font-semibold uppercase tracking-widest mb-2"
                            >
                                {post.date
                                    ? new Date(post.date).toLocaleDateString(
                                          "en-US",
                                      )
                                    : "No Date"}
                            </time>
                            <h3
                                class="text-xl font-bold mb-3 group-hover:text-accent transition-colors"
                            >
                                {post.title}
                            </h3>
                            <p class="text-white/60 text-sm flex-grow mb-4 line-clamp-3">
                                {post.description ||
                                    "No description available"}
                            </p>
                            
                            {#if post.categories}
                                <div class="flex flex-wrap gap-2 mt-auto mb-4">
                                    {#each post.categories as cat}
                                        <span class="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70 uppercase font-bold tracking-tighter">
                                            {cat}
                                        </span>
                                    {/each}
                                </div>
                            {/if}

                            <div
                                class="flex items-center text-accent text-sm font-semibold"
                            >
                                Read More
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