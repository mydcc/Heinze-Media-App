<script lang="ts">
    let {
        title = "",
        subtitle = "",
        buttonText = "",
        buttonLink = "",
        image = "",
        theme = "dark",
    } = $props<{
        title?: string;
        subtitle?: string;
        buttonText?: string;
        buttonLink?: string;
        image?: string;
        theme?: "dark" | "light" | "accent";
    }>();

    const themes = {
        dark: "bg-bg-body text-white",
        light: "bg-white text-text-main",
        accent: "bg-accent text-white",
    };
</script>

<section
    class="relative py-24 md:py-32 overflow-hidden {themes[
        theme as keyof typeof themes
    ]}"
>
    <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
            <h1
                class="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8"
            >
                {title}
            </h1>
            {#if subtitle}
                <p class="text-xl md:text-2xl opacity-80 mb-12 leading-relaxed">
                    {subtitle}
                </p>
            {/if}
            {#if buttonText}
                <div class="flex justify-center gap-6">
                    <a href={buttonLink} class="btn-primary">
                        {buttonText}
                    </a>
                </div>
            {/if}
        </div>
    </div>
    {#if image}
        <div class="absolute inset-0 opacity-20 pointer-events-none">
            <img src={image} alt="" class="w-full h-full object-cover" />
        </div>
    {/if}
</section>
