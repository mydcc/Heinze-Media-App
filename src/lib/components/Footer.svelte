<script lang="ts">
    import { page } from "$app/stores";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
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

    const socialLinks = [
        {
            name: "Twitter",
            href: "https://twitter.com/HeinzeMedia",
            path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        },
        {
            name: "GitHub",
            href: "https://github.com/heinze-media",
            path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/company/heinze-media",
            path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        },
        {
            name: "Discord",
            href: "https://discord.gg/heinzemedia",
            path: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.772-.6083 1.1588a18.2915 18.2915 0 00-5.4882 0 12.649 12.649 0 00-.6173-1.1588.0776.0776 0 00-.0793-.0376 19.7363 19.7363 0 00-4.8859 1.5152.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"
        }
    ];
</script>

{#key $page.url}
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
        <!-- Main Grid: 6 Columns to match original design -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

            <!-- Brand Column (Spans 2 columns) -->
            <div class="lg:col-span-2">
                <a
                    href="/"
                    class="text-3xl font-black tracking-tight text-white mb-6 block group"
                >
                    <span class="group-hover:text-accent transition-colors"
                        >HEINZE</span
                    ><span class="text-white/50">MEDIA</span>
                </a>
                <p class="text-text-muted text-sm leading-relaxed mb-6 max-w-sm">
                    {m.footer_description()}
                </p>
                <div class="flex gap-4">
                    {#each socialLinks as social}
                        <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all hover:scale-110"
                            aria-label={social.name}
                        >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d={social.path} />
                            </svg>
                        </a>
                    {/each}
                    </div>
                    <ul class="mt-8 space-y-3">
                    <li>
                        <a
                            href="/services"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Web Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="/metaverse"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Metaverse
                        </a>
                    </li>
                    <li>
                        <a
                            href="/offer/special-deal"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            <span>Special Offers</span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Links Columns (Each spans 1 column) -->
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

            <!-- Column 4: Resources -->
            <div>
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-6 pb-3 border-b border-accent/30"
                >
                    {m.footer_resources()}
                </h4>
                <ul class="space-y-3 text-sm">
                    <li>
                        <a
                            href={i18n.resolveRoute("/brand-guidelines")}
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Brand Assets
                        </a>
                    </li>
                    <li>
                        <a
                            href={i18n.resolveRoute("/corporate-design")}
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            <span>Design Manual</span>
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
                            href={i18n.resolveRoute("/corporate-design")}
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Design Guide
                        </a>
                    </li>
                    <li>
                        <a
                            href={i18n.resolveRoute("/imprint")}
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Impressum
                        </a>
                    </li>
                    <li>
                        <a
                            href={i18n.resolveRoute("/privacy-policy")}
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Datenschutz
                        </a>
                    </li>
                    <li>
                        <a
                            href={i18n.resolveRoute("/terms-and-conditions")}
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            AGB
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
                        🔐 Dev Tools
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
                            Quick Reference
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
                            CMS Guide
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
                        All Rights Reserved. Made in Berlin, Germany 🇩🇪
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
                        Stay Updated
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
                    v2.0 Beta • Powered by Svelte 5 + Tailwind v4 • Secured
                </p>
            </div>
        </div>
    </div>
</footer>
{/key}
