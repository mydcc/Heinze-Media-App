
import { z } from 'zod';
import { marked } from 'marked';

const frontmatterSchema = z.object({
    title: z.string(),
    date: z.string().optional(),
    published: z.boolean().optional().default(true)
});

export async function getAllPages() {
    // Rekursive Suche nach allen Markdown-Dateien
    const modules = import.meta.glob('/src/content/**/*.md', { eager: true, query: '?raw', import: 'default' });
    const pages = [];

    for (const [file, raw] of Object.entries(modules)) {
        try {
            // Slug aus Pfad generieren
            const slug = file
                .replace('/src/content/', '')
                .replace(/\.md$/, '')
                .replace(/\/index$/, '');

            // Frontmatter extrahieren und validieren
            const { default: matter } = await import('gray-matter');
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
