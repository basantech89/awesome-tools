import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		watch: false,
		projects: ['packages/*/vitest.config.ts', 'tools/*/vitest.config.ts']
	}
})
