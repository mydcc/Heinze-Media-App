/**
 * JSON-LD Schema generators for SEO
 * Includes Organization, LocalBusiness, BreadcrumbList, etc.
 */

export interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url: string;
    type: 'website' | 'article' | 'product' | 'service';
    author?: string;
    publishDate?: string;
    modifiedDate?: string;
}

export class JSONLDBuilder {
    /**
     * Generate Organization schema for entire site
     */
    static organization() {
        return {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'HEINZE MEDIA',
            'url': 'https://heinze.media',
            'logo': 'https://heinze.media/logo.png',
            'description': 'Your partner for immersive 3D web experiences, Metaverse solutions and XR studios of the next generation.',
            'sameAs': [
                'https://www.linkedin.com/company/heinze-media',
                'https://twitter.com/heinze_media'
            ],
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Placeholder',
                'addressLocality': 'Berlin',
                'postalCode': '10115',
                'addressCountry': 'DE'
            },
            'contactPoint': {
                '@type': 'ContactPoint',
                'contactType': 'Customer Support',
                'email': 'contact@heinze.media',
                'telephone': '+49 30 XXXXX'
            }
        };
    }

    /**
     * Generate WebSite schema with search action
     */
    static website() {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'HEINZE MEDIA',
            'url': 'https://heinze.media',
            'potentialAction': {
                '@type': 'SearchAction',
                'target': {
                    '@type': 'EntryPoint',
                    'urlTemplate': 'https://heinze.media/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
            }
        };
    }

    /**
     * Generate LocalBusiness schema
     */
    static localBusiness() {
        return {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'HEINZE MEDIA',
            'url': 'https://heinze.media',
            'image': 'https://heinze.media/og-image.png',
            'description': 'XR/AR/VR Studio & Metaverse Solutions in Berlin',
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Placeholder',
                'addressLocality': 'Berlin',
                'addressRegion': 'Berlin',
                'postalCode': '10115',
                'addressCountry': 'DE'
            },
            'telephone': '+49 30 XXXXX',
            'priceRange': '$$',
            'openingHoursSpecification': {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens': '09:00',
                'closes': '18:00'
            },
            'sameAs': [
                'https://www.linkedin.com/company/heinze-media',
                'https://twitter.com/heinze_media'
            ]
        };
    }

    /**
     * Generate BreadcrumbList schema
     */
    static breadcrumb(items: Array<{ name: string; url: string }>) {
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': items.map((item, idx) => ({
                '@type': 'ListItem',
                'position': idx + 1,
                'name': item.name,
                'item': item.url
            }))
        };
    }

    /**
     * Generate Article schema for blog posts
     */
    static article(config: {
        headline: string;
        description: string;
        image: string;
        author: string;
        publishDate: string;
        modifiedDate?: string;
        url: string;
    }) {
        return {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': config.headline,
            'description': config.description,
            'image': config.image,
            'datePublished': config.publishDate,
            'dateModified': config.modifiedDate || config.publishDate,
            'author': {
                '@type': 'Person',
                'name': config.author
            },
            'publisher': {
                '@type': 'Organization',
                'name': 'HEINZE MEDIA',
                'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://heinze.media/logo.png'
                }
            },
            'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': config.url
            }
        };
    }

    /**
     * Generate Service schema
     */
    static service(config: {
        name: string;
        description: string;
        image: string;
        url: string;
        areaServed?: string[];
    }) {
        return {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': config.name,
            'description': config.description,
            'image': config.image,
            'provider': {
                '@type': 'Organization',
                'name': 'HEINZE MEDIA',
                'url': 'https://heinze.media'
            },
            'areaServed': config.areaServed || ['DE', 'EU'],
            'url': config.url
        };
    }

    /**
     * Generate FAQPage schema
     */
    static faqPage(faqs: Array<{ question: string; answer: string }>) {
        return {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.map(faq => ({
                '@type': 'Question',
                'name': faq.question,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': faq.answer
                }
            }))
        };
    }
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(pathname: string, baseUrl: string = 'https://heinze.media'): string {
    return baseUrl + pathname;
}

/**
 * Generate Open Graph meta tags
 */
export function getOpenGraphTags(config: SEOConfig) {
    return {
        'og:title': config.title,
        'og:description': config.description,
        'og:type': config.type === 'article' ? 'article' : 'website',
        'og:url': config.url,
        'og:image': config.image || 'https://heinze.media/og-default.png',
        'og:site_name': 'HEINZE MEDIA',
        'og:locale': 'de_DE'
    };
}

/**
 * Generate Twitter Card meta tags
 */
export function getTwitterCardTags(config: SEOConfig) {
    return {
        'twitter:card': 'summary_large_image',
        'twitter:title': config.title,
        'twitter:description': config.description,
        'twitter:image': config.image || 'https://heinze.media/og-default.png',
        'twitter:site': '@heinze_media'
    };
}

/**
 * Generate standard meta tags
 */
export function getMetaTags(config: SEOConfig) {
    return {
        'description': config.description,
        'keywords': config.keywords?.join(', ') || '',
        'author': config.author || 'HEINZE MEDIA',
        'robots': 'index, follow',
        'viewport': 'width=device-width, initial-scale=1.0',
        'charset': 'UTF-8'
    };
}
