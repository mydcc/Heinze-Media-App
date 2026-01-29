<script lang="ts">
    import { type WindowState, windowManager } from "$lib/state/windowManager.svelte";
    import { fade, scale } from "svelte/transition";

    let { windowState }: { windowState: WindowState } = $props();

    let dragging = false;
    let offset = { x: 0, y: 0 };
    let resizing = false;
    let initialDim = { w: 0, h: 0 };
    let initialPos = { x: 0, y: 0 };

    function onMouseDown(e: MouseEvent) {
        windowManager.bringToFront(windowState.id);
        const target = e.target as HTMLElement;

        if (target.classList.contains('resize-handle')) {
             resizing = true;
             initialDim.w = windowState.width || 600;
             initialDim.h = windowState.height || 400;
             initialPos.x = e.clientX;
             initialPos.y = e.clientY;
             window.addEventListener('mousemove', onResizeMove);
             window.addEventListener('mouseup', onResizeUp);
             e.preventDefault();
             return;
        }

        // Only drag from header
        if (target.closest('.window-header')) {
            dragging = true;
            offset.x = e.clientX - windowState.x;
            offset.y = e.clientY - windowState.y;
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
    }

    function onMouseMove(e: MouseEvent) {
        if (!dragging) return;
        windowState.x = e.clientX - offset.x;
        windowState.y = e.clientY - offset.y;
    }

    function onMouseUp() {
        dragging = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    function onResizeMove(e: MouseEvent) {
        if (!resizing) return;
        const dx = e.clientX - initialPos.x;
        const dy = e.clientY - initialPos.y;
        windowState.width = Math.max(300, initialDim.w + dx);
        windowState.height = Math.max(200, initialDim.h + dy);
    }

    function onResizeUp() {
        resizing = false;
        window.removeEventListener('mousemove', onResizeMove);
        window.removeEventListener('mouseup', onResizeUp);
    }

    const Component = $derived(windowState.component);
</script>

{#if !windowState.minimized && windowState.visible}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="absolute rounded-lg shadow-2xl overflow-hidden border border-white/10 bg-bg-surface/90 backdrop-blur-xl flex flex-col"
        style="
            left: {windowState.x}px;
            top: {windowState.y}px;
            z-index: {windowState.zIndex};
            width: {windowState.width || 600}px;
            height: {windowState.height || 400}px;
        "
        onmousedown={onMouseDown}
        transition:scale={{duration: 200, start: 0.95}}
    >
        <!-- Header -->
        <div class="window-header h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none">
            <span class="text-sm font-bold text-white/80">{windowState.title}</span>
            <div class="flex gap-2">
                <button
                    class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"
                    onclick={() => windowManager.minimizeWindow(windowState.id)}
                    aria-label="Minimize"
                ></button>
                <button
                    class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"
                    onclick={() => windowManager.closeWindow(windowState.id)}
                    aria-label="Close"
                ></button>
            </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-hidden relative">
            {#if Component}
                <Component {...windowState.props} />
            {:else}
                <div class="p-4 text-center text-text-muted">No content</div>
            {/if}
        </div>

        <!-- Resize Handle (Simple) -->
        <div class="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-white/10 hover:bg-accent/50 transition-colors rounded-tl-md"></div>
    </div>
{/if}
