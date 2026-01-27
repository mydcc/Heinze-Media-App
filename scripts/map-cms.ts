import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Mock getAllPages logic using FS
async function getAllPages() {
    const contentDir = path.resolve('src/content');
    const pages: any[] = [];
    const files = getAllFiles(contentDir);

    for (const file of files) {
        // Slug generation logic mirroring src/lib/server/pages.ts
        let relativePath = path.relative(contentDir, file);
        let slug = relativePath
            .replace(/\.md$/, '')
            .replace(/\/index$/, '');

        slug = slug.replace(/^pages\//, '').replace(/^blog\//, '').replace(/^work\//, '');

        const raw = fs.readFileSync(file, 'utf-8');
        const { data } = matter(raw);

        pages.push({
            slug,
            meta: data,
            path: file
        });
    }
    return pages;
}

async function main() {
    console.log("--- CMS Content Map ---");
    console.log("Scanning content...");

    // 1. Raw File Scan
    const contentDir = 'src/content';
    const rawFiles = getAllFiles(contentDir);
    console.log(`\nFound ${rawFiles.length} raw markdown files in ${contentDir}:`);
    rawFiles.forEach(f => console.log(` - ${f}`));

    // 2. Logic Scan
    console.log("\nExecuting getAllPages()...");
    const pages = await getAllPages();
    console.log(`getAllPages() returned ${pages.length} pages.`);

    console.log("\n--- Page Mapping ---");
    pages.forEach(p => {
        console.log(`[Slug: '${p.slug}']`);
        console.log(`  Title: ${p.meta.title}`);
        console.log(`  Date: ${p.meta.date}`);
        console.log(`  Published: ${p.meta.published}`);
        // console.log(`  Source: (Can't trace back easily without modifying getAllPages, but based on slug...)`);
    });

    console.log("\n--- Debugging Specific Slugs ---");
    const target = 'about';
    const found = pages.find(p => {
        const parts = p.slug.split('/');
        return parts[parts.length - 1] === target;
    });

    if (found) {
        console.log(`✅ MATCH FOUND for query '${target}':`);
        console.log(`   Slug: ${found.slug}`);
    } else {
        console.log(`❌ NO MATCH for query '${target}'`);
        console.log("   Reason: No slug's basename matches 'about'.");
    }
}

function getAllFiles(dir: string, fileList: string[] = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            if (filePath.endsWith('.md')) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

main().catch(console.error);
