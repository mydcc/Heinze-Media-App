<script lang="ts">
    interface Props {
        title?: string;
        subtitle?: string;
        description?: string;
        background?: "default" | "surface" | "accent" | "gradient";
        py?: "sm" | "md" | "lg" | "xl";
        children?: any;
    }

    let {
        title,
        subtitle,
        description,
        background = "default",
        py = "lg",
        children,
    }: Props = $props();

    const bgClasses = {
        default: "bg-transparent",
        surface: "bg-white/5",
        accent: "bg-accent/5",
        gradient: "bg-gradient-to-br from-accent/10 to-transparent",
    };

    const pyClasses = {
        sm: "py-8",
        md: "py-12",
        lg: "py-16",
        xl: "py-24",
    };
</script>

<section class="{bgClasses[background]} {pyClasses[py]}">
    <div class="container mx-auto px-6">
        {#if title || subtitle || description}
            <div class="max-w-2xl mb-12">
                {#if subtitle}
                    <span
                        class="text-accent text-sm font-semibold uppercase tracking-widest block mb-2"
                    >
                        {subtitle}
                    </span>
                {/if}
                {#if title}
                    <h2
                        class="text-4xl md:text-5xl font-black mb-4 leading-tight"
                    >
                        {title}
                    </h2>
                {/if}
                {#if description}
                    <p class="text-lg text-white/70 leading-relaxed">
                        {description}
                    </p>
                {/if}
            </div>
        {/if}
        {@render children?.()}
    </div>
</section>
