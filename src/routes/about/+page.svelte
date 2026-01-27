<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import type { SEOConfig } from "$lib/seo/schema";
    import ThreeBackground from "$lib/components/ThreeBackground.svelte";
    import { onMount } from "svelte";

    let { data } = $props();

    interface Props {
        seoConfig?: SEOConfig;
    }

    let journeySection: HTMLElement;
    let sectionProgress = $state(0);

    onMount(() => {
        const handleScroll = () => {
            if (!journeySection) return;

            const rect = journeySection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Berechne Progress basierend auf Section-Position im Viewport
            // 0 = Section-Top trifft Viewport-Bottom
            // 1 = Section-Bottom verlässt Viewport-Top
            const sectionHeight = rect.height;
            const scrollRange = windowHeight + sectionHeight;
            const scrolled = windowHeight - rect.top;

            sectionProgress = Math.max(0, Math.min(1, scrolled / scrollRange));
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener("scroll", handleScroll);
    });

    let seoConfig: SEOConfig = {
        title: "About Patrick Heinze - XR Strategist & Metaverse Architect",
        description:
            "From merchant to marketer to XR specialist. Learn how Patrick Heinze builds independent digital galaxies for companies using 3D, AI, and decentralized technologies.",
        keywords: [
            "About",
            "XR Specialist",
            "Metaverse",
            "3D Web",
            "Mr. Metaverse",
            "GameLogic",
            "Enterprise Platform",
        ],
        url: "https://heinze.media/about",
        type: "website",
        image: "https://heinze.media/og-about.png",
        author: "Patrick Heinze",
    };

    // Milestone data for timeline
    const milestones = [
        {
            year: "2000-2004",
            title: "Foundation",
            desc: "Management Assistant in IT-Systems",
            icon: "💼",
        },
        {
            year: "2009",
            title: "First 3D Game",
            desc: "Educational game with Blender",
            icon: "🎮",
        },
        {
            year: "2011-2012",
            title: "Computer Science",
            desc: "Studies & Certification",
            icon: "🎓",
        },
        {
            year: "2018",
            title: "Marketing Expert",
            desc: "Certified Online Marketing Manager",
            icon: "📊",
        },
        {
            year: "2022",
            title: "Platform Partner",
            desc: "Strategic collaboration with Mr. Metaverse",
            icon: "🤝",
        },
        {
            year: "2026",
            title: "Today",
            desc: "Building Digital Galaxies",
            icon: "🌌",
        },
    ];

    const techStack = [
        {
            name: "Mr. Metaverse",
            category: "Platform",
            desc: "Enterprise Edition",
        },
        {
            name: "Blender",
            category: "3D Creation",
            desc: "GameLogic Development",
        },
        {
            name: "Google Cloud",
            category: "AI/ML",
            desc: "Firebase & Cloud Services",
        },
        {
            name: "HuggingFace",
            category: "AI",
            desc: "Machine Learning Integration",
        },
    ];
</script>

<SEOHead
    title={seoConfig.title}
    description={seoConfig.description}
    ogImage={seoConfig.image}
/>

<svelte:head>
    <title>{seoConfig.title}</title>
</svelte:head>

<!-- HERO: Personal Introduction with Portrait -->
<header
    class="pt-40 pb-20 md:pt-56 md:pb-32 section-white overflow-hidden relative"
>
    <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-accent)_0%,transparent_50%)]"
        ></div>
        <div
            class="absolute inset-0 bg-[url('/assets/bg.svg')] bg-[length:100vw] bg-center bg-no-repeat"
        ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <!-- Left: Portrait Image -->
            <div class="relative group order-2 lg:order-1">
                <div
                    class="absolute -inset-8 bg-accent/20 rounded-[40px] blur-3xl group-hover:bg-accent/30 transition-all duration-700"
                ></div>
                <div class="relative overflow-hidden rounded-[32px]">
                    <picture>
                        <source
                            srcset="/images/about/patrick-heinze-portrait.webp"
                            type="image/webp"
                        />
                        <img
                            src="/images/about/patrick-heinze-portrait.jpg"
                            alt="Patrick Heinze - XR Strategist, Metaverse Architect, and GameLogic Developer specializing in 3D interactive worlds and enterprise XR platforms"
                            class="relative shadow-2xl border-4 border-white/20 object-cover aspect-[3/4] w-full grayscale hover:grayscale-0 transition-all duration-500 rounded-[32px]"
                            width="800"
                            height="1066"
                            loading="eager"
                        />
                    </picture>
                    <!-- Theme-Colored Overlay -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-700 rounded-[32px] z-10"
                    ></div>
                    <!-- Floating Badge -->
                    <div
                        class="absolute -bottom-6 -right-6 bg-accent text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-sm uppercase tracking-widest z-20"
                    >
                        Est. 2000
                    </div>
                </div>
            </div>

            <!-- Right: Text Content -->
            <div class="text-left order-1 lg:order-2">
                <span
                    class="text-accent font-black tracking-widest uppercase text-xs mb-6 block"
                    >About Patrick Heinze</span
                >
                <h1
                    class="text-5xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tighter leading-none mb-8"
                >
                    Building Your
                    <span class="text-accent block">Digital Galaxy</span>
                </h1>
                <p
                    class="text-xl md:text-2xl text-text-muted leading-relaxed mb-12"
                >
                    From merchant to marketer to XR specialist. I don't just
                    build 3D spaces—I create
                    <span class="text-accent font-bold">interactive worlds</span
                    > that drive measurable business results.
                </p>
                <div class="flex flex-wrap gap-6">
                    <a href="/contact" class="btn-primary">
                        LET'S TALK
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path d="M5 12h14m-7-7 7 7-7 7" /></svg
                        >
                    </a>
                    <a href="/work" class="btn-secondary">VIEW PORTFOLIO</a>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- SECTION 1: Mission Statement -->
<section class="py-24 md:py-40 section-alt">
    <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto text-center">
            <span
                class="text-accent font-black tracking-widest uppercase text-xs mb-6 block"
                >My Mission</span
            >
            <h2
                class="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-12 leading-tight tracking-tight"
            >
                The Next Generation <span class="text-accent">Web</span>
            </h2>
            <div class="prose-brand text-lg md:text-xl">
                <p class="leading-relaxed">
                    I am convinced that the future of digital interaction lies
                    not in flat websites, but in <span
                        class="text-accent font-bold"
                        >three-dimensional, decentralized worlds</span
                    >. My mission is to provide companies and creators with the
                    tools to build their own independent galaxy on the
                    internet—interactive, brand-compliant, and tailored exactly
                    to their business goals.
                </p>
            </div>

            <!-- Key Benefits Grid -->
            <div class="grid md:grid-cols-3 gap-8 mt-16">
                <div
                    class="p-8 bg-bg-surface border border-border-color/10 rounded-2xl hover:shadow-2xl transition-all"
                >
                    <div class="text-accent text-5xl font-black mb-4">3D</div>
                    <div
                        class="text-sm font-bold uppercase tracking-widest text-text-muted"
                    >
                        Interactive Worlds
                    </div>
                </div>
                <div
                    class="p-8 bg-bg-surface border border-border-color/10 rounded-2xl hover:shadow-2xl transition-all"
                >
                    <div class="text-accent text-5xl font-black mb-4">∞</div>
                    <div
                        class="text-sm font-bold uppercase tracking-widest text-text-muted"
                    >
                        Decentralized
                    </div>
                </div>
                <div
                    class="p-8 bg-bg-surface border border-border-color/10 rounded-2xl hover:shadow-2xl transition-all"
                >
                    <div class="text-accent text-5xl font-black mb-4">★</div>
                    <div
                        class="text-sm font-bold uppercase tracking-widest text-text-muted"
                    >
                        Brand-Compliant
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SECTION 2: Journey Timeline -->
<section
    bind:this={journeySection}
    class="min-h-[400vh] section-white relative"
>
    <!-- Three.js Background (Sticky) -->
    <div class="sticky top-0 h-screen w-full opacity-30 pointer-events-none">
        <ThreeBackground bind:scrollProgress={sectionProgress} />
    </div>

    <div
        class="container mx-auto px-6 relative z-10 -mt-[100vh] py-24 md:py-32"
    >
        <div
            class="max-w-6xl mx-auto transition-opacity duration-1000"
            style="opacity: {Math.max(
                0,
                Math.min(1, 1 - (sectionProgress - 0.5) / 0.2),
            )}"
        >
            <div class="text-center mb-20">
                <span
                    class="text-accent font-black tracking-widest uppercase text-xs mb-6 block"
                    >My Journey</span
                >
                <h2
                    class="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-8 leading-tight tracking-tight"
                >
                    From Vision to <span class="text-accent"
                        >Strategic Implementation</span
                    >
                </h2>
                <p
                    class="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
                >
                    This conviction is the result of a long journey that began
                    with commercial foundations and evolved through creative
                    exploration into strategic XR implementation.
                </p>
            </div>

            <!-- Timeline -->
            <div class="relative">
                <!-- Center Line -->
                <div
                    class="absolute left-1/2 top-0 bottom-0 w-1 bg-accent/20 hidden lg:block"
                ></div>

                <!-- Milestones -->
                <div class="space-y-12">
                    {#each milestones as milestone, i}
                        <div
                            class="relative grid lg:grid-cols-2 gap-8 items-center"
                            class:lg:flex-row-reverse={i % 2 === 1}
                        >
                            {#if i % 2 === 0}
                                <!-- Left Content -->
                                <div class="lg:text-right lg:pr-16">
                                    <div class="inline-block lg:block">
                                        <div
                                            class="text-accent font-black text-4xl mb-2"
                                        >
                                            {milestone.icon}
                                        </div>
                                        <div
                                            class="text-2xl font-black text-text-main mb-2"
                                        >
                                            {milestone.title}
                                        </div>
                                        <div
                                            class="text-sm text-accent font-bold uppercase tracking-widest mb-3"
                                        >
                                            {milestone.year}
                                        </div>
                                        <p class="text-text-muted">
                                            {milestone.desc}
                                        </p>
                                    </div>
                                </div>

                                <!-- Center Dot -->
                                <div
                                    class="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-bg-body hidden lg:block z-10"
                                ></div>

                                <!-- Right Empty -->
                                <div class="hidden lg:block"></div>
                            {:else}
                                <!-- Left Empty -->
                                <div class="hidden lg:block"></div>

                                <!-- Center Dot -->
                                <div
                                    class="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-bg-body hidden lg:block z-10"
                                ></div>

                                <!-- Right Content -->
                                <div class="lg:pl-16">
                                    <div class="inline-block lg:block">
                                        <div
                                            class="text-accent font-black text-4xl mb-2"
                                        >
                                            {milestone.icon}
                                        </div>
                                        <div
                                            class="text-2xl font-black text-text-main mb-2"
                                        >
                                            {milestone.title}
                                        </div>
                                        <div
                                            class="text-sm text-accent font-bold uppercase tracking-widest mb-3"
                                        >
                                            {milestone.year}
                                        </div>
                                        <p class="text-text-muted">
                                            {milestone.desc}
                                        </p>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Key Insight Box -->
            <div
                class="mt-20 p-12 bg-accent/10 border-l-4 border-accent rounded-2xl"
            >
                <p class="text-xl text-text-main leading-relaxed">
                    <span class="font-black"
                        >"The decisive turning point came in 2022</span
                    >
                    when I met the developer Mr. Metaverse. He was beginning to develop
                    a revolutionary platform, and I immediately recognized the potential.
                    From the very beginning, I helped refine the platform and contributed
                    my perspective. This unique journey from merchant to marketer
                    to XR specialist is your greatest advantage today:
                    <span class="text-accent font-bold"
                        >I am not just a developer, but your strategic partner</span
                    >
                    who understands your vision and translates it into measurable
                    success."
                </p>
            </div>
        </div>

        <!-- PHASE 3: Expertise Content (erscheint ab 45% Scroll) -->
        <div
            class="max-w-6xl mx-auto mt-[100vh] transition-opacity duration-1000"
            style="opacity: {Math.max(0, (sectionProgress - 0.45) / 0.15)}"
        >
            <div class="text-center mb-20">
                <span
                    class="text-accent font-black tracking-widest uppercase text-xs mb-6 block"
                    >Expertise & Technology</span
                >
                <h2
                    class="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-8 leading-tight tracking-tight"
                >
                    Powered by <span class="text-accent">Enterprise-Grade</span>
                    Technology
                </h2>
            </div>

            <!-- Tech Stack Grid -->
            <div class="grid md:grid-cols-2 gap-6">
                {#each techStack as tech}
                    <div
                        class="p-8 bg-bg-surface/80 backdrop-blur border border-border-color/10 rounded-2xl hover:shadow-2xl hover:border-accent/50 transition-all group"
                    >
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-2xl font-black text-text-main">
                                {tech.name}
                            </h3>
                            <span
                                class="text-xs uppercase font-bold tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full"
                            >
                                {tech.category}
                            </span>
                        </div>
                        <p class="text-text-muted">{tech.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- SECTION 3: Platform Comparison (vorher Expertise) -->
<section class="py-24 md:py-40 section-alt">
    <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <!-- Left: Content -->
            <div>
                <span
                    class="text-accent font-black tracking-widest uppercase text-xs mb-6 block"
                    >Expertise & Technology</span
                >
                <h2
                    class="text-4xl md:text-5xl font-black text-text-main mb-8 leading-tight tracking-tight"
                >
                    Powered by <span class="text-accent">Enterprise-Grade</span>
                    Technology
                </h2>
                <div class="prose-brand space-y-6">
                    <p class="text-lg leading-relaxed">
                        To implement your vision stably and efficiently, I rely
                        on the powerful
                        <span class="font-bold text-accent"
                            >Mr. Metaverse platform</span
                        >. Instead of reinventing the wheel, I use a proven
                        Enterprise Edition.
                    </p>
                    <p class="text-lg leading-relaxed">
                        <span class="font-bold"
                            >The decisive advantage for you:</span
                        > You own and control your own platform, rather than renting
                        a world from providers like Spatial or Roblox.
                    </p>
                    <p class="text-lg leading-relaxed">
                        My passion is <span class="font-bold text-accent"
                            >"GameLogic"</span
                        >: I don't just build beautiful 3D spaces; using my
                        experience with Blender and intelligent interactions, I
                        create captivating experiences that retain customers.
                    </p>
                    <p class="text-lg leading-relaxed">
                        To make these worlds future-proof, I also integrate AI
                        and Machine Learning technologies from Google Cloud,
                        Firebase, and HuggingFace.
                    </p>
                </div>
            </div>

            <!-- Right: Tech Stack Grid -->
            <div class="space-y-6">
                {#each techStack as tech}
                    <div
                        class="p-8 bg-bg-surface border border-border-color/10 rounded-2xl hover:shadow-2xl hover:border-accent/50 transition-all group"
                    >
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-2xl font-black text-text-main">
                                {tech.name}
                            </h3>
                            <span
                                class="text-xs uppercase font-bold tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full"
                            >
                                {tech.category}
                            </span>
                        </div>
                        <p class="text-text-muted">{tech.desc}</p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Platform Comparison -->
        <div class="mt-20 max-w-5xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Rented Platforms -->
                <div
                    class="p-10 bg-red-500/10 border-2 border-red-500/30 rounded-2xl"
                >
                    <div class="text-red-500 text-5xl mb-4">⚠️</div>
                    <h3 class="text-2xl font-black text-text-main mb-4">
                        Rented Platforms
                    </h3>
                    <ul class="space-y-3 text-text-muted">
                        <li class="flex items-start gap-3">
                            <span class="text-red-500 font-black">✗</span>
                            <span>Limited control & customization</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-red-500 font-black">✗</span>
                            <span>Monthly fees & platform dependency</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-red-500 font-black">✗</span>
                            <span>Generic branding & experiences</span>
                        </li>
                    </ul>
                </div>

                <!-- Your Own Platform -->
                <div
                    class="p-10 bg-accent/10 border-2 border-accent rounded-2xl"
                >
                    <div class="text-accent text-5xl mb-4">✓</div>
                    <h3 class="text-2xl font-black text-text-main mb-4">
                        Your Own Platform
                    </h3>
                    <ul class="space-y-3 text-text-muted">
                        <li class="flex items-start gap-3">
                            <span class="text-accent font-black">✓</span>
                            <span>Full ownership & control</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-accent font-black">✓</span>
                            <span>One-time investment, no monthly fees</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-accent font-black">✓</span>
                            <span>100% brand-compliant & customized</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SECTION 4: Visual Showcase (placeholder for additional images) -->
<section class="py-24 md:py-40 section-white">
    <div class="container mx-auto px-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Image 1: Workspace/Studio -->
                <div class="relative group">
                    <div
                        class="absolute -inset-4 bg-accent/10 rounded-[32px] blur-2xl group-hover:bg-accent/20 transition-all"
                    ></div>
                    <img
                        src="/images/about/workspace.jpg"
                        alt="XR Development Workspace"
                        class="relative rounded-[24px] shadow-2xl border border-white/10 object-cover aspect-[4/3] w-full"
                        width="800"
                        height="600"
                        loading="lazy"
                    />
                    <div
                        class="absolute bottom-6 left-6 bg-bg-surface/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10"
                    >
                        <div class="text-sm font-bold text-accent">
                            Development Studio
                        </div>
                        <div class="text-xs text-text-muted">
                            Where magic happens
                        </div>
                    </div>
                </div>

                <!-- Image 2: 3D Project/Screenshot -->
                <div class="relative group">
                    <div
                        class="absolute -inset-4 bg-accent/10 rounded-[32px] blur-2xl group-hover:bg-accent/20 transition-all"
                    ></div>
                    <img
                        src="/images/about/3d-project.jpg"
                        alt="3D Interactive Project"
                        class="relative rounded-[24px] shadow-2xl border border-white/10 object-cover aspect-[4/3] w-full"
                        width="800"
                        height="600"
                        loading="lazy"
                    />
                    <div
                        class="absolute bottom-6 left-6 bg-bg-surface/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10"
                    >
                        <div class="text-sm font-bold text-accent">
                            3D GameLogic
                        </div>
                        <div class="text-xs text-text-muted">
                            Interactive experiences
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA: Let's Build Your Galaxy -->
<section class="py-24 md:py-40 bg-bg-footer relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div
            class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        ></div>
        <div
            class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        ></div>
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,transparent_70%)]"
        ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="max-w-4xl mx-auto">
            <span
                class="text-accent font-black tracking-widest uppercase text-xs mb-6 block"
                >Ready to Start?</span
            >
            <h2
                class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-8"
            >
                Let's Build Your <span class="text-accent">Galaxy</span>
            </h2>
            <p class="text-xl text-white/80 mb-12 leading-relaxed">
                If you are ready to transform your digital presence from a
                passive website into an explorable, interactive world that
                delights your customers, let's talk.
            </p>
            <div class="flex flex-wrap justify-center gap-6">
                <a href="/contact" class="btn-primary text-lg px-8 py-4">
                    START YOUR PROJECT
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path d="M5 12h14m-7-7 7 7-7 7" /></svg
                    >
                </a>
                <a
                    href="/work"
                    class="btn-secondary !text-white hover:!text-accent text-lg px-8 py-4"
                    >VIEW CASE STUDIES</a
                >
            </div>

            <!-- Stats -->
            <div
                class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-white/10"
            >
                <div>
                    <div
                        class="text-4xl md:text-5xl font-black text-accent mb-2"
                    >
                        26+
                    </div>
                    <div
                        class="text-sm text-white/70 uppercase tracking-widest font-bold"
                    >
                        Years Experience
                    </div>
                </div>
                <div>
                    <div
                        class="text-4xl md:text-5xl font-black text-accent mb-2"
                    >
                        100+
                    </div>
                    <div
                        class="text-sm text-white/70 uppercase tracking-widest font-bold"
                    >
                        Projects Delivered
                    </div>
                </div>
                <div>
                    <div
                        class="text-4xl md:text-5xl font-black text-accent mb-2"
                    >
                        ∞
                    </div>
                    <div
                        class="text-sm text-white/70 uppercase tracking-widest font-bold"
                    >
                        Possibilities
                    </div>
                </div>
                <div>
                    <div
                        class="text-4xl md:text-5xl font-black text-accent mb-2"
                    >
                        1
                    </div>
                    <div
                        class="text-sm text-white/70 uppercase tracking-widest font-bold"
                    >
                        Passionate Expert
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
