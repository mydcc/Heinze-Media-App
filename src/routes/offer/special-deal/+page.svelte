<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";

    const seoConfig: SEOConfig = {
        title: "Special Deal - Limited Time Offer | HEINZE MEDIA",
        description:
            "Exklusives Angebot: Sparen Sie bis zu 50% auf XR Studio Services und Metaverse Projekte. Begrenzt verfügbar!",
        keywords: [
            "Special Offer",
            "Deal",
            "Discount",
            "Limited Time",
            "XR Services",
        ],
        url: "https://heinze.media/offer/special-deal",
        type: "website",
        image: "https://heinze.media/og-deal.png",
        author: "HEINZE MEDIA",
    };
</script>

<SEOHead {...seoConfig} />

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<div class="pt-20 pb-32">
    <div class="container mx-auto px-6">
        <div
            class="max-w-4xl mx-auto bg-surface border border-accent/30 rounded-3xl p-8 md:p-12 relative overflow-hidden text-center"
        >
            <!-- Bg Effect -->
            <div class="absolute top-0 left-0 w-full h-2 bg-accent"></div>
            <div
                class="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
            ></div>
            <div
                class="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
            ></div>

            <span
                class="inline-block py-1 px-4 rounded-full bg-accent text-white font-bold text-xs uppercase tracking-widest mb-6 animate-pulse"
            >
                Limited Time Offer
            </span>

            <h1 class="text-4xl md:text-6xl font-bold text-text-main mb-6">
                Get <span class="text-accent">50% OFF</span> on All Setup Fees
            </h1>

            <p class="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
                Start your Metaverse journey today. For a limited time, we are
                waiving half of the initial setup costs for new Enterprise
                clients.
            </p>

            <div
                class="flex flex-col md:flex-row justify-center items-center gap-6 mb-12"
            >
                <div class="text-center">
                    <div
                        class="text-sm text-text-muted uppercase tracking-wider mb-1"
                    >
                        Was
                    </div>
                    <div
                        class="text-2xl font-bold text-text-muted line-through decoration-accent/50"
                    >
                        € 5.000
                    </div>
                </div>
                <div class="text-4xl font-black text-accent">€ 2.500</div>
            </div>

            <button
                class="w-full md:w-auto px-12 py-5 bg-accent text-white font-bold text-lg rounded-xl shadow-xl shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1 transition-all"
            >
                Claim Offer Now
            </button>

            <p class="mt-6 text-xs text-text-muted">
                * Offer valid until end of month. Terms and conditions apply.
            </p>
        </div>
    </div>
</div>
