#!/usr/bin/env node
import fsPromises from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// Concurrency limit to avoid EMFILE errors
const CONCURRENCY_LIMIT = 20;

async function mapConcurrent(items, fn, limit = CONCURRENCY_LIMIT) {
    const results = [];
    const executing = new Set();
    for (const item of items) {
        const p = Promise.resolve().then(() => fn(item));
        results.push(p);
        executing.add(p);
        const clean = () => executing.delete(p);
        p.then(clean).catch(clean);
        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }
    return Promise.all(results);
}

async function findHrefMatches() {
    // fs.globSync is Node 22+; since project uses Node 22 as confirmed in env
    const files = fs.globSync('**/*.{svelte,html,md,ts,js}', { cwd: root, exclude: (dirent) => ['node_modules', 'build', 'dist', '.git'].includes(dirent.name) });
    const hrefs = new Map();

    const results = await mapConcurrent(files, async (file) => {
        const full = path.join(root, file);
        try {
            const content = await fsPromises.readFile(full, 'utf8');
            const fileHrefs = [];
            const hrefRegex = /href=\"(\/[^\"#?> ]*)(?:[\"#? >])/g;
            let m;
            while ((m = hrefRegex.exec(content))) {
                const href = m[1];
                if (href.startsWith('/')) {
                   fileHrefs.push(href);
                }
            }
            return { file, hrefs: fileHrefs };
        } catch (e) {
            return null;
        }
    });

    for (const res of results) {
        if (!res) continue;
        for (const href of res.hrefs) {
            if (!hrefs.has(href)) hrefs.set(href, new Set());
            hrefs.get(href).add(res.file);
        }
    }
    return hrefs;
}

async function targetExists(href) {
    // Normalize: strip trailing slash except root
    const normalized = href.endsWith('/') && href !== '/' ? href.slice(0, -1) : href;

    // Possible targets to check (in order)
    const candidates = [];

    // static files (public/static served root)
    candidates.push(path.join(root, 'static', normalized));
    candidates.push(path.join(root, 'static', normalized + '.html'));
    candidates.push(path.join(root, 'static', normalized + '/index.html'));

    // build output
    candidates.push(path.join(root, 'build', normalized, 'index.html'));
    candidates.push(path.join(root, 'build', normalized + '.html'));

    // src/routes
    const routesBase = path.join(root, 'src', 'routes', normalized);
    candidates.push(path.join(routesBase, '+page.svelte'));
    candidates.push(path.join(routesBase, '+page.server.ts'));
    candidates.push(path.join(routesBase, '+page.ts'));
    candidates.push(path.join(routesBase, '+page.js'));
    candidates.push(path.join(routesBase, '+layout.svelte'));
    candidates.push(path.join(routesBase, 'index.svelte'));
    candidates.push(path.join(routesBase, 'index.html'));
    candidates.push(routesBase); // directory exists

    // content pages
    candidates.push(path.join(root, 'src', 'content', 'pages', normalized + '.md'));
    candidates.push(path.join(root, 'content', 'pages', normalized + '.md'));
    candidates.push(path.join(root, 'content', normalized + '.md'));

    // docs at repo root
    candidates.push(path.join(root, normalized + '.md'));

    // apps/static HTML under apps/ or assets/
    candidates.push(path.join(root, normalized + '.html'));
    candidates.push(path.join(root, normalized, 'index.html'));
    candidates.push(path.join(root, 'apps', normalized + '.html'));
    candidates.push(path.join(root, 'apps', normalized, 'index.html'));
    candidates.push(path.join(root, 'static', 'assets', normalized));

    for (const c of candidates) {
        try {
            await fsPromises.access(c, fs.constants.F_OK);
            return { ok: true, found: c };
        } catch (e) { }
    }
    return { ok: false, checked: candidates };
}

async function main() {
    const hrefs = await findHrefMatches();

    const results = await mapConcurrent(Array.from(hrefs.entries()), async ([href, sources]) => {
        if (href.startsWith('/#') || href.startsWith('/mailto:') || href.startsWith('/tel:')) return null;
        const res = await targetExists(href);
        return { href, sources: Array.from(sources), ...res };
    });

    const filteredResults = results.filter(Boolean);
    const missing = filteredResults.filter(r => !r.ok).sort((a, b) => a.href.localeCompare(b.href));
    console.log(`Checked ${filteredResults.length} unique internal hrefs. Missing: ${missing.length}\n`);

    if (missing.length === 0) {
        console.log('No missing internal targets found.');
        process.exit(0);
    }

    for (const m of missing) {
        console.log('MISSING:', m.href);
        console.log('  referenced in:');
        for (const s of m.sources.slice(0, 10)) console.log('   -', s);
        if (m.sources.length > 10) console.log('   -', `...+${m.sources.length - 10} more`);
        console.log('  checked candidates:');
        for (const c of m.checked.slice(0, 10)) console.log('   -', path.relative(root, c));
        if (m.checked.length > 10) console.log('   -', `...+${m.checked.length - 10} more`);
        console.log('');
    }

    // Exit non-zero for CI
    process.exit(2);
}

main();
