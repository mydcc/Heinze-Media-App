
import { error } from '@sveltejs/kit';

export const load = async ({ data }) => {
    // Glob all markdown files (non-eager / lazy load)
    const modules = import.meta.glob('/src/content/**/*.md');

    // Robust path resolution: ensure it starts with / and matches glob keys
    let path = data.filePath;
    if (path && !path.startsWith('/')) path = '/' + path;

    const match = modules[path];

    if (!match) {
        console.error("DEBUG: Available modules:", Object.keys(modules));
        console.error("DEBUG: Requested path:", path);
        throw error(500, `Content file not found: ${path}`);
    }

    const module = await match();

    return {
        ...data,
        component: (module as any).default
    };
};
