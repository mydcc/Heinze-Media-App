<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>{data.title} — DevDoc</title>
</svelte:head>

<main class="container mx-auto px-6 py-12">
    <article class="prose prose-invert max-w-4xl">
        {@html data.html}
    </article>
</main>
