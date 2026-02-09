import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRightIcon } from 'lucide-react'

import { Spinner } from './spinner'
import {
	Badge,
	Button,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	Field,
	FieldLabel,
	InputGroup,
	InputGroupAddon,
	InputGroupInput
} from '#ui'

const meta = {
	title: 'Components/Primitives/Spinner',
	component: Spinner
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<Spinner />
			<Spinner className="size-6" />
		</div>
	)
}

export const Buttons: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-4">
			<Button>
				<Spinner data-icon="inline-start" /> Submit
			</Button>
			<Button disabled>
				<Spinner data-icon="inline-start" /> Disabled
			</Button>
			<Button disabled variant="outline">
				<Spinner data-icon="inline-start" /> Outline
			</Button>
			<Button disabled size="icon" variant="outline">
				<Spinner data-icon="inline-start" />
				<span className="sr-only">Loading...</span>
			</Button>
		</div>
	)
}

export const Badges: Story = {
	render: () => (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<Badge>
				<Spinner data-icon="inline-start" />
				Badge
			</Badge>
			<Badge variant="secondary">
				<Spinner data-icon="inline-start" />
				Badge
			</Badge>
			<Badge variant="destructive">
				<Spinner data-icon="inline-start" />
				Badge
			</Badge>
			<Badge variant="outline">
				<Spinner data-icon="inline-start" />
				Badge
			</Badge>
		</div>
	)
}

export const InputGroupField: Story = {
	render: () => (
		<Field>
			<FieldLabel htmlFor="input-group-spinner">Input Group</FieldLabel>
			<InputGroup>
				<InputGroupInput id="input-group-spinner" />
				<InputGroupAddon>
					<Spinner />
				</InputGroupAddon>
			</InputGroup>
		</Field>
	)
}

export const EmptyState: Story = {
	render: () => (
		<Empty className="min-h-[300px]">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Spinner />
				</EmptyMedia>
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
							Learn more <ArrowRightIcon />
						</a>
					}
					variant="link"
				/>
			</EmptyContent>
		</Empty>
	)
}
