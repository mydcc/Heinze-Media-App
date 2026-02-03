<script lang="ts">
    type CardSize = "sm" | "md" | "lg";
    type CardBorder = "none" | "subtle" | "accent";

    interface Props {
        size?: CardSize;
        border?: CardBorder;
        interactive?: boolean;
        hover?: boolean;
        children?: any;
    }

    let {
        size = "md",
        border = "subtle",
        interactive = false,
        hover = true,
        children,
    }: Props = $props();

    const sizeClasses = {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    const borderClasses = {
        none: "",
        subtle: "border border-white/10",
        accent: "border border-accent/30",
    };

    const baseClasses =
        "rounded-lg bg-white/5 backdrop-blur-sm transition-all duration-200";

    let hoverClasses = $derived(
        hover ? "hover:bg-white/10 hover:border-accent/50" : "",
    );
    let interactiveClasses = $derived(interactive ? "cursor-pointer" : "");
    let cardClass = $derived(
        `${baseClasses} ${sizeClasses[size]} ${borderClasses[border]} ${hoverClasses} ${interactiveClasses}`,
    );
</script>

<div class={cardClass}>
    {@render children?.()}
</div>
