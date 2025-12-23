import type { Meta, StoryObj } from '@storybook/react-vite'
import { MapPin } from 'lucide-react'
import React from 'react'
import { fn } from 'storybook/test'

import { Button, type ButtonVariants } from '@/components/ui/button'

const buttonVariants: NonNullable<ButtonVariants['variant']>[] = [
	'default',
	'secondary',
	'outline',
	'ghost',
	'link',
	'destructive',
]

const buttonSizes: NonNullable<ButtonVariants['size']>[] = [
	'xs',
	'sm',
	'default',
	'lg',
]
const iconButtonSizes: NonNullable<ButtonVariants['size']>[] = [
	'icon-xs',
	'icon-sm',
	'icon',
	'icon-lg',
]

const meta = {
	title: 'Component/Primitives/Button',
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
	args: { onClick: fn(), variant: 'default', size: 'default' },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const Icon = () => <MapPin />

export const Default: Story = {
	args: {
		children: 'Button',
	},
}

export const Variants: Story = {
	args: {
		size: 'default',
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
		variant: 'default',
	},
	render: args => (
		<div className="flex flex-col gap-5">
			<p>Regular Buttons</p>
			<div className="flex flex-wrap gap-4">
				{buttonSizes.map(size => (
					<Button key={size} {...args} size={size}>
						{size.toUpperCase()} Button
					</Button>
				))}
			</div>
		</div>
	),
}

export const ButtonWithIcons: Story = {
	args: {
		variant: 'default',
		size: 'default',
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
		variant: 'default',
	},
	render: args => (
		<div className="flex flex-col gap-4">
			<p>Icon Buttons</p>
			<div className="flex gap-4">
				{iconButtonSizes.map(size => (
					<React.Fragment key={size}>
						<p>{size}</p>
						<Button
							key={size}
							{...args}
							aria-label={`${size} icon button`}
							size={size}
						>
							<Icon />
						</Button>
					</React.Fragment>
				))}
			</div>
		</div>
	),
}
