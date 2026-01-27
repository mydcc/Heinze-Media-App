<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    let { data } = $props();
</script>

<SEOHead
    title="Design System — Heinze Media"
    description="Design guidelines and tokens for Heinze Media."
/>

<main class="container mx-auto px-6 py-12">
    <h1 class="text-3xl font-black mb-4">Design System</h1>
    <p class="text-muted mb-6">
        Grundlegende Designprinzipien, Farben und Komponenten.
    </p>

    <section class="prose prose-invert max-w-3xl">
        <h2>Farben</h2>
        <ul>
            <li>Primary: <span class="font-mono">#0ea5a5</span></li>
            <li>Accent: <span class="font-mono">#7c3aed</span></li>
        </ul>

        <h2>Typography</h2>
        <p>Wir verwenden Inter und Montserrat für Headlines.</p>
    </section>
</main>
