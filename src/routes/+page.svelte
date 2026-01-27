<script lang="ts">
    import { onMount } from "svelte";
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";

    let HeroScene: any;
    let mounted = false;

    onMount(async () => {
        // Dynamically import Three.js scene only when component is mounted
        const { default: Scene } = await import(
            "$lib/components/3d/HeroScene.svelte"
        );
        HeroScene = Scene;
        mounted = true;
    });

    const seoConfig: SEOConfig = {
        title: "HEINZE MEDIA - Metaverse, XR & 3D Web Solutions",
        description:
            "Wir erschaffen immersive 3D-Web-Erlebnisse, XR-Studios und digitale Zwillinge. Ihr Partner für die nächste Generation von Web-Erlebnissen.",
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

<SEOHead config={seoConfig} />

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
    <div class="absolute inset-0 flex items-center justify-center">
        <div class="container mx-auto px-6 text-center">
            <h1
                class="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg"
            >
                Metaverse Service <br />
                <span
                    class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                >
                    Provider Nr. 1
                </span>
            </h1>
            <p
                class="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 drop-shadow"
            >
                Wir erschaffen immersive 3D-Web-Erlebnisse, XR-Studios und
                digitale Zwillinge für Ihr Unternehmen.
            </p>
            <div class="flex flex-col md:flex-row gap-4 justify-center">
                <a href="/work" class="btn-primary"> View Our Work </a>
                <a href="/contact" class="btn-secondary"> Contact Us </a>
            </div>
        </div>
    </div>
</section>

<!-- Services / Intro -->
<section class="py-20 bg-brand-dark">
    <div class="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
        <div
            class="p-6 border border-white/10 hover:border-brand-cyan/60 bg-white/0 hover:bg-white/2 rounded-xl shadow-none hover:shadow-md transition-all duration-200"
        >
            <h3 class="text-2xl font-bold mb-4">XR Studios</h3>
            <p class="text-white/90">
                Virtuelle Produktionsstudios für Broadcast und Events auf
                höchstem Niveau.
            </p>
        </div>
        <div
            class="p-6 border border-white/10 hover:border-brand-cyan/60 bg-white/0 hover:bg-white/2 rounded-xl shadow-none hover:shadow-md transition-all duration-200"
        >
            <h3 class="text-2xl font-bold mb-4">Metaverse</h3>
            <p class="text-white/90">
                Dezentrale, browser-basierte 3D-Welten ohne App-Download.
            </p>
        </div>
        <div
            class="p-6 border border-white/10 hover:border-brand-cyan/60 bg-white/0 hover:bg-white/2 rounded-xl shadow-none hover:shadow-md transition-all duration-200"
        >
            <h3 class="text-2xl font-bold mb-4">3D Web Apps</h3>
            <p class="text-white/90">
                Interaktive Produkt-Konfiguratoren und Showrooms mit Svelte &
                Three.js.
            </p>
        </div>
    </div>
</section>
