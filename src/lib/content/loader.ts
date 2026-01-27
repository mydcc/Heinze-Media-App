/**
 * Content Loader Utilities
 * Loads Markdown files from src/content/ with metadata
 * Supports: pages, blog posts, work/portfolio items
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ContentMetadata, ContentItem } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../../content');

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
    // Primary location with language
    const localizedPath = path.join(CONTENT_DIR, type, `${slug}.${lang}.md`);
    // Default location (fallback)
    const defaultPath = path.join(CONTENT_DIR, type, `${slug}.md`);

    // Fallback logic for 'work' items
    const fallbackLocalizedPath = type === 'work' ? path.join(CONTENT_DIR, 'pages', `${slug}.${lang}.md`) : null;
    const fallbackDefaultPath = type === 'work' ? path.join(CONTENT_DIR, 'pages', `${slug}.md`) : null;

    let markdownPath = null;

    if (fs.existsSync(localizedPath)) {
        markdownPath = localizedPath;
    } else if (fs.existsSync(defaultPath)) {
        markdownPath = defaultPath;
    } else if (fallbackLocalizedPath && fs.existsSync(fallbackLocalizedPath)) {
        markdownPath = fallbackLocalizedPath;
    } else if (fallbackDefaultPath && fs.existsSync(fallbackDefaultPath)) {
        markdownPath = fallbackDefaultPath;
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
    const typeDir = path.join(CONTENT_DIR, type);

    if (!fs.existsSync(typeDir)) {
        // If work listing and folder missing, fall back to pages directory
        if (type === 'work') {
            const pagesDir = path.join(CONTENT_DIR, 'pages');
            if (!fs.existsSync(pagesDir)) return [];
            return fs.readdirSync(pagesDir)
                .filter(file => file.endsWith('.md'))
                .map(file => {
                    const markdown = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
                    const [rawMeta] = parseFrontmatter(markdown);
                    const fileSlug = file.replace(/\.md$/, '');
                    const safeSlug = rawMeta.slug && String(rawMeta.slug).trim().length > 0 ? String(rawMeta.slug) : fileSlug;
                    const prettyTitle = (rawMeta.title && String(rawMeta.title).trim().length > 0)
                        ? String(rawMeta.title)
                        : fileSlug
                            .split('/').pop()!
                            .replace(/[-_]+/g, ' ')
                            .replace(/\b\w/g, (c) => c.toUpperCase());

                    return {
                        ...rawMeta,
                        slug: safeSlug,
                        title: prettyTitle
                    } as ContentMetadata;
                }).sort((a, b) => {
                    if (a.date && b.date) {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    }
                    return (a.title || '').localeCompare(b.title || '');
                });
        }
        return [];
    }
    const files = fs.readdirSync(typeDir);

    return files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const markdown = fs.readFileSync(path.join(typeDir, file), 'utf-8');
            const [rawMeta] = parseFrontmatter(markdown);
            const fileSlug = file.replace(/\.md$/, '');
            const safeSlug = rawMeta.slug && String(rawMeta.slug).trim().length > 0 ? String(rawMeta.slug) : fileSlug;
            const prettyTitle = (rawMeta.title && String(rawMeta.title).trim().length > 0)
                ? String(rawMeta.title)
                : fileSlug
                    .split('/').pop()!
                    .replace(/[-_]+/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase());

            return {
                ...rawMeta,
                slug: safeSlug,
                title: prettyTitle
            } as ContentMetadata;
        })
        .sort((a, b) => {
            // Sort by date (newest first) if available
            if (a.date && b.date) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
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

    types.forEach(t => {
        const items = listContent(t);
        items.forEach(item => {
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
