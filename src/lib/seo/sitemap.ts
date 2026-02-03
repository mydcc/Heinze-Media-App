/**
 * Sitemap Generator für SEO
 * Erstellt dynamisch die sitemap.xml basierend auf den Routen
 */

interface SitemapEntry {
    url: string;
    lastmod?: string;
    priority?: number;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    alternates?: Array<{ href: string; hreflang: string }>;
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
        // Deprecated/Legacy: Static routes are now mostly handled dynamically
        const staticRoutes: Array<[string, number, string]> = [
             // Kept empty to encourage dynamic usage, or can be filled if needed
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
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
            ...this.entries.map(entry => {
                let s = `  <url>\n    <loc>${escapeXml(entry.url)}</loc>`;
                if (entry.lastmod) s += `\n    <lastmod>${entry.lastmod}</lastmod>`;
                if (entry.changefreq) s += `\n    <changefreq>${entry.changefreq}</changefreq>`;
                if (entry.priority) s += `\n    <priority>${entry.priority.toFixed(1)}</priority>`;
                if (entry.alternates) {
                    entry.alternates.forEach(alt => {
                        s += `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}"/>`;
                    });
                }
                s += `\n  </url>`;
                return s;
            }),
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
