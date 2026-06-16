/// <reference types='vitest' />
import path from 'node:path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	root: import.meta.dirname,
	cacheDir: '../../node_modules/.vite/packages/utils',
	plugins: [
		dts({
			entryRoot: 'src',
			tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json')
		})
	],
	build: {
		outDir: './dist',
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true
		},
		lib: {
			entry: 'src/index.ts',
			name: 'utils',
			formats: ['es']
		},
		rollupOptions: {
			external: ['zod/v4']
		},
		minify: false
	},
	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [],
	// },
	test: {
		name: 'utils',
		watch: false,
		globals: true,
		environment: 'node',
		include: [
			'{src/__tests__}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
			'src/__tests__/**/*.test-d.ts'
		],
		reporters: ['default'],
		coverage: {
			reportsDirectory: './test-output/vitest/coverage',
			provider: 'v8' as const
		}
	}
})
