<script lang="ts">
    import { themeState } from "$lib/state/theme.svelte";
    import { onMount } from "svelte";
    import AdminGuard from "$lib/components/AdminGuard.svelte";

    // Set category to 'free' (Green Accent)
    $effect(() => {
        themeState.setCategory("free");
        // Reset on cleanup/navigation if needed, but usually next page sets its own
        return () => themeState.setCategory("default");
    });
</script>

<AdminGuard>
    <div class="relative overflow-hidden pt-20 pb-32">
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-3xl mx-auto text-center">
                <span
                    class="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-bold text-sm mb-6 border border-accent/20"
                >
                    FREE RESOURCE
                </span>
                <h1
                    class="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-text-main"
                >
                    The Ultimate <span
                        class="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60"
                        >SEO Checklist</span
                    >
                </h1>
                <p class="text-xl text-text-muted mb-10 leading-relaxed">
                    Boost your rankings with our comprehensive, step-by-step
                    guide. Completely free. No strings attached.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        class="px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-all shadow-[0_0_20px_-5px_var(--color-accent)] transform hover:scale-105"
                    >
                        Download Free Ebook
                    </button>
                    <button
                        class="px-8 py-4 bg-surface-2 text-text-main font-bold rounded-lg border border-border-color hover:border-accent hover:text-accent transition-all"
                    >
                        Read Sample
                    </button>
                </div>
            </div>

            <div class="mt-24 grid md:grid-cols-3 gap-8 text-left">
                {#each [1, 2, 3] as i}
                    <div
                        class="p-8 rounded-2xl bg-surface border border-border-color hover:border-accent/50 transition-colors group"
                    >
                        <div
                            class="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform"
                        >
                            <span class="font-bold text-xl">{i}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-text-main">
                            Lorem Ipsum {i}
                        </h3>
                        <p class="text-text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Decorative Gradient Background -->
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"
        ></div>
    </div>
</AdminGuard>
