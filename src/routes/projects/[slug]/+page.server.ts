import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;
    try {
        const modules = import.meta.glob('/src/content/projects/*.md', { as: 'raw' });
        const possible = `/src/content/projects/${slug}.md`;
        if (!modules[possible]) throw error(404, 'Not found');
        const raw = await (modules[possible] as () => Promise<string>)();
        const { default: matter } = await import('gray-matter');
        const { data, content } = matter(raw as string);
        return { meta: data, contentHtml: content, slug };
    } catch (e) {
        throw error(500, 'Could not load project');
    }
};
