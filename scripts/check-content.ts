import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const CONTENT_DIR = path.resolve('src/content');
const MARKDOWN_EXT = ['.md', '.mdx'];


// Verschiedene Schemata je nach Content-Typ
const projectSchema = z.object({
    title: z.string().min(1),
    repo: z.string().min(1),
    url: z.string().url(),
    description: z.string().min(1),
    tags: z.array(z.string()),
    language: z.string().min(1),
    featured: z.boolean(),
    date: z.string().min(1),
    published: z.boolean(),
});

const pageSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    // published optional, da viele Seiten statisch sind
    published: z.boolean().optional(),
});

const blogSchema = z.object({
    title: z.string().min(1),
    date: z.string().min(1),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
});

const workSchema = z.object({
    title: z.string().min(1),
    date: z.string().min(1),
    published: z.boolean().optional(),
});

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(entries.map(async entry => {
        const res = path.resolve(dir, entry.name);
        if (entry.isDirectory()) return getAllMarkdownFiles(res);
        if (MARKDOWN_EXT.includes(path.extname(entry.name))) return [res];
        return [];
    }));
    return files.flat();
}

function extractSlug(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
}


function getSchemaForFile(file: string) {
    if (file.includes('/projects/')) return projectSchema;
    if (file.includes('/pages/')) return pageSchema;
    if (file.includes('/blog/')) return blogSchema;
    if (file.includes('/work/')) return workSchema;
    return null;
}

async function checkFrontmatter(file: string) {
    const content = await fs.readFile(file, 'utf-8');
    const { data } = matter(content);
    const schema = getSchemaForFile(file);
    if (!schema) return null; // Unbekannter Typ: ignoriere
    try {
        schema.parse(data);
        return null;
    } catch (e: any) {
        return { file, error: e.errors };
    }
}

function findInternalLinks(markdown: string): string[] {
    // Einfache Regex für Markdown-Links auf interne Seiten
    const regex = /\[.*?\]\((\/[^")]+)\)/g;
    const links: string[] = [];
    let match;
    while ((match = regex.exec(markdown)) !== null) {
        links.push(match[1]);
    }
    return links;
}

async function main() {
    const files = await getAllMarkdownFiles(CONTENT_DIR);
    const slugs = files.map(extractSlug);

    // 1. Frontmatter-Check
    const frontmatterErrors = (
        await Promise.all(files.map(checkFrontmatter))
    ).filter(Boolean);

    // 2. Dead Link Detection
    const brokenLinks: { file: string; link: string }[] = [];
    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        const links = findInternalLinks(content);
        for (const link of links) {
            // Prüfe, ob Link auf existierende Datei zeigt (nur einfache Slug-Links)
            const targetSlug = link.replace(/^\//, '').split('/')[0];
            if (targetSlug && !slugs.includes(targetSlug)) {
                brokenLinks.push({ file, link });
            }
        }
    }

    // 3. Reporting
    if (frontmatterErrors.length > 0) {
        console.error('❌ Frontmatter-Fehler gefunden:');
        frontmatterErrors.forEach(({ file, error }) => {
            console.error(`- ${file}:`, error);
        });
    }

    if (brokenLinks.length > 0) {
        console.error('❌ Broken internal links gefunden:');
        brokenLinks.forEach(({ file, link }) => {
            console.error(`- ${file}: ${link}`);
        });
    }

    if (frontmatterErrors.length > 0 || brokenLinks.length > 0) {
        process.exit(1);
    } else {
        console.log('✅ Content-Check bestanden!');
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
