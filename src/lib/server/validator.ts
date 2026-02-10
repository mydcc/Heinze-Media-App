import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { pageSchema, blogSchema, workSchema } from './schemas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '../../../');
const CONTENT_DIR = path.join(ROOT_DIR, 'src/content');
const STATIC_DIR = path.join(ROOT_DIR, 'static');

import matter from 'gray-matter';

/**
 * Validiert die Konsistenz der Markdown-Dateien zwischen DE und EN sowie die Frontmatter-Integrität.
 */
export function validateContent(): string[] {
    const types = ['pages', 'blog', 'work'];
    const report: string[] = [];

    types.forEach(type => {
        const deDir = path.join(CONTENT_DIR, 'de', type);
        const enDir = path.join(CONTENT_DIR, 'en', type);
        const schema = type === 'blog' ? blogSchema : type === 'work' ? workSchema : pageSchema;

        if (!fs.existsSync(deDir)) return;

        const files = fs.readdirSync(deDir).filter((f: string) => f.endsWith('.md'));

        files.forEach((file: string) => {
            const dePath = path.join(deDir, file);
            const enPath = path.join(enDir, file);

            // 1. Check Translation Existence
            if (!fs.existsSync(enPath)) {
                report.push(`[MISSING_TRANSLATION] ${type}/${file} fehlt in 'en'`);
            }

            // 2. Frontmatter Validation (DE)
            const content = fs.readFileSync(dePath, 'utf-8');
            const { data: fm } = matter(content);
            const result = schema.safeParse({ ...fm, slug: fm.slug || file.replace('.md', '') });

            if (!result.success) {
                result.error.issues.forEach(issue => {
                    report.push(`[INVALID_FRONTMATTER] ${type}/de/${file}: ${issue.path.join('.')} - ${issue.message}`);
                });
            } else {
                // 3. Asset Integrity Check (Images/Models)
                const data = result.data as any;
                const assetsToCheck = [data.ogImage, data.thumbnail, data.src];

                assetsToCheck.forEach(asset => {
                    if (asset && typeof asset === 'string' && asset.startsWith('/')) {
                        const assetPath = path.join(STATIC_DIR, asset);
                        if (!fs.existsSync(assetPath)) {
                            report.push(`[MISSING_ASSET] ${type}/de/${file} referenziert ${asset}, Datei existiert nicht in /static`);
                        }
                    }
                });
            }
        });
    });

    if (report.length > 0) {
        console.warn('\n⚠️ --- CONTENT VALIDATION REPORT ---');
        report.forEach(line => console.warn(`  ${line}`));
        console.warn('------------------------------------\n');
    }

    return report;
}
