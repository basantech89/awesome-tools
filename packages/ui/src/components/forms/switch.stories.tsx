import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle
} from './field'
import { Label } from './label'
import { Switch } from './switch'

const meta = {
	title: 'Components/Forms/Switch',
	component: Switch
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Field orientation="horizontal">
			<Switch aria-label="toggle airplane mode" id="switch-basic" />
			<FieldLabel htmlFor="switch-basic">Airplane Mode</FieldLabel>
		</Field>
	)
}

export const Description: Story = {
	render: () => (
		<FieldLabel htmlFor="switch-focus-mode">
			<Field orientation="horizontal">
				<FieldContent>
					<FieldTitle>Share across devices</FieldTitle>
					<FieldDescription>
						Focus is shared across devices, and turns off when you leave the
						app.
					</FieldDescription>
				</FieldContent>
				<Switch
					aria-label="toggle share across devices"
					id="switch-focus-mode"
				/>
			</Field>
		</FieldLabel>
	)
}

export const Disabled: Story = {
	render: () => (
		<div className="flex flex-col gap-12">
			<div className="flex items-center gap-2">
				<Switch
					aria-label="toggle disabled unchecked"
					disabled
					id="switch-disabled-unchecked"
				/>
				<Label htmlFor="switch-disabled-unchecked">Disabled (Unchecked)</Label>
			</div>
			<div className="flex items-center gap-2">
				<Switch
					aria-label="toggle disabled checked"
					defaultChecked
					disabled
					id="switch-disabled-checked"
				/>
				<Label htmlFor="switch-disabled-checked">Disabled (Checked)</Label>
			</div>
		</div>
	)
}

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-12">
			<div className="flex items-center gap-2">
				<Switch aria-label="toggle small size switch" id="switch-size-sm" />
				<Label htmlFor="switch-size-sm">Small</Label>
			</div>
			<div className="flex items-center gap-2">
				<Switch
					aria-label="toggle default size switch"
					id="switch-size-default"
					size="default"
				/>
				<Label htmlFor="switch-size-default">Default</Label>
			</div>
		</div>
	)
}
