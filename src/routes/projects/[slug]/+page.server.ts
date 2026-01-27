
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { frontmatterSchema } from '$lib/server/frontmatterSchema';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;
    const modules = import.meta.glob('/src/content/projects/*.md', { query: '?raw', import: 'default' });
    const possible = `/src/content/projects/${slug}.md`;
    const available = Object.keys(modules).map((p) => p.replace('/src/content/projects/', '').replace('.md', ''));

    if (!modules[possible]) {
        if (dev) {
            console.error('[404] Project not found:', {
                searched: slug,
                available
            });
        }
        throw error(404, {
            message: `Projekt "${slug}" nicht gefunden. Verfügbare Projekte: ${available.join(', ')}`,
            searched: slug,
            available
        });
    }

    try {
        const raw = await (modules[possible] as () => Promise<string>)();
        const { default: matter } = await import('gray-matter');
        const { data, content } = matter(raw as string);
        const meta = frontmatterSchema.parse(data);
        const contentHtml = await marked(content || '');
        return { meta, contentHtml, slug };
    } catch (e: any) {
        if (dev) {
            console.error('[500] Fehler beim Parsen des Projekts:', {
                slug,
                error: e?.message || e
            });
        }
        throw error(404, {
            message: `Projekt "${slug}" konnte nicht geladen werden.`,
            searched: slug,
            available
        });
    }
};
