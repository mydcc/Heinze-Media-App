<script lang="ts">
    import { page } from "$app/stores";

    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/work", label: "Work" },
        { href: "/metaverse", label: "Metaverse" },
        { href: "/blog", label: "News" },
        { href: "/contact", label: "Contact" },
    ];
</script>

<header
    class="fixed top-0 w-full z-50 bg-brand-navy/80 backdrop-blur-md border-b border-white/10"
>
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold tracking-tighter text-white">
            HEINZE<span class="text-brand-cyan">MEDIA</span>
        </a>

        <nav class="hidden md:flex gap-8">
            {#each links as link}
                <a
                    href={link.href}
                    class="text-sm font-medium hover:text-brand-cyan transition-colors"
                    class:text-brand-cyan={$page.url.pathname === link.href}
                >
                    {link.label}
                </a>
            {/each}
        </nav>

        <button class="md:hidden text-white">
            <!-- Mobile Menu Icon Placeholder -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><line x1="3" y1="12" x2="21" y2="12"></line><line
                    x1="3"
                    y1="6"
                    x2="21"
                    y2="6"
                ></line><line x1="3" y1="18" x2="21" y2="18"></line></svg
            >
        </button>
    </div>
</header>
