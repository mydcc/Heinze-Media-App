import { renderMarkdown } from '$lib/content/render';
import { loadContentBySlug } from '$lib/content/loader';

export const load = async () => {
    // Single language call
    const homeContent = loadContentBySlug('pages', 'home');

    if (homeContent) {
        homeContent.html = await renderMarkdown(homeContent.content);
    }

    return {
        homepage: homeContent
    };
};