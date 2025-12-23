import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Button } from './button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './tooltip'

const meta = {
	title: 'Component/Primitives/Tooltip',
	component: Tooltip,
	subcomponents: { TooltipTrigger, TooltipContent },
	argTypes: {
		defaultOpen: {
			label: 'Default Open',
			control: { type: 'boolean' },
			description:
				'The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state.',
		},
		open: {
			label: 'Open',
			control: { type: 'boolean' },
			description:
				'The controlled open state of the tooltip. Must be used in conjunction with onOpenChange.',
		},
		onOpenChange: {
			label: 'On Open Change',
			description:
				'Event handler called when the open state of the tooltip changes.',
		},
		disableHoverablePopup: {
			label: 'Disable Hoverable Popup',
			control: { type: 'boolean' },
			description:
				'Prevents Tooltip.Content from remaining open when hovering. Disabling this has accessibility consequences. Inherits from Tooltip.Provider.',
			table: { defaultValue: { summary: 'false' } },
		},
	},
	args: {
		onOpenChange: fn(),
	},
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => (
		<Tooltip {...args}>
			<TooltipTrigger render={<Button variant="outline" />}>
				Hover
			</TooltipTrigger>
			<TooltipContent>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	),
}

export const States: Story = {
	render: args => (
		<div className="flex items-end gap-4">
			<Tooltip defaultOpen={true} {...args}>
				<TooltipTrigger
					render={<Button variant="outline">Default open</Button>}
				/>
				<TooltipContent>
					<p>Add to library</p>
				</TooltipContent>
			</Tooltip>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger delay={1000} render={<Button variant="outline" />}>
						Tooltip delayed by 1s
					</TooltipTrigger>
					<TooltipContent>
						<p>Add to library</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	),
}
