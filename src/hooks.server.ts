import { handle as paraglideHandle } from "$lib/paraglide/adapter.js";
import { getLocale } from "$lib/paraglide/runtime.js";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const langHook: Handle = async ({ event, resolve }) => {
    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', getLocale())
    });
};

export const handle = sequence(paraglideHandle, langHook);
