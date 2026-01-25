<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import HeroScene from "$lib/components/3d/HeroScene.svelte";
    import type { SEOConfig } from "$lib/seo/schema";

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
    <!-- Three.js Canvas Background -->
    <HeroScene />

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
                <a
                    href="/work"
                    class="px-8 py-3 bg-cyan-500 text-slate-900 font-bold rounded hover:bg-white transition-colors shadow-lg hover:shadow-xl"
                >
                    View Our Work
                </a>
                <a
                    href="/contact"
                    class="px-8 py-3 border-2 border-cyan-400 text-white font-bold rounded hover:bg-cyan-500/20 transition-colors shadow-lg"
                >
                    Contact Us
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Services / Intro -->
<section class="py-20 bg-brand-dark">
    <div class="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
        <div
            class="p-6 border border-white/5 rounded-xl hover:border-brand-cyan/30 transition-colors"
        >
            <h3 class="text-2xl font-bold mb-4">XR Studios</h3>
            <p class="text-white/60">
                Virtuelle Produktionsstudios für Broadcast und Events auf
                höchstem Niveau.
            </p>
        </div>
        <div
            class="p-6 border border-white/5 rounded-xl hover:border-brand-cyan/30 transition-colors"
        >
            <h3 class="text-2xl font-bold mb-4">Metaverse</h3>
            <p class="text-white/60">
                Dezentrale, browser-basierte 3D-Welten ohne App-Download.
            </p>
        </div>
        <div
            class="p-6 border border-white/5 rounded-xl hover:border-brand-cyan/30 transition-colors"
        >
            <h3 class="text-2xl font-bold mb-4">3D Web Apps</h3>
            <p class="text-white/60">
                Interaktive Produkt-Konfiguratoren und Showrooms mit Svelte &
                Three.js.
            </p>
        </div>
    </div>
</section>
