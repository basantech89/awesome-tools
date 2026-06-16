/// <reference types='vitest' />

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

const getImportName = (id: string) => {
	const pathSegments = id.split('/')
	return pathSegments[pathSegments.length - 1]
}

const ignoreStaticImport = (importKeys: string[]) => ({
	name: 'vite-plugin-ignore-static-import',
	enforce: 'pre' as const,
	resolveId(id: string) {
		if (importKeys.includes(getImportName(id))) {
			return id // Resolve it to itself so we can catch it in 'load'
		}
	},
	load(id: string) {
		if (importKeys.includes(getImportName(id))) {
			return '' // Return an empty string so Vite thinks the file is empty
		}
	}
})

const plugins = [react(), tailwindcss(), nxViteTsPaths()]

export default defineConfig(({ command }) => {
	const aliases = {
		resolve: {
			alias: {
				'@awesome-tools/ui/styles.css': path.resolve(
					import.meta.dirname,
					'../ui/src/styles.css'
				),
				'@awesome-tools/ui': path.resolve(
					import.meta.dirname,
					'../ui/src/index.ts'
				),
				'@awesome-tools/utils': path.resolve(
					import.meta.dirname,
					'../utils/src/index.ts'
				)
			}
		}
	}

	if (command === 'serve') {
		plugins.unshift(ignoreStaticImport(['styles.css']))
	}

	return {
		root: import.meta.dirname,
		cacheDir: '../../node_modules/.vite/packages/ui-blocks',
		plugins,
		...aliases,
		build: {
			outDir: './dist',
			emptyOutDir: true,
			reportCompressedSize: true,
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
	}
})
