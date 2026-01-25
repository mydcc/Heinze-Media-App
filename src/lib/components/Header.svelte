<script lang="ts">
    import { page } from "$app/stores";
    import ThemeToggle from "$lib/components/ThemeToggle.svelte";

    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/work", label: "Work" },
        {
            href: "/services",
            label: "XR/AR/VR",
            submenu: [
                {
                    href: "https://xrpress.org",
                    label: "XRPress",
                    target: "_blank",
                },
            ],
        },
        { href: "/blog", label: "News" },
        { href: "/contact", label: "Contact" },
    ];
</script>

<header
    class="fixed top-0 w-full z-50 bg-bg-surface/80 backdrop-blur-xl border-b border-border-color transition-colors duration-500"
>
    <div class="container mx-auto px-6 py-5 flex justify-between items-center">
        <a
            href="/"
            class="text-2xl font-black tracking-tight text-text-main group"
        >
            HEINZE<span
                class="text-accent group-hover:drop-shadow-[0_0_8px_rgba(var(--color-accent),0.5)] transition-all"
                >MEDIA</span
            >
        </a>

        <div class="hidden lg:flex items-center gap-10">
            <nav class="flex gap-8">
                {#each links as link}
                    <div class="relative group">
                        <a
                            href={link.href}
                            class="text-sm font-bold uppercase tracking-widest hover:text-accent transition-all text-text-muted relative flex items-center gap-1 py-2"
                            class:text-accent={$page.url.pathname.startsWith(
                                link.href,
                            ) && link.href !== "/"}
                        >
                            {link.label}
                            {#if link.submenu}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="opacity-50 group-hover:opacity-100 transition-opacity"
                                    ><path d="m6 9 6 6 6-6" /></svg
                                >
                            {/if}
                            <span
                                class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"
                                class:w-full={$page.url.pathname === link.href}
                            ></span>
                        </a>

                        {#if link.submenu}
                            <div
                                class="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                            >
                                <div
                                    class="bg-bg-surface border border-border-color rounded-xl shadow-2xl p-2 min-w-[160px] flex flex-col gap-1 backdrop-blur-md"
                                >
                                    {#each link.submenu as sub}
                                        <a
                                            href={sub.href}
                                            target={sub.target || "_self"}
                                            rel={sub.target === "_blank"
                                                ? "noopener noreferrer"
                                                : ""}
                                            class="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-accent hover:bg-white/5 rounded-lg transition-colors text-center whitespace-nowrap"
                                        >
                                            {sub.label}
                                        </a>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </nav>
            <div class="h-6 w-px bg-border-color mx-2"></div>
            <ThemeToggle />
        </div>

        <button
            class="lg:hidden text-text-main p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
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
