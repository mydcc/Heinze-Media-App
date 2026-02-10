
import { getPage } from './src/lib/server/pages.js';

async function test() {
    console.log("Testing getPage('about', 'pages')...");
    const pageDe = await getPage('about', 'pages');
    console.log("DE Title:", pageDe?.meta.title);
    console.log("DE Layout:", pageDe?.meta.layout);
}

test().catch(console.error);
