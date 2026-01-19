import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './pagination'
import {
	Field,
	FieldLabel,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '#ui'

const meta = {
	title: 'Components/Display/Pagination',
	component: Pagination,
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

export const WithSelect: Story = {
	render: () => (
		<div className="flex items-center justify-between gap-4">
			<Field className="w-fit" orientation="horizontal">
				<FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
				<Select defaultValue="25">
					<SelectTrigger className="w-20" id="select-rows-per-page">
						<SelectValue />
					</SelectTrigger>
					<SelectContent align="start">
						<SelectGroup>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="25">25</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
			<Pagination className="mx-0 w-auto">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	),
}
