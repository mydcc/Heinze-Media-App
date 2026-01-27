/**
 * Content Rendering Utilities
 * Converts Markdown to HTML with syntax highlighting and metadata
 */

import { marked } from 'marked';
import type { ContentMetadata } from './types';

/**
 * Render Markdown to HTML
 */
export async function renderMarkdown(markdown: string): Promise<string> {
    return await marked(markdown);
}

/**
 * Generate SEO metadata from content
 */
export function generateSEOMeta(metadata: ContentMetadata) {
    return {
        title: metadata.title,
        description: metadata.description || metadata.title,
        keywords: metadata.keywords?.split(',').map(k => k.trim()) || [],
        author: metadata.author || 'Heinze Media',
        date: metadata.date,
        image: metadata.image,
        url: `/content/${metadata.slug}`
    };
}

/**
 * Generate JSON-LD schema for content
 */
export function generateJsonLD(metadata: ContentMetadata, baseUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: metadata.title,
        description: metadata.description,
        author: {
            '@type': 'Person',
            name: metadata.author || 'Heinze Media'
        },
        datePublished: metadata.date,
        image: metadata.image ? `${baseUrl}${metadata.image}` : null
    };
}

/**
 * Calculate reading time in minutes
 */
export function getReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate table of contents from HTML
 */
export function generateTableOfContents(html: string) {
    const headingRegex = /<h([2-3]).*?id="([^"]*)"[^>]*>([^<]+)<\/h\1>/g;
    const toc: Array<{ level: number; text: string; id: string }> = [];

    let match;
    while ((match = headingRegex.exec(html)) !== null) {
        toc.push({
            level: parseInt(match[1]),
            text: match[3],
            id: match[2]
        });
    }

    return toc;
}
