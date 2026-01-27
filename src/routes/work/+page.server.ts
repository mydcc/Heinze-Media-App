import { listContent } from '$lib/content/loader';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const workItems = listContent('work');

	return {
		workItems,
		totalItems: workItems.length
	};
};
