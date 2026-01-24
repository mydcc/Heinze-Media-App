<svelte:head>
    <title>Heinze Media | Metaverse, XR & 3D Web Apps</title>
</svelte:head>

<!-- Hero Section -->
<section
    class="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-navy"
>
    <!-- CSS Background Effect (Abstract Node Grid) -->
    <div class="absolute inset-0 opacity-20">
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-cyan)_0%,transparant_70%)] opacity-10"
        ></div>
        <div
            class="w-full h-full"
            style="background-image: radial-gradient(white 1px, transparent 1px); background-size: 50px 50px; opacity: 0.1"
        ></div>
    </div>

    <div class="container mx-auto px-6 text-center z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Metaverse Service <br />
            <span class="text-brand-cyan">Provider Nr. 1</span>
        </h1>
        <p class="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10">
            Wir erschaffen immersive 3D-Web-Erlebnisse, XR-Studios und digitale
            Zwillinge für Ihr Unternehmen.
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
            <a
                href="/work"
                class="px-8 py-3 bg-brand-cyan text-brand-navy font-bold rounded hover:bg-white transition-colors"
            >
                View Our Work
            </a>
            <a
                href="/contact"
                class="px-8 py-3 border border-brand-cyan text-brand-cyan font-bold rounded hover:bg-brand-cyan/10 transition-colors"
            >
                Contact Us
            </a>
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
