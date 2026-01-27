#!/usr/bin/env node
// Einfaches Node-Skript: Liest `scripts/repos.json` (array von "owner/repo")
// und erzeugt/aktualisiert Markdown-Dateien in `content/projects/`.

import fs from 'fs/promises';
import path from 'path';

const REPOS_FILE = path.resolve(process.cwd(), 'scripts', 'repos.json');
const OUT_DIR = path.resolve(process.cwd(), 'content', 'projects');
const GITHUB_API = 'https://api.github.com/repos/';
const TOKEN = process.env.GITHUB_TOKEN || '';

async function fetchRepo(repo) {
    const res = await fetch(GITHUB_API + repo, TOKEN ? { headers: { Authorization: `token ${TOKEN}` } } : {});
    if (!res.ok) throw new Error(`Fehler beim Laden ${repo}: ${res.status}`);
    return res.json();
}

function toFrontmatter(obj) {
    const fm = {
        title: obj.name,
        repo: `${obj.full_name}`,
        url: obj.html_url,
        description: obj.description || '',
        tags: [obj.language || ''],
        stars: obj.stargazers_count || 0,
        language: obj.language || '',
        featured: false,
        date: obj.updated_at || obj.pushed_at || new Date().toISOString().slice(0, 10)
    };
    return fm;
}

async function writeMarkdown(fm, body) {
    const slug = fm.repo.replace('/', '-').toLowerCase();
    const file = path.join(OUT_DIR, `${slug}.md`);
    const content = ['---',
        Object.entries(fm).map(([k, v]) => {
            if (Array.isArray(v)) return `${k}: [${v.map(x => JSON.stringify(x)).join(', ')}]`;
            if (typeof v === 'string') return `${k}: ${JSON.stringify(v)}`;
            return `${k}: ${v}`;
        }).join('\n'),
        '---', '', body || '']
        .join('\n');
    await fs.mkdir(OUT_DIR, { recursive: true });
    await fs.writeFile(file, content, 'utf8');
    console.log('Wrote', file);
}

async function main() {
    try {
        const reposRaw = await fs.readFile(REPOS_FILE, 'utf8');
        const repos = JSON.parse(reposRaw);
        for (const repo of repos) {
            try {
                const data = await fetchRepo(repo);
                const fm = toFrontmatter(data);
                const body = `Kurze Notiz: Auto-synchronisiert von GitHub.\n\nREADME: ${data.html_url}`;
                await writeMarkdown(fm, body);
            } catch (e) { console.error('Repo fehler:', repo, e.message) }
        }
    } catch (e) {
        console.error('Fehler:', e.message);
        process.exit(1);
    }
}

if (import.meta.url === `file://${process.cwd()}/scripts/sync_github_projects.js` || process.argv[1].endsWith('sync_github_projects.js')) {
    main();
}
