/// <reference types='vitest' />

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { globSync } from 'node:fs'
import path, { resolve } from 'node:path'
import preserveDirectives from 'rollup-preserve-directives'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
		{} as Record<string, string>
	)
}

const externalPackages = [
	'react',
	'react-dom',
	'react/jsx-runtime',
	'@tanstack/react-table',
	'zod',
	'tailwindcss',
	'tailwind-merge',
	'tailwind-variants',
	'@dnd-kit/abstract',
	'@dnd-kit/dom',
	'@dnd-kit/helpers',
	'@dnd-kit/react',
	'date-fns',
	'react-day-picker',
	'sonner',
	'lucide-react',
	'@awesome-tools/ui',
	'@awesome-tools/utils'
]

const isExternalPackage = (id: string) =>
	externalPackages.some(pkg => id === pkg || id.startsWith(`${pkg}/`))

export default defineConfig(({ command }) => {
	const plugins = [
		react(),
		dts({
			entryRoot: 'src',
			tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json')
		}),
		nxViteTsPaths()
	]

	if (command === 'serve') {
		plugins.push(tailwindcss())
	}

	return {
		root: import.meta.dirname,
		cacheDir: '../../node_modules/.vite/packages/ui-blocks',
		plugins,
		build: {
			outDir: './dist',
			emptyOutDir: true,
			cssCodeSplit: true,
			reportCompressedSize: true,
			commonjsOptions: {
				transformMixedEsModules: true
			},
			lib: {
				// Could also be a dictionary or array of multiple entry points.
				entry: {
					main: 'src/index.ts',
					styles: 'src/styles.css'
				},
				name: 'ui-blocks',
				// fileName: 'index',
				// Change this to the formats you want to support.
				// Don't forget to update your package.json as well.
				formats: ['es'],
				cssFileName: 'styles'
			},
			rollupOptions: {
				input: {
					...getInputEntries(),
					styles: resolve(process.cwd(), 'src/styles.css')
				},
				// External packages that should not be bundled into your library.
				external: isExternalPackage,
				plugins: [preserveDirectives()],
				output: {
					preserveModules: true,
					preserveModulesRoot: 'src',
					entryFileNames: `[name].js`
					// chunkFileNames: `[name].[hash].[ext]`,
				}
			},
			minify: false
		},
		test: {
			name: 'ui-blocks',
			watch: false,
			globals: true,
			environment: 'jsdom',
			include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
			reporters: ['default'],
			coverage: {
				reportsDirectory: './test-output/vitest/coverage',
				provider: 'v8' as const
			}
		}
	}
})
