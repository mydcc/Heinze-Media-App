import { renderMarkdown } from '$lib/content/render';
import { loadContentBySlug } from '$lib/content/loader';

export const load = async () => {
    const lang = 'en'; // Default to en for server load. Client can switch?
    const homeContent = loadContentBySlug('pages', 'home', lang);

    if (homeContent) {
        homeContent.html = await renderMarkdown(homeContent.content);
    }

    return {
        homepage: homeContent
    };
};
