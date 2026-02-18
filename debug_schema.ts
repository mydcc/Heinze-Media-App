import { z } from 'zod';
import fs from 'fs';
import matter from 'gray-matter';

// Recreate the schema parts
const booleanSchema = z.preprocess((val) => {
    if (typeof val === 'string') {
        if (val.toLowerCase() === 'true') return true;
        if (val.toLowerCase() === 'false') return false;
    }
    return val;
}, z.boolean().optional().default(true));

const blockSchema = z.object({
    type: z.string(),
    data: z.record(z.string(), z.any()).optional()
});

const baseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required').optional(),
    slug: z.string().min(1, 'Slug is required').optional(),
    date: z.any().optional(),
    brandColor: z.string().optional(),
    accentColor: z.string().optional(),
    ogImage: z.string().optional(),
    published: booleanSchema,
    sitemap: booleanSchema,
});

const pageSchema = baseSchema.extend({
    layout: z.string().optional().default('default'),
    blocks: z.array(blockSchema).optional(),
    theme: z.string().optional(),
    
    // Updated with explicit record keys
    hero: z.record(z.string(), z.any()).optional(),
    mission: z.record(z.string(), z.any()).optional(),
    journeyTagline: z.string().optional(),
    journeyTitle: z.string().optional(),
    journeyText: z.string().optional(),
    quote: z.string().optional(),
    milestones: z.array(z.record(z.string(), z.any())).optional(),
    techStack: z.array(z.record(z.string(), z.any())).optional(),
    platformComparison: z.record(z.string(), z.any()).optional(),
    showcase: z.array(z.record(z.string(), z.any())).optional(),
    ctaStats: z.array(z.record(z.string(), z.any())).optional(),
    ctaTitle: z.string().optional(),
    ctaTagline: z.string().optional(),
    ctaDescription: z.string().optional(),
    ctaButtonText: z.string().optional(),
    
    tagline: z.string().optional(),
    contactEmail: z.string().optional(),
    locations: z.array(z.string()).optional(),
});

try {
    const fileContent = fs.readFileSync('src/content/pages/about.md', 'utf-8');
    const { data } = matter(fileContent);
    pageSchema.parse(data);
    console.log('Validation Success!');
} catch (e) {
    console.error('Validation Failed:', e);
}
