<script lang="ts">
    export let theme: {
        id: string;
        name: string;
        color: string;
        desc: string;
        accent: string;
    };
</script>

<div
    class="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-xl overflow-hidden"
>
    <!-- Visual Accent -->
    <div
        class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style="background-color: {theme.color}"
    ></div>

    <!-- Color Swatch -->
    <div
        class="w-16 h-16 rounded-xl mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-500"
        style="background-color: {theme.color}"
    ></div>

    <div class="relative z-10">
        <h3 class="text-2xl font-black mb-2 text-white">{theme.name}</h3>
        <p class="text-accent text-sm font-bold uppercase tracking-wider mb-4">
            {theme.accent} Accent
        </p>
        <p class="text-text-muted text-sm leading-relaxed">{theme.desc}</p>
    </div>

    <!-- Hex Display -->
    <div
        class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between"
    >
        <code class="text-xs text-text-muted">{theme.color.toUpperCase()}</code>
        <button
            class="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copy Hex"
        >
            Copy
        </button>
    </div>
</div>
