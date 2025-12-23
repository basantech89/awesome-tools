import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

const meta = {
	title: 'Component/Primitives/Dialog',
	component: Dialog,
	argTypes: {
		defaultOpen: {
			label: 'Default Open',
			control: { type: 'boolean' },
			description:
				'The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.',
		},
		open: {
			label: 'Open',
			control: { type: 'boolean' },
			description:
				'The controlled open state of the dialog. Must be used in conjunction with onOpenChange.',
		},
		onOpenChange: {
			label: 'On Open Change',
			description:
				'Event handler called when the open state of the dialog changes.',
		},
		modal: {
			label: 'Modal',
			control: { type: 'boolean' },
			description:
				'The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.',
			table: { defaultValue: { summary: 'true' } },
		},
	},
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => (
		<Dialog {...args}>
			<form>
				<DialogTrigger
					render={<Button variant="outline">Open Dialog</Button>}
				/>
				<DialogContent className="sm:max-is-[425px]">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you&apos;re
							done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name-1">Name</Label>
							<Input defaultValue="Pedro Duarte" id="name-1" name="name" />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="username-1">Username</Label>
							<Input defaultValue="@peduarte" id="username-1" name="username" />
						</div>
					</div>
					<DialogFooter>
						<DialogClose render={<Button variant="outline">Cancel</Button>} />
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	),
}

export const CustomCloseButton: Story = {
	render: args => (
		<Dialog {...args}>
			<DialogTrigger render={<Button variant="outline" />}>Share</DialogTrigger>
			<DialogContent className="sm:max-is-md">
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to view this.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-2">
					<div className="grid flex-1 gap-2">
						<Label className="sr-only" htmlFor="link">
							Link
						</Label>
						<Input
							defaultValue="https://ui.shadcn.com/docs/installation"
							id="link"
							readOnly
						/>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose render={<Button variant="outline" />}>Close</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
}
