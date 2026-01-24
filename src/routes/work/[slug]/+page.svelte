<script lang="ts">
    let { data } = $props();
    let { post } = data;
</script>

<svelte:head>
    <title>{post.title} | Work</title>
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
