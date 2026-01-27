#!/usr/bin/env node

/**
 * Extract Images from WordPress XML
 * Parses XML, finds all image URLs, and logs them with metadata
 * Usage: node scripts/extract-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple XML parser regex (for WordPress export format)
function parseXML(xmlPath) {
    const xmlContent = fs.readFileSync(xmlPath, 'utf-8');

    // Find all image URLs in attachment posts
    const attachmentRegex = /<item>[\s\S]*?<wp:post_type><!\[CDATA\[attachment\]\]><\/wp:post_type>[\s\S]*?<\/item>/g;
    const attachments = xmlContent.match(attachmentRegex) || [];

    // Extract images from content
    const imgRegex = /!\[.*?\]\((https?:\/\/[^\s\)]+\.(jpg|jpeg|png|gif|webp|svg))\)/gi;
    const wpImgRegex = /src=[\'"]?(https?:\/\/heinze-media\.com\/wp-content\/uploads\/[^\s\'"]+)[\'"]?/gi;

    const images = new Set();

    // From attachments
    attachments.forEach(attachment => {
        const guidMatch = attachment.match(/<guid isPermaLink="false"><!\[CDATA\[(https?:\/\/[^\]]+)\]\]><\/guid>/);
        if (guidMatch) {
            images.add({
                url: guidMatch[1],
                type: 'attachment',
                title: attachment.match(/<title><!\[CDATA\[([^\]]*)\]\]><\/title>/)?.[1] || 'Untitled'
            });
        }
    });

    // From content
    const contentMatches = xmlContent.matchAll(wpImgRegex);
    for (const match of contentMatches) {
        images.add({
            url: match[1],
            type: 'embedded',
            title: 'Embedded Image'
        });
    }

    return Array.from(images);
}

// Main execution
const xmlPath = path.join(__dirname, '../heinzemedia.WordPress.2026-01-24.xml');

if (!fs.existsSync(xmlPath)) {
    console.error(`❌ XML file not found: ${xmlPath}`);
    process.exit(1);
}

console.log('🔍 Extracting images from WordPress XML...\n');

const images = parseXML(xmlPath);

if (images.length === 0) {
    console.log('⚠️  No images found in XML.');
    process.exit(0);
}

console.log(`✅ Found ${images.length} images:\n`);

// Group by domain/folder
const grouped = {};
images.forEach(img => {
    const urlObj = new URL(img.url);
    const pathParts = urlObj.pathname.split('/').filter(p => p);
    const folder = pathParts[2] || 'root'; // /wp-content/uploads/2024 -> "2024"

    if (!grouped[folder]) grouped[folder] = [];
    grouped[folder].push(img);
});

// Display organized results
Object.keys(grouped).sort().forEach(folder => {
    console.log(`📁 ${folder}/ (${grouped[folder].length} images)`);
    grouped[folder].slice(0, 3).forEach(img => {
        console.log(`   - ${path.basename(img.url)}`);
    });
    if (grouped[folder].length > 3) {
        console.log(`   ... and ${grouped[folder].length - 3} more`);
    }
    console.log('');
});

console.log(`\n📊 Summary:`);
console.log(`   Total images: ${images.length}`);
console.log(`   Folders: ${Object.keys(grouped).length}`);

// Save to JSON for next step
const outputPath = path.join(__dirname, '../.cache/images.json');
const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify({ images, grouped }, null, 2));
console.log(`\n✅ Image metadata saved to: .cache/images.json`);
