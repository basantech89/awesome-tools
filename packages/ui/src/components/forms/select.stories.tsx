import type { Meta, StoryObj } from '@storybook/react-vite'

import { Item, ItemContent, ItemDescription, ItemTitle } from '../display/item'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from './select'

const meta = {
	title: 'Components/Forms/Select',
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

const newFruits = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Blueberry', value: 'blueberry' },
]
const vegetables = [
	{ label: 'Carrot', value: 'carrot' },
	{ label: 'Broccoli', value: 'broccoli' },
	{ label: 'Spinach', value: 'spinach' },
]
const allItems = [
	{ label: 'Select a fruit', value: null },
	...newFruits,
	...vegetables,
]

export const Groups: Story = {
	render: args => (
		<Select {...args} items={allItems}>
			<SelectTrigger aria-label="Select a fruit">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					{newFruits.map(item => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Vegetables</SelectLabel>
					{vegetables.map(item => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	),
}

export const MultipleSelection: Story = {
	render: args => {
		const items = [
			{ label: 'Apple', value: 'apple' },
			{ label: 'Banana', value: 'banana' },
			{ label: 'Blueberry', value: 'blueberry' },
			{ label: 'Grapes', value: 'grapes' },
			{ label: 'Pineapple', value: 'pineapple' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Watermelon', value: 'watermelon' },
		]

		return (
			<Select defaultValue={[]} items={items} multiple {...args}>
				<SelectTrigger aria-label="Select fruits" className="w-72">
					<SelectValue>
						{(value: string[]) => {
							if (value.length === 0) {
								return 'Select fruits'
							}
							if (value.length === 1) {
								return items.find(item => item.value === value[0])?.label
							}
							return `${value.length} fruits selected`
						}}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{items.map(item => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		)
	},
}

export const FancyOptions: Story = {
	render: () => {
		const plans = [
			{
				name: 'Starter',
				description: 'Perfect for individuals getting started.',
			},
			{
				name: 'Professional',
				description: 'Ideal for growing teams and businesses.',
			},
			{
				name: 'Enterprise',
				description: 'Advanced features for large organizations.',
			},
		]

		function SelectPlanItem({ plan }: { plan: (typeof plans)[number] }) {
			return (
				<Item className="w-full p-0" size="xs">
					<ItemContent className="gap-0">
						<ItemTitle>{plan.name}</ItemTitle>
						<ItemDescription className="text-xs">
							{plan.description}
						</ItemDescription>
					</ItemContent>
				</Item>
			)
		}

		return (
			<Select
				defaultValue={plans[0]}
				itemToStringValue={(plan: (typeof plans)[number]) => plan.name}
			>
				<SelectTrigger aria-label="Select a plan" className="h-auto! w-72">
					<SelectValue>
						{(value: (typeof plans)[number]) => <SelectPlanItem plan={value} />}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{plans.map(plan => (
							<SelectItem key={plan.name} value={plan}>
								<SelectPlanItem plan={plan} />
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		)
	},
}
