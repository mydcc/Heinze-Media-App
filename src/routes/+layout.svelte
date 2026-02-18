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

  // Dynamic Theme Colors from Frontmatter
  const metadata = $derived((data as any)?.metadata);
  const brandColor = $derived(metadata?.brandColor);
  const accentColor = $derived(metadata?.accentColor);

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
    : "Immersive Tech & XR Solutions from Berlin. WebXR, AR, VR, Metaverse and more."}
/>

<svelte:window onkeydown={handleKeydown} />

<div
  class="flex flex-col min-h-screen text-text-main"
  style:--color-brand={brandColor}
  style:--color-accent={accentColor}
>
  <Header />
  <main class="flex-grow pt-20">
    {@render children()}
  </main>
  <Footer />
</div>