<script lang="ts">
  import "../app.css";
  import "@fontsource/montserrat/400.css";
  import "@fontsource/montserrat/700.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import SEOHead from "$lib/components/SEOHead.svelte";
  import { themeState } from "$lib/state/theme.svelte";
  import { adminState } from "$lib/state/admin.svelte";
  import { page as pageStore } from "$app/stores";
  import { setupI18n, isLoading } from "$lib/i18n";
  import ToastContainer from "$lib/components/shared/ToastContainer.svelte";
  import WindowContainer from "$lib/components/window/WindowContainer.svelte";

  setupI18n();

  // Svelte 5 Runes: direkt im <script> verwenden
  const { children, data } = $props();
  let keyBuffer = "";
  const CHEAT_CODE = "patrick heinze";

  function handleKeydown(event: KeyboardEvent) {
    if (adminState.isAdmin) return;
    if (event.key.length === 1) {
      keyBuffer += event.key.toLowerCase();
      if (keyBuffer.length > 50) keyBuffer = keyBuffer.slice(-50);
    }
    if (keyBuffer.endsWith(CHEAT_CODE)) {
      adminState.setAdmin(true);
      alert("Admin Mode Unlocked: Welcome Patrick!");
      keyBuffer = "";
    }
  }

  $effect(() => {
    const pathname = $pageStore.url.pathname;
    if (pathname) {
      themeState.override = "auto";
      themeState.applyPageTheme(pathname);
    }
  });
</script>

<SEOHead
  title={data &&
  typeof data === "object" &&
  "title" in data &&
  typeof (data as any).title === "string"
    ? (data as any).title
    : "Heinze Media"}
  description={data &&
  typeof data === "object" &&
  "description" in data &&
  typeof (data as any).description === "string"
    ? (data as any).description
    : "Immersive Tech & XR Solutions aus Berlin. WebXR, AR, VR, Metaverse und mehr."}
/>

<svelte:window onkeydown={handleKeydown} />

{#if $isLoading}
  <div class="flex items-center justify-center min-h-screen bg-bg-surface text-white">
    Loading...
  </div>
{:else}
  <div class="flex flex-col min-h-screen text-text-main">
    <Header />
    <main class="flex-grow pt-20">
      <!-- Added padding-top for fixed header -->
      {@render children()}
    </main>
    <Footer />
  </div>

  <ToastContainer />
  <WindowContainer />
{/if}
