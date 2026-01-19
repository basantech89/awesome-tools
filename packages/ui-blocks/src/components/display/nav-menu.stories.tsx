import {
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@awesome-tools/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { NavMenu, NavMenuItem } from './nav-menu'

const meta = {
	title: 'Components/Display/NavigationMenu',
	component: NavMenu,
} satisfies Meta<typeof NavMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<NavMenu>
			<NavigationMenuList className="gap-4">
				<NavigationMenuItem className="mr-auto">
					<NavigationMenuLink className="p-0 font-agustina text-3xl" href="/">
						Basant Soni
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavMenuItem active href="/">
					Home
				</NavMenuItem>
				<NavMenuItem href="/sign-in">Sign In</NavMenuItem>
			</NavigationMenuList>
		</NavMenu>
	),
}
