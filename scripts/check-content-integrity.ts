import fs from 'fs';
import path from 'path';

const CONTENT_DIR = 'src/content';
const MARKDOWN_EXT = ['.md', '.mdx'];

function getAllFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries.map(entry => {
        const res = path.resolve(dir, entry.name);
        if (entry.isDirectory()) return getAllFiles(res);
        if (MARKDOWN_EXT.includes(path.extname(entry.name))) return [res];
        return [];
    });
    return files.flat();
}

function check() {
    console.log("Checking content integrity...");
    const files = getAllFiles(CONTENT_DIR);
    let corruptCount = 0;

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        if (!content || content.trim().length === 0) {
            console.error(`❌ EMPTY FILE: ${file}`);
            corruptCount++;
        } else if (!content.startsWith('---')) {
            console.error(`❌ MISSING FRONTMATTER: ${file}`);
            corruptCount++;
        }
    });

    console.log(`Scan complete. Found ${corruptCount} corrupt files.`);
}

check();
