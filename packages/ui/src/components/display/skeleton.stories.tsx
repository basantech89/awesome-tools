import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card, CardContent, CardHeader } from './card'
import { Skeleton } from './skeleton'

const meta = {
	title: 'Components/Display/Skeleton',
	component: Skeleton,
	argTypes: {},
	decorators: [
		Story => (
			<div className="w-85">
				<Story />
			</div>
		)
	]
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const SkeletonAvatar: Story = {
	render: () => (
		<div className="flex w-full items-center gap-4">
			<Skeleton className="size-10 shrink-0 rounded-full" />
			<div className="grid gap-2">
				<Skeleton className="h-4 w-37.5" />
				<Skeleton className="h-4 w-25" />
			</div>
		</div>
	)
}

export const SkeletonCard: Story = {
	render: () => (
		<Card className="w-full">
			<CardHeader>
				<Skeleton className="h-4 w-2/3" />
				<Skeleton className="h-4 w-1/2" />
			</CardHeader>
			<CardContent>
				<Skeleton className="aspect-square w-full" />
			</CardContent>
		</Card>
	)
}

export const SkeletonText: Story = {
	render: () => (
		<div className="flex w-full flex-col gap-2">
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-3/4" />
		</div>
	)
}

export const SkeletonForm: Story = {
	render: () => (
		<div className="flex w-full flex-col gap-7">
			<div className="flex flex-col gap-3">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-10 w-full" />
			</div>
			<div className="flex flex-col gap-3">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-10 w-full" />
			</div>
			<Skeleton className="h-9 w-24" />
		</div>
	)
}

export const SkeletonTable: Story = {
	render: () => (
		<div className="flex w-full flex-col gap-2">
			<div className="flex gap-4">
				<Skeleton className="h-4 flex-1" />
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-20" />
			</div>
			<div className="flex gap-4">
				<Skeleton className="h-4 flex-1" />
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-20" />
			</div>
			<div className="flex gap-4">
				<Skeleton className="h-4 flex-1" />
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-20" />
			</div>
		</div>
	)
}
