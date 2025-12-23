import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { Input } from './input'
import { Label } from './label'

const meta = {
	title: 'Component/Primitives/Input',
	component: Input,
	argTypes: {
		placeholder: {
			label: 'Placeholder',
			control: { type: 'text' },
			description: 'The placeholder text for the input',
		},
		type: {
			label: 'Type',
			control: { type: 'text' },
			description: 'The type of the input',
		},
		disabled: {
			label: 'Disabled',
			control: { type: 'boolean' },
			description: 'Whether the input is disabled',
		},
	},
	args: { type: 'text', placeholder: 'Enter text here', onChange: fn() },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole('textbox')
		await userEvent.type(input, 'Hello, World!')
		expect(input).toHaveValue('Hello, World!')
	},
}

export const States: Story = {
	args: {
		type: 'email',
		placeholder: 'Enter your email',
	},
	render: args => (
		<div className="flex flex-col items-end gap-4">
			<div className="flex gap-4">
				<Label htmlFor="email">Required</Label>
				<Input {...args} id="email" name="email" required />
			</div>
			<div className="flex gap-4">
				<Label htmlFor="email-disabled">Disabled</Label>
				<Input {...args} disabled id="email-disabled" name="email" />
			</div>
			<div className="flex gap-4">
				<Label htmlFor="email-invalid">Invalid</Label>
				<Input
					{...args}
					aria-invalid="true"
					id="email-invalid"
					name="email"
					value="not-email"
				/>
			</div>
		</div>
	),
}

export const Types: Story = {
	args: {
		placeholder: 'Enter value',
	},
	render: args => (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Label className="is-32" htmlFor="text-input">
					Text
				</Label>
				<Input {...args} id="text-input" name="text-input" type="text" />
			</div>
			<div className="flex gap-4">
				<Label className="is-32" htmlFor="number-input">
					Number
				</Label>
				<Input {...args} id="number-input" name="number-input" type="number" />
			</div>
			<div className="flex gap-4">
				<Label className="is-32" htmlFor="password-input">
					Password
				</Label>
				<Input
					{...args}
					id="password-input"
					name="password-input"
					type="password"
				/>
			</div>
			<div className="flex gap-4">
				<Label className="is-32" htmlFor="email-input">
					Email
				</Label>
				<Input {...args} id="email-input" name="email-input" type="email" />
			</div>
			<div className="flex gap-4">
				<Label className="is-32" htmlFor="search-input">
					Search
				</Label>
				<Input {...args} id="search-input" name="search-input" type="search" />
			</div>
			<div className="flex gap-4">
				<Label className="is-32" htmlFor="file-input">
					File Input
				</Label>
				<Input {...args} id="file-input" name="file-input" type="file" />
			</div>
		</div>
	),
}
