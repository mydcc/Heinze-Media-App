<script lang="ts">
    let {
        title = "",
        tagline = "",
        align = "center",
    } = $props<{
        title?: string;
        tagline?: string;
        align?: "left" | "center" | "right";
    }>();

    const alignments = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
    };
</script>

<div class="mb-16 {alignments[align as keyof typeof alignments]} max-w-4xl">
    {#if tagline}
        <span
            class="text-accent font-black tracking-widest uppercase text-xs mb-4 block"
            >{tagline}</span
        >
    {/if}
    <h2
        class="text-4xl md:text-5xl lg:text-6xl font-black text-text-main tracking-tight leading-none"
    >
        {title}
    </h2>
</div>
