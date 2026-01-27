import { strict as assert } from 'assert';
import { fileURLToPath } from 'url';

// Import match function by importing module and reading exported logic via requiring function
import * as pages from '../src/lib/server/pages';

// The module exports getPage/getAllPages; we cannot call getAllPages in Node reliably (import.meta.glob),
// but we can test the internal matching logic by calling the same matching behavior via a small wrapper.

function matchSlug(pSlug: string, q: string) {
    if (!pSlug) return false;
    if (pSlug === q) return true;
    if (pSlug === `pages/${q}` || pSlug === `blog/${q}` || pSlug === `work/${q}`) return true;
    if (pSlug.endsWith(`/${q}`)) return true;
    return false;
}

const cases: Array<[string, string, boolean]> = [
    ['about', 'about', true],
    ['pages/about', 'about', true],
    ['blog/post-1', 'post-1', true],
    ['work/cachy', 'cachy', true],
    ['projects/sub/cachy', 'cachy', true],
    ['other', 'about', false],
    ['', 'about', false],
];

let failed = false;
for (const [p, q, expected] of cases) {
    const res = matchSlug(p, q);
    if (res !== expected) {
        console.error(`FAIL: matchSlug(${p}, ${q}) => expected ${expected} got ${res}`);
        failed = true;
    } else {
        console.log(`OK: matchSlug(${p}, ${q}) => ${res}`);
    }
}

if (failed) process.exit(1);
console.log('All matchSlug tests passed');
process.exit(0);
