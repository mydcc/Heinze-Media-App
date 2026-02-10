
import { error } from '@sveltejs/kit';
import { getPage } from '$lib/server/pages';

export const prerender = true;

export async function entries() {
    const { getAllPages } = await import('$lib/server/pages');
    const pages = await getAllPages();
    return pages.filter(p => p.id.startsWith('pages/xr-studio') || p.id.startsWith('pages/services/'))
                .map(p => ({ slug: p.slug }));
}

export async function load({ params }) {
    const { slug } = params;
    const page = await getPage(slug, 'pages');

    if (!page) {
        throw error(404, 'Service not found');
    }

    return {
        metadata: page.meta,
        seoMeta: {
            title: page.meta.title,
            description: page.meta.description || ''
        }
    };
}
