import { SitemapGenerator } from '$lib/seo/sitemap';
import { getRawPagesGrouped } from '$lib/server/pages';
import type { RequestHandler } from '@sveltejs/kit';
import { localizeHref } from '$lib/paraglide/runtime.js';

const BASE_URL = 'https://heinze.media';

export const GET: RequestHandler = async () => {
    const generator = new SitemapGenerator();
    const grouped = await getRawPagesGrouped();

    // Iterate over all content groups
    for (const [id, translations] of Object.entries(grouped)) {
        // Collect valid translations
        const validLangs = Object.entries(translations).filter(([lang, page]) => {
            return page.meta.published !== false && page.meta.sitemap !== false;
        });

        if (validLangs.length === 0) continue;

        // Add each language version
        validLangs.forEach(([lang, page]) => {
            // Determine URL
            // Slug from frontmatter dictates the URL segment
            // 'home' maps to root
            const slugPath = page.slug === 'home' ? '/' : `/${page.slug}`;

            // Use Paraglide to get the localized path (e.g. /de/ueber-uns)
            const href = localizeHref(slugPath, { locale: lang });
            const url = `${BASE_URL}${href}`;

            // Build alternates
            const alternates = validLangs
                .filter(([l]) => l !== lang)
                .map(([l, p]) => {
                    const altSlugPath = p.slug === 'home' ? '/' : `/${p.slug}`;
                    const altHref = localizeHref(altSlugPath, { locale: l });
                    return {
                        hreflang: l,
                        href: `${BASE_URL}${altHref}`
                    };
                });

            generator.addEntry(url, {
                lastmod: page.meta.date ? new Date(page.meta.date).toISOString().split('T')[0] : undefined,
                alternates: alternates.length > 0 ? alternates : undefined,
                changefreq: page.type === 'blog' ? 'weekly' : 'monthly',
                priority: page.slug === 'home' ? 1.0 : (page.type === 'pages' ? 0.8 : 0.6)
            });
        });
    }

    // We no longer need static routes as they are now covered by markdown pages (even contact, imprint etc)
    // If there are pure Svelte routes not in CMS, they should be added manually here or tracked.
    // Given the task, covering CMS is the priority.

    const xml = generator.generateXML();

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600'
        }
    });
};
