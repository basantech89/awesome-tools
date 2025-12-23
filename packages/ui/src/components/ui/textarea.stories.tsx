import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Label } from './label'
import { Textarea } from '@/components/ui/textarea'

const meta = {
	title: 'Component/Primitives/Textarea',
	component: Textarea,
	argTypes: {
		placeholder: {
			label: 'Placeholder',
			control: { type: 'text' },
			description: 'The placeholder text for the textarea',
		},
		disabled: {
			label: 'Disabled',
			control: { type: 'boolean' },
			description: 'Whether the textarea is disabled',
		},
	},
	args: {
		placeholder: 'Enter message here',
		onChange: fn(),
	},
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
	args: {
		placeholder: 'Enter your message',
	},
	render: args => (
		<div className="flex flex-col items-end gap-4">
			<div className="flex gap-4">
				<Label htmlFor="message">Required</Label>
				<Textarea {...args} id="message" name="message" required />
			</div>
			<div className="flex gap-4">
				<Label htmlFor="message-disabled">Disabled</Label>
				<Textarea {...args} disabled id="message-disabled" name="message" />
			</div>
			<div className="flex gap-4">
				<Label htmlFor="message-invalid">Invalid</Label>
				<Textarea
					{...args}
					aria-invalid="true"
					id="message-invalid"
					name="message"
					value="Invalid message content"
				/>
			</div>
		</div>
	),
}
