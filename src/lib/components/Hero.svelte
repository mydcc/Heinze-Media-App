<script lang="ts">
    interface Props {
        title: string;
        subtitle?: string;
        description?: string;
        cta?: {
            text: string;
            href: string;
            variant?: "primary" | "secondary";
        };
        backgroundImage?: string;
        height?: "sm" | "md" | "lg" | "xl";
    }

    let {
        title,
        subtitle,
        description,
        cta,
        backgroundImage,
        height = "lg",
    }: Props = $props();

    const heightClasses = {
        sm: "h-64 md:h-80",
        md: "h-80 md:h-96",
        lg: "h-96 md:h-screen",
        xl: "h-screen",
    };
</script>

<section class="relative overflow-hidden {heightClasses[height]}">
    {#if backgroundImage}
        <img
            src={backgroundImage}
            alt={title}
            class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40"></div>
    {:else}
        <div
            class="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5"
        ></div>
    {/if}

    <div class="relative z-10 h-full flex items-center">
        <div class="container mx-auto px-6 w-full">
            <div class="max-w-3xl">
                {#if subtitle}
                    <span
                        class="text-accent text-sm md:text-base font-semibold uppercase tracking-widest block mb-4"
                    >
                        {subtitle}
                    </span>
                {/if}
                <h1
                    class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                >
                    {title}
                </h1>
                {#if description}
                    <p
                        class="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl"
                    >
                        {description}
                    </p>
                {/if}
                {#if cta}
                    <a
                        href={cta.href}
                        class="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-200 {cta.variant ===
                        'secondary'
                            ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                            : 'bg-accent hover:bg-accent/90 text-white hover:shadow-lg hover:shadow-accent/20'}"
                    >
                        {cta.text}
                        <span>→</span>
                    </a>
                {/if}
            </div>
        </div>
    </div>
</section>
