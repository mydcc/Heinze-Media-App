<script lang="ts">
    type TagVariant = "default" | "accent" | "success" | "warning" | "error";

    interface Props {
        variant?: TagVariant;
        size?: "sm" | "md";
        label: string;
    }

    let { variant = "default", size = "md", label }: Props = $props();

    const variantClasses = {
        default: "bg-white/10 text-white border-white/20",
        accent: "bg-accent/10 text-accent border-accent/30",
        success: "bg-green-500/10 text-green-300 border-green-500/30",
        warning: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
        error: "bg-red-500/10 text-red-300 border-red-500/30",
    };

    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
    };
</script>

<span
    class="inline-flex items-center border rounded-full font-semibold tracking-wide {variantClasses[
        variant
    ]} {sizeClasses[size]}"
>
    {label}
</span>
