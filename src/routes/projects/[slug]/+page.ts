
import { error } from '@sveltejs/kit';

export const load = async ({ data }) => {
    // Dynamic import for mdsvex component
    const modules = import.meta.glob('/src/content/**/*.md');
    const match = modules[data.filePath];

    if (!match) {
        throw error(500, 'Content file not found');
    }

    const module = await match();

    return {
        ...data,
        component: (module as any).default
    };
};
