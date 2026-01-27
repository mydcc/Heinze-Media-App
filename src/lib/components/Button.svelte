<script lang="ts">
    type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
    type ButtonSize = "sm" | "md" | "lg";

    interface Props {
        variant?: ButtonVariant;
        size?: ButtonSize;
        disabled?: boolean;
        fullWidth?: boolean;
        icon?: "start" | "end";
        onclick?: () => void;
        children?: any;
    }

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        fullWidth = false,
        icon,
        onclick,
        children,
    }: Props = $props();

    const variantClasses = {
        primary:
            "bg-accent hover:bg-accent/90 text-white hover:shadow-lg hover:shadow-accent/20",
        secondary:
            "bg-white/10 hover:bg-white/20 text-white border border-white/20",
        ghost: "hover:bg-white/5 text-white",
        outline:
            "border border-accent text-accent hover:bg-accent hover:text-white",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm font-semibold",
        md: "px-6 py-3 text-base font-semibold",
        lg: "px-8 py-4 text-lg font-bold",
    };

    const baseClasses =
        "inline-flex items-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    const fullWidthClass = fullWidth ? "w-full justify-center" : "";
    const buttonClass = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidthClass}`;
</script>

<button class={buttonClass} {disabled} {onclick}>
    {#if icon === "start"}{/if}
    {@render children?.()}
    {#if icon === "end"}{/if}
</button>
