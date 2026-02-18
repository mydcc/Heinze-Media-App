<script lang="ts">
    import { onMount } from "svelte";
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";

    let HeroScene: any;
    let mounted = false;

    export let data;

    onMount(async () => {
        // Dynamically import Three.js scene only when component is mounted
        const { default: Scene } = await import(
            "$lib/components/3d/HeroScene.svelte"
        );
        HeroScene = Scene;
        mounted = true;
    });

    const metadata = (data.homepage?.metadata || {}) as any;
    const hero = metadata.hero || {};
    const features = metadata.features || [
        { title: "XR Studios", description: "Virtuelle Produktionsstudios für Broadcast und Events auf höchstem Niveau." },
        { title: "Metaverse", description: "Dezentrale, browser-basierte 3D-Welten ohne App-Download." },
        { title: "3D Web Apps", description: "Interaktive Produkt-Konfiguratoren und Showrooms mit Svelte & Three.js." }
    ];

    const seoConfig: SEOConfig = {
        title: metadata.title || "HEINZE MEDIA - Metaverse, XR & 3D Web Solutions",
        description: metadata.description || "Wir erschaffen immersive 3D-Web-Erlebnisse, XR-Studios und digitale Zwillinge.",
        keywords: [
            "Metaverse",
            "XR Studio",
            "3D Web",
            "AR",
            "VR",
            "Berlin",
            "Digital Twin",
        ],
        url: "https://heinze.media/",
        type: "website",
        image: "https://heinze.media/og-hero.png",
        author: "HEINZE MEDIA",
    };
</script>

<SEOHead
    title={seoConfig.title}
    description={seoConfig.description}
    ogImage={seoConfig.image}
/>

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<!-- 3D Hero Section -->
<section class="relative h-screen w-full overflow-hidden">
    <!-- Three.js Canvas Background - Lazy loaded -->
    {#if mounted && HeroScene}
        <svelte:component this={HeroScene} />
    {:else}
        <!-- Fallback background while loading -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"
        ></div>
    {/if}

    <!-- Content Overlay -->
    <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
        <div class="container mx-auto px-6 text-center pointer-events-auto">
            <h1
                class="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg"
            >
                {hero.titlePrefix || "Metaverse Service"} <br />
                <span
                    class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                >
                    {hero.titleGradient || "Provider Nr. 1"}
                </span>
            </h1>
            <p
                class="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 drop-shadow"
            >
                {hero.description || "Wir erschaffen immersive 3D-Web-Erlebnisse, XR-Studios und digitale Zwillinge für Ihr Unternehmen."}
            </p>
            <div class="flex flex-col md:flex-row gap-4 justify-center">
                <a
                    href={hero.ctaPrimaryLink || "/work"}
                    class="px-8 py-3 bg-cyan-500 text-slate-900 font-bold rounded hover:bg-white transition-colors shadow-lg hover:shadow-xl"
                >
                    {hero.ctaPrimary || "View Our Work"}
                </a>
                <a
                    href={hero.ctaSecondaryLink || "/contact"}
                    class="px-8 py-3 border-2 border-cyan-400 text-white font-bold rounded hover:bg-cyan-500/20 transition-colors shadow-lg"
                >
                    {hero.ctaSecondary || "Contact Us"}
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Services / Intro -->
<section class="py-20 bg-brand-dark">
    <div class="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
        {#each features as feature}
        <div
            class="p-6 border border-white/5 rounded-xl hover:border-brand-cyan/30 transition-colors"
        >
            <h3 class="text-2xl font-bold mb-4">{feature.title}</h3>
            <p class="text-white/60">
                {feature.description}
            </p>
        </div>
        {/each}
    </div>
</section>

<!-- Dynamic Content from Markdown -->
{#if data.homepage?.html}
    <section class="py-20 bg-brand-dark">
        <div class="container mx-auto px-6 prose prose-invert max-w-4xl">
            {@html data.homepage.html}
        </div>
    </section>
{/if}
