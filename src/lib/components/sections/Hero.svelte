<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    interface Props {
        title?: string;
        titleAccent?: string;
        subtitle?: string;
        description?: string; // Standard alias for subtitle
        tagline?: string;
        cta1?: { text: string; href: string; variant?: "primary" | "secondary" };
        cta2?: { text: string; href: string; variant?: "primary" | "secondary" };
        // For compatibility with old CTA structure
        cta?: { text: string; href: string; variant?: "primary" | "secondary" };
        
        backgroundImage?: string;
        image?: string; // Alias for backgroundImage
        height?: "sm" | "md" | "lg" | "xl" | "compact" | "medium" | "full";
        
        showScene?: boolean;
        sceneComponent?: any;
        sceneMode?: "full" | "medium" | "compact";
        
        theme?: "dark" | "light" | "accent";
        transparentOverlay?: boolean;
    }

    let {
        title = "",
        titleAccent = "",
        subtitle = "",
        description = "",
        tagline = "",
        cta1,
        cta2,
        cta,
        backgroundImage = "",
        image = "",
        height = "lg",
        showScene = false,
        sceneComponent,
        sceneMode,
        theme = "dark",
        transparentOverlay = false
    }: Props = $props();

    let HeroScene = $state<any>(null);
    let mounted = $state(false);

    // Normalize height classes
    const heightMap = {
        sm: "h-64 md:h-80",
        compact: "h-[200px]",
        md: "h-80 md:h-96",
        medium: "h-[400px] md:h-[500px]",
        lg: "h-96 md:h-screen",
        xl: "h-screen",
        full: "min-h-screen"
    };

    const themes = {
        dark: "bg-bg-body text-white",
        light: "bg-white text-text-main",
        accent: "bg-accent text-white",
    };

    const currentHeight = $derived(heightMap[height as keyof typeof heightMap] || heightMap.lg);
    const displaySubtitle = $derived(subtitle || description);
    const bgImage = $derived(backgroundImage || image);
    const firstCta = $derived(cta1 || cta);

    onMount(async () => {
        if (!browser || !showScene) return;

        if (sceneComponent) {
            HeroScene = sceneComponent;
            mounted = true;
            return;
        }

        // Lazy load default scene
        try {
            const { default: Scene } = await import("$lib/components/3d/HeroScene.svelte");
            HeroScene = Scene;
            mounted = true;
        } catch (e) {
            console.error("Failed to load HeroScene:", e);
        }
    });
</script>

<section class="hero-section relative overflow-hidden {currentHeight} {themes[theme as keyof typeof themes]}">
    <!-- Background: 3D Scene -->
    {#if showScene && mounted && HeroScene}
        <div class="absolute inset-0 z-0">
            <HeroScene heightClass="h-full" viewMode={sceneMode || (height === 'full' ? 'full' : height === 'medium' ? 'medium' : 'compact')} />
        </div>
    {/if}

    <!-- Background: Image -->
    {#if bgImage && !HeroScene}
        <img src={bgImage} alt={title} class="absolute inset-0 w-full h-full object-cover" />
    {/if}

    <!-- Overlays -->
    {#if !transparentOverlay}
        <div class="absolute inset-0 z-[1] bg-gradient-to-b from-bg-body/70 via-bg-body/40 to-bg-body/80"></div>
    {/if}

    <!-- Content -->
    <div class="relative z-10 h-full flex items-center">
        <div class="container mx-auto px-6 w-full">
            <div class="max-w-4xl mx-auto text-center">
                {#if tagline}
                    <span class="text-accent text-sm md:text-base font-black uppercase tracking-[0.3em] block mb-6 animate-fade-in">
                        {tagline}
                    </span>
                {/if}

                <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">
                    {#if title}
                        <span class="block">{title}</span>
                    {/if}
                    {#if titleAccent}
                        <span class="block bg-gradient-to-r from-cyan-400 via-accent to-purple-600 bg-clip-text text-transparent">
                            {titleAccent}
                        </span>
                    {/if}
                </h1>

                {#if displaySubtitle}
                    <p class="text-lg md:text-2xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
                        {displaySubtitle}
                    </p>
                {/if}

                {#if firstCta || cta2}
                    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        {#if firstCta}
                            <a href={firstCta.href} class="btn-primary text-lg px-8 py-4">
                                {firstCta.text}
                            </a>
                        {/if}
                        {#if cta2}
                            <a href={cta2.href} class="btn-secondary !text-white text-lg px-8 py-4">
                                {cta2.text}
                            </a>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</section>

<style>
    .hero-section {
        position: relative;
        isolation: isolate;
    }
    
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
        animation: fade-in 0.8s ease-out forwards;
    }
</style>
