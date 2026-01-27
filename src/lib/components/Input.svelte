<script lang="ts">
    interface Props {
        type?: "text" | "email" | "tel" | "number" | "textarea";
        label?: string;
        placeholder?: string;
        required?: boolean;
        value?: string;
        onchange?: (value: string) => void;
        error?: string;
    }

    let {
        type = "text",
        label,
        placeholder,
        required = false,
        value = "",
        onchange,
        error,
    }: Props = $props();
</script>

<div class="space-y-2">
    {#if label}
        <label class="block text-sm font-semibold text-white">
            {label}
            {#if required}
                <span class="text-accent">*</span>
            {/if}
        </label>
    {/if}

    {#if type === "textarea"}
        <textarea
            {placeholder}
            {required}
            {value}
            onchange={(e) => onchange?.(e.currentTarget.value)}
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:bg-white/10 transition-all resize-none"
            rows="4"
        ></textarea>
    {:else}
        <input
            {type}
            {placeholder}
            {required}
            {value}
            onchange={(e) => onchange?.(e.currentTarget.value)}
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent focus:bg-white/10 transition-all"
        />
    {/if}

    {#if error}
        <p class="text-sm text-red-400">{error}</p>
    {/if}
</div>
