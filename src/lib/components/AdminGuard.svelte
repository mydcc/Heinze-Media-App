<script lang="ts">
    import { adminState } from "$lib/state/admin.svelte";

    let { children } = $props();
</script>

{#if adminState.isAdmin}
    <div class="relative border-2 border-red-500/50 rounded-lg p-1">
        <!-- Admin Indicator -->
        <div
            class="absolute -top-3 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase z-50 pointer-events-none"
        >
            Admin Draft
        </div>
        {@render children()}
    </div>
{:else}
    <!-- FAKE 404 for non-admins trying to guess URL -->
    <div
        class="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 pt-32"
    >
        <h1
            class="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600 opacity-20 select-none"
        >
            404
        </h1>
        <h2 class="text-3xl font-bold text-text-main mt-4">Page Not Found</h2>
        <p class="text-text-muted mt-2 mb-8 max-w-md">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
        </p>
        <a
            href="/"
            class="px-6 py-3 bg-surface-2 hover:bg-surface-2/80 text-text-main font-bold rounded-lg border border-border-color transition-colors"
        >
            Back to Home
        </a>
    </div>
{/if}
