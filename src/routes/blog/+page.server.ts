import { getPosts } from '$lib/server/posts';

export async function load() {
    const posts = await getPosts('blog');
    return {
        posts
    };
}
