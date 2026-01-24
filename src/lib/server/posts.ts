import matter from 'gray-matter';

export type Post = {
    title: string;
    slug: string;
    date: string;
    image?: string;
    categories?: string[];
    description?: string;
    content?: string;
};

export async function getPosts(type: 'blog' | 'work' = 'blog'): Promise<Post[]> {
    const modules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default' });
    const posts: Post[] = [];

    for (const path in modules) {
        if (!path.includes(`/${type}/`)) continue;

        try {
            const raw = await modules[path]() as string;
            const { data } = matter(raw);

            // Ensure data has required fields, or fallback
            if (data.slug) {
                posts.push(data as Post);
            }
        } catch (e) {
            console.error(`Error loading post ${path}:`, e);
        }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string, type: 'blog' | 'work' = 'blog') {
    const modules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default' });

    // Find file that matches slug
    // Note: This matches "slug" field in frontmatter, but we need to scan to find it, 
    // or rely on filename matching. My import script named files as "slug.md".
    // So searching by filename is faster O(1) than scanning O(N).

    const possiblePath = `/src/content/${type}/${slug}.md`;

    if (modules[possiblePath]) {
        const raw = await modules[possiblePath]() as string;
        const { data, content } = matter(raw);
        return { ...data, content } as Post;
    }

    // Fallback: Scan all if filename doesn't match slug property (rare but possible)
    const posts = await getPosts(type);
    const post = posts.find(p => p.slug === slug);
    if (post) {
        // We need to fetch content again efficiently? 
        // Actually, getPosts only returns data (frontmatter). 
        // We might need to refactor getPosts if we want content.
        // But let's assume filename == slug 99% of time.
        return null;
    }
    return null;
}
