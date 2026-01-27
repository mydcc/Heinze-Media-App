
import { error, redirect } from '@sveltejs/kit';
import { getAllPages, getPage } from '$lib/server/pages';

export const prerender = true;

export async function entries() {
    const pages = await getAllPages();
    return pages.map(p => ({ slug: p.slug }));
}

export async function load({ params, url }) {
    const { slug } = params;
    const page = await getPage(slug);

    if (!page) {
        throw error(404, 'Page not found');
    }

    // Nutzer-Wunsch: Wenn Seite ein Fallback ist (EN fehlt), umleiten auf Startseite
    if (page.isFallback) {
        throw redirect(307, '/');
    }

    return {
        metadata: { ...page.meta, slug: page.slug },
        html: page.contentHtml,
        content: page.content,
        blocks: page.meta.blocks || [],
        seoMeta: {
            title: page.meta.title,
            description: page.meta.description || '',
            image: '/og-default.png'
        },
        jsonLD: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": page.meta.title,
            "description": page.meta.description
        }
    };
}
