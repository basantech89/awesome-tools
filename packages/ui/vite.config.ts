/// <reference types='vitest' />

import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'


// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	root: import.meta.dirname,
	cacheDir: '../../node_modules/.vite/packages/ui',
	plugins: [
		react(),
		tailwindcss(),
		dts({
			entryRoot: 'src',
			tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'),
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: './dist',
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: 'src/index.ts',
			name: 'ui',
			fileName: 'index',
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ['es' as const],
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: ['react', 'react-dom', 'react/jsx-runtime'],
		},
	},
})
