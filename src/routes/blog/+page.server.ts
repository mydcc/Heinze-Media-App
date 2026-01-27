import { listContent } from '$lib/content/loader';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
    const blogPosts = listContent('blog').slice(0, 50); // Latest 50 posts

    return {
        blogPosts,
        totalPosts: blogPosts.length
    };
};
