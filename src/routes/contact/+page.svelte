<script lang="ts">
    let { page } = $props();
    let meta = $derived(() => page?.meta ?? {});
    let contentHtml = $derived(() => page?.contentHtml ?? "");
</script>

<svelte:head>
    <title>{meta().title} — HEINZE MEDIA</title>
    <meta name="description" content={meta().description || ""} />
</svelte:head>

<main class="container mx-auto px-6 py-12">
    <div class="max-w-3xl">
        <h1 class="text-2xl font-black mb-2">{meta().title}</h1>
        <p class="text-muted mb-4">{meta().description}</p>
        <article class="prose prose-invert max-w-none">
            {@html contentHtml}
        </article>
    </div>
</main>
