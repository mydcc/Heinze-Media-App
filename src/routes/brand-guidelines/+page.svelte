<script lang="ts">
    import ThemePreview from "$lib/components/brand/ThemePreview.svelte";
    import LogoDownload from "$lib/components/brand/LogoDownload.svelte";
    import SEOHead from "$lib/components/SEOHead.svelte";
    import * as m from "$lib/paraglide/messages.js";

    const themes = [
        {
            id: "meteorite",
            name: "Meteorite",
            color: "#4e21e7",
            desc: "Default / Blog / Generic",
            accent: "Purple",
        },
        {
            id: "steel",
            name: "Steel",
            color: "#334eff",
            desc: "Professional / Services / Pro",
            accent: "Blue",
        },
        {
            id: "ever",
            name: "Ever",
            color: "#0da49a",
            desc: "Community / Growth / Free",
            accent: "Green",
        },
        {
            id: "insight",
            name: "Insight",
            color: "#ee485f",
            desc: "Offers / Conversion / Special",
            accent: "Red",
        },
    ];
</script>

<SEOHead
    title="Brand Guidelines | HEINZE MEDIA"
    description="Corporate Design, Brand Guidelines und Presse-Kit von HEINZE MEDIA."
/>

<div class="min-h-screen pt-32 pb-20">
    <div class="container mx-auto px-6">
        <!-- Header -->
        <header class="mb-20 text-center max-w-3xl mx-auto">
            <h1 class="text-6xl font-black mb-6 tracking-tight text-white">
                Brand <span class="text-accent">Guidelines</span>
            </h1>
            <p class="text-xl text-text-muted leading-relaxed">
                Unsere visuelle Identität ist das Fundament unserer
                Markenbotschaft. Hier findest du alle Ressourcen und Richtlinien
                für HEINZE MEDIA.
            </p>
        </header>

        <!-- 4 Themes Grid -->
        <section class="mb-32">
            <h2 class="text-3xl font-bold mb-12 flex items-center gap-4">
                <span class="w-12 h-1 bg-accent rounded-full text-white"></span>
                Das 4-Theme System
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {#each themes as theme}
                    <ThemePreview {theme} />
                {/each}
            </div>
        </section>

        <!-- Presse Kit / Logo Downloads -->
        <section
            class="mb-32 bg-white/5 rounded-3xl p-12 border border-white/10"
        >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 class="text-4xl font-black mb-6 text-white text-white">
                        Presse-Kit
                    </h2>
                    <p class="text-lg text-text-muted mb-8 leading-relaxed">
                        Lade unser offizielles Logo in verschiedenen Varianten
                        herunter. Bitte beachte die Schutzräume und
                        Mindestgrößen laut Corporate Design Manual.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <LogoDownload
                            label="Logo Set (SVG/PNG)"
                            href="/downloads/brand/logo-set.zip"
                        />
                        <a
                            href="/corporate-design"
                            class="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors text-white"
                        >
                            Design Manual lesen
                        </a>
                    </div>
                </div>
                <!-- Interactive Logo Preview -->
                <div
                    class="flex justify-center p-8 bg-brand-dark rounded-2xl border border-white/5 shadow-2xl"
                >
                    <img
                        src="/static/images/brand/logo.png"
                        alt="HEINZE MEDIA Logo"
                        class="max-w-xs"
                    />
                </div>
            </div>
        </section>

        <!-- Fonts & Typography -->
        <section class="mb-32">
            <h2
                class="text-3xl font-bold mb-12 flex items-center gap-4 text-white"
            >
                <span class="w-12 h-1 bg-accent rounded-full"></span>
                Typografie
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="space-y-6">
                    <p
                        class="text-xs uppercase tracking-widest text-accent font-bold"
                    >
                        Headlines & Branding
                    </p>
                    <p class="text-5xl font-black font-heading text-white">
                        Montserrat Bold
                    </p>
                    <p class="text-text-muted">
                        Modern, technisch und präsent. Montserrat wird für alle
                        Überschriften und Markenelemente verwendet.
                    </p>
                </div>
                <div class="space-y-6">
                    <p
                        class="text-xs uppercase tracking-widest text-accent font-bold text-white"
                    >
                        Body Content & UI
                    </p>
                    <p class="text-5xl font-medium font-sans text-white">
                        Inter Medium
                    </p>
                    <p class="text-text-muted">
                        Optimiert für Lesbarkeit auf Screens. Inter ist unsere
                        Wahl für Fließtext, Menüs und Daten-Visualisierungen.
                    </p>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    .font-heading {
        font-family: "Montserrat", sans-serif;
    }
    .font-sans {
        font-family: "Inter", sans-serif;
    }
</style>
