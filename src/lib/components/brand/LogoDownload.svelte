<script lang="ts">
    export let label: string;
    export let href: string;
</script>

<a
    {href}
    class="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-95"
>
    <!-- Download Icon -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
            points="7 10 12 15 17 10"
        /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
    <span>{label}</span>
</a>
