import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import path from 'path';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	layout: {
		_: path.resolve(process.cwd(), 'src/lib/components/MarkdownLayout.svelte')
	},

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: []
});

export default config;
