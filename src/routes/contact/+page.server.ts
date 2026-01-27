import { getPage } from '$lib/server/pages';
import { error } from '@sveltejs/kit';

export async function load() {
    // Try to load the 'contact' page from markdown
    const page = await getPage('contact');
    
    // If not found, throw 404
    if (!page) throw error(404, 'Page not found');
    
    return { 
        page,
        // Ensure metadata is passed for SEO
        metadata: page.meta 
    };
}
