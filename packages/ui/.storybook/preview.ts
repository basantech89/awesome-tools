import type { Preview } from '@storybook/react-vite'
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport'
import '../src/index.css'

const preview: Preview = {
	parameters: {
		layout: 'centered',
		viewport: {
			options: {
				...MINIMAL_VIEWPORTS,
				...INITIAL_VIEWPORTS,
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		docs: {
			codePanel: true,
			toc: {
				title: 'Contents',
			},
		},
	},
	tags: ['autodocs'],
}

export default preview
