<script lang="ts">
    let { data } = $props();
    let meta = $derived(() => data?.meta ?? {});
    let contentHtml = $derived(() => data?.contentHtml ?? "");
    let slug = $derived(() => data?.slug ?? "");
</script>

<svelte:head>
    <title>{meta.title} — HEINZE MEDIA</title>
    <meta name="description" content={meta.description || ""} />
</svelte:head>

<main class="container mx-auto px-6 py-12">
    <div class="max-w-3xl">
        <h1 class="text-2xl font-black mb-2">{meta.title}</h1>
        <p class="text-muted mb-4">{meta.description}</p>

        <div class="mb-6">
            <a
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent font-semibold">Repo auf GitHub →</a
            >
        </div>

        <article class="prose prose-invert max-w-none">
            {@html contentHtml}
        </article>

        <div class="mt-8">
            <h3 class="font-bold mb-2">Interesse an Integration?</h3>
            <p class="mb-4">
                Ich biete: POC, Server‑Integration, CI/CD, Skalierung. <a
                    href="/contact"
                    class="text-accent font-semibold">Kontaktieren Sie mich</a
                >.
            </p>
        </div>
    </div>
</main>
