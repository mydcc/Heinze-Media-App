<script lang="ts">
  import "../app.css";
  import "@fontsource/montserrat/400.css";
  import "@fontsource/montserrat/700.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import SEOHead from "$lib/components/SEOHead.svelte";
  import { themeState } from "$lib/state/theme.svelte";
  import { adminState } from "$lib/state/admin.svelte";

  let { children } = $props();

  let keyBuffer = "";
  const CHEAT_CODE = "patrick heinze";

  function handleKeydown(event: KeyboardEvent) {
    if (adminState.isAdmin) return; // Already admin

    // Simple buffer logic
    if (event.key.length === 1) {
      keyBuffer += event.key.toLowerCase();
      if (keyBuffer.length > 50) keyBuffer = keyBuffer.slice(-50);
    }

    if (keyBuffer.endsWith(CHEAT_CODE)) {
      adminState.setAdmin(true);
      alert("Admin Mode Unlocked: Welcome Patrick!");
      // Optional: Reset buffer
      keyBuffer = "";
    }
  }
</script>

<SEOHead />

<svelte:window onkeydown={handleKeydown} />

<div class="flex flex-col min-h-screen bg-bg-body text-text-main">
  <Header />
  <main class="flex-grow pt-20">
    <!-- Added padding-top for fixed header -->
    {@render children()}
  </main>
  <Footer />
</div>
