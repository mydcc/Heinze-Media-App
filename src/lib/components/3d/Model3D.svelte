<script lang="ts">
    import { Canvas } from "@threlte/core";
    import { GLTF, OrbitControls, Environment } from "@threlte/extras";
    import { T } from "@threlte/core";
    import { onMount } from "svelte";

    // Svelte 5 Props
    const {
        src,
        scale = 1,
        height = "400px",
        autoRotate = true,
        position = [0, 0, 0],
    } = $props<{
        src: string;
        scale?: number;
        height?: string;
        autoRotate?: boolean;
        position?: [number, number, number];
    }>();

    let fallback = $state(false);
    let isVisible = $state(false);
    let container: HTMLDivElement;

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    isVisible = true;
                    // Once visible, we keep it loaded for better UX, or we could toggle
                    // observer.disconnect();
                }
            },
            { rootMargin: "200px" },
        );

        if (container) observer.observe(container);
        return () => observer.disconnect();
    });

    // Error handling for model loading is handled by Threlte's GLTF component events internally,
    // but we can provide a fallback UI if needed via slot or simple boolean state.
</script>

<div
    bind:this={container}
    class="model-viewer-container w-full rounded-2xl overflow-hidden bg-bg-surface/50 border border-white/5 relative backdrop-blur-sm"
    style="height: {height}"
>
    {#if isVisible && !fallback}
        <Canvas>
            <T.PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50}>
                <OrbitControls enableDamping {autoRotate} enableZoom={false} />
            </T.PerspectiveCamera>

            <T.AmbientLight intensity={0.5} />
            <T.DirectionalLight position={[10, 10, 5]} intensity={1.5} />

            <!-- Environment for realistic reflections -->
            <Environment url="/hdr/studio.hdr" isBackground={false} />

            <GLTF
                url={src}
                {scale}
                {position}
                onerror={() => {
                    console.error("Failed to load 3D model:", src);
                    fallback = true;
                }}
            />
        </Canvas>
    {:else if fallback}
        <div
            class="absolute inset-0 flex items-center justify-center text-text-muted"
        >
            <p class="text-xs uppercase tracking-widest opacity-50">
                3D Experience Unavailable
            </p>
        </div>
    {:else}
        <!-- Placeholder while not visible -->
        <div class="absolute inset-0 flex items-center justify-center">
            <div
                class="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin"
            ></div>
        </div>
    {/if}

    <!-- Loading Indicator could be added here using Threlte's useLoader state -->
</div>
