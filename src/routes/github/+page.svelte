<script lang="ts">
    import { FeatureCard } from "$lib/components";
    import { page } from "$app/stores";

    let { data }: { data?: { projects?: Array<any> } } = $props();
    const projects = $derived(data?.projects ?? []);
</script>

<svelte:head>
    <title>Lieblings‑GitHub‑Projekte — HEINZE MEDIA</title>
    <meta
        name="description"
        content="Kuratierte Auswahl meiner Lieblings‑GitHub‑Projekte. Beispiele, Nutzen und Angebot für Integrationen."
    />
</svelte:head>

<main class="container mx-auto px-6 py-12">
    <h1 class="text-3xl font-black mb-4">Meine Lieblings‑GitHub‑Projekte</h1>
    <p class="text-muted mb-8">
        Kuratiert: Projekte die inspirieren und direkt als Auftrag fungieren
        können.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each projects as p}
            <FeatureCard
                title={p.title}
                description={p.description}
                href={`/projects/${p.slug}`}
                highlighted={p.featured}
            />
        {/each}
    </div>
</main>
