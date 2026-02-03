<script lang="ts">
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
    import * as m from "$lib/paraglide/messages.js";
    import { i18n } from "$lib/i18n";
    // Svelte 5 Runes: direkt im <script> verwenden, nicht importieren
    import { adminState } from "$lib/state/admin.svelte";
</script>

<footer
    class="footer-dark bg-gradient-to-b from-bg-footer via-bg-footer to-bg-footer/95 border-t border-border-color/20 py-24 transition-colors duration-500 overflow-hidden relative"
>
    <!-- Background Decoration -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div
            class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent blur-[120px] rounded-full"
        ></div>
    </div>
    <div class="container mx-auto px-6">
        <!-- Main Footer Grid: 6 columns -->
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 md:gap-8 mb-16"
        >
            <!-- Column 1: Brand + Social Media -->
            <div class="lg:col-span-2">
                <h3 class="text-white font-black text-2xl mb-3 tracking-tight">
                    HEINZE<span class="text-accent">MEDIA</span>
                </h3>
                <p
                    class="text-xs text-text-muted uppercase tracking-widest mb-4 font-semibold"
                >
                    {m.footer_tagline()}
                </p>
                <p class="text-sm text-text-main leading-relaxed mb-8 max-w-xs">
                    {m.footer_description()}
                </p>

                <!-- Social Media Icons -->
                <div class="flex gap-4 mb-6">
                    <a
                        href="https://linkedin.com/in/pheinze"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-9 h-9 rounded-full bg-white/10 hover:bg-accent/20 transition-colors flex items-center justify-center text-white hover:text-accent"
                        aria-label="LinkedIn"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.292-1.194-2.292-1.195 0-1.38.932-1.38 1.893v4.577H8.368V7.5h2.577v1.002h.037c.36-.68 1.237-1.395 2.546-1.395 2.717 0 3.217 1.787 3.217 4.111v5.52zM3.421 6.378a1.392 1.392 0 11.851-1.393c0 .77-.611 1.393-1.851 1.393zm1.326 9.96h-2.65V7.5h2.65v8.838zM17.865 2.5H2.135C1.135 2.5.5 3.116.5 4.154v11.692c0 1.038.635 1.654 1.635 1.654h15.73c1 0 1.635-.616 1.635-1.654V4.154c0-1.038-.635-1.654-1.635-1.654z"
                            />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/mydcc"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-9 h-9 rounded-full bg-white/10 hover:bg-accent/20 transition-colors flex items-center justify-center text-white hover:text-accent"
                        aria-label="GitHub"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817a9.568 9.568 0 012.5.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.194 20 14.44 20 10.017 20 4.484 15.522 0 10 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </a>
                </div>

                <!-- Theme Switcher -->
                <div class="flex flex-col gap-6 mt-8">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </div>

            <!-- Column 2: Products & Services -->
            <div>
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-6 pb-3 border-b border-accent/30"
                >
                    {m.footer_products()}
                </h4>
                <ul class="space-y-3 text-sm">
                    <li>
                        <a
                            href="/services/xr-studio"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            XR Studio Pro
                        </a>
                    </li>
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

            <!-- Column 3: Solutions -->
            <div>
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-6 pb-3 border-b border-accent/30"
                >
                    {m.footer_solutions()}
                </h4>
                <ul class="space-y-3 text-sm">
                    <li>
                        <a
                            href="/solutions"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Consulting
                        </a>
                    </li>
                    <li>
                        <a
                            href="/solutions#enterprise"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Enterprise
                        </a>
                    </li>
                    <li>
                        <a
                            href="/solutions#startup"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            For Startups
                        </a>
                    </li>
                    <li>
                        <a
                            href="/offer/free-ebook"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Free eBook
                        </a>
                    </li>
                </ul>
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
                            href="/blog"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Blog & News
                        </a>
                    </li>
                    <li>
                        <a
                            href="/github"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            GitHub‑Projekte
                        </a>
                    </li>
                    <li>
                        <a
                            href="/blog#insights"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Insights
                        </a>
                    </li>
                    <li>
                        <a
                            href="/work"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Case Studies
                        </a>
                    </li>
                    <li>
                        <a
                            href="/sitemap"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Sitemap
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Column 5: Company -->
            <div>
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-6 pb-3 border-b border-accent/30"
                >
                    {m.footer_company()}
                </h4>
                <ul class="space-y-3 text-sm">
                    <li>
                        <a
                            href="/about"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Über uns
                        </a>
                    </li>
                    <li>
                        <a
                            href="/contact"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Kontakt
                        </a>
                    </li>
                    <li>
                        <a
                            href="mailto:jobs@heinze-media.de"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Karriere
                        </a>
                    </li>
                    <li>
                        <a
                            href="/brand-guidelines"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Brand Assets
                        </a>
                    </li>
                    <li>
                        <a
                            href="/corporate-design"
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
                            href="/corporate-design"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Design Guide
                        </a>
                    </li>
                    <li>
                        <a
                            href="/imprint"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Impressum
                        </a>
                    </li>
                    <li>
                        <a
                            href="/privacy-policy"
                            class="footer-link inline-flex items-center gap-2"
                        >
                            <span class="footer-dot w-1 h-1 rounded-full"
                            ></span>
                            Datenschutz
                        </a>
                    </li>
                    <li>
                        <a
                            href="/terms-and-conditions"
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
