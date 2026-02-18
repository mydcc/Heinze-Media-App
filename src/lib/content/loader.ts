import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';
import type { ContentMetadata, ContentItem } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * Load a single content item by slug
 * Simplified for Single-Language (English)
 */
export function loadContentBySlug(
    type: 'pages' | 'blog' | 'work',
    slug: string
): ContentItem | null {
    // Simple path: src/content/{type}/{slug}.md
    const markdownPath = path.join(CONTENT_DIR, type, `${slug}.md`);

    if (!fs.existsSync(markdownPath)) {
        return null;
    }

    const fileContent = fs.readFileSync(markdownPath, 'utf-8');
    const { data: rawMeta, content } = matter(fileContent);

    // Ensure robust defaults
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
        html: undefined
    };
}

/**
 * List all content items of a type
 */
export function listContent(type: 'pages' | 'blog' | 'work'): ContentMetadata[] {
    const dir = path.join(CONTENT_DIR, type);
    const files: { path: string; slug: string }[] = [];

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

    return files
        .map(({ slug, path: filePath }) => {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data: rawMeta } = matter(fileContent);
            
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
            if (a.date && b.date) {
                return new Date(b.date as string | number | Date).getTime() - new Date(a.date as string | number | Date).getTime();
            }
            return (a.title || '').localeCompare(b.title || '');
        });
}

export function getContentStats() {
    return {
        pages: listContent('pages').length,
        blog: listContent('blog').length,
        work: listContent('work').length
    };
}

export function searchContent(
    keyword: string,
    type?: 'pages' | 'blog' | 'work'
): ContentMetadata[] {
    const types = type ? [type] : (['pages', 'blog', 'work'] as const);
    const results: ContentMetadata[] = [];

    types.forEach((t) => {
        const items = listContent(t);
        items.forEach((item) => {
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