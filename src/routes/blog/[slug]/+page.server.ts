import { error } from '@sveltejs/kit';
import { getPost } from '$lib/server/posts';
import { marked } from 'marked';

export async function load({ params }) {
    const post = await getPost(params.slug, 'blog');
    if (!post) throw error(404, 'Post not found');

    const contentHtml = await marked(post.content || '');
    return {
        post: { ...post, contentHtml }
    };
}
