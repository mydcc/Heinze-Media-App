import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.resolve('src/content');
const MARKDOWN_EXT = ['.md', '.mdx'];

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(entries.map(async entry => {
        const res = path.resolve(dir, entry.name);
        if (entry.isDirectory()) return getAllMarkdownFiles(res);
        if (MARKDOWN_EXT.includes(path.extname(entry.name))) return [res];
        return [];
    }));
    return files.flat();
}

async function fixFile(file: string) {
    try {
        const rawContent = await fs.readFile(file, 'utf-8');

        // Count separators
        const matches = rawContent.match(/^---$/gm);
        if (!matches || matches.length <= 2) {
            // Probably fine (0, 1 or 2 separators)
            // Even if 0 or 1, gray-matter handles it or it's just content
            return false;
        }

        console.log(`Fixing ${path.basename(file)} (${matches.length} separators)...`);

        // Heuristic: The LAST valid frontmatter block is usually the one we want if they are stacked.
        // But simply parsing with gray-matter usually grabs the FIRST one and puts the rest in content.
        // If the file looks like:
        // ---
        // (frontmatter 1)
        // ---
        // (content 1)
        // ---
        // (frontmatter 2)
        // ---
        // (content 2)
        //
        // This is tricky. Usually in these "corruption" cases (e.g. from automated tools), 
        // the file content is duplicated or appended.
        // Let's inspect the `home.md` example provided by the user.
        // It had frontmatter, then content, then frontmatter again (same slug), then content again.
        //
        // Strategy: 
        // 1. Split by `---`
        // 2. Identify likely frontmatter blocks (key-value pairs)
        // 3. Keep the LAST comprehensive frontmatter block and the associated content?
        // 
        // ACTUALLY, looking at the user's `metaverse.md`:
        // It has frontmatter 1, content 1, then frontmatter 2 (duplicate), content 2 (duplicate).
        // It looks like a concatenation.
        // If we simply take the FIRST frontmatter and the content that isn't other frontmatter?
        // Or just take the first split?

        // Let's try to parse it with a regex for the standard Jekyll-style frontmatter.
        // We want to KEEP the first block and the first content, and discard the repetition.
        // OR, if the updates are appended, we might want the LAST one.
        // checking `metaverse.md`, the dates and slugs are identical.
        // Let's assume the FIRST one is correct for now, or that they are identical.

        // Safe approach: Parse the file manually.
        const lines = rawContent.split('\n');
        let separatorCount = 0;
        let cutLineIndex = -1;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === '---') {
                separatorCount++;
            }

            // If we found the 2nd separator (end of first frontmatter), 
            // the content starts after this.
            // If we encounter a 3rd separator later, that marks the start of garbage/duplication.
            if (separatorCount === 3) {
                cutLineIndex = i;
                break;
            }
        }

        if (cutLineIndex !== -1) {
            // Truncate at the 3rd separator
            const newContent = lines.slice(0, cutLineIndex).join('\n');
            await fs.writeFile(file, newContent, 'utf-8');
            console.log(`✅ Truncated ${path.basename(file)} at line ${cutLineIndex + 1} to remove duplicates.`);
            return true;
        }

        return false;

    } catch (e) {
        console.error(`Error processing ${file}:`, e);
        return false;
    }
}

async function main() {
    console.log("Scanning for corrupt markdown files...");
    const files = await getAllMarkdownFiles(CONTENT_DIR);
    let fixedCount = 0;

    for (const file of files) {
        const fixed = await fixFile(file);
        if (fixed) fixedCount++;
    }

    console.log(`\nScan complete. Fixed ${fixedCount} files.`);
}

main().catch(console.error);
