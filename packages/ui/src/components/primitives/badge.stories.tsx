import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	AtSign,
	Bell,
	Check,
	CircleDashed,
	CircleDotDashed,
	Mail,
	MessageCircle,
	X,
} from 'lucide-react'
import type { VariantProps } from 'tailwind-variants'

import { Badge, type badgeVariants } from './badge'
import { Button } from './button'

type BadgeVariants = VariantProps<typeof badgeVariants>

const variants: NonNullable<BadgeVariants['variant']>[] = [
	'default',
	'secondary',
	'outline',
	'ghost',
	'link',
	'destructive',
]

const meta = {
	title: 'Components/Primitives/Badge',
	component: Badge,
	argTypes: {
		variant: {
			control: { type: 'select' },
			description: 'The variant of the badge',
			options: variants,
			table: {
				category: 'variants',
				defaultValue: { summary: 'default' },
			},
		},
	},
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: 'Badge',
	},
}

export const Variants: Story = {
	render: args => (
		<div className="flex flex-wrap gap-4">
			{variants.map(variant => (
				<Badge key={variant} {...args} variant={variant}>
					{variant.charAt(0).toUpperCase() + variant.slice(1)}
				</Badge>
			))}
		</div>
	),
}

export const Status: Story = {
	render: () => (
		<div className="flex w-full flex-wrap justify-center gap-2">
			<Badge className="gap-2" variant="secondary">
				<CircleDashed /> Todo
			</Badge>
			<Badge className="gap-2 bg-amber-500/15 text-amber-500 dark:bg-amber-500/10">
				<CircleDotDashed /> In Progress
			</Badge>
			<Badge className="gap-2 bg-green-500/15 text-green-500 dark:bg-green-500/10">
				<Check strokeWidth={2.5} /> Done
			</Badge>
			<Badge className="gap-2 bg-red-500/10 text-red-500 dark:bg-red-500/20">
				<X /> Cancelled
			</Badge>
		</div>
	),
}

export const Image: Story = {
	render: () => (
		<div className="flex w-full flex-wrap justify-center gap-2">
			<Badge className="rounded-full ps-0.75" variant="outline">
				{/** biome-ignore lint/performance/noImgElement: This is just for the example */}
				<img
					alt="shadcn"
					className="h-5 w-5 rounded-full"
					height={20}
					src="https://github.com/shadcn.png"
					width={20}
				/>
				shadcn
			</Badge>
			<Badge className="rounded-full pe-0.75" variant="outline">
				shadcn
				{/** biome-ignore lint/performance/noImgElement: This is just for the example */}
				<img
					alt="shadcn"
					className="h-5 w-5 rounded-full"
					height={20}
					src="https://github.com/shadcn.png"
					width={20}
				/>
			</Badge>
		</div>
	),
}

export const Indicator: Story = {
	render: () => (
		<div className="flex w-full flex-wrap justify-center gap-6">
			<Button
				aria-label="notification indicator"
				className="relative"
				size="icon"
				variant="outline"
			>
				<Bell />
				<Badge
					className="-translate-y-1/2 absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 rounded-full p-0 px-0.5 empty:h-2.5 empty:min-w-2.5"
					variant="destructive"
				/>
			</Button>
			<Button
				aria-label="notification indicator"
				className="relative"
				size="icon"
				variant="outline"
			>
				<Bell />
				<Badge
					className="-translate-y-1/2 absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 rounded-full p-0 px-0.5 empty:h-2.5 empty:min-w-2.5"
					variant="destructive"
				>
					5
				</Badge>
			</Button>
			<Button
				aria-label="notification indicator"
				className="relative"
				size="icon"
				variant="outline"
			>
				<Mail />
				<Badge
					className="-translate-y-1/2 absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 rounded-full p-0 px-0.5 empty:h-2.5 empty:min-w-2.5"
					variant="destructive"
				>
					99+
				</Badge>
			</Button>
			<Button
				aria-label="notification indicator"
				className="relative"
				size="icon"
				variant="outline"
			>
				<MessageCircle />
				<Badge
					className="-translate-y-1/2 absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 rounded-full p-0 px-0.5 empty:h-2.5 empty:min-w-2.5"
					variant="destructive"
				>
					<AtSign className="size-3" />
				</Badge>
			</Button>
		</div>
	),
}
