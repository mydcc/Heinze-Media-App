import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const targetWordCount = 1000;

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

function stripFrontmatter(content) {
    // Basic regex to remove YAML frontmatter enclosed in ---
    return content.replace(/^---[\s\S]*?---\n/, '');
}

async function analyzeContent() {
    try {
        const files = getAllFiles(contentDir);
        
        console.log(`Analyzing ${files.length} files...\n`);
        console.log(`| File | Language | Type | Word Count | Status |`);
        console.log(`|---|---|---|---|---|`);

        let totalWords = 0;
        let filesUnderTarget = 0;

        for (const file of files) {
            const content = fs.readFileSync(file, 'utf-8');
            const text = stripFrontmatter(content).trim();
            
            // Simple word count: split by whitespace
            // Filter out empty strings from split result
            const wordCount = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
            
            // Determine lang and type from path (e.g., src/content/de/pages/home.md)
            const relativePath = path.relative(contentDir, file);
            const parts = relativePath.split(path.sep);
            
            // Handle structure: src/content/de/pages/home.md OR src/content/pages/home.de.md
            // Based on previous ls -R, it seems to be src/content/{lang}/{type}/{file}
            let lang = 'unknown';
            let type = 'unknown';
            let name = 'unknown';

            if (parts.length >= 3) {
                lang = parts[0];
                type = parts[1];
                name = parts.slice(2).join('/');
            } else {
                 // Fallback for flat structures if any
                 name = relativePath;
            }

            const status = wordCount >= targetWordCount ? '✅' : '⚠️';
            if (wordCount < targetWordCount) filesUnderTarget++;
            totalWords += wordCount;

            console.log(`| ${name} | ${lang} | ${type} | ${wordCount} | ${status} |`);
        }

        console.log(`\n**Summary:**`);
        console.log(`- Total Files: ${files.length}`);
        console.log(`- Files under ${targetWordCount} words: ${filesUnderTarget}`);
        console.log(`- Total Words: ${totalWords}`);

    } catch (e) {
        console.error("Error analyzing files:", e);
    }
}

analyzeContent();