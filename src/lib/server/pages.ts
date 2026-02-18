import { pageSchema, blogSchema, workSchema } from './schemas';

export async function getRawPagesGrouped() {
    // Import modules directly (mdsvex handles parsing)
    // Note: eager=true is essential for static site generation
    const modules = import.meta.glob('/src/content/**/*.md', { eager: true });
    const pages: any[] = [];

    for (const [file, module] of Object.entries(modules)) {
        // Path analysis: /src/content/pages/home.md
        // Remove prefix
        const cleanPath = file.replace('/src/content/', '');
        const parts = cleanPath.split('/');
        
        // Expected: [type, slug.md] or [type, subfolder, slug.md]
        if (parts.length < 2) continue;

        const type = parts[0];
        // Join the rest as slug, remove extension
        const slugPath = parts.slice(1).join('/').replace(/\.md$/, '');

        const rawMetadata = (module as any).metadata;
        const schema = type === 'blog' ? blogSchema : type === 'work' ? workSchema : pageSchema;

        // Validation
        let meta;
        try {
            meta = schema.parse(rawMetadata || {});
        } catch (e) {
            console.error(`[VALIDATION ERROR] File: ${file}`);
            throw e; // Build-Breaker
        }

        pages.push({
            id: `${type}/${slugPath}`,
            slug: meta.slug || slugPath,
            type,
            meta,
            filePath: file
        });
    }

    return pages;
}

export async function getAllPages() {
    return await getRawPagesGrouped();
}

export async function getPage(slug: string, type?: string) {
    const pages = await getAllPages();

    const found = pages.find((p) => {
        if (type && p.type !== type) return false;
        // Check for exact slug match or ID match
        return p.slug === slug || p.id === slug || p.id.endsWith(`/${slug}`);
    }) ?? null;

    return found;
}