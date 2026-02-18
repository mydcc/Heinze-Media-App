import { SitemapGenerator } from '$lib/seo/sitemap';
import { getAllPages } from '$lib/server/pages';
import type { RequestHandler } from '@sveltejs/kit';

const BASE_URL = 'https://heinze.media';

export const GET: RequestHandler = async () => {
    const generator = new SitemapGenerator();
    const pages = await getAllPages();

    for (const page of pages) {
        if (page.meta.published === false || page.meta.sitemap === false) continue;

        const slugPath = page.slug === 'home' ? '/' : `/${page.slug}`;
        const url = `${BASE_URL}${slugPath}`;

        generator.addEntry(url, {
            lastmod: page.meta.date ? new Date(page.meta.date).toISOString().split('T')[0] : undefined,
            changefreq: page.type === 'blog' ? 'weekly' : 'monthly',
            priority: page.slug === 'home' ? 1.0 : (page.type === 'pages' ? 0.8 : 0.6)
        });
    }

    const xml = generator.generateXML();

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600'
        }
    });
};