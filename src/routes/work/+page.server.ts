import { listContent, loadContentBySlug } from '$lib/content/loader';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
    // Single language call
    const pageContent = loadContentBySlug('pages', 'work');
	const workItems = listContent('work');

	return {
        metadata: pageContent?.metadata || {},
		workItems,
		totalItems: workItems.length
	};
};