export interface RouteEntry {
    title: string;
    path: string;
    public: boolean;
    category?: 'default' | 'free' | 'pro' | 'special';
    description?: string;
    children?: RouteEntry[];
}

export const sitemapData: RouteEntry[] = [
    // --- MAIN PAGES ---
    { title: 'Home', path: '/', public: true, category: 'default' },
    { title: 'About', path: '/about', public: true, category: 'default' },
    { title: 'Work', path: '/work', public: true, category: 'default' },
    { title: 'Metaverse', path: '/metaverse', public: true, category: 'default' },
    { title: 'News (Blog)', path: '/blog', public: true, category: 'default' },
    { title: 'Contact', path: '/contact', public: true, category: 'default' },

    // --- LEGAL ---
    { title: 'Imprint', path: '/imprint', public: true, category: 'default' },
    { title: 'Privacy Policy', path: '/privacy-policy', public: true, category: 'default' },
    { title: 'Terms & Conditions', path: '/terms-and-conditions', public: true, category: 'default' },
    { title: 'Solutions', path: '/solutions', public: true, category: 'default' },
    { title: 'XR Studio', path: '/xr-studio', public: true, category: 'default' },

    // --- LANDING PAGES / OFFERS (DRAFTS / HIDDEN) ---
    {
        title: 'Free Ebook: SEO Checklist',
        path: '/offer/free-ebook',
        public: false, // Admin Only
        category: 'free',
        description: 'Lead Magnet Landing Page (Green Theme)'
    },
    {
        title: 'Service: XR Studio Professional',
        path: '/services/xr-studio',
        public: false, // Admin Only
        category: 'pro',
        description: 'High-End Service Page (Blue Theme)'
    },
    {
        title: 'Special Deal: 50% Off',
        path: '/offer/special-deal',
        public: false, // Admin Only
        category: 'special',
        description: 'Sales Page for Black Friday etc. (Red Theme)'
    }
];
