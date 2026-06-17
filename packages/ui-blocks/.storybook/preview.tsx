import type { Preview } from '@storybook/react-vite'

import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport'

import { Toaster } from '../src/components/display/sonner'
import './storybook-styles.css'

const preview: Preview = {
	decorators: [
		Story => (
			<div className="w-screen">
				<Toaster richColors theme="system" />
				<Story />
			</div>
		)
	],
	parameters: {
		layout: 'centered',
		viewport: {
			options: {
				...MINIMAL_VIEWPORTS,
				...INITIAL_VIEWPORTS
			}
		},

		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},

		docs: {
			codePanel: true,
			toc: {
				title: 'Contents'
			}
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'error'
		}
	},
	tags: ['autodocs']
}

export default preview
