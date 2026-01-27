
import { z } from 'zod';
import { marked } from 'marked';
import matter from 'gray-matter';
import { getLocale as languageTag, locales as availableLanguageTags } from '$lib/paraglide/runtime.js';

const blockSchema = z.object({
    type: z.string(),
    data: z.record(z.string(), z.any()).optional()
});

const frontmatterSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.any().optional(), // Allow any for dates (string or Date object)
    published: z.boolean().optional().default(true),
    layout: z.string().optional().default('default'),
    blocks: z.array(blockSchema).optional(),
    theme: z.string().optional()
});

export async function getAllPages() {
    // Rekursive Suche nach allen Markdown-Dateien
    const modules = import.meta.glob('/src/content/**/*.md', { eager: true, as: 'raw' });
    const grouped: Record<string, Record<string, any>> = {};

    for (const [file, raw] of Object.entries(modules)) {
        try {
            // Pfad extrahieren und Verzeichnisse bereinigen
            let fullPath = file
                .replace('/src/content/', '')
                .replace(/\.md$/, '')
                .replace(/\/index$/, '');

            fullPath = fullPath.replace(/^pages\//, '').replace(/^blog\//, '').replace(/^work\//, '');

            // Sprache aus dem Dateisuffix extrahieren (z.B. home.de.md)
            const parts = fullPath.split('.');
            let lang = 'en'; // Standard
            let slug = fullPath;

            if (parts.length > 1) {
                const suffix = parts[parts.length - 1];
                if (availableLanguageTags.includes(suffix as any)) {
                    lang = suffix;
                    slug = parts.slice(0, -1).join('.');
                }
            }

            // Frontmatter extrahieren und validieren
            const { data, content } = matter(raw as string);
            const meta = frontmatterSchema.parse(data);
            const contentHtml = await marked(content || '');

            if (!grouped[slug]) grouped[slug] = {};
            grouped[slug][lang] = {
                slug,
                meta,
                content,
                contentHtml,
                lang
            };
        } catch (e) {
            console.error(`[ERROR] Invalid content in ${file}:`, e);
            continue;
        }
    }

    const currentLang = languageTag();
    const finalPages = [];

    // Nur die passende Sprache (oder Fallback) zurückgeben
    for (const [slug, translations] of Object.entries(grouped)) {
        const page = translations[currentLang] || translations['en'] || Object.values(translations)[0];
        if (page) {
            finalPages.push(page);
        }
    }

    return finalPages;
}

export async function getPage(slug: string) {
    const pages = await getAllPages();

    const matchSlug = (pSlug: string, q: string) => {
        if (!pSlug) return false;
        if (pSlug === q) return true;

        const parts = pSlug.split('/');
        return parts[parts.length - 1] === q;
    };

    const found = pages.find((p) => matchSlug(p.slug, slug)) ?? null;
    return found;
}
