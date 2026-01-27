import { renderMarkdown } from '$lib/content/render';
import { loadContentBySlug } from '$lib/content/loader';
import { getLocale } from '$lib/paraglide/runtime.js';

export const load = async () => {
    const lang = getLocale();
    const homeContent = loadContentBySlug('pages', 'home', lang);

    if (homeContent) {
        homeContent.html = await renderMarkdown(homeContent.content);
    }

    return {
        homepage: homeContent
    };
};
