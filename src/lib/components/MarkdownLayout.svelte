<script lang="ts">
    import SectionHeader from "$lib/components/cms/SectionHeader.svelte";

    interface Props {
        title?: string;
        description?: string;
        children?: any;
    }

    let { title, description, children }: Props = $props();
</script>

<article class="prose prose-invert prose-brand max-w-none">
    {#if title}
        <SectionHeader {title} tagline={description} align="left" />
    {/if}

    <div class="mt-8 markdown-content text-text-muted leading-relaxed">
        {@render children?.()}
    </div>
</article>

<style>
    /* Custom Markdown Styling to match the premium look */
    :global(.markdown-content h2) {
        font-size: var(--text-2xl);
        font-weight: 700;
        color: var(--color-text-main);
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        border-left: 4px solid var(--color-accent);
        padding-left: 1rem;
    }
    :global(.markdown-content h3) {
        font-size: var(--text-xl);
        font-weight: 600;
        color: var(--color-text-main);
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    :global(.markdown-content p) {
        margin-bottom: 1.5rem;
    }
    :global(.markdown-content ul) {
        list-style: none;
        padding-left: 1.5rem;
        margin-bottom: 1.5rem;
    }
    :global(.markdown-content li) {
        position: relative;
        margin-bottom: 0.75rem;
    }
    :global(.markdown-content li::before) {
        content: "→";
        position: absolute;
        left: -1.5rem;
        color: var(--color-accent);
        font-weight: 700;
    }
    :global(.markdown-content strong) {
        color: var(--color-text-main);
        font-weight: 700;
    }
    :global(.markdown-content a) {
        color: var(--color-accent);
        text-decoration-color: rgba(var(--color-accent), 0.3);
        text-underline-offset: 4px;
        transition: all 0.2s;
    }
    :global(.markdown-content a:hover) {
        text-decoration: underline;
    }
</style>
