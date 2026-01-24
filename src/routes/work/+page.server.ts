import { getPosts } from '$lib/server/posts';

export async function load() {
    const posts = await getPosts('work');
    return {
        posts
    };
}
