<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import HeroModule from "$lib/components/cms/HeroModule.svelte";
    import HeroContact from "$lib/components/3d/HeroContact.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const metadata = $derived(data.metadata);
    const html = $derived(data.html);
    const seoMeta = $derived(data.seoMeta);
    const jsonLD = $derived(data.jsonLD);
    const isContact = $derived(metadata?.slug === "contact");
</script>

<SEOHead
    title={`
        ${metadata.title} | Heinze Media
    `}
    description={seoMeta.description}
    ogImage={seoMeta.image}
    {jsonLD}
/>

<article class={isContact ? "relative" : ""}>
    {#if isContact}
        <!-- Full-page background 3D scene for contact (fixed to viewport) -->
        <div class="fixed inset-0" style="z-index: 0;">
            <HeroContact heightClass="h-screen" viewMode="full" />
        </div>
        <div
            class="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
            style="z-index: 1;"
        ></div>

        <!-- Content Wrapper: pointer-events transparent, interaktive Elemente explizit aktiviert -->
        <div class="relative" style="z-index: 10; pointer-events: none;">
            <!-- Hero Module für Kontaktseite Header (200px) - Jetzt ohne eigene 3D-Szene, da Hintergrund vorhanden -->
            <div style="pointer-events: auto;">
                <HeroModule
                    title={metadata.title}
                    height="compact"
                    showScene={false}
                    backgroundGradient="transparent"
                    transparentOverlay={true}
                />
            </div>
        </div>
    {:else}
        <!-- Standard Header für andere Seiten -->
        <div class="py-16 md:py-24">
            <div class="container mx-auto px-6">
                <div class="max-w-3xl">
                    <h1
                        class="text-4xl md:text-5xl font-black text-text-main mb-4"
                    >
                        {metadata.title}
                    </h1>
                </div>
            </div>
        </div>
    {/if}

    {#if isContact}
        <!-- Contact Card: Fixed Position, scrollt NICHT mit -->
        <div
            class="fixed bottom-16 left-0 right-0 pointer-events-none"
            style="z-index: 10;"
        >
            <div class="container mx-auto px-6">
                <div class="max-w-2xl mx-auto" style="pointer-events: auto;">
                    <div
                        class="rounded-2xl border border-border-color/30 bg-bg-body/85 backdrop-blur-lg p-6 text-center shadow-xl"
                    >
                        <p
                            class="text-xs uppercase tracking-widest text-text-muted mb-2"
                        >
                            Kontakt
                        </p>
                        <a
                            href="mailto:kontakt@heinze-media.de"
                            class="text-xl md:text-2xl font-semibold text-accent hover:text-accent/80 transition-colors inline-block"
                        >
                            kontakt@heinze-media.de
                        </a>
                        <p class="text-sm text-text-muted mt-2">
                            Berlin • Remote möglich
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Spacer: 100vh Höhe für Scroll-Bereich -->
        <div class="h-screen"></div>
    {/if}
</article>
