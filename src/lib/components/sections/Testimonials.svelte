<script lang="ts">
    interface Testimonial {
        name: string;
        role: string;
        text: string;
        avatar?: string;
    }

    let { items = [] } = $props<{ items: Testimonial[] }>();
</script>

<section class="py-24 bg-bg-surface/50">
    <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each items as item}
                <div
                    class="p-8 bg-bg-body rounded-2xl border border-border-color/10 shadow-sm relative italic"
                >
                    <span
                        class="absolute top-4 right-4 text-4xl text-accent opacity-20"
                        >"</span
                    >
                    <p class="text-text-main mb-6 relative z-10">{item.text}</p>
                    <div class="flex items-center gap-4">
                        {#if item.avatar}
                            <img
                                src={item.avatar}
                                alt={item.name}
                                class="w-12 h-12 rounded-full object-cover"
                            />
                        {/if}
                        <div>
                            <div class="font-bold text-text-main">
                                {item.name}
                            </div>
                            <div
                                class="text-xs text-text-muted uppercase tracking-wider"
                            >
                                {item.role}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
