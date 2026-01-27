<script lang="ts">
    interface Props {
        title: string;
        description?: string;
        buttons?: Array<{
            text: string;
            href: string;
            variant?: "primary" | "secondary";
        }>;
        alignment?: "left" | "center" | "right";
    }

    let {
        title,
        description,
        buttons = [],
        alignment = "center",
    }: Props = $props();

    const alignClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };
</script>

<div
    class="{alignClass[
        alignment
    ]} py-16 px-6 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20"
>
    <h3 class="text-3xl md:text-4xl font-black mb-4">
        {title}
    </h3>
    {#if description}
        <p
            class="text-lg text-white/70 mb-8 max-w-2xl {alignment === 'center'
                ? 'mx-auto'
                : ''}"
        >
            {description}
        </p>
    {/if}
    {#if buttons.length > 0}
        <div
            class="flex flex-wrap gap-4 {alignment === 'center'
                ? 'justify-center'
                : alignment === 'right'
                  ? 'justify-end'
                  : ''}"
        >
            {#each buttons as btn}
                <a
                    href={btn.href}
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 {btn.variant ===
                    'secondary'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-accent hover:bg-accent/90 text-white hover:shadow-lg hover:shadow-accent/20'}"
                >
                    {btn.text}
                </a>
            {/each}
        </div>
    {/if}
</div>
