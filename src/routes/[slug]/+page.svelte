<script lang="ts">
    let { data } = $props();
    // Use derived to access destructured values
    let page = $derived(data.page);
</script>

<svelte:head>
    <title>{page.title} | Heinze Media</title>
</svelte:head>

<div class="pt-24 pb-12 bg-brand-navy">
    <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">{page.title}</h1>
    </div>
</div>

<div class="container mx-auto px-6 py-12 md:py-20">
    <!-- Ensure prose handles images and layout from WP content -->
    <div
        class="prose prose-invert prose-lg max-w-4xl mx-auto prose-img:rounded-xl"
    >
        {@html page.contentHtml}
    </div>
</div>
