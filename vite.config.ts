import { resolve } from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'dom-helper-lib',
			fileName: (format) => `dom-helper-lib.${format}.js`,
		},
		rollupOptions: {
			external: ['jsdom'],
			output: {
				globals: {
					jsdom: 'jsdom',
				},
			},
		},
	},
});
