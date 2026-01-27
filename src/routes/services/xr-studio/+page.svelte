<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";

    const seoConfig: SEOConfig = {
        title: "XR Studio Pro | Enterprise Solutions | HEINZE MEDIA",
        description:
            "Future-Ready XR Studios für Enterprise. Professionelle Virtual Production, immersive Kundenerlebnisse und Metaverse-Integration für Unternehmen.",
        keywords: [
            "XR Studio",
            "Virtual Production",
            "Enterprise XR",
            "Immersive",
            "Digital Experience",
        ],
        url: "https://heinze.media/services/xr-studio",
        type: "website",
        image: "https://heinze.media/og-xr-studio.png",
        author: "HEINZE MEDIA",
    };
</script>

<SEOHead {...seoConfig} />

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<div class="pt-20 pb-32">
    <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <span
                    class="text-accent font-bold tracking-widest uppercase text-sm mb-2 block"
                    >Enterprise Solutions</span
                >
                <h1
                    class="text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-text-main"
                >
                    Future-Ready <br />
                    <span class="text-accent">XR Studios</span>
                </h1>
                <p class="text-lg text-text-muted mb-8 leading-relaxed">
                    We build immersive digital experiences for forward-thinking
                    brands. From virtual production to metaverse integration,
                    our XR Studio delivers professional-grade solutions.
                </p>

                <ul class="space-y-4 mb-10">
                    {#each ["Virtual Production", "Augmented Reality Apps", "Metaverse Consulting", "3D Asset Creation"] as item}
                        <li class="flex items-center gap-3 text-text-main">
                            <div
                                class="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><polyline points="20 6 9 17 4 12"
                                    ></polyline></svg
                                >
                            </div>
                            {item}
                        </li>
                    {/each}
                </ul>

                <button
                    class="px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-all shadow-lg shadow-accent/25"
                >
                    Schedule Consultation
                </button>
            </div>

            <div class="relative">
                <div
                    class="aspect-square rounded-3xl bg-surface-2 border border-border-color overflow-hidden relative group"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-50"
                    ></div>
                    <div
                        class="absolute inset-0 flex items-center justify-center"
                    >
                        <span class="text-text-muted text-sm"
                            >[ Placeholder: High-End XR visual ]</span
                        >
                    </div>

                    <!-- Floating Card -->
                    <div
                        class="absolute bottom-8 left-8 right-8 bg-surface/90 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                    >
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold"
                            >
                                A+
                            </div>
                            <div>
                                <h4 class="font-bold text-text-main">
                                    Top Rated Agency
                                </h4>
                                <p class="text-xs text-text-muted">
                                    TrustPilot & Clutch
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
