import { z } from 'zod';

export const frontmatterSchema = z.object({
    title: z.string(),
    date: z.string().optional(),
    published: z.boolean().optional().default(true)
});
