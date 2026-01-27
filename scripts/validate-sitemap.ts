import { getAllPages } from '../src/lib/server/pages';
import { sitemapData } from '../src/lib/data/sitemap';

async function validate() {
    const pages = await getAllPages();
    const slugs = pages.map((p) => p.slug);
    // sitemapData: path ohne führenden Slash und ohne evtl. trailing Slash
    const navLinks = sitemapData.map((item) => item.path.replace(/^\//, '').replace(/\/$/, ''));

    // Orphaned Content
    const orphaned = slugs.filter((slug) => !navLinks.includes(slug));
    if (orphaned.length) {
        console.warn('Orphaned content (not linked in navigation):', orphaned);
    }

    // Broken Links
    const broken = navLinks.filter((slug) => !slugs.includes(slug));
    if (broken.length) {
        console.warn('Broken links (no markdown file found):', broken);
    }
}

validate();
