import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './card'
import { Input } from './input'
import { Label } from './label'

const meta = {
	title: 'Component/Display/Card',
	component: Card,
	argTypes: {
		size: {
			control: { type: 'select' },
			description: 'The size of the card',
			options: ['sm', 'default'],
		},
	},
	args: { size: 'default' },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => (
		<Card {...args} className="min-w-[30vw]">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
				<CardAction>
					<Button variant="link">Sign Up</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="m@example.com"
								required
								type="email"
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<a
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									href="/"
								>
									Forgot your password?
								</a>
							</div>
							<Input id="password" required type="password" />
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button className="w-full" type="submit">
					Login
				</Button>
				<Button className="w-full" variant="outline">
					Login with Google
				</Button>
			</CardFooter>
		</Card>
	),
}

export const Sizes: Story = {
	render: (_, ctx) => (
		<div className="flex gap-20">
			<div>
				<p className="pb-2">Small Size</p>
				{Default.render?.({ size: 'sm' }, ctx)}
			</div>
			<div>
				<p className="pb-2">Default size</p>
				{Default.render?.({ size: 'default' }, ctx)}
			</div>
		</div>
	),
}
