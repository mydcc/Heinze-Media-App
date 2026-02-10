<script lang="ts">
    interface Feature {
        title: string;
        description: string;
        icon?: string;
    }

    let {
        title = "",
        description = "",
        items = [],
    } = $props<{
        title?: string;
        description?: string;
        items: Feature[];
    }>();
</script>

<section class="py-24">
    <div class="container mx-auto px-6 text-center mb-16">
        {#if title}
            <h2 class="text-4xl font-black mb-4 text-text-main">{title}</h2>
        {/if}
        {#if description}
            <p class="text-xl text-text-muted max-w-2xl mx-auto">
                {description}
            </p>
        {/if}
    </div>
    <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each items as item}
                <div
                    class="text-center p-6 grayscale hover:grayscale-0 transition-all"
                >
                    {#if item.icon}
                        <div class="text-4xl mb-4">{item.icon}</div>
                    {/if}
                    <h3 class="text-xl font-bold mb-2 text-text-main">
                        {item.title}
                    </h3>
                    <p class="text-text-muted text-sm leading-relaxed">
                        {item.description}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>
