import { error } from '@sveltejs/kit';
import { loadContentBySlug, listContent } from '$lib/content/loader';
import { renderMarkdown, generateSEOMeta, generateJsonLD, getReadingTime } from '$lib/content/render';
import type { PageServerLoad } from './$types';

export const prerender = true;

export async function load({ params }: Parameters<PageServerLoad>[0]) {
	const { slug } = params;

	const content = loadContentBySlug('work', slug);

	if (!content) {
		throw error(404, 'Project not found');
	}

	const html = await renderMarkdown(content.content);
	const readingTime = getReadingTime(content.content);
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
	const items = listContent('work');
	return items.map(item => ({
		slug: item.slug
	}));
}
