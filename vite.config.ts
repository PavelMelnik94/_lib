import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';


export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: (format) => `index.${format}.js`,
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      outDir: ['dist/types']
    })
  ]
});