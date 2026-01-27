<script lang="ts">
    let {
        title = "",
        text = "",
        icon = "",
        color = "accent",
    } = $props<{
        title?: string;
        text?: string;
        icon?: string;
        color?: string;
    }>();
</script>

<div
    class="p-8 rounded-2xl border border-border-color/10 bg-bg-surface hover:shadow-2xl transition-all border-l-4 border-l-{color}"
>
    {#if icon}
        <div class="text-4xl mb-4">{icon}</div>
    {/if}
    <h3 class="text-2xl font-black mb-4 text-text-main">{title}</h3>
    <p class="text-text-muted leading-relaxed">{text}</p>
</div>
