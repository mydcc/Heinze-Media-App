<script lang="ts">
    import ThreeBackground from "$lib/components/ThreeBackground.svelte";

    let scrollProgress = $state(0);
</script>

<div class="relative w-full h-full bg-black overflow-hidden">
    <ThreeBackground bind:scrollProgress />

    <div class="absolute bottom-4 left-4 right-12 z-10 flex items-center gap-2 bg-black/50 p-2 rounded backdrop-blur border border-white/10">
        <span class="text-xs text-white font-mono">ANIMATION</span>
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            bind:value={scrollProgress}
            class="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
        />
    </div>
</div>
