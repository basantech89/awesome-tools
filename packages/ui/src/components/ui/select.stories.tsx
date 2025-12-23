import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const meta = {
	title: 'Component/Primitives/Select',
	component: Select,
	subcomponents: {
		SelectTrigger,
		SelectValue,
		SelectContent,
		SelectGroup,
		SelectLabel,
		SelectItem,
	},
	argTypes: {
		defaultValue: {
			label: 'Default Value',
			control: { type: 'text' },
			description:
				'The value of the select when initially rendered. Use when you do not need to control the state of the select.',
		},
		value: {
			label: 'Value',
			control: { type: 'text' },
			description:
				'The controlled value of the select. Should be used in conjunction with onValueChange.',
		},
		onValueChange: {
			label: 'On Value Change',
			description: 'Event handler called when the value of the select changes.',
		},
		defaultOpen: {
			label: 'Default Open',
			control: { type: 'boolean' },
			description:
				'The open state of the select when it is initially rendered. Use when you do not need to control its open state.',
		},
		open: {
			label: 'Open',
			control: { type: 'boolean' },
			description:
				'The controlled open state of the select. Must be used in conjunction with onOpenChange.',
		},
		onOpenChange: {
			label: 'On Open Change',
			description:
				'Event handler called when the open state of the select changes.',
		},
		disabled: {
			label: 'Disabled',
			control: { type: 'boolean' },
			description: 'When true, prevents the user from interacting with select.',
		},
		required: {
			label: 'Required',
			control: { type: 'boolean' },
			description:
				'When true, indicates that the user must select a value before the owning form can be submitted.',
		},
	},
	args: {},
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const fruits = [
	{ value: null, label: 'Select a fruit' },
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'blueberry', label: 'Blueberry' },
	{ value: 'grapes', label: 'Grapes' },
	{ value: 'pineapple', label: 'Pineapple' },
]

export const Default: Story = {
	render: args => (
		<Select {...args} items={fruits}>
			<SelectTrigger aria-label="Select a fruit">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{fruits.map(fruit => (
					<SelectItem key={fruit.value} value={fruit.value}>
						{fruit.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	),
}

const timezones = {
	'North America': [
		{ value: 'est', label: 'Eastern Standard Time (EST)' },
		{ value: 'cst', label: 'Central Standard Time (CST)' },
		{ value: 'mst', label: 'Mountain Standard Time (MST)' },
		{ value: 'pst', label: 'Pacific Standard Time (PST)' },
		{ value: 'akst', label: 'Alaska Standard Time (AKST)' },
		{ value: 'hst', label: 'Hawaii Standard Time (HST)' },
	],
	'Europe & Africa': [
		{ value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
		{ value: 'cet', label: 'Central European Time (CET)' },
		{ value: 'eet', label: 'Eastern European Time (EET)' },
		{ value: 'west', label: 'Western European Summer Time (WEST)' },
		{ value: 'cat', label: 'Central Africa Time (CAT)' },
		{ value: 'eat', label: 'East Africa Time (EAT)' },
	],
	Asia: [
		{ value: 'msk', label: 'Moscow Time (MSK)' },
		{ value: 'ist', label: 'India Standard Time (IST)' },
		{ value: 'cst_china', label: 'China Standard Time (CST)' },
		{ value: 'jst', label: 'Japan Standard Time (JST)' },
		{ value: 'kst', label: 'Korea Standard Time (KST)' },
		{ value: 'ist_indonesia', label: 'Indonesia Central Standard Time (WITA)' },
	],
	'Australia & Pacific': [
		{ value: 'awst', label: 'Australian Western Standard Time (AWST)' },
		{ value: 'acst', label: 'Australian Central Standard Time (ACST)' },
		{ value: 'aest', label: 'Australian Eastern Standard Time (AEST)' },
		{ value: 'nzst', label: 'New Zealand Standard Time (NZST)' },
		{ value: 'fjt', label: 'Fiji Time (FJT)' },
	],
	'South America': [
		{ value: 'art', label: 'Argentina Time (ART)' },
		{ value: 'bot', label: 'Bolivia Time (BOT)' },
		{ value: 'brt', label: 'Brasilia Time (BRT)' },
		{ value: 'clt', label: 'Chile Standard Time (CLT)' },
	],
}

const items = Object.values(timezones).flat()

export const Scrollable: Story = {
	render: args => (
		<Select {...args} items={items}>
			<SelectTrigger aria-label="timezone" className="is-full max-is-xs">
				<SelectValue>Select a timezone</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{Object.entries(timezones).map(([region, regionTimezones]) => (
					<SelectGroup key={region}>
						<SelectLabel>{region}</SelectLabel>
						{regionTimezones.map(timezone => (
							<SelectItem key={timezone.value} value={timezone.value}>
								{timezone.label}
							</SelectItem>
						))}
					</SelectGroup>
				))}
			</SelectContent>
		</Select>
	),
}
