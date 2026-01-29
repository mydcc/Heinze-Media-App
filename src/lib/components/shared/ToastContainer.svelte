<script lang="ts">
    import { toastService } from "$lib/state/toast.svelte";
    import ToastItem from "./ToastItem.svelte";
</script>

<div
    class="pointer-events-none fixed bottom-0 right-0 z-[10000] flex w-full flex-col items-end gap-2 p-4 sm:p-6"
>
    {#each toastService.toasts as toast (toast.id)}
        <ToastItem {toast} />
    {/each}
</div>
