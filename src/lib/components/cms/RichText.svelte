<script lang="ts">
    import { marked } from "marked";
    let { content = "" } = $props<{ content?: string }>();

    let html = $derived(marked(content));
</script>

<div
    class="prose prose-invert max-w-none my-12 prose-headings:text-text-main prose-p:text-text-muted prose-strong:text-accent"
>
    {@html html}
</div>
