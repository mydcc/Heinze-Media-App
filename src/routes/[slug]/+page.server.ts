
import { error } from '@sveltejs/kit';
import { getAllPages } from '$lib/server/pages';


export const prerender = true;

export async function entries() {
    const pages = await getAllPages();
    return pages.map(p => ({ slug: p.slug }));
}

export async function load({ params }) {
    try {
        const { slug } = params;
        const pages = await getAllPages();
        const page = pages.find((p) => p.slug === slug);

        if (!page) {
            throw error(404, 'Page not found');
        }
        return {
            metadata: { ...page.meta, slug: page.slug },
            html: page.contentHtml,
            content: page.content,
            blocks: page.meta.blocks || [],
            seoMeta: {
                title: page.meta.title,
                description: page.meta.description || '',
                image: '/og-default.png' // Default or fallback
            },
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": page.meta.title,
                "description": page.meta.description
            }
        };
    } catch (e) {
        throw error(404, 'Page not found');
    }
}
