<script lang="ts">
    import { page } from "$app/stores";

    interface NavLink {
        label: string;
        href: string;
        external?: boolean;
    }

    interface Props {
        links?: NavLink[];
        logo?: string;
        logoHref?: string;
    }

    let { links = [], logo = "HEINZE MEDIA", logoHref = "/" }: Props = $props();
    let mobileMenuOpen = $state(false);

    const defaultLinks: NavLink[] = [
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/work" },
        { label: "Blog", href: "/blog" },
        { label: "GitHub", href: "/github" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    const navLinks = links.length > 0 ? links : defaultLinks;

    function isActive(href: string): boolean {
        return (
            $page.url.pathname === href ||
            $page.url.pathname.startsWith(href + "/")
        );
    }
</script>

<nav
    class="fixed top-0 left-0 right-0 z-50 bg-bg-body/95 backdrop-blur-md border-b border-white/10"
>
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Logo -->
        <a
            href={logoHref}
            class="font-black text-xl tracking-wider text-white hover:text-accent transition-colors"
        >
            {logo}
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8">
            {#each navLinks as link}
                <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    class="text-sm font-semibold uppercase tracking-wide transition-colors {isActive(
                        link.href,
                    )
                        ? 'text-accent'
                        : 'text-white/70 hover:text-white'}"
                >
                    {link.label}
                </a>
            {/each}
        </div>

        <!-- Mobile Menu Button -->
        <button
            onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
            class="md:hidden p-2 text-white hover:text-accent transition-colors"
        >
            <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
        </button>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
        <div class="md:hidden border-t border-white/10 bg-bg-surface/50">
            <div class="container mx-auto px-6 py-4 space-y-4">
                {#each navLinks as link}
                    <a
                        href={link.href}
                        onclick={() => (mobileMenuOpen = false)}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        class="block text-sm font-semibold uppercase tracking-wide transition-colors {isActive(
                            link.href,
                        )
                            ? 'text-accent'
                            : 'text-white/70 hover:text-white'}"
                    >
                        {link.label}
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</nav>

<!-- Spacer for fixed nav -->
<div class="h-16 md:h-20"></div>
