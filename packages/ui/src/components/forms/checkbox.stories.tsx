import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './checkbox'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from './field'

const meta = {
	title: 'Components/Forms/Checkbox',
	component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Field orientation="horizontal">
			<Checkbox aria-label="terms and conditions" defaultChecked id="terms-2" />
			<FieldContent>
				<FieldLabel htmlFor="terms-2">Accept terms and conditions</FieldLabel>
				<FieldDescription>
					By clicking this checkbox, you agree to the terms and conditions.
				</FieldDescription>
			</FieldContent>
		</Field>
	),
}

export const Invalid: Story = {
	render: () => (
		<Field data-invalid orientation="horizontal">
			<Checkbox aria-invalid aria-label="terms and conditions" id="terms-3" />
			<FieldLabel htmlFor="terms-3">Accept terms and conditions</FieldLabel>
		</Field>
	),
}

export const Title: Story = {
	render: () => (
		<div className="w-97.5">
			<FieldGroup>
				<FieldLabel htmlFor="toggle-2">
					<Field orientation="horizontal">
						<Checkbox
							aria-label="enable notifications"
							defaultChecked
							id="toggle-2"
						/>
						<FieldContent>
							<FieldTitle>Enable notifications</FieldTitle>
							<FieldDescription>
								You can enable or disable notifications at any time.
							</FieldDescription>
						</FieldContent>
					</Field>
				</FieldLabel>
				<FieldLabel htmlFor="toggle-4">
					<Field data-disabled orientation="horizontal">
						<Checkbox
							aria-label="enable notifications"
							disabled
							id="toggle-4"
						/>
						<FieldContent>
							<FieldTitle>Enable notifications</FieldTitle>
							<FieldDescription>
								You can enable or disable notifications at any time.
							</FieldDescription>
						</FieldContent>
					</Field>
				</FieldLabel>
			</FieldGroup>
		</div>
	),
}
