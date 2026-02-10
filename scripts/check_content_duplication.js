import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const types = ['blog', 'pages', 'work'];

function stripFrontmatter(content) {
    // Regex to remove frontmatter: start of string, ---, any char non-greedy, ---, newline
    return content.replace(/^---[\s\S]*?---\n?/, '').trim();
}

console.log("# Translation Status Check (DE vs EN)\n");
console.log(`| Type | File | Status | Content Check |`);
console.log(`|---|---|---|---|`);

let totalFiles = 0;
let identicalFiles = 0;
let emptyFiles = 0;

types.forEach(type => {
    const deDir = path.join(contentDir, 'de', type);
    const enDir = path.join(contentDir, 'en', type);
    
    if (!fs.existsSync(deDir) || !fs.existsSync(enDir)) return;

    const files = fs.readdirSync(deDir).filter(f => f.endsWith('.md')).sort();

    files.forEach(file => {
        const dePath = path.join(deDir, file);
        const enPath = path.join(enDir, file);
        
        if (!fs.existsSync(enPath)) {
             console.log(`| ${type} | ${file} | ❌ Missing EN | - |`);
             return;
        }

        const deContent = fs.readFileSync(dePath, 'utf-8');
        const enContent = fs.readFileSync(enPath, 'utf-8');

        const deText = stripFrontmatter(deContent);
        const enText = stripFrontmatter(enContent);

        totalFiles++;
        
        if (deText.length === 0 && enText.length === 0) {
             console.log(`| ${type} | ${file} | ⚠️ Empty | Both Empty |`);
             emptyFiles++;
        } else if (deText === enText) {
            console.log(`| ${type} | ${file} | ⚠️ **IDENTICAL** | Duplicate Content |`);
            identicalFiles++;
        } else {
             console.log(`| ${type} | ${file} | ✅ Translated | Different |`);
        }
    });
});

console.log(`\n**Summary:**`);
console.log(`- Total Pairs Checked: ${totalFiles}`);
console.log(`- Identical (Untranslated): ${identicalFiles}`);
console.log(`- Empty Files: ${emptyFiles}`);