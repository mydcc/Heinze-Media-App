
import { error } from '@sveltejs/kit';
import { getPage } from '$lib/server/pages';

export const prerender = true;

export async function entries() {
    const { getAllPages } = await import('$lib/server/pages');
    const pages = await getAllPages();
    // Filter for projects only
    return pages
        .filter(p => p.type === 'projects')
        .map(p => ({ slug: p.slug }));
}

export const load = async ({ params }) => {
    const { slug } = params;
    // Reuse the central logic which now uses mdsvex/glob
    // We request type 'projects' explicitly
    const page = await getPage(slug, 'projects');

    if (!page) {
        throw error(404, 'Project not found');
    }

    return {
        metadata: { ...page.meta, slug: page.slug },
        filePath: page.filePath,
        seoMeta: {
            title: page.meta.title,
            description: page.meta.description || '',
            image: '/og-default.png'
        }
    };
};
