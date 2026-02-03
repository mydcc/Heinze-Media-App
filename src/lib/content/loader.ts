/**
 * Content Loader Utilities
 * Loads Markdown files from src/content/ with metadata
 * Supports: pages, blog posts, work/portfolio items
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import type { ContentMetadata, ContentItem } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * Parse YAML front matter from Markdown
 */
function parseFrontmatter(markdown: string): [ContentMetadata, string] {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return [{ title: 'Untitled', slug: 'untitled' }, markdown];
    }

    const [, frontmatterStr, content] = match;
    const metadata: ContentMetadata = { title: '', slug: '' };

    // Parse YAML-like format (simple implementation)
    frontmatterStr.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim();
            // Remove quotes
            value = value.replace(/^["']|["']$/g, '');
            metadata[key.trim()] = value;
        }
    });

    return [metadata, content];
}

/**
 * Load a single content item by slug
 */
export function loadContentBySlug(
    type: 'pages' | 'blog' | 'work',
    slug: string,
    lang: string = 'en'
): ContentItem | null {
    // Search locations:
    // 1. {lang}/{type}/{slug}.md (Nested)
    // 2. {type}/{slug}.{lang}.md (Suffix)
    // 3. {type}/{slug}.md (Default)
    // 4. Fallback to other language in nested structure

    const searchPaths = [
        path.join(CONTENT_DIR, lang, type, `${slug}.md`),
        path.join(CONTENT_DIR, type, `${slug}.${lang}.md`),
        path.join(CONTENT_DIR, type, `${slug}.md`),
        lang === 'en' ? path.join(CONTENT_DIR, 'de', type, `${slug}.md`) : path.join(CONTENT_DIR, 'en', type, `${slug}.md`)
    ];

    // Fallback logic for 'work' items in 'pages' dir
    if (type === 'work') {
        searchPaths.push(path.join(CONTENT_DIR, 'pages', `${slug}.${lang}.md`));
        searchPaths.push(path.join(CONTENT_DIR, 'pages', `${slug}.md`));
    }

    let markdownPath = null;
    for (const p of searchPaths) {
        if (fs.existsSync(p)) {
            markdownPath = p;
            break;
        }
    }

    if (!markdownPath) return null;

    const markdown = fs.readFileSync(markdownPath, 'utf-8');
    const [rawMeta, content] = parseFrontmatter(markdown);

    // Ensure robust defaults: slug from param, title from slug
    const safeSlug = rawMeta.slug && String(rawMeta.slug).trim().length > 0 ? String(rawMeta.slug) : slug;
    const prettyTitle = (rawMeta.title && String(rawMeta.title).trim().length > 0)
        ? String(rawMeta.title)
        : safeSlug
            .split('/').pop()!
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());

    const metadata: ContentMetadata = {
        ...rawMeta,
        slug: safeSlug,
        title: prettyTitle
    } as ContentMetadata;

    return {
        metadata,
        content,
        html: undefined // Will be rendered by marked/rehype
    };
}

/**
 * List all content items of a type
 */
export function listContent(type: 'pages' | 'blog' | 'work'): ContentMetadata[] {
    const languages: string[] = ['', 'de', 'en'];
    let files: { path: string; slug: string }[] = [];

    // Fallback logic for 'work' listing if folder missing is handled within the loop by checking 'pages' too
    const typesToSearch: string[] = type === 'work' ? ['work', 'pages'] : [type];

    languages.forEach((lang: string) => {
        typesToSearch.forEach((t: string) => {
            const dir = lang ? path.join(CONTENT_DIR, lang, t) : path.join(CONTENT_DIR, t);
            if (fs.existsSync(dir)) {
                fs.readdirSync(dir)
                    .filter((file: string) => file.endsWith('.md'))
                    .forEach((file: string) => {
                        files.push({
                            path: path.join(dir, file),
                            slug: file.replace(/\.md$/, '')
                        });
                    });
            }
        });
    });

    // Remove duplicates based on slug (prefer localised)
    const uniqueFiles = new Map<string, string>();
    files.forEach((f: { path: string; slug: string }) => uniqueFiles.set(f.slug, f.path));

    return Array.from(uniqueFiles.entries())
        .map(([slug, filePath]: [string, string]) => {
            const markdown = fs.readFileSync(filePath, 'utf-8');
            const [rawMeta] = parseFrontmatter(markdown);
            const safeSlug = rawMeta.slug && String(rawMeta.slug).trim().length > 0 ? String(rawMeta.slug) : slug;
            const prettyTitle = (rawMeta.title && String(rawMeta.title).trim().length > 0)
                ? String(rawMeta.title)
                : slug
                    .split('/').pop()!
                    .replace(/[-_]+/g, ' ')
                    .replace(/\b\w/g, (c: string) => c.toUpperCase());

            return {
                ...rawMeta,
                slug: safeSlug,
                title: prettyTitle
            } as ContentMetadata;
        })
        .sort((a: ContentMetadata, b: ContentMetadata) => {
            // Sort by date (newest first) if available
            if (a.date && b.date) {
                return new Date(b.date as string | number | Date).getTime() - new Date(a.date as string | number | Date).getTime();
            }
            return (a.title || '').localeCompare(b.title || '');
        });
}

/**
 * Get content statistics
 */
export function getContentStats() {
    return {
        pages: listContent('pages').length,
        blog: listContent('blog').length,
        work: listContent('work').length
    };
}

/**
 * Search content by keyword (simple text search)
 */
export function searchContent(
    keyword: string,
    type?: 'pages' | 'blog' | 'work'
): ContentMetadata[] {
    const types = type ? [type] : (['pages', 'blog', 'work'] as const);
    const results: ContentMetadata[] = [];

    types.forEach((t: 'pages' | 'blog' | 'work') => {
        const items = listContent(t);
        items.forEach((item: ContentMetadata) => {
            if (
                item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
                item.description?.toLowerCase().includes(keyword.toLowerCase())
            ) {
                results.push(item);
            }
        });
    });

    return results;
}
