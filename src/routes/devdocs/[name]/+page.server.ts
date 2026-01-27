import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/content/render';
import type { PageServerLoad } from './$types';

const ROOT = path.resolve(process.cwd());

export const prerender = false;

export async function load({ params }: Parameters<PageServerLoad>[0]) {
    const { name } = params;
    const file = path.join(ROOT, `${name}.md`);

    if (!fs.existsSync(file)) {
        throw error(404, 'Document not found');
    }

    const markdown = fs.readFileSync(file, 'utf-8');
    const html = await renderMarkdown(markdown);

    return { html, title: name };
}
