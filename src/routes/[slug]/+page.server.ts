import { error } from '@sveltejs/kit';
import { getPage } from '$lib/server/pages';

export async function load({ params }) {
    const page = await getPage(params.slug);
    if (!page) throw error(404, 'Page not found');

    return {
        page
    };
}
