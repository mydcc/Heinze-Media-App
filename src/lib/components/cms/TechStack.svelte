<script lang="ts">
    interface Tech {
        name: string;
        category: string;
        desc: string;
    }

    let { items = [] } = $props<{ items: Tech[] }>();
</script>

<div class="grid md:grid-cols-2 gap-6 my-12">
    {#each items as tech}
        <div
            class="p-8 bg-bg-surface border border-border-color/10 rounded-2xl hover:shadow-2xl hover:border-accent/50 transition-all group"
        >
            <div class="flex items-start justify-between mb-4">
                <h3
                    class="text-2xl font-black text-text-main group-hover:text-accent transition-colors"
                >
                    {tech.name}
                </h3>
                <span
                    class="text-xs uppercase font-bold tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full"
                >
                    {tech.category}
                </span>
            </div>
            <p class="text-text-muted">{tech.desc}</p>
        </div>
    {/each}
</div>
