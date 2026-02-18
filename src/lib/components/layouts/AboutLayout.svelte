<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import ThreeBackground from "$lib/components/ThreeBackground.svelte";
    import ShowcaseGraphic from "../about/ShowcaseGraphic.svelte";
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
            <div class="order-2 lg:order-1">
                <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span class="text-xs font-black uppercase tracking-[0.2em] text-accent">{hero.badge || "EST. 2000"}</span>
                </div>
                
                <h1 class="text-6xl md:text-8xl lg:text-9xl font-black text-text-main mb-8 tracking-tighter leading-[0.85] uppercase">
                    {hero.titlePrefix || "Play"} <span class="text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent/50">{hero.titleAccent || "Forward"}</span>
                </h1>
                
                <div class="space-y-6 max-w-xl">
                    <p class="text-xl md:text-2xl text-text-muted leading-relaxed font-medium">
                        {hero.tagline || ""}
                    </p>
                    <p class="text-lg text-text-muted/80 leading-relaxed">
                        {hero.description || ""}
                    </p>
                    
                    <div class="flex flex-wrap gap-4 pt-8">
                        <a href={hero.ctaPrimaryLink || "/contact"} class="btn-primary">
                            {hero.ctaPrimaryText || "LET'S TALK"}
                        </a>
                        <a href={hero.ctaSecondaryLink || "/work"} class="btn-secondary">
                            {hero.ctaSecondaryText || "VIEW PORTFOLIO"}
                        </a>
                    </div>
                </div>
            </div>

            <div class="relative group order-1 lg:order-2">
                <div class="absolute -inset-8 bg-accent/20 rounded-[40px] blur-3xl group-hover:bg-accent/30 transition-all duration-700"></div>
                <div class="relative overflow-hidden rounded-[32px] aspect-[4/5] max-h-[70vh] lg:max-h-none">
                    <picture>
                        <source srcset={hero.imageWebp || "/images/about/patrick-heinze-portrait.webp"} type="image/webp" />
                        <img 
                            src={hero.image || "/images/about/patrick-heinze-portrait.jpg"} 
                            alt={hero.imageAlt || "Patrick Heinze"}
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </picture>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- MISSION -->
<section class="py-24 md:py-40 bg-bg-body overflow-hidden">
    <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
            <div class="max-w-3xl">
                <span class="text-accent font-black tracking-widest uppercase text-xs mb-6 block">{mission.tagline || "Mission"}</span>
                <h2 class="text-4xl md:text-5xl lg:text-7xl font-black text-text-main mb-8 leading-tight tracking-tighter">
                    {@html mission.title || "The Next Generation <span class='text-accent'>Web</span>"}
                </h2>
                <p class="text-xl md:text-2xl text-text-muted leading-relaxed">
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
<section bind:this={journeySection} class="min-h-[200vh] bg-bg-body relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-bg-body via-bg-surface/10 to-bg-body transition-colors"></div>
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
                <div class="mt-20 p-12 bg-accent/10 border-l-4 border-accent rounded-2xl relative overflow-hidden group">
                    <div class="absolute -right-10 -bottom-10 opacity-5 text-accent">
                        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01703V15C9.01703 14.3185 9.42629 13.1385 11.4862 11.7295C12.9877 10.7025 14.0538 9.11727 14.4121 7.28693C14.7704 5.45659 14.3813 3.52906 13.2514 2.05244C12.1215 0.575825 10.3644 -0.286961 8.54449 0.0435485C6.72457 0.374058 5.1764 1.54921 4.39803 3.197C3.61966 4.84479 3.63359 6.7025 4.43714 8.232C5.24069 9.7615 6.71158 10.8205 8.4116 11.1685L8.60172 11.2065C7.30172 12.0965 5.01703 14.0965 5.01703 17V21H14.017ZM22.017 21V18C22.017 16.8954 21.1216 16 20.017 16H17.017V15C17.017 14.3185 17.4263 13.1385 19.4862 11.7295C20.9877 10.7025 22.0538 9.11727 22.4121 7.28693C22.7704 5.45659 22.3813 3.52906 21.2514 2.05244C20.1215 0.575825 18.3644 -0.286961 16.5445 0.0435485C14.7246 0.374058 13.1764 1.54921 12.398 3.197C11.6197 4.84479 11.6336 6.7025 12.4371 8.232C13.2407 9.7615 14.7116 10.8205 16.4116 11.1685L16.6017 11.2065C15.3017 12.0965 13.017 14.0965 13.017 17V21H22.017Z" /></svg>
                    </div>
                    <p class="text-xl md:text-2xl text-text-main leading-relaxed relative z-10 italic">
                        {@html metadata.quote}
                    </p>
                </div>
            {/if}
        </div>
    </div>
</section>

<!-- PLATFORM COMPARISON -->
<section class="py-24 md:py-40 relative overflow-hidden bg-bg-body">
    <!-- Ambient Background -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-12 gap-16 items-center max-w-7xl mx-auto mb-24">
            <div class="lg:col-span-12">
                <h2 class="text-4xl md:text-5xl lg:text-7xl font-black text-text-main mb-12 leading-[1.1] tracking-tight text-center">
                    Powered by <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">Enterprise-Grade</span> Technology
                </h2>
            </div>
            
            <div class="lg:col-span-6">
                <div class="prose-brand text-lg text-text-muted leading-relaxed space-y-6">
                    {@html platformComparison.text || ""}
                </div>
            </div>

            <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each techStack as tech}
                    {#if tech}
                        <div class="p-6 bg-bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl hover:bg-bg-surface/60 hover:border-accent/30 transition-all duration-300 group">
                            <div class="mb-4">
                                <span class="text-[10px] uppercase font-bold tracking-widest text-accent/80 mb-2 block">{tech.category || ""}</span>
                                <h3 class="text-xl font-black text-text-main group-hover:text-accent transition-colors">{tech.name || ""}</h3>
                            </div>
                            <p class="text-sm text-text-muted leading-relaxed group-hover:text-text-main/80 transition-colors">{tech.desc || ""}</p>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>

        {#if platformComparison.comparison}
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <!-- Rented Platform Card -->
                    <div class="p-10 rounded-3xl bg-gradient-to-b from-red-500/5 to-transparent border border-red-500/20 hover:border-red-500/40 transition-colors relative group">
                        <div class="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-4 mb-8">
                                <div class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 text-2xl border border-red-500/20 shadow-red-500/20">
                                    ⚠️
                                </div>
                                <h3 class="text-2xl font-black text-white">{platformComparison.comparison.bad.title || "Rented"}</h3>
                            </div>
                            <ul class="space-y-4">
                                {#each platformComparison.comparison.bad.items || [] as item}
                                    <li class="flex items-start gap-4 text-text-muted group-hover:text-text-main transition-colors">
                                        <span class="text-red-500 font-black mt-1">✕</span>
                                        <span>{item}</span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    </div>

                    <!-- Own Platform Card -->
                    <div class="p-10 rounded-3xl bg-gradient-to-b from-accent/5 to-transparent border border-accent/20 hover:border-accent/50 transition-colors relative group shadow-2xl shadow-accent/5">
                        <div class="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-4 mb-8">
                                <div class="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent text-2xl border border-accent/30 shadow-accent/40">
                                    ✓
                                </div>
                                <h3 class="text-2xl font-black text-white">{platformComparison.comparison.good.title || "Your Own"}</h3>
                            </div>
                            <ul class="space-y-4">
                                {#each platformComparison.comparison.good.items || [] as item}
                                    <li class="flex items-start gap-4 text-text-muted group-hover:text-text-main transition-colors">
                                        <div class="min-w-[20px] h-[20px] rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                                            <div class="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</section>

<!-- VISUAL SHOWCASE -->
{#if showcase.length > 0}
<section class="py-16 md:py-24 bg-bg-body border-t border-white/5">
    <div class="container mx-auto px-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12">
                {#each showcase as item, i}
                    <div class="relative group">
                        <!-- Background Glow -->
                        <div class="absolute -inset-4 bg-accent/5 rounded-[40px] blur-3xl group-hover:bg-accent/15 transition-all duration-700"></div>
                        
                        <!-- Content Container -->
                        <div class="relative overflow-hidden rounded-[32px] border border-white/5 bg-bg-surface/30 backdrop-blur-sm aspect-[16/10] group-hover:border-accent/30 transition-all duration-500 shadow-2xl">
                            {#if item.image && item.image.includes('themed')}
                                <ShowcaseGraphic type={item.image.includes('studio') ? 'studio' : 'logic'} />
                            {:else if item.image && !item.image.includes('workspace.jpg') && !item.image.includes('3d-project.jpg')}
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                            {:else}
                                <ShowcaseGraphic type={i === 0 ? 'studio' : 'logic'} />
                            {/if}
                            
                            <!-- Overlay Info -->
                            <div class="absolute bottom-8 left-8 right-8">
                                <div class="bg-bg-body/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 opacity-90 group-hover:opacity-100">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="text-xl font-black text-text-main mb-1">{item.title}</h4>
                                            <p class="text-sm text-text-muted">{item.subtitle}</p>
                                        </div>
                                        <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
<section class="py-32 bg-bg-body relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,transparent_30%)] opacity-5 pointer-events-none"></div>
    <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto bg-bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-16">
            <article class="prose prose-invert max-w-none prose-headings:text-text-main prose-headings:font-black prose-p:text-text-muted prose-p:text-lg prose-p:leading-relaxed prose-strong:text-accent prose-a:text-accent text-center">
                {@render children()}
            </article>
        </div>
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
