/// <reference types='vitest' />

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	root: import.meta.dirname,
	cacheDir: '../../node_modules/.vite/packages/ui',
	plugins: [react(), tailwindcss(), nxViteTsPaths()],
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
			formats: ['es'],
		},
	},
})
