<script lang="ts">
    import { windowManager } from "$lib/state/windowManager.svelte";
    import FloatingWindow from "./FloatingWindow.svelte";
</script>

<div class="fixed inset-0 pointer-events-none z-[50]">
    {#each windowManager.windows as window (window.id)}
        <div class="pointer-events-auto contents">
            <FloatingWindow windowState={window} />
        </div>
    {/each}
</div>
