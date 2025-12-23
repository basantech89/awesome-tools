import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { fn } from 'storybook/test'

import { Button } from './button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
	DropdownSubMenu,
	DropdownSubMenuContent,
	DropdownSubMenuTrigger,
} from '@/components/ui/dropdown-menu'

const meta = {
	title: 'Component/Primitives/DropdownMenu',
	component: DropdownMenu,
	subcomponents: {
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger,
		DropdownMenuLabel,
		DropdownMenuGroup,
		DropdownMenuSeparator,
		DropdownMenuShortcut,
		DropdownMenuSub: DropdownSubMenu,
		DropdownMenuSubTrigger: DropdownSubMenuTrigger,
		DropdownMenuSubContent: DropdownSubMenuContent,
		DropdownMenuPortal,
	},
	argTypes: {
		defaultOpen: {
			label: 'Default Open',
			control: { type: 'boolean' },
			description:
				'The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state.',
		},
		open: {
			label: 'Open',
			control: { type: 'boolean' },
			description:
				'The controlled open state of the dropdown menu. Must be used in conjunction with onOpenChange.',
		},
		onOpenChange: {
			label: 'On Open Change',
			description:
				'Event handler called when the open state of the dropdown menu changes.',
		},
		modal: {
			label: 'Modal',
			control: { type: 'boolean' },
			description:
				'The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.',
		},
	},
	args: {
		onOpenChange: fn(),
		modal: true,
		defaultOpen: false,
	},
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => (
		<DropdownMenu {...args}>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Open
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="is-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Keyboard shortcuts
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownSubMenu>
						<DropdownSubMenuTrigger>Invite users</DropdownSubMenuTrigger>
						<DropdownMenuPortal>
							<DropdownSubMenuContent>
								<DropdownMenuItem>Email</DropdownMenuItem>
								<DropdownMenuItem>Message</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>More...</DropdownMenuItem>
							</DropdownSubMenuContent>
						</DropdownMenuPortal>
					</DropdownSubMenu>
					<DropdownMenuItem>
						New Team
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>GitHub</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuItem disabled>API</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const Checkboxes: Story = {
	render: args => {
		const [showStatusBar, setShowStatusBar] = React.useState<boolean>(true)
		const [showActivityBar, setShowActivityBar] = React.useState<boolean>(false)
		const [showPanel, setShowPanel] = React.useState<boolean>(false)

		return (
			<DropdownMenu {...args}>
				<DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
				<DropdownMenuContent className="is-56">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Appearance</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem
							checked={showStatusBar}
							onCheckedChange={setShowStatusBar}
						>
							Status Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={showActivityBar}
							disabled
							onCheckedChange={setShowActivityBar}
						>
							Activity Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={showPanel}
							onCheckedChange={setShowPanel}
						>
							Panel
						</DropdownMenuCheckboxItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	},
}
