<script lang="ts">
    import Hero from "../sections/Hero.svelte";
    import InfoBox from "../sections/InfoBox.svelte";
    import Testimonials from "../sections/Testimonials.svelte";
    import Features from "../sections/Features.svelte";
    import CTA from "../sections/CTA.svelte";
    import Process from "../sections/Process.svelte";
    import TechStack from "../sections/TechStack.svelte";
    import Gallery from "../sections/Gallery.svelte";
    import RichText from "../sections/RichText.svelte";
    import SectionHeader from "../sections/SectionHeader.svelte";

    let { blocks = [] } = $props<{
        blocks?: Array<{ type: string; data?: any }>;
    }>();

    // Map block types to components
    const components: Record<string, any> = {
        hero: Hero,
        infobox: InfoBox,
        testimonials: Testimonials,
        features: Features,
        cta: CTA,
        process: Process,
        techstack: TechStack,
        gallery: Gallery,
        richtext: RichText,
        sectionheader: SectionHeader,
    };
</script>

<div class="cms-blocks">
    {#each blocks as block}
        {#if components[block.type]}
            {@const Component = components[block.type]}
            <Component {...block.data} />
        {:else}
            <div class="container mx-auto px-6 my-8">
                <div
                    class="bg-red-500/10 p-4 border border-red-500/20 rounded text-xs text-red-500 font-mono"
                >
                    [CMS] Unknown block type: {block.type}
                </div>
            </div>
        {/if}
    {/each}
</div>

<style>
    .cms-blocks {
        display: flex;
        flex-direction: column;
    }
</style>