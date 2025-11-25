/// <reference types='vitest' />
import { defineConfig } from 'vite'

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/packages/utils',
	plugins: [],
	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [],
	// },
	test: {
		name: 'utils',
		watch: false,
		globals: true,
		environment: 'node',
		typecheck: true,
		include: [
			'{src/__tests__}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
			'src/__tests__/**/*.test-d.ts',
		],
		reporters: ['default'],
		coverage: {
			reportsDirectory: './test-output/vitest/coverage',
			provider: 'v8' as const,
		},
	},
}))
