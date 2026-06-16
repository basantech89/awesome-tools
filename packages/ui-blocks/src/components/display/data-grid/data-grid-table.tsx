import type React from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow
} from '@awesome-tools/ui'
import { flexRender } from '@tanstack/react-table'

import { cn } from '#blocks/lib/utils'

import { useDataGrid } from './data-grid'
import DataGridHeader from './data-grid-header'

export function DataGridTable({
	className,
	isLoading,
	...props
}: React.ComponentProps<'div'> & {
	isLoading?: boolean
}) {
	const { table } = useDataGrid()

	return (
		<div
			className={cn('overflow-auto rounded-md border', className)}
			{...props}
		>
			<Table className={cn({ 'opacity-65': isLoading })}>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<DataGridHeader header={header} key={header.id} />
							))}
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
									<TableCell
										className="border-r border-l first:min-w-10 first:border-l-0 last:border-r-0"
										key={cell.id}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								className="h-24 text-center"
								colSpan={table.getAllColumns().length}
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
