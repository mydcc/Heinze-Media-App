<script lang="ts">
    import Hero from "./Hero.svelte";
    import InfoBox from "./InfoBox.svelte";
    import Testimonials from "./Testimonials.svelte";
    import FeaturesGrid from "./FeaturesGrid.svelte";
    import CTABanner from "./CTABanner.svelte";
    import ProcessSteps from "./ProcessSteps.svelte";
    import TechStack from "./TechStack.svelte";
    import ImageGallery from "./ImageGallery.svelte";
    import RichText from "./RichText.svelte";
    import SectionHeader from "./SectionHeader.svelte";

    let { blocks = [] } = $props<{
        blocks?: Array<{ type: string; data?: any }>;
    }>();

    const components: Record<string, any> = {
        hero: Hero,
        infobox: InfoBox,
        testimonials: Testimonials,
        features: FeaturesGrid,
        cta: CTABanner,
        process: ProcessSteps,
        techstack: TechStack,
        gallery: ImageGallery,
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
