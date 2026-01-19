import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Badge } from '../primitives/badge'
import { Checkbox } from './checkbox'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from './field'
import { Input } from './input'
import { RadioGroup, RadioGroupItem } from './radio'
import { Slider } from './slider'
import { Switch } from './switch'

const meta = {
	title: 'Components/Forms/Field',
	component: Field,
	decorators: [
		Story => (
			<div className="w-95">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Inputs: Story = {
	render: () => (
		<FieldGroup>
			<Field>
				<FieldLabel htmlFor="input-basic">Basic Input</FieldLabel>
				<Input id="input-basic" placeholder="Enter text" />
			</Field>
			<Field>
				<FieldLabel htmlFor="input-with-desc">
					Input with Description
				</FieldLabel>
				<Input id="input-with-desc" placeholder="Enter your username" />
				<FieldDescription>
					Choose a unique username for your account.
				</FieldDescription>
			</Field>
			<Field>
				<FieldLabel htmlFor="input-desc-first">Email Address</FieldLabel>
				<FieldDescription>
					We&apos;ll never share your email with anyone.
				</FieldDescription>
				<Input
					id="input-desc-first"
					placeholder="email@example.com"
					type="email"
				/>
			</Field>
			<Field>
				<FieldLabel htmlFor="input-required">
					Required Field <span className="text-destructive">*</span>
				</FieldLabel>
				<Input
					id="input-required"
					placeholder="This field is required"
					required
				/>
				<FieldDescription>This field must be filled out.</FieldDescription>
			</Field>
			<Field>
				<FieldLabel htmlFor="input-disabled">Disabled Input</FieldLabel>
				<Input disabled id="input-disabled" placeholder="Cannot edit" />
				<FieldDescription>This field is currently disabled.</FieldDescription>
			</Field>
			<Field>
				<FieldLabel htmlFor="input-badge">
					Input with Badge
					<Badge className="ml-auto" variant="secondary">
						Recommended
					</Badge>
				</FieldLabel>
				<Input id="input-badge" placeholder="Enter value" />
			</Field>
			<Field data-invalid>
				<FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
				<Input
					aria-invalid
					id="input-invalid"
					placeholder="This field has an error"
				/>
				<FieldDescription>
					This field contains validation errors.
				</FieldDescription>
			</Field>
			<Field data-disabled>
				<FieldLabel htmlFor="input-disabled-field">Disabled Field</FieldLabel>
				<Input disabled id="input-disabled-field" placeholder="Cannot edit" />
				<FieldDescription>This field is currently disabled.</FieldDescription>
			</Field>
		</FieldGroup>
	),
}

export const Checkboxes: Story = {
	render: () => (
		<FieldGroup>
			<Field orientation="horizontal">
				<Checkbox
					aria-label="agree terms and conditions"
					defaultChecked
					id="checkbox-basic"
				/>
				<FieldLabel className="font-normal" htmlFor="checkbox-basic">
					I agree to the terms and conditions
				</FieldLabel>
			</Field>
			<Field orientation="horizontal">
				<FieldLabel htmlFor="checkbox-right">
					Accept terms and conditions
				</FieldLabel>
				<Checkbox aria-label="agree terms and conditions" id="checkbox-right" />
			</Field>
			<Field orientation="horizontal">
				<Checkbox
					aria-label="subscribe to newsletter"
					id="checkbox-with-desc"
				/>
				<FieldContent>
					<FieldLabel htmlFor="checkbox-with-desc">
						Subscribe to newsletter
					</FieldLabel>
					<FieldDescription>
						Receive weekly updates about new features and promotions.
					</FieldDescription>
				</FieldContent>
			</Field>
			<FieldLabel htmlFor="checkbox-with-title">
				<Field orientation="horizontal">
					<Checkbox aria-label="enable touch id" id="checkbox-with-title" />
					<FieldContent>
						<FieldTitle>Enable Touch ID</FieldTitle>
						<FieldDescription>
							Enable Touch ID to quickly unlock your device.
						</FieldDescription>
					</FieldContent>
				</Field>
			</FieldLabel>
			<FieldSet>
				<FieldLegend variant="label">Preferences</FieldLegend>
				<FieldDescription>
					Select all that apply to customize your experience.
				</FieldDescription>
				<FieldGroup className="gap-3">
					<Field orientation="horizontal">
						<Checkbox aria-label="dark mode" id="pref-dark" />
						<FieldLabel className="font-normal" htmlFor="pref-dark">
							Dark mode
						</FieldLabel>
					</Field>
					<Field orientation="horizontal">
						<Checkbox aria-label="compact view" id="pref-compact" />
						<FieldLabel className="font-normal" htmlFor="pref-compact">
							Compact view
						</FieldLabel>
					</Field>
					<Field orientation="horizontal">
						<Checkbox
							aria-label="enable notifications"
							id="pref-notifications"
						/>
						<FieldLabel className="font-normal" htmlFor="pref-notifications">
							Enable notifications
						</FieldLabel>
					</Field>
				</FieldGroup>
			</FieldSet>
			<Field data-invalid orientation="horizontal">
				<Checkbox
					aria-invalid
					aria-label="invalid checkbox"
					id="checkbox-invalid"
				/>
				<FieldLabel className="font-normal" htmlFor="checkbox-invalid">
					Invalid checkbox
				</FieldLabel>
			</Field>
			<Field data-disabled orientation="horizontal">
				<Checkbox
					aria-label="disabled checkbox"
					disabled
					id="checkbox-disabled-field"
				/>
				<FieldLabel className="font-normal" htmlFor="checkbox-disabled-field">
					Disabled checkbox
				</FieldLabel>
			</Field>
		</FieldGroup>
	),
}

export const Radios: Story = {
	render: () => (
		<FieldGroup>
			<FieldSet>
				<FieldLegend variant="label">Subscription Plan</FieldLegend>
				<RadioGroup defaultValue="free">
					<Field orientation="horizontal">
						<RadioGroupItem id="radio-free" value="free" />
						<FieldLabel className="font-normal" htmlFor="radio-free">
							Free Plan
						</FieldLabel>
					</Field>
					<Field orientation="horizontal">
						<RadioGroupItem id="radio-pro" value="pro" />
						<FieldLabel className="font-normal" htmlFor="radio-pro">
							Pro Plan
						</FieldLabel>
					</Field>
					<Field orientation="horizontal">
						<RadioGroupItem id="radio-enterprise" value="enterprise" />
						<FieldLabel className="font-normal" htmlFor="radio-enterprise">
							Enterprise
						</FieldLabel>
					</Field>
				</RadioGroup>
			</FieldSet>
			<FieldSet>
				<FieldLegend variant="label">Battery Level</FieldLegend>
				<FieldDescription>
					Choose your preferred battery level.
				</FieldDescription>
				<RadioGroup>
					<Field orientation="horizontal">
						<RadioGroupItem id="battery-high" value="high" />
						<FieldLabel htmlFor="battery-high">High</FieldLabel>
					</Field>
					<Field orientation="horizontal">
						<RadioGroupItem id="battery-medium" value="medium" />
						<FieldLabel htmlFor="battery-medium">Medium</FieldLabel>
					</Field>
					<Field orientation="horizontal">
						<RadioGroupItem id="battery-low" value="low" />
						<FieldLabel htmlFor="battery-low">Low</FieldLabel>
					</Field>
				</RadioGroup>
			</FieldSet>
			<RadioGroup className="gap-6">
				<Field orientation="horizontal">
					<RadioGroupItem id="radio-content-1" value="option1" />
					<FieldContent>
						<FieldLabel htmlFor="radio-content-1">Enable Touch ID</FieldLabel>
						<FieldDescription>
							Enable Touch ID to quickly unlock your device.
						</FieldDescription>
					</FieldContent>
				</Field>
				<Field orientation="horizontal">
					<RadioGroupItem id="radio-content-2" value="option2" />
					<FieldContent>
						<FieldLabel htmlFor="radio-content-2">
							Enable Touch ID and Face ID to make it even faster to unlock your
							device. This is a long label to test the layout.
						</FieldLabel>
						<FieldDescription>
							Enable Touch ID to quickly unlock your device.
						</FieldDescription>
					</FieldContent>
				</Field>
			</RadioGroup>
			<RadioGroup className="gap-3">
				<FieldLabel htmlFor="radio-title-1">
					<Field orientation="horizontal">
						<RadioGroupItem id="radio-title-1" value="title1" />
						<FieldContent>
							<FieldTitle>Enable Touch ID</FieldTitle>
							<FieldDescription>
								Enable Touch ID to quickly unlock your device.
							</FieldDescription>
						</FieldContent>
					</Field>
				</FieldLabel>
				<FieldLabel htmlFor="radio-title-2">
					<Field orientation="horizontal">
						<RadioGroupItem id="radio-title-2" value="title2" />
						<FieldContent>
							<FieldTitle>
								Enable Touch ID and Face ID to make it even faster to unlock
								your device. This is a long label to test the layout.
							</FieldTitle>
							<FieldDescription>
								Enable Touch ID to quickly unlock your device.
							</FieldDescription>
						</FieldContent>
					</Field>
				</FieldLabel>
			</RadioGroup>
			<FieldSet>
				<FieldLegend variant="label">Invalid Radio Group</FieldLegend>
				<RadioGroup>
					<Field data-invalid orientation="horizontal">
						<RadioGroupItem
							aria-invalid
							id="radio-invalid-1"
							value="invalid1"
						/>
						<FieldLabel htmlFor="radio-invalid-1">Invalid Option 1</FieldLabel>
					</Field>
					<Field data-invalid orientation="horizontal">
						<RadioGroupItem
							aria-invalid
							id="radio-invalid-2"
							value="invalid2"
						/>
						<FieldLabel htmlFor="radio-invalid-2">Invalid Option 2</FieldLabel>
					</Field>
				</RadioGroup>
			</FieldSet>
			<FieldSet>
				<FieldLegend variant="label">Disabled Radio Group</FieldLegend>
				<RadioGroup disabled>
					<Field data-disabled orientation="horizontal">
						<RadioGroupItem disabled id="radio-disabled-1" value="disabled1" />
						<FieldLabel htmlFor="radio-disabled-1">
							Disabled Option 1
						</FieldLabel>
					</Field>
					<Field data-disabled orientation="horizontal">
						<RadioGroupItem disabled id="radio-disabled-2" value="disabled2" />
						<FieldLabel htmlFor="radio-disabled-2">
							Disabled Option 2
						</FieldLabel>
					</Field>
				</RadioGroup>
			</FieldSet>
		</FieldGroup>
	),
}

export const Switches: Story = {
	render: () => (
		<FieldGroup>
			<Field orientation="horizontal">
				<FieldContent>
					<FieldLabel htmlFor="switch-airplane">Airplane Mode</FieldLabel>
					<FieldDescription>
						Turn on airplane mode to disable all connections.
					</FieldDescription>
				</FieldContent>
				<Switch aria-label="toggle airplane mode" id="switch-airplane" />
			</Field>
			<Field orientation="horizontal">
				<FieldLabel htmlFor="switch-dark">Dark Mode</FieldLabel>
				<Switch aria-label="toggle dark mode" id="switch-dark" />
			</Field>
			<Field orientation="horizontal">
				<Switch aria-label="toggle marketing emails" id="switch-marketing" />
				<FieldContent>
					<FieldLabel htmlFor="switch-marketing">Marketing Emails</FieldLabel>
					<FieldDescription>
						Receive emails about new products, features, and more.
					</FieldDescription>
				</FieldContent>
			</Field>
			<Field>
				<FieldLabel>Privacy Settings</FieldLabel>
				<FieldDescription>Manage your privacy preferences.</FieldDescription>
				<Field orientation="horizontal">
					<Switch
						aria-label="toggle profile visibility"
						defaultChecked
						id="switch-profile"
					/>
					<FieldContent>
						<FieldLabel className="font-normal" htmlFor="switch-profile">
							Make profile visible to others
						</FieldLabel>
					</FieldContent>
				</Field>
				<Field orientation="horizontal">
					<Switch aria-label="toggle email visibility" id="switch-email" />
					<FieldContent>
						<FieldLabel className="font-normal" htmlFor="switch-email">
							Show email on profile
						</FieldLabel>
					</FieldContent>
				</Field>
			</Field>
			<Field data-invalid orientation="horizontal">
				<FieldContent>
					<FieldLabel htmlFor="switch-invalid">Invalid Switch</FieldLabel>
					<FieldDescription>
						This switch has validation errors.
					</FieldDescription>
				</FieldContent>
				<Switch aria-invalid aria-label="invalid switch" id="switch-invalid" />
			</Field>
			<Field data-disabled orientation="horizontal">
				<FieldContent>
					<FieldLabel htmlFor="switch-disabled-field">
						Disabled Switch
					</FieldLabel>
					<FieldDescription>
						This switch is currently disabled.
					</FieldDescription>
				</FieldContent>
				<Switch
					aria-label="disabled switch"
					disabled
					id="switch-disabled-field"
				/>
			</Field>
		</FieldGroup>
	),
}

export const Sliders: Story = {
	render: () => {
		const [volume, setVolume] = useState([50])
		const [brightness, setBrightness] = useState([75])
		const [temperature, setTemperature] = useState([0.3, 0.7])
		const [priceRange, setPriceRange] = useState([25, 75])
		const [colorBalance, setColorBalance] = useState([10, 20, 70])

		return (
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="slider-volume">Volume</FieldLabel>
					<Slider
						id="slider-volume"
						max={100}
						onValueChange={value => setVolume(value as number[])}
						step={1}
						value={volume}
					/>
				</Field>
				<Field>
					<FieldLabel htmlFor="slider-brightness">Screen Brightness</FieldLabel>
					<Slider
						id="slider-brightness"
						max={100}
						onValueChange={value => setBrightness(value as number[])}
						step={5}
						value={brightness}
					/>
					<FieldDescription>
						Current brightness: {brightness[0]}%
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor="slider-quality">Video Quality</FieldLabel>
					<FieldDescription>
						Higher quality uses more bandwidth.
					</FieldDescription>
					<Slider
						defaultValue={[720]}
						id="slider-quality"
						max={1080}
						min={360}
						step={360}
					/>
				</Field>
				<Field>
					<FieldLabel htmlFor="slider-temperature">
						Temperature Range
					</FieldLabel>
					<Slider
						id="slider-temperature"
						max={1}
						min={0}
						onValueChange={value => setTemperature(value as number[])}
						step={0.1}
						value={temperature}
					/>
					<FieldDescription>
						Range: {temperature[0].toFixed(1)} - {temperature[1].toFixed(1)}
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor="slider-price-range">Price Range</FieldLabel>
					<Slider
						id="slider-price-range"
						max={100}
						onValueChange={value => setPriceRange(value as number[])}
						step={5}
						value={priceRange}
					/>
					<FieldDescription>
						${priceRange[0]} - ${priceRange[1]}
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor="slider-color-balance">Color Balance</FieldLabel>
					<Slider
						id="slider-color-balance"
						max={100}
						onValueChange={value => setColorBalance(value as number[])}
						step={10}
						value={colorBalance}
					/>
					<FieldDescription>
						Red: {colorBalance[0]}%, Green: {colorBalance[1]}%, Blue:{' '}
						{colorBalance[2]}%
					</FieldDescription>
				</Field>
				<Field data-invalid>
					<FieldLabel htmlFor="slider-invalid">Invalid Slider</FieldLabel>
					<Slider
						aria-invalid
						defaultValue={[30]}
						id="slider-invalid"
						max={100}
					/>
					<FieldDescription>
						This slider has validation errors.
					</FieldDescription>
				</Field>
				<Field data-disabled>
					<FieldLabel htmlFor="slider-disabled-field">
						Disabled Slider
					</FieldLabel>
					<Slider
						defaultValue={[50]}
						disabled
						id="slider-disabled-field"
						max={100}
					/>
					<FieldDescription>
						This slider is currently disabled.
					</FieldDescription>
				</Field>
			</FieldGroup>
		)
	},
}
