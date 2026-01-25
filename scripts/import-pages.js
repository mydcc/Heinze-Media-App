import fs from 'fs';
import xml2js from 'xml2js';
import path from 'path';

const xmlPath = 'heinzemedia.WordPress.2026-01-24.xml';
const outputDir = 'src/content/pages';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function importPages() {
    try {
        const parser = new xml2js.Parser();
        const data = fs.readFileSync(xmlPath);
        const result = await parser.parseStringPromise(data);

        const channels = result.rss.channel;

        console.log('--- Importing Pages ---');

        let count = 0;

        for (const channel of channels) {
            if (!channel.item) continue;

            const pages = channel.item.filter(item =>
                item['wp:post_type'][0] === 'page' &&
                item['wp:status'][0] === 'publish'
            );

            for (const p of pages) {
                const title = p.title[0];
                const slug = p['wp:post_name'][0];
                const content = p['content:encoded'][0];
                const date = p.pubDate ? p.pubDate[0] : new Date().toISOString();

                // Skip if no slug (e.g. some drafts might have issues, but we filtered for publish)
                if (!slug) continue;

                const filePath = path.join(outputDir, `${slug}.md`);

                // Create Frontmatter + Content
                const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
slug: "${slug}"
---

${content}
`;
                fs.writeFileSync(filePath, fileContent);
                console.log(`✅ Imported: ${slug}`);
                count++;
            }
        }

        console.log(`\nSuccessfully imported ${count} pages to ${outputDir}`);

    } catch (e) {
        console.error('Error importing pages:', e);
    }
}

importPages();
