<script lang="ts">
    import { type Toast, toastService } from "$lib/state/toast.svelte";
    import { fly, fade } from "svelte/transition";

    let { toast }: { toast: Toast } = $props();

    function close() {
        toastService.remove(toast.id);
    }
</script>

<div
    class="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all
    {toast.type === 'error' ? 'bg-red-900/90 border-red-500 text-white' :
     toast.type === 'success' ? 'bg-green-900/90 border-green-500 text-white' :
     toast.type === 'warning' ? 'bg-yellow-900/90 border-yellow-500 text-white' :
     'bg-bg-surface/90 border-accent/50 text-text-main backdrop-blur-md border'}"
    in:fly={{ y: 20, duration: 300 }}
    out:fade={{ duration: 200 }}
    role="alert"
>
    <div class="p-4">
        <div class="flex items-start">
            <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium">{toast.message}</p>
            </div>
            <div class="ml-4 flex flex-shrink-0">
                <button
                    type="button"
                    class="inline-flex rounded-md bg-transparent text-current hover:text-white/80 focus:outline-none cursor-pointer"
                    onclick={close}
                >
                    <span class="sr-only">Close</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>
