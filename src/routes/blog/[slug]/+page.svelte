<script lang="ts">
    let { data } = $props();
    // destructure post from data
    let { post } = data;
</script>

<svelte:head>
    <title>{post.title} | Heinze Media</title>
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
