import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';

const p = 'src/content/pages/contact.md';
const raw = fs.readFileSync(p, 'utf-8');
const { data, content } = matter(raw);
console.log('Frontmatter:', data);
console.log('Content length:', content.length);
console.log('Rendered HTML:\n', marked(content || ''));
