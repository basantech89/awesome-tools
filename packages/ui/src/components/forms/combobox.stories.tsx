import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Item, ItemContent, ItemDescription, ItemTitle } from '../display/item'
import { Button } from '../primitives/button'
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxCollection,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator,
	ComboboxTrigger,
	ComboboxValue,
	useComboboxAnchor,
} from './combobox'

const meta = {
	title: 'Components/Forms/Combobox',
	component: Combobox,
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

const fruits = [
	'Apple',
	'Banana',
	'Orange',
	'Pineapple',
	'Grape',
	'Mango',
	'Strawberry',
	'Blueberry',
	'Raspberry',
	'Blackberry',
	'Cherry',
	'Peach',
	'Pear',
	'Plum',
	'Kiwi',
	'Watermelon',
	'Cantaloupe',
	'Honeydew',
	'Papaya',
	'Guava',
	'Lychee',
	'Pomegranate',
	'Apricot',
	'Grapefruit',
	'Passionfruit',
]

export const Default: Story = {
	render: () => {
		return (
			<div className="w-full max-w-3xs">
				<Combobox items={fruits}>
					<ComboboxInput placeholder="Select a fruit" />
					<ComboboxContent>
						<ComboboxEmpty>No items found.</ComboboxEmpty>
						<ComboboxList>
							{item => (
								<ComboboxItem key={item} value={item}>
									{item}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
		)
	},
}

const frameworks = [
	'Next.js',
	'SvelteKit',
	'Nuxt.js',
	'Remix',
	'Astro',
] as const

export const WithClearButton: Story = {
	render: () => {
		return (
			<Combobox defaultValue={frameworks[0]} items={frameworks}>
				<ComboboxInput placeholder="Select a framework" showClear />
				<ComboboxContent>
					<ComboboxEmpty>No items found.</ComboboxEmpty>
					<ComboboxList>
						{item => (
							<ComboboxItem key={item} value={item}>
								{item}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		)
	},
}

const timezones = [
	{
		value: 'Americas',
		items: [
			'(GMT-5) New York',
			'(GMT-8) Los Angeles',
			'(GMT-6) Chicago',
			'(GMT-5) Toronto',
			'(GMT-8) Vancouver',
			'(GMT-3) São Paulo',
		],
	},
	{
		value: 'Europe',
		items: [
			'(GMT+0) London',
			'(GMT+1) Paris',
			'(GMT+1) Berlin',
			'(GMT+1) Rome',
			'(GMT+1) Madrid',
			'(GMT+1) Amsterdam',
		],
	},
	{
		value: 'Asia/Pacific',
		items: [
			'(GMT+9) Tokyo',
			'(GMT+8) Shanghai',
			'(GMT+8) Singapore',
			'(GMT+4) Dubai',
			'(GMT+11) Sydney',
			'(GMT+9) Seoul',
		],
	},
] as const

export const WithGroupsAndSeparators: Story = {
	render: () => {
		return (
			<Combobox items={timezones}>
				<ComboboxInput placeholder="Select a timezone" />
				<ComboboxContent>
					<ComboboxEmpty>No timezones found.</ComboboxEmpty>
					<ComboboxList>
						{group => (
							<ComboboxGroup items={group.items} key={group.value}>
								<ComboboxLabel>{group.value}</ComboboxLabel>
								<ComboboxCollection>
									{item => (
										<ComboboxItem key={item} value={item}>
											{item}
										</ComboboxItem>
									)}
								</ComboboxCollection>
								<ComboboxSeparator />
							</ComboboxGroup>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		)
	},
}

const countries = [
	{ code: '', value: '', continent: '', label: 'Select country' },
	{ code: 'af', value: 'afghanistan', label: 'Afghanistan', continent: 'Asia' },
	{ code: 'al', value: 'albania', label: 'Albania', continent: 'Europe' },
	{ code: 'dz', value: 'algeria', label: 'Algeria', continent: 'Africa' },
	{ code: 'ad', value: 'andorra', label: 'Andorra', continent: 'Europe' },
	{ code: 'ao', value: 'angola', label: 'Angola', continent: 'Africa' },
	{ code: 'er', value: 'eritrea', label: 'Eritrea', continent: 'Africa' },
	{ code: 'ee', value: 'estonia', label: 'Estonia', continent: 'Europe' },
	{ code: 'et', value: 'ethiopia', label: 'Ethiopia', continent: 'Africa' },
	{ code: 'fj', value: 'fiji', label: 'Fiji', continent: 'Oceania' },
	{ code: 'fi', value: 'finland', label: 'Finland', continent: 'Europe' },
	{ code: 'fr', value: 'france', label: 'France', continent: 'Europe' },
	{ code: 'ga', value: 'gabon', label: 'Gabon', continent: 'Africa' },
	{ code: 'gm', value: 'gambia', label: 'Gambia', continent: 'Africa' },
	{ code: 'ge', value: 'georgia', label: 'Georgia', continent: 'Asia' },
	{ code: 'de', value: 'germany', label: 'Germany', continent: 'Europe' },
	{ code: 'gh', value: 'ghana', label: 'Ghana', continent: 'Africa' },
	{ code: 'gr', value: 'greece', label: 'Greece', continent: 'Europe' },
	{ code: 'sy', value: 'syria', label: 'Syria', continent: 'Asia' },
	{ code: 'tw', value: 'taiwan', label: 'Taiwan', continent: 'Asia' },
	{ code: 'tj', value: 'tajikistan', label: 'Tajikistan', continent: 'Asia' },
	{ code: 'tz', value: 'tanzania', label: 'Tanzania', continent: 'Africa' },
	{ code: 'th', value: 'thailand', label: 'Thailand', continent: 'Asia' },
	{ code: 'tl', value: 'timor-leste', label: 'Timor-Leste', continent: 'Asia' },
	{ code: 'tg', value: 'togo', label: 'Togo', continent: 'Africa' },
	{ code: 'to', value: 'tonga', label: 'Tonga', continent: 'Oceania' },
]

export const InPopup: Story = {
	render: () => (
		<Combobox defaultValue={countries[0]} items={countries}>
			<ComboboxTrigger
				aria-label="Select a country"
				render={
					<Button
						className="w-64 justify-between font-normal"
						variant="outline"
					>
						<ComboboxValue />
					</Button>
				}
			/>
			<ComboboxContent>
				<ComboboxInput placeholder="Search" showTrigger={false} />
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList>
					{item => (
						<ComboboxItem key={item.code} value={item}>
							{item.label}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	),
}

export const MultipleOptions: Story = {
	render: () => {
		const anchor = useComboboxAnchor()

		return (
			<div className="w-65.5">
				<Combobox
					autoHighlight
					defaultValue={[frameworks[0]]}
					items={frameworks}
					multiple
				>
					<ComboboxChips ref={anchor}>
						<ComboboxValue>
							{values => (
								<React.Fragment>
									{values.map((value: string) => (
										<ComboboxChip key={value}>{value}</ComboboxChip>
									))}
									<ComboboxChipsInput aria-label="Select frameworks" />
								</React.Fragment>
							)}
						</ComboboxValue>
					</ComboboxChips>
					<ComboboxContent anchor={anchor}>
						<ComboboxEmpty>No items found.</ComboboxEmpty>
						<ComboboxList>
							{item => (
								<ComboboxItem key={item} value={item}>
									{item}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
		)
	},
}

export const CustomItemRendering: Story = {
	render: () => {
		return (
			<Combobox
				items={countries.filter(country => country.code !== '')}
				itemToStringValue={(country: (typeof countries)[number]) =>
					country.label
				}
			>
				<ComboboxInput placeholder="Search countries..." />
				<ComboboxContent>
					<ComboboxEmpty>No countries found.</ComboboxEmpty>
					<ComboboxList>
						{country => (
							<ComboboxItem key={country.code} value={country}>
								<Item className="p-0" size="xs">
									<ItemContent>
										<ItemTitle className="whitespace-nowrap">
											{country.label}
										</ItemTitle>
										<ItemDescription>
											{country.continent} ({country.code})
										</ItemDescription>
									</ItemContent>
								</Item>
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		)
	},
}
