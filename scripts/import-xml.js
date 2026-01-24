import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import TurndownService from 'turndown';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const XML_FILE = path.join(__dirname, '../heinzemedia.WordPress.2026-01-24.xml');
const OUTPUT_DIR_BLOG = path.join(__dirname, '../src/content/blog');
const OUTPUT_DIR_WORK = path.join(__dirname, '../src/content/work');
const UPLOAD_DIR = path.join(__dirname, '../static/uploads');

// Ensure directories exist
[OUTPUT_DIR_BLOG, OUTPUT_DIR_WORK, UPLOAD_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Initialize Turndown
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

// Helper: Download Image
async function downloadImage(url, datePath) {
    if (!url) return null;

    try {
        const filename = path.basename(url);
        const relativePath = path.join('uploads', datePath, filename);
        const localPath = path.join(__dirname, '../static', relativePath);
        const dir = path.dirname(localPath);

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        // Check if file exists to avoid re-downloading
        if (fs.existsSync(localPath)) {
            // console.log(`Skipping existing: ${filename}`);
            return '/' + relativePath;
        }

        console.log(`Downloading: ${url}`);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(localPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve('/' + relativePath));
            writer.on('error', reject);
        });
    } catch (e) {
        console.error(`Failed to download ${url}: ${e.message}`);
        return url; // Fallback to original URL
    }
}

// Main Import Function
async function importXml() {
    const parser = new xml2js.Parser();
    const xmlData = fs.readFileSync(XML_FILE, 'utf-8');

    parser.parseString(xmlData, async (err, result) => {
        if (err) throw err;

        const channel = result.rss.channel[0];
        const items = channel.item;

        console.log(`Found ${items.length} items in XML.`);

        for (const item of items) {
            const title = item.title[0];
            const postType = item['wp:post_type'][0];
            let pubDateRaw = item.pubDate && item.pubDate[0] ? item.pubDate[0] : null;
            if (!pubDateRaw && item['wp:post_date']) pubDateRaw = item['wp:post_date'][0];

            let date = new Date(pubDateRaw);
            if (isNaN(date.getTime())) date = new Date(); // Fallback to now if invalid

            const pubDate = date.toISOString();
            const contentRaw = item['content:encoded'] ? item['content:encoded'][0] : '';
            const slug = item['wp:post_name'] ? item['wp:post_name'][0] : '';

            // Skip attachments or nav_menu_items for post generation (but images are handled via content/featured parsing usually, 
            // though standard WP export doesn't link featured image easily in item without meta scan)
            if (postType === 'attachment' || postType === 'nav_menu_item') continue;

            // Determine Output Directory
            let outputDir = null;
            if (postType === 'post') outputDir = OUTPUT_DIR_BLOG;
            else if (postType === 'project' || postType === 'work') outputDir = OUTPUT_DIR_WORK; // Adjust based on actual CPT name in XML? 'portfolio'?
            // Check categories/tags to be sure if CPT name is generic

            // Debug CPT
            // console.log(`Processing ${postType}: ${title}`);

            if (!outputDir) continue; // Skip pages for now (manual build) or unknown types

            // Handle Thumbnails (Featured Image)
            // In standard WXR, featured image ID is in <wp:postmeta> with key _thumbnail_id
            let featuredImageId = null;
            if (item['wp:postmeta']) {
                const thumbMeta = item['wp:postmeta'].find(m => m['wp:meta_key'][0] === '_thumbnail_id');
                if (thumbMeta) featuredImageId = thumbMeta['wp:meta_value'][0];
            }
            // We would need to look up the attachment URL by ID from the items list... expensive O(N^2) if naive. 
            // Better to index attachments first.

        }

        // Re-run with Attachment Indexing
        await processWithAttachments(items);
    });
}

async function processWithAttachments(items) {
    // 1. Index Attachments
    const attachments = {};
    items.forEach(item => {
        if (item['wp:post_type'][0] === 'attachment') {
            const id = item['wp:post_id'][0];
            const url = item['wp:attachment_url'][0];
            const date = new Date(item['wp:post_date'][0]);
            const datePath = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
            attachments[id] = { url, datePath };
        }
    });

    console.log(`Indexed ${Object.keys(attachments).length} attachments.`);

    // 2. Process Content
    for (const item of items) {
        const postType = item['wp:post_type'][0];
        if (postType === 'attachment' || postType === 'nav_menu_item') continue;

        const title = item.title ? item.title[0] : 'Untitled';

        let pubDateRaw = item.pubDate && item.pubDate[0] ? item.pubDate[0] : null;
        if (!pubDateRaw && item['wp:post_date']) pubDateRaw = item['wp:post_date'][0];
        let date = new Date(pubDateRaw);
        if (isNaN(date.getTime())) date = new Date();

        const slug = item['wp:post_name'] ? item['wp:post_name'][0] : '';
        const contentHtml = item['content:encoded'] ? item['content:encoded'][0] : '';

        // Determine Category/Type
        let type = 'page';
        let subDir = null;

        // Inspect Categories/Tags
        const categories = item.category ? item.category.map(c => c._ || c) : []; // Simple array of strings

        if (postType === 'post' || categories.includes('News')) {
            type = 'blog';
            subDir = OUTPUT_DIR_BLOG;
        } else if (postType === 'project' || categories.includes('Work') || categories.includes('Portfolio')) {
            type = 'work';
            subDir = OUTPUT_DIR_WORK;
        } else if (postType === 'page' && item['wp:post_parent'][0] === '973') {
            type = 'work';
            subDir = OUTPUT_DIR_WORK;
        } else if (postType === 'page') {
            type = 'page';
            subDir = path.join(__dirname, '../src/content/pages');
            if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });
        }

        if (!subDir) continue; // Skip pages

        // Featured Image
        let featuredImageUrl = null;
        if (item['wp:postmeta']) {
            const thumbMeta = item['wp:postmeta'].find(m => m['wp:meta_key'][0] === '_thumbnail_id');
            if (thumbMeta && attachments[thumbMeta['wp:meta_value'][0]]) {
                const att = attachments[thumbMeta['wp:meta_value'][0]];
                featuredImageUrl = await downloadImage(att.url, att.datePath);
            }
        }

        // Convert Content
        let markdown = turndownService.turndown(contentHtml);

        // Find and download images embedded in content (Markdown format ![alt](url))
        // Regex to find images
        const imgRegex = /!\[.*?\]\((https?:\/\/.*?)\)/g;
        let match;
        const replacements = [];

        while ((match = imgRegex.exec(markdown)) !== null) {
            const originalUrl = match[1];
            // Try to map to attachment date if possible, otherwise use current date/misc
            const datePath = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
            const newUrl = await downloadImage(originalUrl, datePath);
            if (newUrl) {
                replacements.push({ original: originalUrl, new: newUrl });
            }
        }

        // Apply replacements
        for (const rep of replacements) {
            markdown = markdown.split(rep.original).join(rep.new);
        }

        // Create Frontmatter
        const frontmatter = [
            '---',
            `title: "${title.replace(/"/g, '\\"')}"`,
            `date: "${date.toISOString()}"`,
            `slug: "${slug}"`,
            `type: "${type}"`
        ];
        if (featuredImageUrl) frontmatter.push(`image: "${featuredImageUrl}"`);
        if (categories.length) frontmatter.push(`categories: [${categories.map(c => `"${c}"`).join(', ')}]`);
        frontmatter.push('---', '', markdown);

        // Write File
        const filename = `${slug || 'post-' + item['wp:post_id'][0]}.md`;
        fs.writeFileSync(path.join(subDir, filename), frontmatter.join('\n'));
        console.log(`Saved: ${type}/${filename}`);
    }
}

importXml();
