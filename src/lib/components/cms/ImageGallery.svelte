<script lang="ts">
    interface Image {
        src: string;
        alt: string;
        label?: string;
    }

    let { items = [] } = $props<{ items: Image[] }>();
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
    {#each items as img}
        <div class="relative group overflow-hidden rounded-2xl shadow-xl">
            <img
                src={img.src}
                alt={img.alt}
                class="w-full h-full object-cover aspect-video group-hover:scale-110 transition-transform duration-700"
            />
            {#if img.label}
                <div
                    class="absolute bottom-4 left-4 bg-bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <span
                        class="text-xs font-bold text-accent uppercase tracking-widest"
                        >{img.label}</span
                    >
                </div>
            {/if}
        </div>
    {/each}
</div>
