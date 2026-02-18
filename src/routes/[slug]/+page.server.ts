import { error, redirect } from '@sveltejs/kit';
import { getPage } from '$lib/server/pages';

export const prerender = true;

// entries() ensures all pages are pre-rendered
export async function entries() {
    const { getAllPages } = await import('$lib/server/pages');
    const pages = await getAllPages();
    return pages.filter(p => p.type === 'pages').map(p => ({ slug: p.slug }));
}

export async function load({ params }) {
    const { slug } = params;
    
    // Simplifed: No language handling needed
    const page = await getPage(slug, 'pages');

    if (!page) {
        throw error(404, 'Page not found');
    }

    if (page.isFallback) {
        // Fallback logic not strictly needed anymore but good for safety
    }

    return {
        metadata: { ...page.meta, slug: page.slug },
        filePath: page.filePath,
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