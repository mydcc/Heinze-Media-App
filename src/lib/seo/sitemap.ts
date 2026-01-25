/**
 * Sitemap Generator für SEO
 * Erstellt dynamisch die sitemap.xml basierend auf den Routen
 */

interface SitemapEntry {
    url: string;
    lastmod?: string;
    priority?: number;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export class SitemapGenerator {
    private baseUrl = 'https://heinze.media';
    private entries: SitemapEntry[] = [];

    /**
     * Add entry to sitemap
     */
    addEntry(url: string, options?: Omit<SitemapEntry, 'url'>) {
        this.entries.push({
            url,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString().split('T')[0],
            ...options
        });
    }

    /**
     * Add multiple static routes
     */
    addStaticRoutes() {
        const staticRoutes: Array<[string, number, string]> = [
            ['/', 1.0, 'daily'],
            ['/about', 0.9, 'monthly'],
            ['/work', 0.9, 'weekly'],
            ['/services', 0.9, 'monthly'],
            ['/blog', 0.8, 'daily'],
            ['/contact', 0.7, 'monthly'],
            ['/metaverse', 0.8, 'monthly'],
            ['/xr-studio', 0.8, 'monthly'],
            ['/solutions', 0.8, 'monthly'],
            ['/offer', 0.7, 'weekly'],
            ['/privacy-policy', 0.5, 'yearly'],
            ['/imprint', 0.5, 'yearly'],
            ['/terms-and-conditions', 0.5, 'yearly'],
            ['/sitemap', 0.3, 'monthly']
        ];

        staticRoutes.forEach(([path, priority, frequency]) => {
            this.addEntry(`${this.baseUrl}${path}`, {
                priority,
                changefreq: frequency as SitemapEntry['changefreq']
            });
        });
    }

    /**
     * Generate XML sitemap
     */
    generateXML(): string {
        const xml = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...this.entries.map(entry => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority.toFixed(1)}</priority>` : ''}
  </url>`),
            '</urlset>'
        ];

        return xml.join('\n');
    }

    /**
     * Generate sitemap index (for multiple sitemaps)
     */
    generateSitemapIndex(sitemaps: Array<{ url: string; lastmod?: string }>): string {
        const xml = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...sitemaps.map(sitemap => `  <sitemap>
    <loc>${escapeXml(sitemap.url)}</loc>
    ${sitemap.lastmod ? `<lastmod>${sitemap.lastmod}</lastmod>` : ''}
  </sitemap>`),
            '</sitemapindex>'
        ];

        return xml.join('\n');
    }

    /**
     * Get entry count
     */
    getEntryCount(): number {
        return this.entries.length;
    }
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
    const xmlChars: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    };

    return str.replace(/[&<>"']/g, char => xmlChars[char] || char);
}

/**
 * Create robots.txt content
 */
export function generateRobotsTxt(): string {
    return `# https://heinze.media/robots.txt
# Generated for HEINZE MEDIA

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/private
Disallow: /*.json$
Disallow: /uploads/drafts/

# Crawl delay in milliseconds
Crawl-delay: 1

# Sitemaps
Sitemap: https://heinze.media/sitemap.xml

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# AdsBot
User-agent: AdsBot-Google
Allow: /
`;
}
