<script lang="ts">
    type BadgeVariant =
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "error";

    interface Props {
        variant?: BadgeVariant;
        text: string;
    }

    let { variant = "primary", text }: Props = $props();

    const variantClasses = {
        primary: "bg-accent/20 text-accent border border-accent/30",
        secondary: "bg-white/10 text-white/80 border border-white/20",
        success: "bg-green-500/20 text-green-300 border border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
        error: "bg-red-500/20 text-red-300 border border-red-500/30",
    };

    const baseClasses =
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest";
</script>

<span class="{baseClasses} {variantClasses[variant]}">
    {text}
</span>
