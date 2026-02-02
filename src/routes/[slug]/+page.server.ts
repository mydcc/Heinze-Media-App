
import { error, redirect } from '@sveltejs/kit';
import { getPage } from '$lib/server/pages';

export const prerender = true;

// entries() ensures all pages are pre-rendered
export async function entries() {
    const { getAllPages } = await import('$lib/server/pages');
    const pages = await getAllPages();
    return pages.map(p => ({ slug: p.slug }));
}

export async function load({ params }) {
    const { slug } = params;
    // Strict validation happens inside getPage -> getAllPages
    const page = await getPage(slug);

    if (!page) {
        throw error(404, 'Page not found');
    }

    if (page.isFallback) {
        throw redirect(307, '/');
    }

    // Pass metadata to the client (serialized)
    // The component loading happens in +page.ts
    return {
        metadata: { ...page.meta, slug: page.slug },
        filePath: page.filePath, // Pass filePath to help +page.ts find the module
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
