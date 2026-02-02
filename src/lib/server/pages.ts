
import { z } from 'zod';
import { getLocale as languageTag, locales as availableLanguageTags } from '$lib/paraglide/runtime.js';

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
    slug: z.string().optional(),
    brandColor: z.string().optional(),
    accentColor: z.string().optional()
});

export async function getAllPages() {
    // Import modules directly (mdsvex handles parsing)
    // Note: eager=true is essential for static site generation
    const modules = import.meta.glob('/src/content/**/*.md', { eager: true });
    const grouped: Record<string, Record<string, any>> = {};

    for (const [file, module] of Object.entries(modules)) {
        // Path analysis: /src/content/de/pages/home.md
        const parts = file.replace('/src/content/', '').split('/');
        if (parts.length < 3) continue;

        const lang = parts[0];
        const type = parts[1];
        const slugPath = parts.slice(2).join('/').replace(/\.md$/, '');

        // Only process supported languages
        if (!availableLanguageTags.includes(lang as any)) continue;

        const rawMetadata = (module as any).metadata;

        // Strict Validation: Throw on failure
        // This stops the build process as required by AGENT.md
        let meta;
        try {
            meta = frontmatterSchema.parse(rawMetadata);
        } catch (e) {
            console.error(`[VALIDATION ERROR] File: ${file}`);
            throw e; // Build-Breaker
        }

        const id = `${type}/${slugPath}`;

        if (!grouped[id]) grouped[id] = {};
        grouped[id][lang] = {
            id,
            slug: meta.slug || slugPath,
            type,
            meta,
            // Component is NOT returned here to keep payload serializable
            // The component will be loaded by +page.ts via dynamic import
            lang,
            filePath: file
        };
    }

    const currentLang = languageTag();
    const finalPages = [];

    for (const [id, translations] of Object.entries(grouped)) {
        const page = translations[currentLang] || translations['de'] || Object.values(translations)[0];

        if (page) {
            if (!translations[currentLang]) {
                page.isFallback = true;
            }
            finalPages.push(page);
        }
    }

    return finalPages;
}

export async function getPage(slug: string, type?: string) {
    const pages = await getAllPages();

    const found = pages.find((p) => {
        if (type && p.type !== type) return false;
        return p.slug === slug || p.id === slug || p.id.endsWith(`/${slug}`);
    }) ?? null;

    return found;
}
