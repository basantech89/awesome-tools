/** biome-ignore-all lint/performance/noImgElement: all images are used only for demoing */
import type { Meta, StoryObj } from '@storybook/react-vite'

import { CaptionsIcon, PlusIcon } from 'lucide-react'

import { Field, FieldGroup, FieldLabel } from '../forms/field'
import { Input } from '../forms/input'
import {
	Avatar,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage
} from '../primitives/avatar'
import { Button } from '../primitives/button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from './card'

const meta = {
	title: 'Components/Display/Card',
	component: Card,
	argTypes: {
		size: {
			control: { type: 'select' },
			description: 'The size of the card',
			options: ['sm', 'default']
		}
	},
	args: { size: 'default' }
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<div className="w-95">
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									placeholder="m@example.com"
									required
									type="email"
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<a
										className="ml-auto inline-block underline-offset-4 hover:underline"
										href="/"
									>
										Forgot your password?
									</a>
								</div>
								<Input id="password" required type="password" />
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button className="w-full" type="submit">
						Login
					</Button>
					<Button className="w-full" variant="outline">
						Login with Google
					</Button>
					<div className="mt-4 text-center">
						Don&apos;t have an account?{' '}
						<a className="underline underline-offset-4" href="/">
							Sign up
						</a>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

export const Sizes: Story = {
	render: () => (
		<div className="flex gap-20">
			<Card className="mx-auto w-full max-w-sm" size="default">
				<CardHeader>
					<CardTitle>Default Card</CardTitle>
					<CardDescription>
						This card uses the default size variant.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						The card component supports a size prop that defaults to
						&quot;default&quot; for standard spacing and sizing.
					</p>
				</CardContent>
				<CardFooter>
					<Button className="w-full" variant="outline">
						Action
					</Button>
				</CardFooter>
			</Card>

			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle>Small Card</CardTitle>
					<CardDescription>
						This card uses the small size variant.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						The card component supports a size prop that defaults to
						&quot;default&quot; for standard spacing and sizing.
					</p>
				</CardContent>
				<CardFooter>
					<Button className="w-full" variant="outline">
						Action
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export const Border: Story = {
	render: () => (
		<div className="flex gap-18">
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader className="border-b">
					<CardTitle>Header with Border</CardTitle>
					<CardDescription>
						This is a card with a header that has a bottom border.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						The header has a border-b class applied, creating a visual
						separation between the header and content sections.
					</p>
				</CardContent>
			</Card>

			<Card className="mx-auto w-full max-w-sm">
				<CardContent>
					<p>
						The footer has a border-t class applied, creating a visual
						separation between the content and footer sections.
					</p>
				</CardContent>
				<CardFooter className="border-t">
					<Button className="w-full" variant="outline">
						Footer with Border
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export const Image: Story = {
	render: () => (
		<Card className="relative mx-auto w-full max-w-sm pt-0" size="default">
			<div className="bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
			<img
				alt="By mymind on Unsplash"
				className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
				src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				title="Photo by mymind on Unsplash"
			/>
			<CardHeader>
				<CardTitle>Beautiful Landscape</CardTitle>
				<CardDescription>
					A stunning view that captures the essence of natural beauty.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button className="w-full">
					<PlusIcon data-icon="inline-start" />
					Button
				</Button>
			</CardFooter>
		</Card>
	)
}

export const MeetingNotes: Story = {
	render: () => (
		<Card className="mx-auto w-full max-w-sm">
			<CardHeader>
				<CardTitle>Meeting Notes</CardTitle>
				<CardDescription>
					Transcript from the meeting with the client.
				</CardDescription>
				<CardAction>
					<Button variant="outline">
						<CaptionsIcon data-icon="inline-start" />
						Transcribe
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p>
					Client requested dashboard redesign with focus on mobile
					responsiveness.
				</p>
				<ol className="mt-4 flex list-decimal flex-col gap-2 pl-6">
					<li>New analytics widgets for daily/weekly metrics</li>
					<li>Simplified navigation menu</li>
					<li>Dark mode support</li>
					<li>Timeline: 6 weeks</li>
					<li>Follow-up meeting scheduled for next Tuesday</li>
				</ol>
			</CardContent>
			<CardFooter>
				<AvatarGroup>
					<Avatar>
						<AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<Avatar>
						<AvatarImage
							alt="@maxleiter"
							src="https://github.com/maxleiter.png"
						/>
						<AvatarFallback>LR</AvatarFallback>
					</Avatar>
					<Avatar>
						<AvatarImage
							alt="@evilrabbit"
							src="https://github.com/evilrabbit.png"
						/>
						<AvatarFallback>ER</AvatarFallback>
					</Avatar>
					<AvatarGroupCount>+8</AvatarGroupCount>
				</AvatarGroup>
			</CardFooter>
		</Card>
	)
}
