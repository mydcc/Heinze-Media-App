import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { globSync } from 'glob';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let hasError = false;

console.log('🚀 Running Pre-Commit Checks...\n');

// 1. Check for Typos in Markdown
console.log('📝 Checking for typos in Markdown files...');
const mdFiles = globSync('src/**/*.md');
const typoPatterns = [
    { regex: /https;\/\//g, message: "Found 'https;//' typo" },
    { regex: /http;\/\//g, message: "Found 'http;//' typo" },
];

mdFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    typoPatterns.forEach(pattern => {
        if (pattern.regex.test(content)) {
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                if (pattern.regex.test(line)) {
                     console.error(`${RED}❌ ${file}:${index + 1} - ${pattern.message}${RESET}`);
                     console.error(`   > ${line.trim()}`);
                }
            });
            hasError = true;
        }
    });
});

if (!hasError) console.log(`${GREEN}✅ No typos found.${RESET}\n`);

// 2. Check for SEO (Frontmatter Description)
console.log('🔍 Checking for SEO (description) in Markdown...');
let seoWarnings = 0;
mdFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.startsWith('---')) {
        const frontmatterEnd = content.indexOf('---', 3);
        if (frontmatterEnd !== -1) {
            const frontmatter = content.substring(0, frontmatterEnd);
            if (!/^description:/m.test(frontmatter)) {
                 console.warn(`${YELLOW}⚠️  ${file} - Missing SEO description${RESET}`);
                 seoWarnings++;
            }
        }
    }
});
if (seoWarnings > 0) {
    console.log(`${YELLOW}Found ${seoWarnings} files with missing description. (Warning only)${RESET}\n`);
} else {
    console.log(`${GREEN}✅ All files have SEO descriptions.${RESET}\n`);
}


// 3. Run TypeScript/Svelte Check
console.log('Typescript Checking Types (npm run check)...');
try {
    // Using check which does svelte-kit sync && svelte-check
    // We suppress output unless it fails to keep it clean, or just inherit.
    execSync('npm run check', { stdio: 'inherit' });
    console.log(`${GREEN}✅ TypeScript checks passed.${RESET}\n`);
} catch (e) {
    console.error(`${RED}❌ TypeScript checks failed.${RESET}\n`);
    hasError = true;
}

// 4. Run Content Check (Schema & Internal Links)
console.log('📄 Checking Content Integrity (Frontmatter & Links)...');
try {
    execSync('npx tsx scripts/check-content.ts', { stdio: 'inherit' });
    console.log(`${GREEN}✅ Content checks passed.${RESET}\n`);
} catch (e) {
    console.error(`${RED}❌ Content checks failed.${RESET}\n`);
    hasError = true;
}

if (hasError) {
    console.error(`${RED}💥 Pre-commit checks failed! Please fix errors above.${RESET}`);
    process.exit(1);
} else {
    console.log(`${GREEN}🎉 All checks passed! Ready to commit.${RESET}`);
    process.exit(0);
}
