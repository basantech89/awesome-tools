import type { Meta, StoryObj } from '@storybook/react-vite'

import { CircleAlert } from 'lucide-react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from './alert-dialog'
import { Button, buttonVariants } from './button'

const meta = {
	title: 'Components/Primitives/AlertDialog',
	component: AlertDialog,
	argTypes: {
		defaultOpen: {
			label: 'Default Open',
			control: { type: 'boolean' },
			description:
				'The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.'
		},
		open: {
			label: 'Open',
			control: { type: 'boolean' },
			description:
				'The controlled open state of the dialog. Must be used in conjunction with onOpenChange.'
		},
		onOpenChange: {
			label: 'On Open Change',
			description:
				'Event handler called when the open state of the dialog changes.'
		}
	}
} satisfies Meta<typeof AlertDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => (
		<AlertDialog {...args}>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Show Dialog
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export const Icon: Story = {
	render: args => (
		<AlertDialog {...args}>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Show Dialog
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
						<CircleAlert className="mt-1 size-5 shrink-0" />
						<div className="flex flex-col gap-2">
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</AlertDialogDescription>
						</div>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export const Destructive: Story = {
	render: args => (
		<AlertDialog {...args}>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Show Dialog
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className="rounded-none">
					<div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
						<CircleAlert className="fill-destructive/10 text-destructive mt-1 size-5 shrink-0" />
						<div className="flex flex-col gap-2">
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</AlertDialogDescription>
						</div>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: 'destructive' })}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
