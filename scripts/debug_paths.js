
import { getPage } from './src/lib/server/pages.js';

async function debugPaths() {
    console.log("--- Debugging Content Paths ---");
    const page = await getPage('about', 'pages');
    console.log("Resolved filePath for 'about':", page?.filePath);
    
    // Simulating import.meta.glob (keys are absolute from root)
    const expectedPrefix = "/src/content/";
    if (page?.filePath && !page.filePath.startsWith('/')) {
        console.warn("⚠️ ALERT: filePath does not start with '/', it might fail in +page.ts!");
    } else {
        console.log("✅ filePath starts with '/'");
    }
}

debugPaths().catch(console.error);
