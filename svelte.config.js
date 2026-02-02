import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: false
		}),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			handleUnseenRoutes: 'warn'
		},
		alias: {
			$lib: 'src/lib',
			$components: 'src/lib/components',
			$utils: 'src/lib/utils',
			$data: 'src/lib/data',
			$seo: 'src/lib/seo',
			$state: 'src/lib/state'
		}
	}
};

export default config;
