<script lang="ts">
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
</script>

<footer class="bg-surface-2 text-text-muted py-12 border-t border-border-color">
    <div class="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
            <h3 class="text-text-main font-bold mb-4">HEINZE MEDIA</h3>
            <p class="text-sm">Metaverse Service Provider Nr. 1</p>
            <div class="mt-6">
                <ThemeSwitcher />
            </div>
        </div>

        <div>
            <h4 class="text-text-main font-bold mb-4">Services</h4>
            <ul class="space-y-2 text-sm">
                <li>
                    <a href="/xr-studio" class="hover:text-accent">XR Studio</a>
                </li>
                <li>
                    <a href="/metaverse" class="hover:text-accent"
                        >Metaverse Solutions</a
                    >
                </li>
                <li>
                    <a href="/solutions" class="hover:text-accent">Consulting</a
                    >
                </li>
            </ul>
        </div>

        <div>
            <h4 class="text-text-main font-bold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
                <li>
                    <a href="/imprint" class="hover:text-accent">Imprint</a>
                </li>
                <li>
                    <a href="/privacy-policy" class="hover:text-accent"
                        >Privacy Policy</a
                    >
                </li>
                <li>
                    <a href="/terms-and-conditions" class="hover:text-accent"
                        >Terms</a
                    >
                </li>
                <li>
                    <a href="/sitemap" class="hover:text-accent opacity-70"
                        >Sitemap</a
                    >
                </li>
            </ul>
        </div>

        <div>
            <h4 class="text-text-main font-bold mb-4">Connect</h4>
            <div class="flex gap-4">
                <!-- Social Icons Placeholders -->
            </div>
        </div>
    </div>
    <div
        class="container mx-auto px-6 mt-12 pt-8 border-t border-border-color text-center text-xs"
    >
        © {new Date().getFullYear()} Heinze Media. All rights reserved.
    </div>
</footer>
