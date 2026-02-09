/// <reference types='vitest' />

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	root: import.meta.dirname,
	cacheDir: '../../node_modules/.vite/packages/ui-blocks',
	plugins: [react(), tailwindcss(), nxViteTsPaths()],
	resolve: {
		alias: {
			'@awesome-tools/ui/styles.css': '../ui/src/styles.css',
			'@awesome-tools/ui': '../ui/src/index.ts',
			'@awesome-tools/utils': '../utils/src/index.ts'
		}
	},
	build: {
		outDir: './dist',
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true
		},
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: 'src/index.ts',
			name: 'ui-blocks',
			fileName: 'index',
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ['es']
		}
	}
})
