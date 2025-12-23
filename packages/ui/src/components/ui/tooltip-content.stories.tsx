import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const meta = {
	title: 'Component/Primitives/Tooltip/TooltipContent',
	component: TooltipContent,
	argTypes: {
		side: {
			label: 'Open',
			control: { type: 'select' },
			options: ['top', 'right', 'bottom', 'left'],
			description:
				'The preferred side of the trigger to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled.',
			table: {
				defaultValue: { summary: 'top' },
			},
		},
		sideOffset: {
			label: 'Side Offset',
			control: { type: 'number' },
			table: {
				defaultValue: { summary: '0' },
			},
			description: 'The distance in pixels from the trigger.',
		},
		align: {
			label: 'Align',
			control: { type: 'select' },
			description:
				'The preferred alignment against the trigger. May change when collisions occur.',
			options: ['start', 'center', 'end'],
			table: {
				defaultValue: { summary: 'center' },
			},
		},
		alignOffset: {
			label: 'Align Offset',
			control: { type: 'number' },
			description:
				'An offset in pixels from the "start" or "end" alignment options.',
			table: {
				defaultValue: { summary: '0' },
			},
		},
	},
} satisfies Meta<typeof TooltipContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => (
		<Tooltip>
			<TooltipTrigger render={<Button variant="outline">Hover</Button>} />
			<TooltipContent {...args}>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	),
}

export const Sides: Story = {
	render: args => (
		<div className="flex flex-col gap-15">
			{['top', 'right', 'bottom', 'left'].map(side => (
				<Tooltip key={side}>
					<TooltipTrigger
						render={
							<Button variant="outline">
								{side[0].toUpperCase() + side.slice(1)}
							</Button>
						}
					/>
					<TooltipContent
						side={side as 'top' | 'right' | 'bottom' | 'left'}
						{...args}
					>
						<p>Add to library</p>
					</TooltipContent>
				</Tooltip>
			))}
		</div>
	),
}

export const States: Story = {
	render: args => (
		<div className="flex items-end gap-4">
			<Tooltip defaultOpen={true}>
				<TooltipTrigger
					render={<Button variant="outline">Default open</Button>}
				/>
				<TooltipContent {...args}>
					<p>Add to library</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger
					render={<Button variant="outline">Tooltip delayed by 1s</Button>}
				/>
				<TooltipContent {...args}>
					<p>Add to library</p>
				</TooltipContent>
			</Tooltip>
		</div>
	),
}
