import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'index',
            fileName: (format) => `index.${format}.js`,
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
    plugins: [
			dts({
					insertTypesEntry: true,
					rollupTypes: true,
					bundledPackages: ['dom-utils-minimize'],
					outDir: ['dist/types'], // Явно указываем директорию для типов
					compilerOptions: {
							skipLibCheck: true,
							declarationDir: './dist/types'
					}
			})
	]
});