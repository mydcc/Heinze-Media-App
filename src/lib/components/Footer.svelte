<script lang="ts">
    import { adminState } from "$lib/state/admin.svelte";
    import * as m from "$lib/paraglide/messages.js";
    import { i18n } from "$lib/i18n";

    // Footer Links - Centralized configuration for easier maintenance
    const footerLinks = [
        {
            title: m.footer_products(),
            links: [
                { label: "Metaverse Platform", href: "/products" },
                { label: "XR Studio", href: "/xr-studio" },
                { label: "Asset Pipeline", href: "/products#pipeline" },
                { label: "Virtual Events", href: "/products#events" },
            ],
        },
        {
            title: m.footer_solutions(),
            links: [
                { label: "E-Commerce 3D", href: "/solutions#ecommerce" },
                { label: "Education & Training", href: "/solutions#edu" },
                { label: "Marketing & Brand", href: "/solutions#marketing" },
                { label: "Real Estate VR", href: "/solutions#realestate" },
            ],
        },
        {
            title: m.footer_resources(),
            links: [
                { label: "Blog & News", href: "/blog" },
                { label: "Case Studies", href: "/work" },
                { label: "Whitepapers", href: "/resources" },
                { label: "Documentation", href: "/docs" },
            ],
        },
        {
            title: m.footer_company(),
            links: [
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Partners", href: "/partners" },
                { label: "Contact", href: "/contact" },
            ],
        },
    ];
</script>

<footer class="bg-bg-footer border-t border-white/10 relative overflow-hidden">
    <!-- Background Elements -->
    <div
        class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
    ></div>
    <div
        class="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
        class="absolute bottom-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none"
    ></div>

    <div class="container mx-auto px-6 py-20 relative z-10">
        <!-- Top Section: Logo & Description -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            <div class="lg:col-span-1">
                <a
                    href="/"
                    class="text-3xl font-black tracking-tight text-white mb-6 block group"
                >
                    <span class="group-hover:text-accent transition-colors"
                        >HEINZE</span
                    ><span class="text-white/50">MEDIA</span>
                </a>
                <p class="text-text-muted text-sm leading-relaxed mb-6">
                    {m.footer_description()}
                </p>
                <div class="flex gap-4">
                    <!-- Social Icons (Placeholder) -->
                    {#each ["twitter", "github", "linkedin", "discord"] as social}
                        <a
                            href="https://{social}.com"
                            target="_blank"
                            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all hover:scale-110"
                            aria-label={social}
                        >
                            <span class="capitalize text-[10px]">{social[0]}</span
                            >
                        </a>
                    {/each}
                </div>
            </div>

            <!-- Links Columns -->
            <div class="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
                {#each footerLinks as column}
                    <div>
                        <h4
                            class="text-white font-bold uppercase tracking-widest text-xs mb-6 pb-3 border-b border-accent/30"
                        >
                            {column.title}
                        </h4>
                        <ul class="space-y-3 text-sm">
                            {#each column.links as link}
                                <li>
                                    <a
                                        href={i18n.resolveRoute(link.href)}
                                        class="footer-link inline-flex items-center gap-2"
                                    >
                                        <span
                                            class="footer-dot w-1 h-1 rounded-full"
                                        ></span>
                                        {link.label}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Additional Resources Row -->
        <div
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 py-10 border-t border-white/5"
        >
            <!-- Column 5: Brand Resources -->
            <div class="md:col-start-3 lg:col-start-5">
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-6 pb-3 border-b border-accent/30"
                >
                    {m.footer_resources()}
                </h4>
                <ul class="space-y-3 text-sm">
                    <li>
                        <a
                            href="/brand-guidelines"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            {m.footer_brand_assets()}
                        </a>
                    </li>
                    <li>
                        <a
                            href="/corporate-design"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            <span>{m.footer_design_manual()}</span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Column 6: Documentation & Legal -->
            <div>
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-6 pb-3 border-b border-accent/30"
                >
                    {m.footer_legal()}
                </h4>
                <ul class="space-y-3 text-sm">
                    <li>
                        <a
                            href="/corporate-design"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            {m.footer_design_guide()}
                        </a>
                    </li>
                    <li>
                        <a
                            href="/imprint"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            {m.footer_imprint()}
                        </a>
                    </li>
                    <li>
                        <a
                            href="/privacy-policy"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            {m.footer_privacy()}
                        </a>
                    </li>
                    <li>
                        <a
                            href="/terms-and-conditions"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            {m.footer_terms()}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        {#if adminState.isAdmin}
            <!-- Admin-Only Dev Resources Links -->
            <div class="mt-16 pt-8 border-t border-accent/20">
                <div class="flex items-center justify-center gap-2 mb-6">
                    <span class="w-2 h-2 rounded-full bg-accent animate-pulse"
                    ></span>
                    <h4
                        class="text-accent font-bold uppercase tracking-widest text-xs"
                    >
                        🔐 {m.footer_dev_tools()}
                    </h4>
                    <span class="w-2 h-2 rounded-full bg-accent animate-pulse"
                    ></span>
                </div>
                <ul
                    class="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-medium"
                >
                    <li>
                        <a
                            href="/devdocs/QUICK_REFERENCE"
                            target="_blank"
                            class="text-accent/80 hover:text-accent transition-colors flex items-center gap-2"
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            {m.footer_quick_ref()}
                        </a>
                    </li>

                    <li>
                        <a
                            href="/guide"
                            class="text-accent/80 hover:text-accent transition-colors flex items-center gap-2"
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            {m.footer_cms_guide()}
                        </a>
                    </li>
                </ul>
            </div>
        {/if}

        <!-- Footer Bottom: Copyright + Certifications/Trust Badges -->
        <div class="mt-20 pt-12 border-t border-white/10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <!-- Left: Copyright -->
                <div>
                    <p
                        class="text-[11px] text-white/40 uppercase tracking-[0.15em] font-semibold"
                    >
                        © {new Date().getFullYear()} HEINZE MEDIA
                    </p>
                    <p class="text-[10px] text-white/30 mt-2">
                        {m.footer_all_rights()} {m.footer_made_in()}
                    </p>
                </div>

                <!-- Center: Trust Badges / Certifications (Placeholder) -->
                <div class="flex justify-center gap-6 items-center">
                    <div class="text-center">
                        <p
                            class="text-[9px] text-white/40 uppercase tracking-widest mb-1"
                        >
                            DSGVO
                        </p>
                        <div
                            class="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center text-xs text-accent/60"
                        >
                            ✓
                        </div>
                    </div>
                    <div class="text-center">
                        <p
                            class="text-[9px] text-white/40 uppercase tracking-widest mb-1"
                        >
                            ISO
                        </p>
                        <div
                            class="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center text-xs text-accent/60"
                        >
                            ✓
                        </div>
                    </div>
                    <div class="text-center">
                        <p
                            class="text-[9px] text-white/40 uppercase tracking-widest mb-1"
                        >
                            A11y
                        </p>
                        <div
                            class="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center text-xs text-accent/60"
                        >
                            ✓
                        </div>
                    </div>
                </div>

                <!-- Right: Newsletter CTA (SEO Bonus) -->
                <div class="text-right">
                    <p
                        class="text-[11px] text-white/40 uppercase tracking-[0.15em] font-semibold mb-3"
                    >
                        {m.footer_stay_updated()}
                    </p>
                    <a
                        href="#newsletter"
                        class="text-accent text-sm font-semibold hover:text-accent/80 transition-colors inline-flex items-center gap-2"
                    >
                        {m.footer_cta_label()}
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Final Bottom: Version / Status -->
            <div class="pt-8 border-t border-white/5 text-center">
                <p class="text-[9px] text-white/20 uppercase tracking-[0.2em]">
                    {m.footer_version()}
                </p>
            </div>
        </div>
    </div>
</footer>
