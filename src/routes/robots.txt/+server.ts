import { generateRobotsTxt } from '$lib/seo/sitemap';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
    const txt = generateRobotsTxt();

    return new Response(txt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400' // Cache für 24 Stunden
        }
    });
};
