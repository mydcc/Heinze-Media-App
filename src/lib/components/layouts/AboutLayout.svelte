<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import ThreeBackground from "$lib/components/ThreeBackground.svelte";
    import { onMount } from "svelte";

    let { metadata, children } = $props<{ metadata: any, children?: any }>();

    let journeySection: HTMLElement;
    let sectionProgress = $state(0);

    onMount(() => {
        const handleScroll = () => {
            if (!journeySection) return;
            const rect = journeySection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = rect.height;
            const scrollRange = windowHeight + sectionHeight;
            const scrolled = windowHeight - rect.top;
            sectionProgress = Math.max(0, Math.min(1, scrolled / scrollRange));
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    });

    // Extract data from metadata
    const milestones = $derived(metadata.milestones || []);
    const techStack = $derived(metadata.techStack || []);
    const mission = $derived(metadata.mission || {});
    const hero = $derived(metadata.hero || {});
    const platformComparison = $derived(metadata.platformComparison || {});
    const showcase = $derived(metadata.showcase || []);
    const stats = $derived(metadata.ctaStats || []);
</script>

<!-- HERO -->
<header class="pt-52 pb-20 md:pt-64 md:pb-32 section-white overflow-hidden relative">
    <div class="absolute inset-0 opacity-15 pointer-events-none">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-accent)_0%,transparent_50%)]"></div>
        <div class="absolute inset-0 bg-[url('/assets/bg.svg')] bg-[length:100vw] bg-center bg-no-repeat"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div class="relative group order-2 lg:order-1">
                <div class="absolute -inset-8 bg-accent/20 rounded-[40px] blur-3xl group-hover:bg-accent/30 transition-all duration-700"></div>
                <div class="relative overflow-hidden rounded-[32px]">
                    <picture>
                        <source srcset={hero.imageWebp || "/images/about/patrick-heinze-portrait.webp"} type="image/webp" />
                        <img
                            src={hero.image || "/images/about/patrick-heinze-portrait.jpg"}
                            alt={hero.imageAlt || "Patrick Heinze"}
                            class="relative shadow-2xl border-4 border-white/20 object-cover aspect-[3/4] w-full grayscale hover:grayscale-0 transition-all duration-500 rounded-[32px]"
                            width="800"
                            height="1066"
                            loading="eager"
                        />
                    </picture>
                    <div class="absolute inset-0 bg-accent/20 mix-blend-color pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-700 rounded-[32px] z-10"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-bg-surface/80 via-transparent to-transparent pointer-events-none z-10"></div>
                    <div class="absolute -bottom-6 -right-6 bg-accent text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-sm uppercase tracking-widest z-20">
                        {hero.badge || "Est. 2000"}
                    </div>
                </div>
            </div>

            <div class="text-left order-1 lg:order-2">
                <span class="text-accent font-black tracking-widest uppercase text-xs mb-6 block">{hero.tagline || "About"}</span>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tighter leading-none mb-8">
                    {hero.titlePrefix || "Building Your"}
                    <span class="text-accent block">{hero.titleAccent || "Digital Galaxy"}</span>
                </h1>
                <p class="text-xl md:text-2xl text-text-muted leading-relaxed mb-12">
                    {@html hero.description || ""}
                </p>
                <div class="flex flex-wrap gap-6">
                    <a href={hero.ctaPrimaryLink || "/contact"} class="btn-primary">
                        {hero.ctaPrimaryText || "LET'S TALK"}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                    </a>
                    <a href={hero.ctaSecondaryLink || "/work"} class="btn-secondary">{hero.ctaSecondaryText || "VIEW PORTFOLIO"}</a>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- MISSION -->
<section class="py-24 md:py-40 section-alt">
    <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto text-center">
            <span class="text-accent font-black tracking-widest uppercase text-xs mb-6 block">{mission.tagline || "My Mission"}</span>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-12 leading-tight tracking-tight">
                {@html mission.title || "The Next Generation Web"}
            </h2>
            <div class="prose-brand text-lg md:text-xl">
                <p class="leading-relaxed">
                    {@html mission.text || ""}
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 mt-16">
                {#each mission.benefits || [] as benefit}
                    <div class="p-8 bg-bg-surface border border-border-color/10 rounded-2xl hover:shadow-2xl transition-all">
                        <div class="text-accent text-5xl font-black mb-4">{benefit.icon}</div>
                        <div class="text-sm font-bold uppercase tracking-widest text-text-muted">{benefit.label}</div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- JOURNEY -->
<section bind:this={journeySection} class="min-h-[400vh] section-white relative">
    <div class="sticky top-0 h-screen w-full opacity-30 pointer-events-none">
        <ThreeBackground bind:scrollProgress={sectionProgress} />
    </div>

    <div class="container mx-auto px-6 relative z-10 -mt-[100vh] py-24 md:py-32">
        <div class="max-w-6xl mx-auto transition-opacity duration-1000" style="opacity: {Math.max(0, Math.min(1, 1 - (sectionProgress - 0.5) / 0.2))}">
            <div class="text-center mb-20">
                <span class="text-accent font-black tracking-widest uppercase text-xs mb-6 block">{metadata.journeyTagline || "My Journey"}</span>
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-8 leading-tight tracking-tight">
                    {@html metadata.journeyTitle || "Strategic Implementation"}
                </h2>
                <p class="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                    {metadata.journeyText || ""}
                </p>
            </div>

            <div class="relative">
                <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-accent/20 hidden lg:block"></div>
                <div class="space-y-12">
                    {#each milestones as milestone, i}
                        <div class="relative grid lg:grid-cols-2 gap-8 items-center" class:lg:flex-row-reverse={i % 2 === 1}>
                            {#if i % 2 === 0}
                                <div class="lg:text-right lg:pr-16">
                                    <div class="inline-block lg:block">
                                        <div class="text-accent font-black text-4xl mb-2">{milestone.icon}</div>
                                        <div class="text-2xl font-black text-text-main mb-2">{milestone.title}</div>
                                        <div class="text-sm text-accent font-bold uppercase tracking-widest mb-3">{milestone.year}</div>
                                        <p class="text-text-muted">{milestone.desc}</p>
                                    </div>
                                </div>
                                <div class="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-bg-body hidden lg:block z-10"></div>
                                <div class="hidden lg:block"></div>
                            {:else}
                                <div class="hidden lg:block"></div>
                                <div class="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-bg-body hidden lg:block z-10"></div>
                                <div class="lg:pl-16">
                                    <div class="inline-block lg:block">
                                        <div class="text-accent font-black text-4xl mb-2">{milestone.icon}</div>
                                        <div class="text-2xl font-black text-text-main mb-2">{milestone.title}</div>
                                        <div class="text-sm text-accent font-bold uppercase tracking-widest mb-3">{milestone.year}</div>
                                        <p class="text-text-muted">{milestone.desc}</p>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            {#if metadata.quote}
                <div class="mt-20 p-12 bg-accent/10 border-l-4 border-accent rounded-2xl">
                    <p class="text-xl text-text-main leading-relaxed">
                        {@html metadata.quote}
                    </p>
                </div>
            {/if}
        </div>

        <div class="max-w-6xl mx-auto mt-[100vh] transition-opacity duration-1000" style="opacity: {Math.max(0, (sectionProgress - 0.45) / 0.15)}">
            <div class="text-center mb-20">
                <span class="text-accent font-black tracking-widest uppercase text-xs mb-6 block">Expertise & Technology</span>
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-8 leading-tight tracking-tight">
                    Powered by <span class="text-accent">Enterprise-Grade</span> Technology
                </h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                {#each techStack as tech}
                    <div class="p-8 bg-bg-surface/80 backdrop-blur border border-border-color/10 rounded-2xl hover:shadow-2xl hover:border-accent/50 transition-all group">
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-2xl font-black text-text-main">{tech.name}</h3>
                            <span class="text-xs uppercase font-bold tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">{tech.category}</span>
                        </div>
                        <p class="text-text-muted">{tech.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- PLATFORM COMPARISON -->
<section class="py-24 md:py-40 section-alt">
    <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div>
                <span class="text-accent font-black tracking-widest uppercase text-xs mb-6 block">{platformComparison.tagline || "Expertise"}</span>
                <h2 class="text-4xl md:text-5xl font-black text-text-main mb-8 leading-tight tracking-tight">
                    {@html platformComparison.title || "Technology"}
                </h2>
                <div class="prose-brand space-y-6">
                    {@html platformComparison.text || ""}
                </div>
            </div>

            <div class="space-y-6">
                {#each techStack as tech}
                    <div class="p-8 bg-bg-surface border border-border-color/10 rounded-2xl hover:shadow-2xl hover:border-accent/50 transition-all group">
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-2xl font-black text-text-main">{tech.name}</h3>
                            <span class="text-xs uppercase font-bold tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">{tech.category}</span>
                        </div>
                        <p class="text-text-muted">{tech.desc}</p>
                    </div>
                {/each}
            </div>
        </div>

        {#if platformComparison.comparison}
            <div class="mt-20 max-w-5xl mx-auto">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="p-10 bg-red-500/10 border-2 border-red-500/30 rounded-2xl">
                        <div class="text-red-500 text-5xl mb-4">⚠️</div>
                        <h3 class="text-2xl font-black text-text-main mb-4">{platformComparison.comparison.bad.title}</h3>
                        <ul class="space-y-3 text-text-muted">
                            {#each platformComparison.comparison.bad.items as item}
                                <li class="flex items-start gap-3">
                                    <span class="text-red-500 font-black">✗</span>
                                    <span>{item}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>

                    <div class="p-10 bg-accent/10 border-2 border-accent rounded-2xl">
                        <div class="text-accent text-5xl mb-4">✓</div>
                        <h3 class="text-2xl font-black text-text-main mb-4">{platformComparison.comparison.good.title}</h3>
                        <ul class="space-y-3 text-text-muted">
                            {#each platformComparison.comparison.good.items as item}
                                <li class="flex items-start gap-3">
                                    <span class="text-accent font-black">✓</span>
                                    <span>{item}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</section>

<!-- VISUAL SHOWCASE -->
{#if showcase.length > 0}
<section class="py-24 md:py-40 section-white">
    <div class="container mx-auto px-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8">
                {#each showcase as item}
                    <div class="relative group">
                        <div class="absolute -inset-4 bg-accent/10 rounded-[32px] blur-2xl group-hover:bg-accent/20 transition-all"></div>
                        <img
                            src={item.image}
                            alt={item.alt}
                            class="relative rounded-[24px] shadow-2xl border border-white/10 object-cover aspect-[4/3] w-full"
                            width="800"
                            height="600"
                            loading="lazy"
                        />
                        <div class="absolute bottom-6 left-6 bg-bg-surface/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10">
                            <div class="text-sm font-bold text-accent">{item.title}</div>
                            <div class="text-xs text-text-muted">{item.subtitle}</div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
{/if}

<!-- MAIN CONTENT (Markdown Body) -->
{#if children}
<section class="py-16 bg-bg-body"> <!-- Fixed: Change to dark background for prose-invert -->
    <div class="container mx-auto px-6">
        <article class="prose prose-invert max-w-4xl mx-auto prose-headings:text-text-main prose-p:text-text-muted prose-strong:text-accent prose-a:text-accent">
            {@render children()}
        </article>
    </div>
</section>
{/if}

<!-- CTA -->
<section class="py-24 md:py-40 bg-bg-footer relative overflow-hidden">
    <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="max-w-4xl mx-auto">
            <span class="text-accent font-black tracking-widest uppercase text-xs mb-6 block">{metadata.ctaTagline || "Ready to Start?"}</span>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-8">
                {@html metadata.ctaTitle || "Let's Build Your <span class='text-accent'>Galaxy</span>"}
            </h2>
            <p class="text-xl text-white/80 mb-12 leading-relaxed">
                {metadata.ctaDescription || "If you are ready to transform your digital presence from a passive website into an explorable, interactive world that delights your customers, let's talk."}
            </p>
            <div class="flex flex-wrap justify-center gap-6">
                <a href="/contact" class="btn-primary text-lg px-8 py-4">
                    {metadata.ctaButtonText || "START YOUR PROJECT"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </a>
                <a href="/work" class="btn-secondary !text-white hover:!text-accent text-lg px-8 py-4">VIEW CASE STUDIES</a>
            </div>

            <!-- Stats -->
            {#if stats.length > 0}
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-white/10">
                    {#each stats as stat}
                        <div>
                            <div class="text-4xl md:text-5xl font-black text-accent mb-2">{stat.value}</div>
                            <div class="text-sm text-white/70 uppercase tracking-widest font-bold">{stat.label}</div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>
