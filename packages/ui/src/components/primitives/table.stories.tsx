import type { Meta, StoryObj } from '@storybook/react-vite'
import { MoreHorizontalIcon } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../forms/dropdown-menu'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../forms/select'
import { Button } from './button'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from './table'

const meta = {
	title: 'Components/Primitives/Table',
	component: Table,
	argTypes: {},
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

const invoices = [
	{
		invoice: 'INV001',
		paymentStatus: 'Paid',
		totalAmount: '$250.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV002',
		paymentStatus: 'Pending',
		totalAmount: '$150.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV003',
		paymentStatus: 'Unpaid',
		totalAmount: '$350.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV004',
		paymentStatus: 'Paid',
		totalAmount: '$450.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV005',
		paymentStatus: 'Paid',
		totalAmount: '$550.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV006',
		paymentStatus: 'Pending',
		totalAmount: '$200.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV007',
		paymentStatus: 'Unpaid',
		totalAmount: '$300.00',
		paymentMethod: 'Credit Card',
	},
]

export const Default: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-25">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.slice(0, 3).map(invoice => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">{invoice.invoice}</TableCell>
						<TableCell>{invoice.paymentStatus}</TableCell>
						<TableCell>{invoice.paymentMethod}</TableCell>
						<TableCell className="text-right">{invoice.totalAmount}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
			<TableCaption>A list of your recent invoices.</TableCaption>
		</Table>
	),
}

export const WithBadges: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Task</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Priority</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">Design homepage</TableCell>
					<TableCell>
						<span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 font-medium text-green-700 text-xs dark:text-green-400">
							Completed
						</span>
					</TableCell>
					<TableCell className="text-right">
						<span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 font-medium text-blue-700 text-xs dark:text-blue-400">
							High
						</span>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Implement API</TableCell>
					<TableCell>
						<span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 font-medium text-xs text-yellow-700 dark:text-yellow-400">
							In Progress
						</span>
					</TableCell>
					<TableCell className="text-right">
						<span className="inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 font-medium text-gray-700 text-xs dark:text-gray-400">
							Medium
						</span>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Write tests</TableCell>
					<TableCell>
						<span className="inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 font-medium text-gray-700 text-xs dark:text-gray-400">
							Pending
						</span>
					</TableCell>
					<TableCell className="text-right">
						<span className="inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 font-medium text-gray-700 text-xs dark:text-gray-400">
							Low
						</span>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
}

export const WithActions: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Product</TableHead>
					<TableHead>Price</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">Wireless Mouse</TableCell>
					<TableCell>$29.99</TableCell>
					<TableCell className="text-right">
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button className="size-8" size="icon" variant="ghost">
										<MoreHorizontalIcon />
										<span className="sr-only">Open menu</span>
									</Button>
								}
							/>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Edit</DropdownMenuItem>
								<DropdownMenuItem>Duplicate</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive">
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Mechanical Keyboard</TableCell>
					<TableCell>$129.99</TableCell>
					<TableCell className="text-right">
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button className="size-8" size="icon" variant="ghost">
										<MoreHorizontalIcon />
										<span className="sr-only">Open menu</span>
									</Button>
								}
							/>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Edit</DropdownMenuItem>
								<DropdownMenuItem>Duplicate</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive">
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">USB-C Hub</TableCell>
					<TableCell>$49.99</TableCell>
					<TableCell className="text-right">
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button className="size-8" size="icon" variant="ghost">
										<MoreHorizontalIcon />
										<span className="sr-only">Open menu</span>
									</Button>
								}
							/>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Edit</DropdownMenuItem>
								<DropdownMenuItem>Duplicate</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive">
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
}

const people = [
	{ value: 'sarah', label: 'Sarah Chen' },
	{ value: 'marcus', label: 'Marc Rodriguez' },
	{ value: 'emily', label: 'Emily Watson' },
	{ value: 'david', label: 'David Kim' },
]

const tasks = [
	{
		task: 'Design homepage',
		assignee: 'sarah',
		status: 'In Progress',
	},
	{
		task: 'Implement API',
		assignee: 'marcus',
		status: 'Pending',
	},
	{
		task: 'Write tests',
		assignee: 'emily',
		status: 'Not Started',
	},
]

export const WithSelect: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Task</TableHead>
					<TableHead>Assignee</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{tasks.map(item => (
					<TableRow key={item.task}>
						<TableCell className="font-medium">{item.task}</TableCell>
						<TableCell>
							<Select
								defaultValue={people.find(
									person => person.value === item.assignee,
								)}
								items={people}
								itemToStringValue={item => {
									return item.value
								}}
							>
								<SelectTrigger
									aria-label="select assignee trigger"
									className="w-40"
									size="sm"
								>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{people.map(person => (
											<SelectItem key={person.value} value={person}>
												{person.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</TableCell>
						<TableCell>{item.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
}
