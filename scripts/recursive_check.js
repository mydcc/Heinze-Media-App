import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const types = ['pages', 'blog', 'work'];
const languages = ['de', 'en'];

function getFrontmatter(content) {
    // Corrected Regex
    const match = content.match(/^---[\s\S]*?---\n?/);
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

console.log("Recursive Content Check:\n");

let errors = 0;

languages.forEach(lang => {
    types.forEach(type => {
        const dir = path.join(contentDir, lang, type);
        if (!fs.existsSync(dir)) return;

        const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
        
        console.log(`\nChecking ${lang}/${type} (${files.length} files)...`);

        files.forEach(file => {
            const content = fs.readFileSync(path.join(dir, file), 'utf-8');
            const fm = getFrontmatter(content);
            
            if (!fm) {
                console.log(`❌ ${file} - Missing Frontmatter`);
                errors++;
                return;
            }

            // Check published
            if (fm.published) {
                const val = fm.published;
                // Our schema now accepts 'true'/'false' strings, so we only flag really weird stuff
                if (val !== 'true' && val !== 'false' && val !== true && val !== false) {
                     console.log(`❌ ${file} - Invalid 'published': ${val}`);
                     errors++;
                }
            } else {
                // Missing is fine (defaults to true)
            }
        });
    });
});

console.log(`\n\nTotal Errors: ${errors}`);
if (errors === 0) console.log("✅ All checks passed.");