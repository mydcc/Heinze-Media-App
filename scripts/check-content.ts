import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const CONTENT_DIR = path.resolve('src/content');
const MARKDOWN_EXT = ['.md', '.mdx'];

const frontmatterSchema = z.object({
    title: z.string().min(1),
    published: z.boolean(),
    // ggf. weitere Felder ergänzen
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

async function checkFrontmatter(file: string) {
    const content = await fs.readFile(file, 'utf-8');
    const { data } = matter(content);
    try {
        frontmatterSchema.parse(data);
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
