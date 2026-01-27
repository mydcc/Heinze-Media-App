<script lang="ts">
    interface Step {
        title: string;
        text: string;
    }

    let { items = [] } = $props<{ items: Step[] }>();
</script>

<section class="py-24">
    <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-4 gap-8 relative">
            <div
                class="absolute top-12 left-0 right-0 h-0.5 bg-accent/10 hidden lg:block"
            ></div>
            {#each items as item, i}
                <div class="relative z-10">
                    <div
                        class="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-black mb-6 shadow-xl border-4 border-bg-body"
                    >
                        {i + 1}
                    </div>
                    <h3 class="text-xl font-bold mb-4 text-text-main">
                        {item.title}
                    </h3>
                    <p class="text-text-muted text-sm leading-relaxed">
                        {item.text}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>
