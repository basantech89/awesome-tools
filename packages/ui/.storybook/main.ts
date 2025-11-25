import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@chromatic-com/storybook'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {
			builder: {
				viteConfigPath: 'vite.config.ts',
			},
		},
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
}

function getAbsolutePath(value: string) {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

export default config

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
