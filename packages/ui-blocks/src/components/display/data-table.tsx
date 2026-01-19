'use client'

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@awesome-tools/ui'
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table'
import React from 'react'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: { sorting, columnFilters },
	})

	return (
		<div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									data-state={row.getIsSelected() && 'selected'}
									key={row.id}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<div className="flex items-center justify-end gap-2 space-x-2 p-4">
					<Button
						disabled={!table.getCanPreviousPage()}
						onClick={() => table.previousPage()}
						size="sm"
						variant="outline"
					>
						Previous
					</Button>
					<Button
						disabled={!table.getCanNextPage()}
						onClick={() => table.nextPage()}
						size="sm"
						variant="outline"
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
