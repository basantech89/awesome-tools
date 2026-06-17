import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	AppWindowIcon,
	CodeIcon,
	HomeIcon,
	SearchIcon,
	SettingsIcon
} from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta = {
	title: 'Components/Primitives/Tabs',
	component: Tabs
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="home">
			<TabsList>
				<TabsTrigger aria-label="trigger home tab" value="home">
					Home
				</TabsTrigger>
				<TabsTrigger aria-label="trigger settings tab" value="settings">
					Settings
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

export const TabsLine: Story = {
	render: () => (
		<Tabs defaultValue="overview">
			<TabsList variant="line">
				<TabsTrigger aria-label="trigger overview tab" value="overview">
					Overview
				</TabsTrigger>
				<TabsTrigger aria-label="trigger analytics tab" value="analytics">
					Analytics
				</TabsTrigger>
				<TabsTrigger aria-label="trigger reports tab" value="reports">
					Reports
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

export const Disabled: Story = {
	render: () => (
		<Tabs defaultValue="home">
			<TabsList>
				<TabsTrigger aria-label="trigger home tab" value="home">
					Home
				</TabsTrigger>
				<TabsTrigger
					aria-label="trigger settings tab"
					disabled
					value="settings"
				>
					Disabled
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

export const WithIcons: Story = {
	render: () => (
		<Tabs defaultValue="preview">
			<TabsList>
				<TabsTrigger aria-label="trigger preview tab" value="preview">
					<AppWindowIcon />
					Preview
				</TabsTrigger>
				<TabsTrigger aria-label="trigger code tab" value="code">
					<CodeIcon />
					Code
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

export const IconsOnly: Story = {
	render: () => (
		<Tabs defaultValue="home">
			<TabsList>
				<TabsTrigger aria-label="trigger home tab" value="home">
					<HomeIcon />
				</TabsTrigger>
				<TabsTrigger aria-label="trigger search tab" value="search">
					<SearchIcon />
				</TabsTrigger>
				<TabsTrigger aria-label="trigger settings tab" value="settings">
					<SettingsIcon />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

export const WithContent: Story = {
	render: () => (
		<Tabs defaultValue="account">
			<TabsList>
				<TabsTrigger aria-label="trigger account tab" value="account">
					Account
				</TabsTrigger>
				<TabsTrigger aria-label="trigger password tab" value="password">
					Password
				</TabsTrigger>
				<TabsTrigger
					aria-label="trigger notifications tab"
					value="notifications"
				>
					Notifications
				</TabsTrigger>
			</TabsList>
			<div className="style-lyra:rounded-none style-maia:rounded-xl style-mira:rounded-md style-nova:rounded-lg style-vega:rounded-lg style-lyra:p-4 style-maia:p-6 style-mira:p-4 style-nova:p-4 style-vega:p-6 border">
				<TabsContent value="account">
					Manage your account preferences and profile information.
				</TabsContent>
				<TabsContent value="password">
					Update your password to keep your account secure.
				</TabsContent>
				<TabsContent value="notifications">
					Configure how you receive notifications and alerts.
				</TabsContent>
			</div>
		</Tabs>
	)
}

export const VerticalTabs: Story = {
	render: () => (
		<Tabs defaultValue="account" orientation="vertical">
			<TabsList>
				<TabsTrigger aria-label="trigger account tab" value="account">
					Account
				</TabsTrigger>
				<TabsTrigger aria-label="trigger password tab" value="password">
					Password
				</TabsTrigger>
				<TabsTrigger
					aria-label="trigger notifications tab"
					value="notifications"
				>
					Notifications
				</TabsTrigger>
			</TabsList>
			<div className="style-lyra:rounded-none style-maia:rounded-xl style-mira:rounded-md style-nova:rounded-lg style-vega:rounded-lg style-lyra:p-4 style-maia:p-6 style-mira:p-4 style-nova:p-4 style-vega:p-6 border">
				<TabsContent value="account">
					Manage your account preferences and profile information.
				</TabsContent>
				<TabsContent value="password">
					Update your password to keep your account secure. Use a strong
					password with a mix of letters, numbers, and symbols.
				</TabsContent>
				<TabsContent value="notifications">
					Configure how you receive notifications and alerts. Choose which types
					of notifications you want to receive and how you want to receive them.
				</TabsContent>
			</div>
		</Tabs>
	)
}
