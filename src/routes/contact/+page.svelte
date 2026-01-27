<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import HeroContact from "$lib/components/3d/HeroContact.svelte";

    let { data } = $props();
    let meta = $derived(data.page?.meta ?? {});
    let contentHtml = $derived(data.page?.contentHtml ?? "");
</script>

<SEOHead
    title={meta.title
        ? `${meta.title} — HEINZE MEDIA`
        : "Kontakt — HEINZE MEDIA"}
    description={meta.description || "Kontaktieren Sie uns."}
/>

<div class="relative w-full overflow-x-hidden">
    <!-- Hero Section with ThreeJS -->
    <div class="h-[60vh] md:h-[70vh] w-full relative">
        <div class="absolute inset-0 z-0">
            <HeroContact heightClass="h-full" viewMode="medium" />
        </div>

        <!-- Hero Overlay Content -->
        <div
            class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
            <h1
                class="text-5xl md:text-7xl font-black text-white text-center drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] px-4"
            >
                {meta.title ?? "KONTAKT"}
            </h1>
        </div>
    </div>

    <!-- Main Content & Form -->
    <main class="container mx-auto px-6 py-16 -mt-20 relative z-20">
        <div
            class="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
        >
            {#if meta.description}
                <p
                    class="text-2xl text-white/80 mb-12 text-center font-light leading-relaxed"
                >
                    {meta.description}
                </p>
            {/if}

            <div class="grid md:grid-cols-2 gap-12">
                <!-- Left: Content from Markdown -->
                <article class="prose prose-invert prose-lg max-w-none">
                    {@html contentHtml}
                </article>

                <!-- Right: Contact Form -->
                <div>
                    <div
                        class="p-6 bg-white/5 rounded-xl border border-white/5"
                    >
                        <h2
                            class="text-xl font-bold mb-6 text-white uppercase tracking-wider"
                        >
                            Nachricht senden
                        </h2>
                        <form
                            class="space-y-4"
                            action="https://formspree.io/f/YOUR_FORM_ID"
                            method="POST"
                        >
                            <div>
                                <label
                                    for="name"
                                    class="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none text-white transition-all hover:bg-white/5"
                                />
                            </div>
                            <div>
                                <label
                                    for="email"
                                    class="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide"
                                    >E-Mail</label
                                >
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none text-white transition-all hover:bg-white/5"
                                />
                            </div>
                            <div>
                                <label
                                    for="message"
                                    class="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide"
                                    >Nachricht</label
                                >
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none text-white transition-all hover:bg-white/5"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                class="w-full py-4 mt-2 bg-brand-cyan text-black font-black text-sm uppercase tracking-widest rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transform hover:-translate-y-1"
                            >
                                Absenden
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Email Section above Footer -->
    <section
        class="py-24 bg-gradient-to-t from-black to-transparent text-center relative z-20"
    >
        <div class="container mx-auto px-6">
            <h3
                class="text-white/40 text-sm font-bold uppercase tracking-[0.2em] mb-4"
            >
                Oder schreiben Sie uns direkt
            </h3>
            <a
                href="mailto:contact@heinze-media.com"
                class="text-3xl md:text-5xl font-black text-white hover:text-brand-cyan transition-colors duration-300 break-all md:break-normal"
            >
                contact@heinze-media.com
            </a>
            <div class="w-24 h-1 bg-brand-cyan mx-auto mt-8 opacity-50"></div>
        </div>
    </section>
</div>
