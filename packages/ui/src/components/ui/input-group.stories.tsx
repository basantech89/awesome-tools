import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	ArrowUpIcon,
	CheckIcon,
	CreditCardIcon,
	InfoIcon,
	MailIcon,
	PlusIcon,
	SearchIcon,
	StarIcon,
} from 'lucide-react'
import React from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './dropdown-menu'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from './input-group'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import {
	Tooltip,
	TooltipContent,
	TooltipPositioner,
	TooltipTrigger,
} from './tooltip'
import { Separator } from '@/components/ui/separator'

const meta = {
	title: 'Component/Primitives/InputGroup',
	component: InputGroup,
	subcomponents: {
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
		InputGroupText,
	},
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<div className="is-full max-is-sm grid gap-6">
			<InputGroup>
				<InputGroupInput placeholder="Search..." />
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">12 results</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput className="ps-1!" placeholder="example.com" />
				<InputGroupAddon>
					<InputGroupText>https://</InputGroupText>
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<Tooltip>
						<TooltipTrigger
							render={
								<InputGroupButton
									aria-label="Info icon"
									className="rounded-full"
									size="icon-xs"
								/>
							}
						>
							<InfoIcon />
						</TooltipTrigger>
						<TooltipPositioner>
							<TooltipContent>This is content in a tooltip.</TooltipContent>
						</TooltipPositioner>
					</Tooltip>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupTextarea placeholder="Ask, Search or Chat..." />
				<InputGroupAddon align="block-end">
					<InputGroupButton
						aria-label="Plus icon"
						className="rounded-full"
						size="icon-xs"
						variant="outline"
					>
						<PlusIcon />
					</InputGroupButton>
					<DropdownMenu>
						<DropdownMenuTrigger render={<InputGroupButton variant="ghost" />}>
							Auto
						</DropdownMenuTrigger>
						<DropdownMenuContent className="[--radius:0.95rem]">
							<DropdownMenuItem>Auto</DropdownMenuItem>
							<DropdownMenuItem>Agent</DropdownMenuItem>
							<DropdownMenuItem>Manual</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<InputGroupText className="ms-auto">52% used</InputGroupText>
					<Separator className="bs-4!" orientation="vertical" />
					<InputGroupButton
						className="rounded-full"
						disabled
						size="icon-xs"
						variant="default"
					>
						<ArrowUpIcon />
						<span className="sr-only">Send</span>
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="@shadcn" />
				<InputGroupAddon align="inline-end">
					<div className="flex size-rem-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<CheckIcon className="size-rem-3" />
					</div>
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
}

export const Icon: Story = {
	render: () => (
		<div className="is-full max-is-sm grid gap-6">
			<InputGroup>
				<InputGroupInput placeholder="Search..." />
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="Enter your email" type="email" />
				<InputGroupAddon>
					<MailIcon />
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="Card number" />
				<InputGroupAddon>
					<CreditCardIcon />
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<CheckIcon />
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="Card number" />
				<InputGroupAddon align="inline-end">
					<StarIcon />
					<InfoIcon />
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
}

export const Text: Story = {
	render: () => (
		<div className="is-full max-is-sm grid gap-6">
			<InputGroup>
				<InputGroupAddon>
					<InputGroupText>$</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput placeholder="0.00" />
				<InputGroupAddon align="inline-end">
					<InputGroupText>USD</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupAddon>
					<InputGroupText>https://</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput className="ps-0.5!" placeholder="example.com" />
				<InputGroupAddon align="inline-end">
					<InputGroupText>.com</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="Enter your username" />
				<InputGroupAddon align="inline-end">
					<InputGroupText>@company.com</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupTextarea placeholder="Enter your message" />
				<InputGroupAddon align="block-end">
					<InputGroupText className="text-muted-foreground text-xs">
						120 characters left
					</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
}

export const Button: Story = {
	render: () => {
		const [isFavorite, setIsFavorite] = React.useState(false)

		return (
			<div className="is-full max-is-sm grid gap-6">
				<InputGroup>
					<InputGroupInput placeholder="https://x.com/shadcn" readOnly />
					<InputGroupAddon align="inline-end">
						<InputGroupButton aria-label="Copy" size="icon-xs" title="Copy">
							<CheckIcon />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				<InputGroup className="[--radius:9999px]">
					<InputGroupAddon>
						<Popover>
							<PopoverTrigger
								render={
									<InputGroupButton
										aria-label="info icon"
										size="icon-xs"
										variant="secondary"
									>
										<InfoIcon />
									</InputGroupButton>
								}
							/>
							<PopoverContent
								align="start"
								className="flex flex-col gap-1 rounded-xl text-sm"
							>
								<p className="font-medium">Your connection is not secure.</p>
								<p>
									You should not enter any sensitive information on this site.
								</p>
							</PopoverContent>
						</Popover>
					</InputGroupAddon>{' '}
					<InputGroupAddon className="ps-1.5 text-muted-foreground">
						https://
					</InputGroupAddon>
					<InputGroupInput aria-label="url input" id="input-secure-19" />
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							aria-label="star icon"
							onClick={() => setIsFavorite(!isFavorite)}
							size="icon-xs"
						>
							<StarIcon
								className="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600"
								data-favorite={isFavorite}
							/>
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				<InputGroup>
					<InputGroupInput placeholder="Type to search..." />
					<InputGroupAddon align="inline-end">
						<InputGroupButton variant="secondary">Search</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>
		)
	},
}
