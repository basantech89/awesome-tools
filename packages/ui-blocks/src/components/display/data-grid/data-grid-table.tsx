import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow
} from '@awesome-tools/ui'
import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers'
import { move } from '@dnd-kit/helpers'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import React from 'react'

import { cn } from '#blocks/lib/utils'

import { useDataGrid } from './data-grid'
import DataGridCell from './data-grid-cell'
import DataGridHeader from './data-grid-header'

function ColumnPreview<TData>({ columnId }: { columnId: string }) {
	const { table } = useDataGrid<TData>()
	const header = table
		.getHeaderGroups()
		.flatMap(headerGroup => headerGroup.headers)
		.find(header => header.column.id === columnId)

	return (
		<div className="overflow-auto rounded-md border bg-white shadow-md">
			<Table>
				<TableHeader>
					{header && <DataGridHeader header={header} />}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map(row => {
						const cell = row
							.getVisibleCells()
							.find(cell => cell.column.id === columnId)

						return (
							<TableRow key={row.id}>
								{cell && <DataGridCell cell={cell} />}
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

function InnerDataGridTable<TData>({
	className,
	isLoading,
	...props
}: React.ComponentProps<'div'> & {
	isLoading?: boolean
}) {
	const { table } = useDataGrid<TData>()
	const [draggedColumnId, setDraggedColumnId] = React.useState('')

	const columnSizeVars = React.useMemo(() => {
		const headers = table.getFlatHeaders()
		const colSizes: { [key: string]: number } = {}

		for (let i = 0; i < headers.length; i++) {
			const header = headers[i]!
			colSizes[`--header-${header.id}-size`] = header.getSize()
			colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
		}

		return colSizes
	}, [table])

	return (
		<div
			className={cn('overflow-auto rounded-md border', className)}
			{...props}
		>
			<DragDropProvider
				modifiers={[RestrictToHorizontalAxis]}
				onDragEnd={event => {
					setDraggedColumnId('')
					if (!event.canceled) {
						table.setColumnOrder(prev => move(prev, event))
					}
				}}
				onDragStart={event =>
					setDraggedColumnId(event.operation.source?.id as string)
				}
			>
				<Table
					className={cn({ 'opacity-65': isLoading })}
					style={{
						...columnSizeVars,
						width: table.getTotalSize()
					}}
				>
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
										<DataGridCell
											key={cell.id}
											cell={cell}
											isDragging={draggedColumnId === cell.column.id}
										/>
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
				<DragOverlay>
					{source => <ColumnPreview<TData> columnId={source?.id as string} />}
				</DragOverlay>
			</DragDropProvider>
		</div>
	)
}

export const DataGridTable = React.memo(InnerDataGridTable)
