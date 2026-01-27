<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    interface Props {
        title?: string;
        titleAccent?: string;
        subtitle?: string;
        cta1?: { text: string; href: string };
        cta2?: { text: string; href: string };
        height?: "compact" | "medium" | "full";
        showScene?: boolean;
        backgroundGradient?: string;
        sceneComponent?: any;
        transparentOverlay?: boolean;
    }

    let {
        title = "",
        titleAccent = "",
        subtitle = "",
        cta1,
        cta2,
        height = "full",
        showScene = true,
        backgroundGradient = "from-accent/20 to-accent/5",
        sceneComponent,
        transparentOverlay = false,
    }: Props = $props();

    let HeroScene = $state<any>(null);
    let mounted = $state(false);

    const heightClasses = {
        compact: "h-[200px]",
        medium: "h-[400px] md:h-[500px]",
        full: "min-h-screen",
    };

    const contentClasses = {
        compact: "text-center",
        medium: "text-center",
        full: "text-center",
    };

    const titleClasses = {
        compact: "text-2xl md:text-3xl",
        medium: "text-3xl md:text-5xl",
        full: "text-5xl md:text-7xl",
    };

    const subtitleClasses = {
        compact: "text-sm hidden md:block",
        medium: "text-base md:text-lg",
        full: "text-lg md:text-2xl",
    };

    onMount(async () => {
        if (!browser || !showScene) return;

        // Wenn eine Szene bereits übergeben wurde, direkt montieren
        if (sceneComponent) {
            HeroScene = sceneComponent;
            mounted = true;
            return;
        }

        const { default: Scene } = await import(
            "$lib/components/3d/HeroScene.svelte"
        );
        HeroScene = Scene;
        mounted = true;
    });
</script>

<div
    class="hero-module relative w-full overflow-hidden {heightClasses[height]}"
>
    <!-- 3D Background Scene (optional) -->
    {#if showScene && mounted && HeroScene}
        <div class="absolute inset-0 z-0">
            <HeroScene heightClass={heightClasses[height]} viewMode={height} />
        </div>
    {:else}
        <div
            class="absolute inset-0 z-0 bg-gradient-to-br {backgroundGradient}"
        ></div>
    {/if}

    <!-- Overlay für bessere Lesbarkeit -->
    {#if !transparentOverlay}
        <div
            class="absolute inset-0 z-[1] bg-gradient-to-b from-bg-body/70 via-bg-body/40 to-bg-body/80"
        ></div>
    {/if}

    <!-- Content -->
    <div class="relative z-10 h-full flex items-center justify-center">
        <div class="container mx-auto px-6 w-full">
            <div class="max-w-3xl mx-auto {contentClasses[height]}">
                {#if title || titleAccent}
                    <h1
                        class="font-black text-text-main drop-shadow-lg mb-4 leading-tight {titleClasses[
                            height
                        ]}"
                    >
                        {#if title}
                            <span class="block">{title}</span>
                        {/if}
                        {#if titleAccent}
                            <span
                                class="block bg-gradient-to-r from-cyan-400 via-accent to-purple-600 bg-clip-text text-transparent"
                            >
                                {titleAccent}
                            </span>
                        {/if}
                    </h1>
                {/if}

                {#if subtitle && height !== "compact"}
                    <p
                        class="text-text-muted/90 mb-6 drop-shadow leading-relaxed {subtitleClasses[
                            height
                        ]}"
                    >
                        {subtitle}
                    </p>
                {/if}

                {#if (cta1 || cta2) && height !== "compact"}
                    <div
                        class="flex flex-col md:flex-row gap-4 justify-center items-center"
                    >
                        {#if cta1}
                            <a href={cta1.href} class="btn-primary">
                                {cta1.text}
                            </a>
                        {/if}
                        {#if cta2}
                            <a href={cta2.href} class="btn-secondary">
                                {cta2.text}
                            </a>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .hero-module {
        position: relative;
        isolation: isolate;
    }
</style>
