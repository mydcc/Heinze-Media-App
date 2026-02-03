import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('svelte/compiler').PreprocessorGroup} */
const globalComponentsPreprocessor = {
	markup: ({ content, filename }) => {
		if (filename && (filename.endsWith('.md') || filename.endsWith('.svx'))) {
			// If the file already has a <script> tag, we don't just prepend another one.
			// But mdsvex handles its own script blocks.
			// The issue is that some files have manual imports.
			// Approach: Only inject if not already present or remove manual ones via regex.

			const imports = `
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import Model3D from '$lib/components/3d/Model3D.svelte';
`;

			let newCode = content;
			if (content.includes('<script>')) {
				newCode = content.replace('<script>', `<script>\n${imports}`);
			} else {
				// If there's frontmatter, we must inject AFTER it
				const frontmatterMatch = content.match(/^---[\s\S]*?---(?:\r?\n|$)/);
				if (frontmatterMatch) {
					const frontmatter = frontmatterMatch[0];
					const body = content.slice(frontmatter.length);
					newCode = `${frontmatter}\n<script>\n${imports}\n</script>\n${body}`;
				} else {
					newCode = `<script>\n${imports}\n</script>\n${content}`;
				}
			}
			return { code: newCode };
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	preprocess: [
		globalComponentsPreprocessor,
		mdsvex(mdsvexConfig),
		vitePreprocess()
	],

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
