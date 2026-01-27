<script lang="ts">
    let {
        title = "Ready to start?",
        subtitle = "Let's build your digital galaxy together.",
        buttonText = "Get Started",
        buttonLink = "/contact",
    } = $props<{
        title?: string;
        subtitle?: string;
        buttonText?: string;
        buttonLink?: string;
    }>();
</script>

<section
    class="py-20 bg-accent text-white rounded-3xl mx-6 md:mx-auto max-w-7xl px-8 my-16 text-center shadow-2xl relative overflow-hidden"
>
    <div class="relative z-10">
        <h2 class="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            {title}
        </h2>
        <p class="text-xl opacity-90 mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <a
            href={buttonLink}
            class="inline-block bg-white text-accent font-black px-10 py-4 rounded-xl hover:scale-105 transition-transform"
        >
            {buttonText}
        </a>
    </div>
    <div
        class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white_0%,transparent_100%)]"
    ></div>
</section>
