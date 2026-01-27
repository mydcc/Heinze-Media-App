
import fs from 'node:fs';
import path from 'node:path';
import { error, type ServerLoad } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/content/render';

const ROOT = process.cwd();

export const prerender = false;

// Typ für erlaubte Dokumentnamen (nur Buchstaben, Zahlen, Bindestrich, Unterstrich)
type DocumentName = string & { __brand: 'DocumentName' };

function isValidDocumentName(name: string): name is DocumentName {
    return /^[a-zA-Z0-9_-]+$/.test(name);
}

/**
 * Lädt ein Markdown-Dokument anhand des Namens aus dem Dateisystem.
 * @throws 404, wenn das Dokument nicht existiert oder der Name ungültig ist.
 */
export const load: ServerLoad = async ({ params }) => {
    const name = params.name;

    if (typeof name !== 'string' || !isValidDocumentName(name)) {
        throw error(404, 'Ungültiger Dokumentname');
    }

    const filePath = path.join(ROOT, `${name}.md`);

    if (!fs.existsSync(filePath)) {
        throw error(404, 'Document not found');
    }

    const markdown = fs.readFileSync(filePath, 'utf-8');
    const html = await renderMarkdown(markdown);

    return { html, title: name };
};
