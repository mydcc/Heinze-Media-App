import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    // Legacy redirect: If user visits /de/..., send them to /...
    if (event.url.pathname.startsWith('/de')) {
        const newPath = event.url.pathname.replace(/^\/de/, '') || '/';
        throw redirect(307, newPath);
    }

    const response = await resolve(event);
    return response;
};
