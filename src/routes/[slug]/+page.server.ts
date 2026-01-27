
import { error } from '@sveltejs/kit';
import { getAllPages } from '$lib/server/pages';

export const prerender = true;

export async function load({ params }) {
    try {
        const { slug } = params;
        const pages = await getAllPages();
        const page = pages.find((p) => p.slug === slug);
        if (!page) {
            throw error(404, 'Page not found');
        }
        return {
            metadata: page.meta,
            html: page.contentHtml,
            content: page.content
        };
    } catch (e) {
        throw error(404, 'Page not found');
    }
}
