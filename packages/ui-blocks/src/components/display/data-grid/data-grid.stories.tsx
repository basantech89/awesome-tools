import type { Meta } from '@storybook/react-vite'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@awesome-tools/ui'
import { faker } from '@faker-js/faker'
import {
	keepPreviousData,
	QueryClient,
	QueryClientProvider,
	useQuery
} from '@tanstack/react-query'
import {
	type ColumnDef,
	createColumnHelper,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

import {
	DataGrid,
	AdvancedColumnFilter,
	ColumnsFilter,
	DATA_GRID_CELL,
	DataGridTableExport,
	SortFilter,
	ViewFilter
} from '#blocks'

import { getAdvancedFilteredRowModel } from './data-grid-features'
import { DataGridPagination } from './data-grid-pagination'
import { DataGridTable } from './data-grid-table'

const queryClient = new QueryClient()

const meta = {
	title: 'Components/Display/DataGrid',
	component: DataGrid,
	excludeStories: ['makeData', 'fetchData', 'columns'],
	decorators: [
		Story => (
			<div className="mx-auto max-w-[94%]">
				<QueryClientProvider client={queryClient}>
					<Story />
				</QueryClientProvider>
			</div>
		)
	]
} satisfies Meta<typeof DataGrid>

export default meta

export const Default = {
	render: () => {
		type Payment = {
			id: string
			amount: number
			status: 'pending' | 'processing' | 'success' | 'failed'
			email: string
		}

		const columns: ColumnDef<Payment>[] = [
			{
				accessorKey: 'status',
				header: 'Status'
			},
			{
				accessorKey: 'email',
				sortingFn: 'text',
				header: 'Email'
			},
			{
				accessorKey: 'amount',
				header: () => <div className="text-right">Amount</div>,
				cell: ({ row }) => {
					const amount = parseFloat(row.getValue('amount'))
					const formatted = new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD'
					}).format(amount)

					return <div className="text-right font-medium">{formatted}</div>
				}
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
				}
			}
		]

		const data: Payment[] = [
			{
				id: 'm5gr84i9',
				amount: 316,
				status: 'success',
				email: 'ken99@example.com'
			},
			{
				id: '3u1reuv4',
				amount: 242,
				status: 'success',
				email: 'Abe45@example.com'
			},
			{
				id: 'derv1ws0',
				amount: 837,
				status: 'processing',
				email: 'Monserrat44@example.com'
			},
			{
				id: '5kma53ae',
				amount: 874,
				status: 'success',
				email: 'Silas22@example.com'
			},
			{
				id: 'bhqecj4p',
				amount: 721,
				status: 'failed',
				email: 'carmella@example.com'
			}
		]

		return (
			<div className="container mx-auto py-10">
				<DataGrid columns={columns} data={data}>
					<DataGridTable />
				</DataGrid>
			</div>
		)
	}
}

type Person = {
	firstName: string
	lastName: string
	age: number
	visits: number
	progress: number
	status: 'relationship' | 'complicated' | 'single'
	date: Date
	file: string
	language: string[]
	subRows?: Person[]
}

const range = (len: number) => {
	const arr: number[] = []
	for (let i = 0; i < len; i++) {
		arr.push(i)
	}
	return arr
}

const newPerson = (): Person => {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		age: faker.number.int(40),
		visits: faker.number.int(1000),
		progress: faker.number.int(100),
		status: faker.helpers.shuffle<Person['status']>([
			'relationship',
			'complicated',
			'single'
		])[0],
		date: new Date(faker.date.past()),
		file: faker.system.fileName(),
		language: faker.helpers.arrayElements(
			['English', 'French', 'Spanish', 'German', 'Chinese'],
			{
				min: 1,
				max: 4
			}
		)
	}
}

export function makeData(...lens: number[]) {
	const makeDataLevel = (depth = 0): Person[] => {
		const len = lens[depth]
		return range(len).map((_): Person => {
			return Object.assign(newPerson(), {
				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
			})
		})
	}

	return makeDataLevel()
}

const columnHelper = createColumnHelper<Person>()

export const ColumnGrouping = {
	parameters: {
		a11y: {
			config: {
				rules: [{ id: 'empty-table-header', enabled: false }]
			}
		}
	},
	render: () => {
		const columns: ColumnDef<Person>[] = [
			columnHelper.group({
				header: 'Name',
				footer: props => props.column.id,
				columns: [
					columnHelper.accessor('firstName', {
						header: 'First Name',
						cell: info => info.getValue(),
						footer: props => props.column.id
					}),
					columnHelper.accessor(row => row.lastName, {
						id: 'lastName',
						cell: info => info.getValue(),
						header: () => <span>Last Name</span>,
						footer: props => props.column.id
					})
				]
			}),
			columnHelper.group({
				header: 'Info',
				footer: props => props.column.id,
				columns: [
					columnHelper.accessor('age', {
						header: () => 'Age',
						footer: props => props.column.id
					}),
					columnHelper.accessor('visits', {
						header: () => <span>Visits</span>,
						footer: props => props.column.id
					}),
					columnHelper.accessor('status', {
						header: 'Status',
						footer: props => props.column.id
					}),
					columnHelper.accessor('progress', {
						header: 'Profile Progress',
						footer: props => props.column.id
					})
				]
			})
		]

		return (
			<DataGrid columns={columns} data={makeData(10)}>
				<DataGridTable />
			</DataGrid>
		)
	}
}

const columns = [
	columnHelper.accessor('firstName', {
		cell: info => info.getValue(),
		header: 'First Name',
		footer: props => props.column.id,
		meta: { label: 'First Name' }
	}),
	columnHelper.accessor(row => row.lastName, {
		id: 'lastName',
		cell: info => info.getValue(),
		header: () => <span>Last Name</span>,
		footer: props => props.column.id,
		meta: { label: 'Last Name' }
	}),
	columnHelper.accessor('age', {
		header: () => 'Age',
		footer: props => props.column.id,
		meta: { label: 'Age', type: DATA_GRID_CELL.Number }
	}),
	columnHelper.accessor('visits', {
		header: () => <span>Visits</span>,
		footer: props => props.column.id,
		meta: { label: 'Visits', type: DATA_GRID_CELL.Number }
	}),
	columnHelper.accessor('status', {
		header: 'Status',
		footer: props => props.column.id,
		meta: { type: DATA_GRID_CELL.Select }
	}),
	columnHelper.accessor('language', {
		header: 'Languages',
		footer: props => props.column.id,
		cell: ({ getValue }) => <span>{getValue().join(', ')}</span>,
		meta: { type: DATA_GRID_CELL.MultiSelect }
	}),
	columnHelper.accessor('progress', {
		header: 'Profile Progress',
		footer: props => props.column.id,
		meta: { type: DATA_GRID_CELL.Number }
	}),
	columnHelper.accessor('date', {
		header: 'Date',
		footer: props => props.column.id,
		cell: info => format(info.getValue(), 'PP'),
		meta: { type: DATA_GRID_CELL.Date }
	}),
	columnHelper.accessor('file', {
		header: 'File',
		footer: props => props.column.id,
		meta: { type: DATA_GRID_CELL.File }
	}),
	columnHelper.display({
		id: 'actions',
		header: 'Actions',
		meta: { type: DATA_GRID_CELL.Actions },
		cell: () => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button className="justify-end" size="icon-xs" variant="ghost">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						}
					/>
					<DropdownMenuContent align="end" className="min-w-50">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText('copied id')}
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
		}
	})
]

export const ColumnPinning = {
	render: function ColumnPinningRender() {
		const data = React.useMemo(() => makeData(10), [])

		return (
			<DataGrid columns={columns} data={data} enableColumnPinning>
				<DataGridTable />
			</DataGrid>
		)
	}
}

export const RowSelection = {
	render: function RowSelectionRender() {
		const data = React.useMemo(() => makeData(10), [])
		return (
			<DataGrid
				columns={columns}
				data={data}
				enableColumnPinning
				enableRowSelection
			>
				<DataGridTable />
			</DataGrid>
		)
	}
}

export const ClientSidePagination = {
	render: function ClientSidePaginationRender() {
		const data = React.useMemo(() => makeData(98), [])
		return (
			<DataGrid
				columns={columns}
				data={data}
				enableColumnPinning
				enableRowSelection
				getPaginationRowModel={getPaginationRowModel()}
			>
				<div className="flex flex-col gap-5">
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}

export const ManyPagesPagination = {
	render: function ManyPagesPaginationRender() {
		const data = React.useMemo(() => makeData(10000), [])
		return (
			<DataGrid
				columns={columns}
				data={data}
				enableColumnPinning
				enableRowSelection
				getPaginationRowModel={getPaginationRowModel()}
			>
				<div className="flex flex-col gap-5">
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}

export const Scrollable = {
	render: function ScrollableRender() {
		const data = React.useMemo(() => makeData(200), [])

		return (
			<DataGrid
				columns={columns}
				data={data}
				enableColumnPinning
				enableRowSelection
				getPaginationRowModel={getPaginationRowModel()}
				initialState={{
					pagination: {
						pageSize: 20
					}
				}}
			>
				<div className="flex max-h-150 flex-col gap-5">
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}

export const SortViewFilters = {
	render: function SortViewFiltersRender() {
		const data = React.useMemo(() => makeData(200), [])

		return (
			<DataGrid
				columns={columns}
				data={data}
				enableColumnPinning
				enableRowSelection
				getPaginationRowModel={getPaginationRowModel()}
				getSortedRowModel={getSortedRowModel()}
				initialState={{ pagination: { pageSize: 20 } }}
			>
				<div className="flex max-h-150 flex-col gap-5">
					<div className="flex gap-2 self-end">
						<SortFilter />
						<ViewFilter />
					</div>
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}

export const ColumnFilters = {
	render: function ColumnFiltersRender() {
		const data = React.useMemo(() => makeData(200), [])

		return (
			<DataGrid
				columns={columns}
				data={data}
				enableRowSelection
				getFacetedMinMaxValues={getFacetedMinMaxValues()}
				getFacetedRowModel={getFacetedRowModel()}
				getFacetedUniqueValues={getFacetedUniqueValues()}
				getFilteredRowModel={getFilteredRowModel()}
				getPaginationRowModel={getPaginationRowModel()}
				getSortedRowModel={getSortedRowModel()}
				initialState={{ pagination: { pageSize: 20 } }}
			>
				<div className="flex max-h-150 flex-col gap-5">
					<div className="flex gap-2 self-end">
						<ColumnsFilter />
						<SortFilter />
						<ViewFilter />
					</div>
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}

const data = makeData(200)

async function fetchData(options: { pageIndex: number; pageSize: number }) {
	await new Promise(r => setTimeout(r, 500))

	return {
		rows: data.slice(
			options.pageIndex * options.pageSize,
			(options.pageIndex + 1) * options.pageSize
		),
		pageCount: Math.ceil(data.length / options.pageSize),
		rowCount: data.length
	}
}

export const ServerSidePagination = {
	render: function ServerSidePaginationRender() {
		const [pagination, setPagination] = React.useState<PaginationState>({
			pageIndex: 0,
			pageSize: 10
		})

		const dataQuery = useQuery({
			queryKey: ['data', pagination],
			queryFn: () => fetchData(pagination),
			placeholderData: keepPreviousData // don't have 0 rows flash while changing pages/loading next page
		})

		const defaultData = React.useMemo(() => [], [])

		return (
			<DataGrid
				columns={columns}
				data={dataQuery.data?.rows ?? defaultData}
				isLoading={dataQuery.isPlaceholderData}
				rowCount={dataQuery.data?.rowCount}
				manualPagination={true}
				state={{ pagination }}
				onPaginationChange={setPagination}
				enableRowSelection
				getFacetedMinMaxValues={getFacetedMinMaxValues()}
				getFacetedRowModel={getFacetedRowModel()}
				getFacetedUniqueValues={getFacetedUniqueValues()}
				getFilteredRowModel={getFilteredRowModel()}
				getSortedRowModel={getSortedRowModel()}
			>
				<div className="flex max-h-150 flex-col gap-5">
					<div className="flex gap-2 self-end">
						<ColumnsFilter />
						<SortFilter />
						<ViewFilter />
					</div>
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}

export const Export = {
	render: function ExportRender() {
		const data = React.useMemo(() => makeData(200), [])

		return (
			<DataGrid
				columns={columns}
				data={data}
				enableRowSelection
				getFacetedMinMaxValues={getFacetedMinMaxValues()}
				getFacetedRowModel={getFacetedRowModel()}
				getFacetedUniqueValues={getFacetedUniqueValues()}
				getFilteredRowModel={getFilteredRowModel()}
				getPaginationRowModel={getPaginationRowModel()}
				getSortedRowModel={getSortedRowModel()}
				initialState={{ pagination: { pageSize: 20 } }}
			>
				<div className="flex max-h-150 flex-col gap-5">
					<div className="flex gap-2 self-end">
						<DataGridTableExport fileName="users" />
						<ColumnsFilter />
						<SortFilter />
						<ViewFilter />
					</div>
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}

export const AdvancedFilters = {
	render: function AdvancedFiltersRender() {
		const dataQuery = useQuery({
			queryKey: ['data'],
			queryFn: () => fetchData({ pageIndex: 0, pageSize: 500 }),
			placeholderData: keepPreviousData // don't have 0 rows flash while changing pages/loading next page
		})

		const defaultData = React.useMemo(() => [], [])

		return (
			<DataGrid
				columns={columns}
				data={dataQuery.data?.rows ?? defaultData}
				isLoading={dataQuery.isPlaceholderData}
				rowCount={dataQuery.data?.rowCount}
				enableRowSelection
				getFacetedMinMaxValues={getFacetedMinMaxValues()}
				getFacetedRowModel={getFacetedRowModel()}
				getFacetedUniqueValues={getFacetedUniqueValues()}
				getFilteredRowModel={getAdvancedFilteredRowModel()}
				getSortedRowModel={getSortedRowModel()}
				getPaginationRowModel={getPaginationRowModel()}
			>
				<div className="flex max-h-150 flex-col gap-5">
					<div className="flex justify-between">
						<AdvancedColumnFilter />
						<div className="flex gap-2 self-end">
							<ColumnsFilter />
							<SortFilter />
							<ViewFilter />
						</div>
					</div>
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}

export const FullClientSideGrid = {
	render: function FullClientSideGridRender() {
		const dataQuery = useQuery({
			queryKey: ['data'],
			queryFn: () => fetchData({ pageIndex: 0, pageSize: 500 }),
			placeholderData: keepPreviousData // don't have 0 rows flash while changing pages/loading next page
		})

		const defaultData = React.useMemo(() => [], [])

		return (
			<DataGrid
				columns={columns}
				data={dataQuery.data?.rows ?? defaultData}
				isLoading={dataQuery.isPlaceholderData}
				rowCount={dataQuery.data?.rowCount}
				enableRowSelection
				getFacetedMinMaxValues={getFacetedMinMaxValues()}
				getFacetedRowModel={getFacetedRowModel()}
				getFacetedUniqueValues={getFacetedUniqueValues()}
				getFilteredRowModel={getAdvancedFilteredRowModel()}
				getSortedRowModel={getSortedRowModel()}
				getPaginationRowModel={getPaginationRowModel()}
			>
				<div className="flex max-h-150 flex-col gap-5">
					<div className="flex justify-between">
						<AdvancedColumnFilter />
						<div className="flex gap-2 self-end">
							<DataGridTableExport fileName="users" />
							<ColumnsFilter />
							<SortFilter />
							<ViewFilter />
						</div>
					</div>
					<DataGridTable />
					<DataGridPagination />
				</div>
			</DataGrid>
		)
	}
}
