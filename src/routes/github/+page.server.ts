import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

function parseFrontmatter(raw: string) {
    const fmRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = raw.match(fmRegex);
    if (!match) return { data: {}, content: raw };
    const fm = match[1];
    const data: Record<string, any> = {};
    fm.split('\n').forEach(line => {
        const [k, ...rest] = line.split(':');
        if (!k) return;
        let v = rest.join(':').trim();
        v = v.replace(/^\[|\]$/g, '').trim();
        if (v.includes(',')) data[k.trim()] = v.split(',').map(s => s.trim().replace(/^\"|\"$/g, ''));
        else data[k.trim()] = v.replace(/^\"|\"$/g, '');
    });
    const content = raw.replace(fmRegex, '');
    return { data, content };
}

export const load: PageServerLoad = async () => {
    try {
        const modules = import.meta.glob('/src/content/projects/*.md', { as: 'raw' });
        const entries = Object.entries(modules);
        const items = [];
        for (const [path, loader] of entries) {
            const raw = (await (loader as () => Promise<string>)());
            const { data } = parseFrontmatter(raw as string);
            const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';
            items.push({
                title: data.title || slug,
                description: data.description || '',
                url: data.url || '',
                repo: data.repo || '',
                tags: data.tags || [],
                featured: data.featured === 'true' || data.featured === true,
                slug,
                date: data.date || ''
            });
        }
        // sort: featured first, then by date
        items.sort((a, b) => (b.featured - a.featured) || (new Date(b.date).getTime() - new Date(a.date).getTime()));
        return { projects: items };
    } catch (e) {
        throw error(500, 'Could not load projects');
    }
};
