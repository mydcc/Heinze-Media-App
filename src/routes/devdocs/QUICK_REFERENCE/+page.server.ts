import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/content/render';

const ROOT = path.resolve(process.cwd());

export const prerender = false;

export async function load() {
    const file = path.join(ROOT, 'QUICK_REFERENCE.md');
    if (!fs.existsSync(file)) throw error(404, 'Not found');
    const markdown = fs.readFileSync(file, 'utf-8');
    const html = await renderMarkdown(markdown);
    return { html, title: 'Quick Reference' };
}
