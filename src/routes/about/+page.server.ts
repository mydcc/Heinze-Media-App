import { getPage } from '$lib/server/pages';
import { error } from '@sveltejs/kit';

export async function load() {
    const page = await getPage('about');
    if (!page) throw error(404, 'Page not found');
    return { page };
}
