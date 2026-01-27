import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

import { paraglideSveltekit } from '@inlang/paraglide-sveltekit';

export default defineConfig({
	plugins: [
		paraglideSveltekit({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
		tailwindcss(),
		sveltekit()
	],
	server: {
		port: 5173,
		strictPort: true,
		host: true
	}
});
