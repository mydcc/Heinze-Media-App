<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>News | Heinze Media</title>
</svelte:head>

<div class="container mx-auto px-6 py-24">
    <h1 class="text-4xl md:text-5xl font-bold mb-12 text-center">
        Latest <span class="text-brand-cyan">News</span>
    </h1>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.posts as post}
            <a
                href="/blog/{post.slug}"
                class="group block bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-cyan/20"
            >
                {#if post.image}
                    <div class="aspect-video overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                {/if}
                <div class="p-6">
                    <div
                        class="text-brand-cyan text-xs font-bold mb-2 uppercase tracking-wider"
                    >
                        {new Date(post.date).toLocaleDateString("de-DE")}
                    </div>
                    <h2
                        class="text-xl font-bold mb-3 group-hover:text-brand-cyan transition-colors line-clamp-2"
                    >
                        {post.title}
                    </h2>
                    {#if post.categories}
                        <div class="flex gap-2 mt-4">
                            {#each post.categories as cat}
                                <span
                                    class="text-xs bg-white/10 px-2 py-1 rounded text-white/70"
                                    >{cat}</span
                                >
                            {/each}
                        </div>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</div>
