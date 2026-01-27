#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = path.resolve(__dirname, '..');

function findHrefMatches() {
    const files = glob.sync('**/*.{svelte,html,md,ts,js}', { cwd: root, nodir: true, ignore: ['node_modules/**', 'build/**', 'dist/**'] });
    const hrefs = new Map();

    const hrefRegex = /href=\"(\/[^\"#?> ]*)(?:[\"#? >])/g;

    for (const file of files) {
        const full = path.join(root, file);
        let content;
        try {
            content = fs.readFileSync(full, 'utf8');
        } catch (e) {
            continue;
        }

        let m;
        while ((m = hrefRegex.exec(content))) {
            const href = m[1];
            if (!href.startsWith('/')) continue;
            if (!hrefs.has(href)) hrefs.set(href, new Set());
            hrefs.get(href).add(file);
        }
    }
    return hrefs;
}

function targetExists(href) {
    let normalized = href.endsWith('/') && href !== '/' ? href.slice(0, -1) : href;
    // strip leading slash for filesystem checks
    normalized = normalized.replace(/^\//, '');

    const candidates = [];
    // direct repo-relative path (e.g. apps/foo.html or work/item/)
    candidates.push(path.join(root, normalized));
    candidates.push(path.join(root, normalized.replace(/\.html$/, ''), 'index.html'));
    candidates.push(path.join(root, 'static', normalized));
    candidates.push(path.join(root, 'static', normalized + '.html'));
    candidates.push(path.join(root, 'static', normalized + '/index.html'));

    candidates.push(path.join(root, 'build', normalized, 'index.html'));
    candidates.push(path.join(root, 'build', normalized + '.html'));

    const routesBase = path.join(root, 'src', 'routes', normalized);
    candidates.push(path.join(routesBase, '+page.svelte'));
    candidates.push(path.join(routesBase, '+page.server.ts'));
    candidates.push(path.join(routesBase, '+page.ts'));
    candidates.push(path.join(routesBase, '+page.js'));
    candidates.push(path.join(routesBase, '+layout.svelte'));
    candidates.push(path.join(routesBase, 'index.svelte'));
    candidates.push(path.join(routesBase, 'index.html'));
    candidates.push(routesBase);

    candidates.push(path.join(root, 'src', 'content', 'pages', normalized + '.md'));
    candidates.push(path.join(root, 'content', 'pages', normalized + '.md'));
    candidates.push(path.join(root, 'content', normalized + '.md'));

    candidates.push(path.join(root, normalized + '.md'));

    candidates.push(path.join(root, normalized + '.html'));
    candidates.push(path.join(root, normalized, 'index.html'));
    candidates.push(path.join(root, 'apps', normalized + '.html'));
    candidates.push(path.join(root, 'apps', normalized, 'index.html'));
    candidates.push(path.join(root, 'static', 'assets', normalized));

    for (const c of candidates) {
        try {
            if (fs.existsSync(c)) return { ok: true, found: c };
        } catch (e) { }
    }
    // Support Svelte dynamic routes: if a matching dynamic folder exists under src/routes
    try {
        const routesDir = path.join(root, 'src', 'routes');
        const parts = normalized.split('/');
        // try progressively replacing segments with a dynamic folder
        for (let i = parts.length; i > 0; i--) {
            const prefix = parts.slice(0, i - 1).join('/');
            const last = parts[i - 1];
            const parentDir = path.join(routesDir, prefix || '');
            if (fs.existsSync(parentDir)) {
                const entries = fs.readdirSync(parentDir, { withFileTypes: true });
                for (const e of entries) {
                    if (e.isDirectory() && e.name.startsWith('[') && fs.existsSync(path.join(parentDir, e.name, '+page.svelte'))) {
                        return { ok: true, found: path.join(parentDir, e.name, '+page.svelte') };
                    }
                }
            }
        }
    } catch (e) { }
    return { ok: false, checked: candidates };
}

function main() {
    const hrefs = findHrefMatches();
    const results = [];

    for (const [href, sources] of hrefs.entries()) {
        if (href.startsWith('/#') || href.startsWith('/mailto:') || href.startsWith('/tel:')) continue;

        const res = targetExists(href);
        results.push({ href, sources: Array.from(sources), ...res });
    }

    const missing = results.filter(r => !r.ok).sort((a, b) => a.href.localeCompare(b.href));

    console.log(`Checked ${results.length} unique internal hrefs. Missing: ${missing.length}\n`);

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

    process.exit(2);
}

if (require.main === module) main();
