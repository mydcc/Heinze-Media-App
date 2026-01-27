/**
 * Content Types
 */

export interface ContentMetadata {
    title: string;
    description?: string;
    date?: string;
    author?: string;
    slug: string;
    keywords?: string;
    image?: string;
    [key: string]: any;
}

export interface ContentItem {
    metadata: ContentMetadata;
    content: string;
    html?: string;
    readingTime?: number;
    tableOfContents?: Array<{ level: number; text: string; id: string }>;
}

export interface SEOMeta {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    date?: string;
    image?: string;
    url: string;
}
