/// <reference types='vitest' />

import type { ConfigEnv, PluginOption, UserConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { globSync } from 'node:fs'
import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import preserveDirectives from 'rollup-preserve-directives'
import dts from 'vite-plugin-dts'

const configDir = dirname(fileURLToPath(import.meta.url))

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
	'tailwindcss',
	'tailwind-merge',
	'tailwind-variants',
	'@awesome-tools/utils'
]

const isExternalPackage = (id: string) =>
	externalPackages.some(pkg => id === pkg || id.startsWith(`${pkg}/`))

const config = ({ command }: ConfigEnv): UserConfig => {
	const plugins: PluginOption[] = [
		react(),
		dts({
			entryRoot: 'src',
			tsconfigPath: path.join(configDir, 'tsconfig.lib.json')
		})
	]

	if (command === 'serve') {
		plugins.push(tailwindcss())
	}

	return {
		root: configDir,
		cacheDir: '../../node_modules/.vite/packages/ui',
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
				name: 'ui',
				// fileName: '[name].js',
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
		}
	}
}

export default config
