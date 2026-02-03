import { z } from 'zod';

const blockSchema = z.object({
    type: z.string(),
    data: z.record(z.string(), z.any()).optional()
});

/**
 * Common fields for all content types
 */
const baseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required').optional(),
    slug: z.string().min(1, 'Slug is required').optional(),
    date: z.any().optional(),
    brandColor: z.string().optional(),
    accentColor: z.string().optional(),
    ogImage: z.string().optional(),
    published: z.boolean().optional().default(true),
    sitemap: z.boolean().optional().default(true),
});

/**
 * Specific schema for Blog posts
 */
export const blogSchema = baseSchema.extend({
    author: z.string().default('Heinze Media Team'),
    tags: z.string().optional(), // Usually comma separated string in frontmatter
    featured: z.string().optional().transform(v => v === 'true'),
});

/**
 * Specific schema for Work/Portfolio items
 */
export const workSchema = baseSchema.extend({
    category: z.string().optional(),
    client: z.string().optional(),
    thumbnail: z.string().optional(),
    src: z.string().optional(), // 3D Model source
});

/**
 * Specific schema for general Pages
 */
export const pageSchema = baseSchema.extend({
    layout: z.string().optional().default('default'),
    blocks: z.array(blockSchema).optional(),
    theme: z.string().optional(),
});

export type BlogEntry = z.infer<typeof blogSchema>;
export type WorkEntry = z.infer<typeof workSchema>;
export type PageEntry = z.infer<typeof pageSchema>;
