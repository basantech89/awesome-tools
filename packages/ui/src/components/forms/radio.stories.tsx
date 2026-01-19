import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from './field'
import { RadioGroup, RadioGroupItem } from './radio'

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/Forms/RadioGroup',
	component: RadioGroup,
	decorators: [
		Story => (
			<div className="w-95">
				<Story />
			</div>
		),
	],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<RadioGroup defaultValue="comfortable">
			<Field orientation="horizontal">
				<RadioGroupItem id="r1" value="default" />
				<FieldLabel className="font-normal" htmlFor="r1">
					Default
				</FieldLabel>
			</Field>
			<Field orientation="horizontal">
				<RadioGroupItem id="r2" value="comfortable" />
				<FieldLabel className="font-normal" htmlFor="r2">
					Comfortable
				</FieldLabel>
			</Field>
			<Field orientation="horizontal">
				<RadioGroupItem id="r3" value="compact" />
				<FieldLabel className="font-normal" htmlFor="r3">
					Compact
				</FieldLabel>
			</Field>
		</RadioGroup>
	),
}

export const Description: Story = {
	render: () => (
		<RadioGroup defaultValue="plus">
			<FieldLabel htmlFor="plus-plan">
				<Field orientation="horizontal">
					<FieldContent>
						<div className="font-medium">Plus</div>
						<FieldDescription>For individuals and small teams</FieldDescription>
					</FieldContent>
					<RadioGroupItem id="plus-plan" value="plus" />
				</Field>
			</FieldLabel>
			<FieldLabel htmlFor="pro-plan">
				<Field orientation="horizontal">
					<FieldContent>
						<div className="font-medium">Pro</div>
						<FieldDescription>For growing businesses</FieldDescription>
					</FieldContent>
					<RadioGroupItem id="pro-plan" value="pro" />
				</Field>
			</FieldLabel>
			<FieldLabel htmlFor="enterprise-plan">
				<Field orientation="horizontal">
					<FieldContent>
						<div className="font-medium">Enterprise</div>
						<FieldDescription>For large teams and enterprises</FieldDescription>
					</FieldContent>
					<RadioGroupItem id="enterprise-plan" value="enterprise" />
				</Field>
			</FieldLabel>
		</RadioGroup>
	),
}

export const Disabled: Story = {
	render: () => (
		<RadioGroup defaultValue="option2" disabled>
			<Field orientation="horizontal">
				<RadioGroupItem id="disabled-1" value="option1" />
				<FieldLabel className="font-normal" htmlFor="disabled-1">
					Option 1
				</FieldLabel>
			</Field>
			<Field orientation="horizontal">
				<RadioGroupItem id="disabled-2" value="option2" />
				<FieldLabel className="font-normal" htmlFor="disabled-2">
					Option 2
				</FieldLabel>
			</Field>
			<Field orientation="horizontal">
				<RadioGroupItem id="disabled-3" value="option3" />
				<FieldLabel className="font-normal" htmlFor="disabled-3">
					Option 3
				</FieldLabel>
			</Field>
		</RadioGroup>
	),
}

export const Invalid: Story = {
	render: () => (
		<FieldSet>
			<FieldLegend>Notification Preferences</FieldLegend>
			<FieldDescription>
				Choose how you want to receive notifications.
			</FieldDescription>
			<RadioGroup defaultValue="email">
				<Field data-invalid orientation="horizontal">
					<RadioGroupItem aria-invalid id="invalid-email" value="email" />
					<FieldLabel className="font-normal" htmlFor="invalid-email">
						Email only
					</FieldLabel>
				</Field>
				<Field data-invalid orientation="horizontal">
					<RadioGroupItem aria-invalid id="invalid-sms" value="sms" />
					<FieldLabel className="font-normal" htmlFor="invalid-sms">
						SMS only
					</FieldLabel>
				</Field>
				<Field data-invalid orientation="horizontal">
					<RadioGroupItem aria-invalid id="invalid-both" value="both" />
					<FieldLabel className="font-normal" htmlFor="invalid-both">
						Both Email & SMS
					</FieldLabel>
				</Field>
			</RadioGroup>
		</FieldSet>
	),
}
