
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.join(__dirname, '../../content');

/**
 * Validiert die Konsistenz der Markdown-Dateien zwischen DE und EN.
 * Wird im Loader oder dev-mode aufgerufen.
 */
export function validateContent(): string[] {
    const types = ['pages', 'blog', 'work', 'projects'];
    const report: string[] = [];

    types.forEach(type => {
        const deDir = path.join(CONTENT_DIR, 'de', type);
        const enDir = path.join(CONTENT_DIR, 'en', type);

        if (!fs.existsSync(deDir)) return;

        const deFiles = fs.readdirSync(deDir).filter((f: string) => f.endsWith('.md'));

        deFiles.forEach((file: string) => {
            const enPath = path.join(enDir, file);
            if (!fs.existsSync(enPath)) {
                report.push(`[MISSING_TRANSLATION] ${type}/${file} fehlt in 'en'`);
            }
        });
    });

    if (report.length > 0) {
        console.warn('--- CONTENT VALIDATION REPORT ---');
        report.forEach(line => console.warn(line));
        console.warn('---------------------------------');
    }

    return report;
}
