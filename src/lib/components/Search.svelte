<script lang="ts">
  import { onMount } from "svelte";

  let query = $state("");
  let results = $state<any[]>([]);
  let loading = $state(false);
  let pagefind: any;

  onMount(async () => {
    // Load Pagefind script (only available after build)
    try {
      const pagefindPath = "/pagefind/pagefind.js";
      pagefind = await import(/* @vite-ignore */ pagefindPath);
      pagefind.init();
    } catch (e) {
      console.warn("Pagefind not available (dev mode?)");
    }
  });

  async function handleSearch() {
    if (!pagefind || query.length < 2) {
      results = [];
      return;
    }

    loading = true;
    const search = await pagefind.search(query);

    // Load top 5 results data
    const dataPromises = search.results.slice(0, 5).map((r: any) => r.data());
    results = await Promise.all(dataPromises);
    loading = false;
  }
</script>

<div class="relative w-full max-w-md">
  <input
    type="text"
    bind:value={query}
    oninput={handleSearch}
    placeholder="Search..."
    class="w-full px-4 py-2 bg-bg-surface border border-white/10 rounded-lg focus:outline-none focus:border-accent text-text-main"
  />

  {#if results.length > 0}
    <div class="absolute top-full left-0 w-full mt-2 bg-bg-surface border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
      {#each results as result}
        <a href={result.url} class="block px-4 py-3 hover:bg-white/5 transition-colors">
          <h4 class="text-sm font-bold text-text-main">{result.meta.title}</h4>
          <p class="text-xs text-text-muted truncate">{result.excerpt.replace(/<[^>]*>?/gm, '')}</p>
        </a>
      {/each}
    </div>
  {/if}
</div>
