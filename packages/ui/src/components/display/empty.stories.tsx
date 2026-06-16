import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	ArrowUpRightIcon,
	CircleDashedIcon,
	FolderIcon,
	PlusIcon
} from 'lucide-react'

import { Button, InputGroup, InputGroupAddon, InputGroupInput, Kbd } from '#ui'

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle
} from './empty'

const meta = {
	title: 'Components/Display/Empty',
	component: Empty
} satisfies Meta<typeof Empty>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No projects yet</EmptyTitle>
				<EmptyDescription>
					You haven&apos;t created any projects yet. Get started by creating
					your first project.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="flex gap-2">
					<Button
						nativeButton={false}
						render={<a href="/">Create project</a>}
					/>
					<Button variant="outline">Import project</Button>
				</div>
				<Button
					className="text-muted-foreground"
					nativeButton={false}
					render={
						<a href="/">
							Learn more <ArrowUpRightIcon />
						</a>
					}
					variant="link"
				/>
			</EmptyContent>
		</Empty>
	)
}

export const MutedBackground: Story = {
	render: () => (
		<Empty className="bg-muted">
			<EmptyHeader>
				<EmptyTitle>No results found</EmptyTitle>
				<EmptyDescription>
					No results found for your search. Try adjusting your search terms.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button>Try again</Button>
				<Button
					className="text-muted-foreground"
					nativeButton={false}
					render={
						<a href="/">
							Learn more <ArrowUpRightIcon />
						</a>
					}
					variant="link"
				/>
			</EmptyContent>
		</Empty>
	)
}

export const Border: Story = {
	render: () => (
		<Empty className="border">
			<EmptyHeader>
				<EmptyTitle>404 - Not Found</EmptyTitle>
				<EmptyDescription>
					The page you&apos;re looking for doesn&apos;t exist. Try searching for
					what you need below.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<InputGroup className="w-3/4">
					<InputGroupInput placeholder="Try searching for pages..." />
					<InputGroupAddon>
						<CircleDashedIcon />
					</InputGroupAddon>
					<InputGroupAddon align="inline-end">
						<Kbd>/</Kbd>
					</InputGroupAddon>
				</InputGroup>
				<EmptyDescription>
					Need help? <a href="/">Contact support</a>
				</EmptyDescription>
			</EmptyContent>
		</Empty>
	)
}

export const Icon: Story = {
	render: () => (
		<Empty className="border">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<FolderIcon />
				</EmptyMedia>
				<EmptyTitle>Nothing to see here</EmptyTitle>
				<EmptyDescription>
					No posts have been created yet. Get started by{' '}
					<a href="/">creating your first post</a>.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant="outline">
					<PlusIcon data-icon="inline-start" />
					New Post
				</Button>
			</EmptyContent>
		</Empty>
	)
}
