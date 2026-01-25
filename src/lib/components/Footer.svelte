<script lang="ts">
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
</script>

<footer
    class="bg-bg-footer border-t border-border-color/20 py-24 transition-colors duration-500 overflow-hidden relative"
>
    <!-- Background Decoration -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div
            class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent blur-[120px] rounded-full"
        ></div>
    </div>
    <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-16">
            <div class="col-span-1 md:col-span-1">
                <h3 class="text-white font-black text-2xl mb-6 tracking-tight">
                    HEINZE<span class="text-accent">MEDIA</span>
                </h3>
                <p class="text-sm text-white/70 leading-relaxed mb-8 max-w-xs">
                    Ihr Partner für immersive 3D-Web-Erlebnisse,
                    Metaverse-Lösungen und XR-Studios der nächsten Generation.
                </p>
                <ThemeSwitcher />
            </div>

            <div>
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-8"
                >
                    Service Areas
                </h4>
                <ul class="space-y-4 text-sm font-medium">
                    <li>
                        <a
                            href="/xr-studio"
                            class="!text-white hover:text-white transition-colors flex items-center gap-2"
                        >
                            <span class="w-1.5 h-1.5 rounded-full bg-accent"
                            ></span>
                            XR Studio Pro
                        </a>
                    </li>
                    <li>
                        <a
                            href="/metaverse"
                            class="!text-white hover:text-white transition-colors flex items-center gap-2"
                        >
                            <span class="w-1.5 h-1.5 rounded-full bg-accent"
                            ></span>
                            Metaverse Worlds
                        </a>
                    </li>
                    <li>
                        <a
                            href="/solutions"
                            class="!text-white hover:text-white transition-colors flex items-center gap-2"
                        >
                            <span class="w-1.5 h-1.5 rounded-full bg-accent"
                            ></span>
                            Consulting
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-8"
                >
                    Corporate
                </h4>
                <ul class="space-y-4 text-sm font-medium">
                    <li>
                        <a
                            href="/about"
                            class="!text-white hover:text-white transition-colors"
                            >Über uns</a
                        >
                    </li>
                    <li>
                        <a
                            href="/work"
                            class="!text-white hover:text-white transition-colors"
                            >Portfolio</a
                        >
                    </li>
                    <li>
                        <a
                            href="/blog"
                            class="!text-white hover:text-white transition-colors"
                            >News & Insights</a
                        >
                    </li>
                    <li>
                        <a
                            href="/sitemap"
                            class="!text-white hover:text-white transition-colors"
                            >Sitemap</a
                        >
                    </li>
                </ul>
            </div>

            <div>
                <h4
                    class="text-white font-bold uppercase tracking-widest text-xs mb-8"
                >
                    Legal
                </h4>
                <ul class="space-y-4 text-sm font-medium">
                    <li>
                        <a
                            href="/imprint"
                            class="!text-white hover:text-white transition-colors"
                            >Impressum</a
                        >
                    </li>
                    <li>
                        <a
                            href="/privacy-policy"
                            class="!text-white hover:text-white transition-colors"
                            >Datenschutz</a
                        >
                    </li>
                    <li>
                        <a
                            href="/terms-and-conditions"
                            class="!text-white hover:text-white transition-colors"
                            >AGB</a
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div class="mt-20 pt-10 border-t border-white/10 text-center">
            <p
                class="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black"
            >
                © {new Date().getFullYear()} HEINZE MEDIA GLOBAL. ALL SYSTEMS GO.
            </p>
        </div>
    </div>
</footer>
