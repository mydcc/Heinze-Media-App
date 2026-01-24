<script lang="ts">
  import '../app.css';
  import '@fontsource/montserrat/400.css';
  import '@fontsource/montserrat/700.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-brand-navy text-white">
  <Header />
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
