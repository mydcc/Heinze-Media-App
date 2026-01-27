<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import { marked } from "marked";

    let { data } = $props();
    let content = $derived(data.content);
    let htmlContent = $derived(marked(content));

    const seoTitle = "Corporate Design | HEINZE MEDIA";
    const seoDescription =
        "HEINZE MEDIA Corporate Design Manual - Visuelle Identität, Logo-Richtlinien, Farbsystem und Typografie.";
    const seoImage = "https://heinze.media/og-image.png";
</script>

<SEOHead title={seoTitle} description={seoDescription} ogImage={seoImage} />

<div class="min-h-screen bg-bg-body text-text-main">
    <!-- Hero Section -->
    <section class="py-20 px-6 border-b border-color-border">
        <div class="container mx-auto max-w-4xl">
            <h1 class="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                Corporate Design
            </h1>
            <p class="text-xl text-text-muted">
                Visuelle Identität, Anwendungsrichtlinien und praktische
                Design-Standards für alle Medien.
            </p>
        </div>
    </section>

    <!-- Content -->
    <article class="prose prose-invert max-w-4xl mx-auto py-20 px-6">
        {@html htmlContent}
    </article>

    <!-- Back to Footer Link -->
    <div class="text-center py-12 border-t border-color-border">
        <a
            href="/"
            class="text-color-accent hover:text-highlight-primary transition-colors"
        >
            ← Zurück zur Startseite
        </a>
    </div>
</div>

<style>
    :global(.prose h1) {
        font-size: 2.25rem;
        font-weight: 900;
        margin-bottom: 1.5rem;
        color: var(--text-main);
    }

    :global(.prose h2) {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--text-main);
        margin-top: 3rem;
    }

    :global(.prose h3) {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        color: var(--text-main);
        margin-top: 2rem;
    }

    :global(.prose p) {
        font-size: 1rem;
        color: var(--text-main);
        margin-bottom: 1rem;
        line-height: 1.5;
    }

    :global(.prose a) {
        color: var(--accent);
        transition: color 0.2s;
        text-decoration: underline;
    }

    :global(.prose a:hover) {
        color: var(--highlight-primary);
    }

    :global(.prose ul) {
        list-style-type: disc;
        margin-left: 1rem;
        margin-bottom: 1rem;
    }

    :global(.prose li) {
        color: var(--text-main);
        margin-bottom: 0.5rem;
    }

    :global(.prose code) {
        background-color: var(--bg-surface);
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-family: monospace;
        font-size: 0.875rem;
        color: var(--text-muted);
    }

    :global(.prose pre) {
        background-color: var(--bg-surface);
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin-bottom: 1rem;
    }

    :global(.prose blockquote) {
        border-left: 4px solid var(--accent);
        padding-left: 1rem;
        font-style: italic;
        color: var(--text-muted);
    }

    :global(.prose table) {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    :global(.prose th) {
        background-color: var(--bg-surface);
        padding: 0.5rem 1rem;
        text-align: left;
        font-weight: 700;
    }

    :global(.prose td) {
        border: 1px solid var(--color-border);
        padding: 0.5rem 1rem;
    }
</style>
