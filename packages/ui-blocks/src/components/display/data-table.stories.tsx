import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@awesome-tools/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { DataTable } from './data-table'

type Payment = {
	id: string
	amount: number
	status: 'pending' | 'processing' | 'success' | 'failed'
	email: string
}

const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'email',
		sortingFn: 'text',
		header: ({ column }) => {
			return (
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					variant="ghost"
				>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'amount',
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount)

			return <div className="text-right font-medium">{formatted}</div>
		},
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const payment = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button className="h-8 w-8 p-0" variant="ghost">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						}
					/>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(payment.id)}
							>
								Copy payment ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View customer</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]

const data: Payment[] = [
	{
		id: 'm5gr84i9',
		amount: 316,
		status: 'success',
		email: 'ken99@example.com',
	},
	{
		id: '3u1reuv4',
		amount: 242,
		status: 'success',
		email: 'Abe45@example.com',
	},
	{
		id: 'derv1ws0',
		amount: 837,
		status: 'processing',
		email: 'Monserrat44@example.com',
	},
	{
		id: '5kma53ae',
		amount: 874,
		status: 'success',
		email: 'Silas22@example.com',
	},
	{
		id: 'bhqecj4p',
		amount: 721,
		status: 'failed',
		email: 'carmella@example.com',
	},
]

const meta = {
	title: 'Components/Display/DataTable',
	component: DataTable,
	args: {
		//@ts-expect-error
		columns,
		data,
	},
} satisfies Meta<typeof DataTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => {
		return (
			<div className="container mx-auto py-10">
				<DataTable {...args} />
			</div>
		)
	},
}
