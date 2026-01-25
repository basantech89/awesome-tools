/// <reference types='vitest' />

import { globSync } from 'node:fs'
import path, { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

const getInputEntries = () => {
	const files = globSync(resolve(process.cwd(), 'src/**/*.{ts,tsx}'))

	return files.reduce(
		(acc, file) => {
			const entryName = file
				.replace(`${resolve(process.cwd(), 'src')}/`, '')
				.replace(/\.(ts|tsx)$/, '')

			if (
				entryName.endsWith('.stories') ||
				entryName.endsWith('.test') ||
				entryName.endsWith('.spec')
			) {
				return acc
			}

			acc[entryName] = file
			return acc
		},
		{} as Record<string, string>,
	)
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ command }) => {
	const plugins = [
		react(),
		dts({
			entryRoot: 'src',
			tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'),
		}),
	]

	if (command === 'serve') {
		plugins.push(tailwindcss())
	}

	return {
		root: import.meta.dirname,
		cacheDir: '../../node_modules/.vite/packages/ui',
		plugins,
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
				// fileName: '[name].js',
				// Change this to the formats you want to support.
				// Don't forget to update your package.json as well.
				formats: ['es'],
				cssFileName: 'styles',
			},
			rollupOptions: {
				input: getInputEntries(),
				// External packages that should not be bundled into your library.
				external: [
					'react',
					'react-dom',
					'react/jsx-runtime',
					'tailwindcss',
					'tailwind-merge',
				],
				output: {
					// preserveModules: true,
					// preserveModulesRoot: 'src',
					entryFileNames: `[name].js`,
					// chunkFileNames: `[name].[hash].[ext]`,
				},
			},
			minify: false,
		},
	}
})
