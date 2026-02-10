import fs from 'fs';
import path from 'path';

const CONTENT_DIR = 'src/content/de/pages';

function getFrontmatter(content) {
    const match = content.match(/^---[\s\S]*?---\n/);
    if (!match) return null;
    
    const fmText = match[0].replace(/---/g, '').trim();
    const result = {};
    
    fmText.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
            result[key] = val;
        }
    });
    return result;
}

function runCheck() {
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
    console.log(`Checking ${files.length} files in ${CONTENT_DIR}...\n`);
    
    files.forEach(file => {
        const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
        const fm = getFrontmatter(content);
        
        if (fm && fm.published) {
            console.log(`- ${file.padEnd(40)} | published: ${fm.published}`);
        } else {
            console.log(`- ${file.padEnd(40)} | published: MISSING`);
        }
    });
}

runCheck();