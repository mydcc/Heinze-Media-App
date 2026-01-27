import fs from 'fs';
import path from 'path';

export async function load() {
    const filePath = path.join(process.cwd(), 'SYSTEM_BRAND_GUIDELINES.md');

    if (!fs.existsSync(filePath)) {
        throw new Error('SYSTEM_BRAND_GUIDELINES.md not found');
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    return {
        content,
        meta: {
            title: 'System Brand Guidelines | HEINZE MEDIA',
            description: 'Technisches Design System und Komponenten-Dokumentation'
        }
    };
}
