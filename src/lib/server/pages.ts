import { getPosts, type Post } from '$lib/server/posts';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

export async function getPage(slug: string) {
    const modules = import.meta.glob('/src/content/pages/*.md', { query: '?raw', import: 'default' });
    const possiblePath = `/src/content/pages/${slug}.md`;

    if (modules[possiblePath]) {
        const raw = await modules[possiblePath]() as string;
        // reuse gray-matter logic from generic getPost via slightly modified internal function or copy logic?
        // Let's just use gray-matter here to be safe and avoid tight coupling if getPost changes.
        const { default: matter } = await import('gray-matter');
        const { data, content } = matter(raw);
        const contentHtml = await marked(content || '');
        return { ...data, contentHtml, content } as Post & { contentHtml: string };
    }
    return null;
}
