<script lang="ts">
    interface Props {
        size?: "sm" | "md" | "lg" | "xl" | "full";
        px?: "sm" | "md" | "lg";
        py?: "sm" | "md" | "lg" | "xl";
        children?: any;
    }

    let { size = "lg", px = "md", py = "md", children }: Props = $props();

    const sizeClasses = {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        full: "max-w-full",
    };

    const pxClasses = {
        sm: "px-4",
        md: "px-6",
        lg: "px-8",
    };

    const pyClasses = {
        sm: "py-8",
        md: "py-12",
        lg: "py-16",
        xl: "py-24",
    };
</script>

<div class="mx-auto {sizeClasses[size]} {pxClasses[px]} {pyClasses[py]}">
    {@render children?.()}
</div>
