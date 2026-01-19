import type { Meta, StoryObj } from '@storybook/react-vite'
import { InboxIcon } from 'lucide-react'

import { Button } from '../primitives/button'
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from './item'

const meta = {
	title: 'Components/Display/Item',
	component: Item,
} satisfies Meta<typeof Item>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<div className="flex min-w-0 flex-1 flex-col items-start gap-6 bg-background p-4 text-foreground sm:p-6 *:[div:not([class*='w-'])]:w-full">
			<Item variant="outline">
				<ItemContent>
					<ItemTitle>Title Only</ItemTitle>
				</ItemContent>
			</Item>
			<Item variant="outline">
				<ItemContent>
					<ItemTitle>Title + Button</ItemTitle>
				</ItemContent>
				<ItemActions>
					<Button variant="outline">Action</Button>
				</ItemActions>
			</Item>
			<Item variant="outline">
				<ItemContent>
					<ItemTitle>Title + Description</ItemTitle>
					<ItemDescription>
						This is a description that provides additional context.
					</ItemDescription>
				</ItemContent>
			</Item>
			<Item variant="outline">
				<ItemContent>
					<ItemTitle>Title + Description + Button</ItemTitle>
					<ItemDescription>
						This item includes a title, description, and action button.
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button variant="outline">Action</Button>
				</ItemActions>
			</Item>
			<Item variant="outline">
				<ItemMedia variant="icon">
					<InboxIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Media + Title</ItemTitle>
				</ItemContent>
			</Item>
			<Item variant="outline">
				<ItemMedia variant="icon">
					<InboxIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Media + Title + Button</ItemTitle>
				</ItemContent>
				<ItemActions>
					<Button size="sm">Action</Button>
				</ItemActions>
			</Item>
			<Item variant="outline">
				<ItemMedia variant="icon">
					<InboxIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Media + Title + Description</ItemTitle>
					<ItemDescription>
						This item includes media, title, and description.
					</ItemDescription>
				</ItemContent>
			</Item>
			<Item variant="outline">
				<ItemMedia variant="icon">
					<InboxIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Media + Title + Description + Button</ItemTitle>
					<ItemDescription>
						Complete item with all components: media, title, description, and
						button.
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm">Action</Button>
				</ItemActions>
			</Item>
			<Item variant="outline">
				<ItemContent>
					<ItemTitle>Multiple Actions</ItemTitle>
					<ItemDescription>
						Item with multiple action buttons in the actions area.
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="outline">
						Cancel
					</Button>
					<Button size="sm">Confirm</Button>
				</ItemActions>
			</Item>
		</div>
	),
}
