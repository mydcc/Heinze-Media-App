
import { z } from 'zod';
import { marked } from 'marked';
import matter from 'gray-matter';

const frontmatterSchema = z.object({
    title: z.string(),
    date: z.string().optional(),
    published: z.boolean().optional().default(true)
});

export async function getAllPages() {
    // Rekursive Suche nach allen Markdown-Dateien
    const modules = import.meta.glob('/src/content/**/*.md', { eager: true, as: 'raw' });
    const pages = [];

    for (const [file, raw] of Object.entries(modules)) {
        try {
            // Slug aus Pfad generieren und normalisieren
            let slug = file
                .replace('/src/content/', '')
                .replace(/\.md$/, '')
                .replace(/\/index$/, '');

            // Entferne führende Verzeichnisse wie 'pages/', 'blog/' oder 'work/'
            slug = slug.replace(/^pages\//, '').replace(/^blog\//, '').replace(/^work\//, '');

            // Frontmatter extrahieren und validieren
            const { data, content } = matter(raw as string);
            const meta = frontmatterSchema.parse(data);
            const contentHtml = await marked(content || '');

            pages.push({
                slug,
                meta,
                content,
                contentHtml
            });
        } catch (e) {
            // Fehlerhafte Dateien werden übersprungen, aber nicht geworfen
            console.warn(`Invalid frontmatter in ${file}:`, e);
            continue;
        }
    }
    return pages;
}

export async function getPage(slug: string) {
    const pages = await getAllPages();
    // Flexible matching: allow plain slug or prefixed with content folder names
    const matchSlug = (pSlug: string, q: string) => {
        if (!pSlug) return false;
        if (pSlug === q) return true;
        // direct folder prefixes
        if (pSlug === `pages/${q}` || pSlug === `blog/${q}` || pSlug === `work/${q}`) return true;
        // nested path ending with slug (e.g. work/cachy or projects/work/cachy)
        if (pSlug.endsWith(`/${q}`)) return true;
        return false;
    };

    return pages.find((p) => matchSlug(p.slug, slug)) ?? null;
}
