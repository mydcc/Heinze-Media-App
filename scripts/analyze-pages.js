import fs from 'fs';
import xml2js from 'xml2js';

const xmlPath = 'heinzemedia.WordPress.2026-01-24.xml';

async function analyze() {
    try {
        const parser = new xml2js.Parser();
        const data = fs.readFileSync(xmlPath);
        const result = await parser.parseStringPromise(data);

        const channels = result.rss.channel;

        console.log('--- Analyzing Pages ---');

        for (const channel of channels) {
            if (!channel.item) continue;

            const pages = channel.item.filter(item =>
                item['wp:post_type'][0] === 'page' &&
                item['wp:status'][0] === 'publish'
            );

            console.log(`Found ${pages.length} published pages:\n`);

            pages.forEach(p => {
                console.log(`- Title: ${p.title[0]}`);
                console.log(`  Slug:  ${p['wp:post_name'][0]}`);
                console.log(`  Link:  ${p.link[0]}`);
                console.log('-----------------------------');
            });
        }

    } catch (e) {
        console.error('Error parsing XML:', e);
    }
}

analyze();
