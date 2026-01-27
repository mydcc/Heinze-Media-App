import { error } from '@sveltejs/kit';
import { loadContentBySlug, listContent } from '$lib/content/loader';
import { renderMarkdown, generateSEOMeta, generateJsonLD, getReadingTime } from '$lib/content/render';
import type { PageServerLoad } from './$types';

export const prerender = true;

export async function load({ params }: Parameters<PageServerLoad>[0]) {
    const { slug } = params;

    // Try to load from pages directory
    let content = loadContentBySlug('pages', slug);

    if (!content) {
        throw error(404, 'Page not found');
    }

    // Render markdown to HTML
    const html = await renderMarkdown(content.content);
    const readingTime = getReadingTime(content.content);

    // Generate SEO metadata
    const seoMeta = generateSEOMeta(content.metadata);
    const jsonLD = generateJsonLD(content.metadata, 'https://heinze-media.com');

    return {
        metadata: content.metadata,
        html,
        readingTime,
        seoMeta,
        jsonLD
    };
}

export async function entries() {
    const pages = listContent('pages');
    return pages.map(page => ({
        slug: page.slug || (page.title ?? '').toLowerCase().replace(/\s+/g, '-') || 'untitled'
    }));
}
