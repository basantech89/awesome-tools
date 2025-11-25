import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { fn } from 'storybook/test'

import { Button, type ButtonProps } from '@/components/ui/button'

const buttonVariants: ButtonProps['variant'][] = [
	'primary',
	'secondary',
	'outline',
	'ghost',
	'link',
	'destructive',
]

const buttonSizes: ButtonProps['size'][] = ['sm', 'md', 'lg']
const iconButtonSizes: ButtonProps['size'][] = ['icon-sm', 'icon-md', 'icon-lg']

const meta = {
	title: 'Component/Button',
	component: Button,
	argTypes: {
		variant: {
			control: { type: 'select' },
			description: 'The variant of the button',
			options: buttonVariants,
			table: {
				category: 'variants',
				defaultValue: { summary: 'primary' },
			},
		},
		size: {
			control: { type: 'select' },
			description: 'The size of the button',
			options: [...buttonSizes, ...iconButtonSizes],
			table: {
				category: 'variants',
				defaultValue: { summary: 'md' },
			},
		},
	},
	args: { onClick: fn(), variant: 'primary', size: 'md' },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const Icon = () => (
	<svg viewBox="0 0 92.3 132.3">
		<title>Google maps icon</title>
		<path
			d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"
			fill="#1a73e8"
		/>
		<path
			d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z"
			fill="#ea4335"
		/>
		<path
			d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"
			fill="#4285f4"
		/>
		<path
			d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"
			fill="#fbbc04"
		/>
		<path
			d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"
			fill="#34a853"
		/>
		<script />
	</svg>
)

export const Default: Story = {
	args: {
		children: 'Button',
	},
}

export const Variants: Story = {
	args: {
		size: 'md',
	},
	render: args => (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<p>Enabled</p>
				<div className="flex flex-wrap gap-4">
					{buttonVariants.map(variant => (
						<Button key={variant} {...args} variant={variant}>
							{variant.charAt(0).toUpperCase() + variant.slice(1)}
						</Button>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<p>Disabled</p>
				<div className="flex flex-wrap gap-4">
					{buttonVariants.map(variant => (
						<Button key={variant} {...args} disabled variant={variant}>
							{variant.charAt(0).toUpperCase() + variant.slice(1)}
						</Button>
					))}
				</div>
			</div>
		</div>
	),
}

export const Sizes: Story = {
	args: {
		variant: 'primary',
	},
	render: args => (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<p>Regular Buttons</p>
				<div className="flex flex-wrap gap-4">
					{buttonSizes.map(size => (
						<Button key={size} {...args} size={size}>
							{size.toUpperCase()} Button
						</Button>
					))}
				</div>
			</div>
		</div>
	),
}

export const ButtonWithIcons: Story = {
	args: {
		variant: 'primary',
		size: 'md',
	},
	render: args => (
		<div className="flex flex-col gap-4">
			<p>Button with Icons</p>
			<div className="flex gap-4">
				{buttonSizes.map(size => (
					<Button key={size} {...args} size={size}>
						{size.toUpperCase()} Button <Icon />
					</Button>
				))}
			</div>
		</div>
	),
}

export const IconButtons: Story = {
	args: {
		variant: 'primary',
	},
	render: args => (
		<div className="flex flex-col gap-4">
			<p>Icon Buttons</p>
			<div className="flex gap-4">
				{iconButtonSizes.map(size => (
					<React.Fragment key={size}>
						<p>{size}</p>
						<Button key={size} {...args} size={size}>
							<Icon />
						</Button>
					</React.Fragment>
				))}
			</div>
		</div>
	),
}

export const AsChild: Story = {
	args: {
		asChild: true,
		children: (
			<a href="https://example.com" rel="noopener noreferrer" target="_blank">
				I'm an anchor tag that looks like a button
			</a>
		),
	},
}
