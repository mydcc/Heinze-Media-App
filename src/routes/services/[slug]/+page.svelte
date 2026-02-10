<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import ServiceLayout from "$lib/components/layouts/ServiceLayout.svelte";
    
    let { data } = $props();
    const metadata = $derived(data.metadata);
</script>

<SEOHead
    title={`${metadata.title.replace(/<\/?[^>]+(>|$)/g, "")} | Heinze Media`}
    description={data.seoMeta.description}
/>

{#if metadata.layout === "service"}
    <ServiceLayout {metadata}>
    </ServiceLayout>
{:else}
    <div class="pt-32 container mx-auto px-6">
        <h1 class="text-4xl font-black">{@html metadata.title}</h1>
        <p class="mt-4">{metadata.description}</p>
    </div>
{/if}
