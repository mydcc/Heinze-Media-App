#!/usr/bin/env node

/**
 * Extract Content from WordPress XML
 * Extracts Pages, Posts, and Blog articles for migration
 * Usage: node scripts/extract-content.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple XML parser for WordPress export
function parseContent(xmlPath) {
    const xmlContent = fs.readFileSync(xmlPath, 'utf-8');

    const items = {
        pages: [],
        posts: [],
        blog: [],
        attachments: []
    };

    // Split by item tags
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlContent)) !== null) {
        const itemContent = match[1];

        // Extract basic fields
        const titleMatch = itemContent.match(/<title><!\[CDATA\[([^\]]*)\]\]><\/title>/);
        const linkMatch = itemContent.match(/<link>([^<]+)<\/link>/);
        const descMatch = itemContent.match(/<description><!\[CDATA\[([^\]]*)\]\]><\/description>/);
        const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
        const creatorMatch = itemContent.match(/<dc:creator><!\[CDATA\[([^\]]*)\]\]><\/dc:creator>/);
        const dateMatch = itemContent.match(/<wp:post_date><!\[CDATA\[([^\]]*)\]\]><\/wp:post_date>/);
        const slugMatch = itemContent.match(/<wp:post_name><!\[CDATA\[([^\]]*)\]\]><\/wp:post_name>/);
        const statusMatch = itemContent.match(/<wp:status><!\[CDATA\[([^\]]*)\]\]><\/wp:status>/);
        const typeMatch = itemContent.match(/<wp:post_type><!\[CDATA\[([^\]]*)\]\]><\/wp:post_type>/);
        const parentMatch = itemContent.match(/<wp:post_parent>(\d+)<\/wp:post_parent>/);

        const type = typeMatch ? typeMatch[1] : 'post';
        const status = statusMatch ? statusMatch[1] : 'draft';

        // Skip drafts and private posts
        if (status !== 'publish') continue;

        const item = {
            id: itemContent.match(/<wp:post_id>(\d+)<\/wp:post_id>/)?.[1],
            title: titleMatch ? titleMatch[1] : '',
            slug: slugMatch ? slugMatch[1] : '',
            link: linkMatch ? linkMatch[1] : '',
            description: descMatch ? descMatch[1] : '',
            content: contentMatch ? contentMatch[1] : '',
            author: creatorMatch ? creatorMatch[1] : 'Patrick Heinze',
            date: dateMatch ? dateMatch[1] : new Date().toISOString(),
            status: status,
            type: type,
            parentId: parentMatch ? parseInt(parentMatch[1]) : null
        };

        if (!item.title || !item.link) continue; // Skip invalid items

        // Categorize by type
        switch (type) {
            case 'attachment':
                items.attachments.push(item);
                break;
            case 'page':
                items.pages.push(item);
                break;
            case 'post':
                // Determine if it's blog or regular post
                if (item.link.includes('/blog/')) {
                    items.blog.push(item);
                } else {
                    items.posts.push(item);
                }
                break;
        }
    }

    return items;
}

// Convert HTML to Markdown (basic)
function htmlToMarkdown(html) {
    if (!html) return '';

    let md = html
        // Headers
        .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
        // Lists
        .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '$1')
        .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '$1')
        .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
        // Emphasis
        .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
        .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
        .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
        .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')
        // Links
        .replace(/<a[^>]*href=["']([^"']*?)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
        // Images
        .replace(/<img[^>]*src=["']([^"']*?)["'][^>]*alt=["']([^"']*?)["'][^>]*>/gi, '![$2]($1)')
        // Paragraphs
        .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
        .replace(/<br\s*\/?>/gi, '\n')
        // Clean up
        .replace(/<[^>]+>/gi, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/\n\n\n+/gi, '\n\n');

    return md.trim();
}

// Generate Markdown files
function generateMarkdownFiles(items, outputDir) {
    const created = { pages: 0, blog: 0, posts: 0 };

    // Create directories
    [
        path.join(outputDir, 'content/pages'),
        path.join(outputDir, 'content/blog'),
        path.join(outputDir, 'content/work')
    ].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    // Create page files
    items.pages.forEach((page, idx) => {
        if (!page.slug) page.slug = `page-${idx}`;

        const filename = `${page.slug}.md`;
        const filepath = path.join(outputDir, 'content/pages', filename);

        const mdContent = `---
title: "${page.title}"
description: "${page.description || page.title}"
date: ${new Date(page.date).toISOString()}
author: "${page.author}"
slug: "${page.slug}"
---

${htmlToMarkdown(page.content || page.description)}
`;

        fs.writeFileSync(filepath, mdContent);
        created.pages++;
        console.log(`   ✓ ${filename}`);
    });

    // Create blog files
    items.blog.forEach((post, idx) => {
        if (!post.slug) post.slug = `blog-${idx}`;

        const filename = `${post.slug}.md`;
        const filepath = path.join(outputDir, 'content/blog', filename);

        const mdContent = `---
title: "${post.title}"
description: "${post.description || post.title}"
date: ${new Date(post.date).toISOString()}
author: "${post.author}"
slug: "${post.slug}"
---

${htmlToMarkdown(post.content || post.description)}
`;

        fs.writeFileSync(filepath, mdContent);
        created.blog++;
        console.log(`   ✓ ${filename}`);
    });

    // Create work/portfolio files
    items.posts.forEach((post, idx) => {
        if (!post.slug) post.slug = `work-${idx}`;

        const filename = `${post.slug}.md`;
        const filepath = path.join(outputDir, 'content/work', filename);

        const mdContent = `---
title: "${post.title}"
description: "${post.description || post.title}"
date: ${new Date(post.date).toISOString()}
author: "${post.author}"
slug: "${post.slug}"
---

${htmlToMarkdown(post.content || post.description)}
`;

        fs.writeFileSync(filepath, mdContent);
        created.posts++;
        console.log(`   ✓ ${filename}`);
    });

    return created;
}

// Main execution
async function main() {
    const xmlPath = path.join(__dirname, '../heinzemedia.WordPress.2026-01-24.xml');
    const outputDir = path.join(__dirname, '..');

    if (!fs.existsSync(xmlPath)) {
        console.error(`❌ XML file not found: ${xmlPath}`);
        process.exit(1);
    }

    console.log('🔄 Extracting content from WordPress XML...\n');

    const items = parseContent(xmlPath);

    console.log(`✅ Content extracted:`);
    console.log(`   Pages: ${items.pages.length}`);
    console.log(`   Blog posts: ${items.blog.length}`);
    console.log(`   Portfolio items: ${items.posts.length}`);
    console.log(`   Attachments: ${items.attachments.length}\n`);

    console.log('📝 Generating Markdown files...\n');

    const created = generateMarkdownFiles(items, outputDir);

    console.log(`\n${'═'.repeat(50)}`);
    console.log(`✅ Content migration complete:`);
    console.log(`   Pages created: ${created.pages}`);
    console.log(`   Blog posts created: ${created.blog}`);
    console.log(`   Portfolio items created: ${created.posts}`);
    console.log(`${'═'.repeat(50)}\n`);

    // Save metadata
    const metadata = {
        timestamp: new Date().toISOString(),
        totalItems: items.pages.length + items.blog.length + items.posts.length,
        pages: items.pages.map(p => ({ title: p.title, slug: p.slug })),
        blogPosts: items.blog.map(p => ({ title: p.title, slug: p.slug, date: p.date })),
        portfolioItems: items.posts.map(p => ({ title: p.title, slug: p.slug }))
    };

    const metadataPath = path.join(__dirname, '../.cache/content-metadata.json');
    const metadataDir = path.dirname(metadataPath);

    if (!fs.existsSync(metadataDir)) {
        fs.mkdirSync(metadataDir, { recursive: true });
    }

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    console.log('📊 Metadata saved to: .cache/content-metadata.json');
    console.log('📂 Content files location: src/content/\n');
}

main().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
