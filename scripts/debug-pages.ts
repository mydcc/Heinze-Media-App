import { getAllPages } from '../src/lib/server/pages';

async function main() {
    console.log("Fetching all pages...");
    const pages = await getAllPages();
    console.log(`Found ${pages.length} pages.`);

    pages.forEach(p => {
        console.log(`Slug: '${p.slug}' | Title: '${p.meta.title}'`);
    });
}

main().catch(console.error);
