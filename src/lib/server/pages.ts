
import { z } from 'zod';
import { marked } from 'marked';
import matter from 'gray-matter';
import { validateContent } from './validator';

const availableLanguageTags = ['en', 'de'];

const blockSchema = z.object({
    type: z.string(),
    data: z.record(z.string(), z.any()).optional()
});

const frontmatterSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.any().optional(),
    published: z.boolean().optional().default(true),
    layout: z.string().optional().default('default'),
    blocks: z.array(blockSchema).optional(),
    theme: z.string().optional(),
    slug: z.string().optional() // Optionaler Override
});

export async function getAllPages(lang: string = 'en') {
    // Rekursive Suche in der neuen Struktur: /src/content/{lang}/{type}/**/*.md
    const modules = import.meta.glob('/src/content/**/*.md', { eager: true, as: 'raw' });
    const grouped: Record<string, Record<string, any>> = {};

    for (const [file, raw] of Object.entries(modules)) {
        try {
            // Beispiel Pfad: /src/content/de/pages/home.md
            const parts = file.replace('/src/content/', '').split('/');
            if (parts.length < 3) continue;

            const lang = parts[0]; // 'de' oder 'en'
            const type = parts[1]; // 'pages', 'blog', 'work'
            const slugPath = parts.slice(2).join('/').replace(/\.md$/, '');

            // Fallback: Sichert ab, dass wir nur unterstützte Sprachen laden
            if (!availableLanguageTags.includes(lang as any)) continue;

            // Frontmatter extrahieren
            const { data, content } = matter(raw as string);
            const meta = frontmatterSchema.parse(data);
            const contentHtml = await marked(content || '');

            // ID ist der Pfad innerhalb des Sprachordners (z.B. pages/home)
            const id = `${type}/${slugPath}`;

            if (!grouped[id]) grouped[id] = {};
            grouped[id][lang] = {
                id,
                slug: meta.slug || slugPath, // Nutze Slug aus Metadata oder Dateinamen
                type,
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

    const currentLang = lang;
    const finalPages = [];

    // Zusammenstellen der Seiten für die aktuelle Sprache
    for (const [id, translations] of Object.entries(grouped)) {
        // Prio 1: Aktuelle Sprache
        // Prio 2: Fallback auf DE (da dies die Primärsprache ist laut User)
        // Prio 3: Erste verfügbare Übersetzung
        const page = translations[currentLang] || translations['de'] || Object.values(translations)[0];

        if (page) {
            // Wenn die Seite in der aktuellen Sprache fehlt, markieren wir sie als "fallback"
            // Dies kann im Load-Event genutzt werden, um auf die Startseite umzuleiten (gefordert vom User)
            if (!translations[currentLang]) {
                page.isFallback = true;
            }
            finalPages.push(page);
        }
    }

    return finalPages;
}

export async function getPage(slug: string, type?: string, lang: string = 'en') {
    const pages = await getAllPages(lang);

    // Suche nach Slug (kann auch ein Pfad sein wie 'pages/about')
    const found = pages.find((p) => {
        if (type && p.type !== type) return false;
        return p.slug === slug || p.id === slug || p.id.endsWith(`/${slug}`);
    }) ?? null;

    return found;
}
