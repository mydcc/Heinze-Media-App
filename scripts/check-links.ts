import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Configuration
const BASE_URL = 'http://localhost:4173'; // Preview server port
const START_PATH = '/';

// State
const visited = new Set<string>();
const queue: string[] = [START_PATH];
const brokenLinks: { source: string; target: string; reason: string }[] = [];

// Helper to normalize URLs
function normalizeUrl(url: string): string {
    try {
        const u = new URL(url, BASE_URL);
        return u.pathname + u.search;
    } catch {
        return url;
    }
}

async function fetchPage(urlPath: string) {
    const fullUrl = new URL(urlPath, BASE_URL).toString();
    try {
        const res = await fetch(fullUrl);
        const text = await res.text();
        return { status: res.status, text, url: res.url };
    } catch (e: any) {
        return { status: 0, text: '', error: e.message };
    }
}

async function crawl() {
    console.log(`🕷️  Starting crawl at ${BASE_URL}...`);

    while (queue.length > 0) {
        const currentPath = queue.shift()!;
        if (visited.has(currentPath)) continue;
        visited.add(currentPath);

        process.stdout.write(`Checking ${currentPath}... `);

        const { status, text, error } = await fetchPage(currentPath);

        if (error || status >= 400) {
            console.log(`❌ ${status || 'Error'}`);
            brokenLinks.push({ source: 'crawl-queue', target: currentPath, reason: error || `HTTP ${status}` });
            continue;
        }

        // Check for "Fake 404" (AdminGuard or similar soft 404s)
        if (text.includes('Page Not Found') && text.includes('Admin Draft')) {
            console.log(`⛔ Fake 404 (Admin Blocked)`);
            brokenLinks.push({ source: 'crawl-queue', target: currentPath, reason: 'Fake 404 (AdminGuard)' });
            continue;
        }

        // Also check generic "Page Not Found" if not admin guarded but still empty/broken svelte page
        if (text.includes('<h1 class="text-9xl font-bold') && text.includes('404')) {
            console.log(`⛔ Soft 404 (Component)`);
            brokenLinks.push({ source: 'crawl-queue', target: currentPath, reason: 'Soft 404 (Content Missing)' });
            continue;
        }

        console.log(`✅`);

        // Parse HTML to find links
        const dom = new JSDOM(text);
        const doc = dom.window.document;
        const anchors = doc.querySelectorAll('a');

        anchors.forEach((a) => {
            const href = a.getAttribute('href');
            if (!href) return;

            // Ignore external links, anchors, mailto, tel
            if (href.startsWith('http') && !href.startsWith(BASE_URL)) return;
            if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

            const target = normalizeUrl(href);

            // Queue for checking if internal and new
            if (!visited.has(target) && !queue.includes(target)) {
                queue.push(target);
            }
        });
    }

    console.log('\n--- Report ---');
    if (brokenLinks.length === 0) {
        console.log('🎉 No broken links found!');
        process.exit(0);
    } else {
        console.error(`Found ${brokenLinks.length} broken links:`);
        brokenLinks.forEach(b => {
            console.error(`- ${b.target} (Reason: ${b.reason})`);
        });
        process.exit(1);
    }
}

// Check if server is running before starting
fetch(BASE_URL).then(() => {
    crawl();
}).catch(() => {
    console.error(`❌ Could not connect to ${BASE_URL}. Please run 'npm run preview' in another terminal first.`);
    process.exit(1);
});
