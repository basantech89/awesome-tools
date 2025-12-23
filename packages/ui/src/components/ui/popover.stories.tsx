import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const meta = {
	title: 'Component/Primitives/Popover',
	component: Popover,
	subcomponents: { PopoverContent, PopoverTrigger },
	argTypes: {
		defaultOpen: {
			label: 'Default Open',
			control: { type: 'boolean' },
			description:
				'Whether the popover is initially open. To render a controlled popover, use the open prop instead.',
		},
		open: {
			label: 'Open',
			control: { type: 'boolean' },
			description:
				'The controlled open state of the popover. Must be used in conjunction with onOpenChange to render a controlled popover.',
		},
		onOpenChange: {
			label: 'On Open Change',
			description:
				'Event handler called when the open state of the popover changes.',
		},
		modal: {
			label: 'Modal',
			control: { type: 'select' },
			options: [true, false, 'trap-focus'],
			description:
				'The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.',
			table: { defaultValue: { summary: 'false' } },
		},
	},
	args: { defaultOpen: false, modal: false },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => (
		<Popover {...args}>
			<PopoverTrigger render={<Button variant="outline" />}>
				Open popover
			</PopoverTrigger>
			<PopoverContent>
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Dimensions</h4>
						<p className="text-muted-foreground text-sm">
							Set the dimensions for the layer.
						</p>
					</div>
					<div className="grid gap-2">
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="width">Width</Label>
							<Input
								className="bs-8 col-span-2"
								defaultValue="100%"
								id="width"
							/>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="maxWidth">Max. width</Label>
							<Input
								className="bs-8 col-span-2"
								defaultValue="300px"
								id="maxWidth"
							/>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="height">Height</Label>
							<Input
								className="bs-8 col-span-2"
								defaultValue="25px"
								id="height"
							/>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="maxHeight">Max. height</Label>
							<Input
								className="bs-8 col-span-2"
								defaultValue="none"
								id="maxHeight"
							/>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	),
}
