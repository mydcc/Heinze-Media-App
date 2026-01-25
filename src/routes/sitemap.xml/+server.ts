import { SitemapGenerator } from '$lib/seo/sitemap';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
    const generator = new SitemapGenerator();
    generator.addStaticRoutes();

    const xml = generator.generateXML();

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600' // Cache für 1 Stunde
        }
    });
};
