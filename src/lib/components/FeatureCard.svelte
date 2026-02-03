<script lang="ts">
    interface Props {
        icon?: string;
        title: string;
        description: string;
        href?: string;
        highlighted?: boolean;
    }

    let {
        icon,
        title,
        description,
        href,
        highlighted = false,
    }: Props = $props();

    const Component = $derived(href ? "a" : "div");
</script>

<svelte:element
    this={Component}
    href={href || null}
    class="group relative p-6 md:p-8 rounded-lg transition-all duration-300 {highlighted
        ? 'bg-accent/10 border border-accent/30 hover:border-accent/50'
        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'} {href
        ? 'cursor-pointer'
        : ''}"
>
    <div
        class="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
    ></div>

    <div class="relative z-10">
        {#if icon}
            <div class="text-4xl mb-4">{icon}</div>
        {/if}
        <h3
            class="text-xl font-bold mb-2 group-hover:text-accent transition-colors"
        >
            {title}
        </h3>
        <p class="text-white/70 leading-relaxed">
            {description}
        </p>
        {#if href}
            <div
                class="mt-4 text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
            >
                Learn more <span>→</span>
            </div>
        {/if}
    </div>
</svelte:element>
