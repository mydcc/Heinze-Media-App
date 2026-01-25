<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";
    import { themeState } from "$lib/state/theme.svelte";

    let { data } = $props();

    const seoConfig: SEOConfig = {
        title: "About HEINZE MEDIA - XR Studio & Metaverse Partner",
        description:
            "Lernen Sie HEINZE MEDIA kennen - Ihr strategischer Partner für immersive 3D-Erlebnisse, VR und Web-Technologien. Wir verbinden Gaming-DNA mit Business-Strategie.",
        keywords: [
            "About",
            "XR Studio",
            "Metaverse",
            "Team",
            "Berlin",
            "3D Web",
        ],
        url: "https://heinze.media/about",
        type: "website",
        image: "https://heinze.media/og-about.png",
        author: "HEINZE MEDIA",
    };
</script>

<SEOHead config={seoConfig} />

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<!-- HERO: Centered Showcase (SEOPress Style) -->
<header
    class="pt-40 pb-20 md:pt-56 md:pb-32 section-white text-center overflow-hidden relative"
>
    <!-- ... -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-accent)_0%,transparent_50%)]"
        ></div>
        <div
            class="absolute inset-0 bg-[url('/assets/bg.svg')] bg-[length:1400px] bg-center bg-no-repeat"
        ></div>
    </div>

    <!-- ... rest of header ... -->
    <div class="container mx-auto px-6 relative z-10">
        <span
            class="text-accent font-black tracking-widest uppercase text-xs mb-6 block"
            >Our Story</span
        >
        <h1
            class="text-h1 font-black text-text-main tracking-tighter leading-none balance mb-8"
        >
            Play <span class="text-accent">Forward</span>
        </h1>
        <p
            class="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed mb-12"
        >
            Technologie nutzen, um Ihr Unternehmen voranzubringen. Wir schaffen
            interaktive Erlebnisse, die Marken von der Masse abheben.
        </p>
        <div class="flex flex-wrap justify-center gap-6">
            <a href="/contact" class="btn-primary">
                JETZT PROJEKT STARTEN
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="M5 12h14m-7-7 7 7-7 7" /></svg
                >
            </a>
            <a href="/work" class="btn-secondary">PORTFOLIO ANSEHEN</a>
        </div>
    </div>
</header>

<!-- SECTION 1: Strategic Partner (Two-Column Showcase) -->
<section class="py-24 md:py-40 section-alt">
    <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="relative group">
                <div
                    class="absolute -inset-4 bg-accent/10 rounded-[32px] blur-2xl group-hover:bg-accent/20 transition-all"
                ></div>
                <img
                    src="/assets/projects/partners-showcase.jpg"
                    alt="Strategic Partners"
                    class="relative rounded-[24px] shadow-2xl border border-white/10 object-cover aspect-[4/3] w-full"
                    width="800"
                    height="600"
                    loading="lazy"
                />
            </div>
            <div>
                <h2
                    class="text-h3 font-black text-text-main mb-8 leading-tight"
                >
                    Ein kollaborativer und <span class="text-accent"
                        >strategischer Partner</span
                    >
                </h2>
                <div class="prose-brand">
                    <p>
                        Wenn Sie bereit sind, Technologie zu nutzen, um Ihr
                        Geschäft voranzubringen, brauchen Sie den richtigen
                        Partner. Wir fördern das Unternehmenswachstum unserer
                        Kunden durch interaktive 3D-Vertriebstools, engagierte
                        Mitarbeiter durch VR und immersive
                        Unternehmenserlebnisse.
                    </p>
                    <p>
                        Wir haben das bewährte Team und die Fähigkeiten, die Sie
                        brauchen, um Technologieerlebnisse zu schaffen, die Ihr
                        Unternehmen auszeichnen. Bei HM arbeiten wir mit unseren
                        Partnern zusammen, um den richtigen Mix aus Technologie,
                        Design, Content und Geschäftsstrategie zu finden.
                    </p>
                </div>
                <div
                    class="mt-12 flex gap-12 border-t border-border-color/10 pt-12"
                >
                    <div>
                        <span class="text-h3 font-black text-accent block"
                            >99%</span
                        >
                        <span
                            class="text-xs uppercase font-bold text-text-muted tracking-widest"
                            >Zufriedenheit</span
                        >
                    </div>
                    <div>
                        <span class="text-h3 font-black text-accent block"
                            >10+</span
                        >
                        <span
                            class="text-xs uppercase font-bold text-text-muted tracking-widest"
                            >Jahre Erfahrung</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SECTION 2: Our DNA (Centered Showcase) -->
<section class="py-24 md:py-40 section-white overflow-hidden">
    <div class="container mx-auto px-6 text-center">
        <h2 class="text-h2 font-black text-text-main tracking-tighter mb-16">
            Unsere <span class="text-accent">DNA</span>
        </h2>

        <div class="grid md:grid-cols-3 gap-12">
            <div
                class="p-12 bg-bg-surface border border-border-color/10 rounded-[32px] hover:shadow-2xl transition-all group"
            >
                <div
                    class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><rect x="2" y="6" width="20" height="12" rx="2" /><path
                            d="M6 12h4m-2-2v4m10-2h.01M15 12h.01"
                        /></svg
                    >
                </div>
                <h3 class="text-xl font-bold mb-4">Gaming DNA</h3>
                <p class="text-text-muted leading-relaxed">
                    Geboren aus der Kombination von Videospiel-Entwicklung und
                    Virtual User Experience Mindset.
                </p>
            </div>

            <div
                class="p-12 bg-bg-surface border border-border-color/10 rounded-[32px] hover:shadow-2xl transition-all group lg:scale-110 relative z-10"
            >
                <div
                    class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path
                            d="M12 2v20M2 12h20M12 12l8-8M12 12L4 4M12 12l8 8M12 12l-8 8"
                        /></svg
                    >
                </div>
                <h3 class="text-xl font-bold mb-4">Ergebnisorientiert</h3>
                <p class="text-text-muted leading-relaxed">
                    Wir bieten einen spielerischen und zielorientierten Ansatz
                    für immersive Geschäftserlebnisse.
                </p>
                <div
                    class="absolute top-4 right-4 bg-accent text-white text-[10px] font-black px-3 py-1 rounded-full uppercase"
                >
                    Kernwert
                </div>
            </div>

            <div
                class="p-12 bg-bg-surface border border-border-color/10 rounded-[32px] hover:shadow-2xl transition-all group"
            >
                <div
                    class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path
                            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                        /></svg
                    >
                </div>
                <h3 class="text-xl font-bold mb-4">Starke Partnerschaft</h3>
                <p class="text-text-muted leading-relaxed">
                    Wir arbeiten eng mit unseren Partnern zusammen, um den
                    optimalen Mix aus Technologie und Design zu finden.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- CTA: Ready to Play? -->
<section class="py-24 md:py-40 bg-bg-footer relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div
            class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        ></div>
        <div
            class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10 text-center">
        <h2
            class="text-h2 md:text-h1 font-black text-white tracking-tighter mb-12"
        >
            Bereit für den <span class="text-accent">nächsten Schritt?</span>
        </h2>
        <div class="flex flex-wrap justify-center gap-6">
            <a href="/contact" class="btn-primary"
                >KOSTENLOSES BERATUNGSGESPRÄCH</a
            >
            <a
                href="/solutions"
                class="btn-secondary !text-white hover:!text-accent"
                >UNSERE LÖSUNGEN</a
            >
        </div>
    </div>
</section>
