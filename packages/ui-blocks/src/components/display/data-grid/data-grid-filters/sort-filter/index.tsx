'use client'

import {
	Badge,
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	TypographyH5,
	TypographyMuted
} from '@awesome-tools/ui'
import { move } from '@dnd-kit/helpers'
import { DragDropProvider } from '@dnd-kit/react'
import { ArrowDownUp } from 'lucide-react'
import React from 'react'

import { useDataGrid } from '../../data-grid'
import SortableFilterRow from './sortable-filter-row'

export function SortFilter<TData>(
	props: React.ComponentProps<typeof PopoverTrigger>
) {
	const { table } = useDataGrid<TData>()
	const columns = table.getAllLeafColumns()

	const listRef = React.useRef<HTMLUListElement>(null)

	const sorting = table.getState().sorting
	const sortingIds = new Set(sorting.map(s => s.id))

	const sortingColumns = columns.filter(column => column.getCanSort())
	const availableColumns: typeof columns = []

	const columnsMap = sortingColumns.reduce((acc, column) => {
		acc.set(column.id, column.label)

		if (!sortingIds.has(column.id)) {
			availableColumns.push(column)
		}

		return acc
	}, new Map<string, string>())

	const addSortingRow = () => {
		const firstAvailableColumn = availableColumns[0]
		if (!firstAvailableColumn) {
			return
		}

		table.setSorting(prev => [
			...prev,
			{ id: firstAvailableColumn.id, desc: false }
		])
	}

	const resetSorting = React.useCallback(
		() => table.setSorting(table.initialState.sorting),
		[table]
	)

	return (
		<Popover>
			<PopoverTrigger
				{...props}
				render={
					<Button
						aria-label="Toggle columns"
						className="justify-between font-normal"
						variant="outline"
					>
						<ArrowDownUp className="text-muted-foreground" />
						Sort
						{sorting.length > 0 && (
							<Badge
								className="h-[18.24px] rounded-[3.2px] px-[5.12px] font-mono text-[10.4px] font-normal"
								variant="outline"
							>
								{sorting.length}
							</Badge>
						)}
					</Button>
				}
			/>
			<PopoverContent align="start" className="min-w-fit">
				<div className="flex flex-col gap-1">
					<TypographyH5>
						{sorting.length > 0 ? 'Sort by' : 'No sorting applied'}
					</TypographyH5>
					<TypographyMuted>
						{sorting.length > 0 ? 'Modify' : 'Add'} sorting to organize your
						rows
					</TypographyMuted>
					{sorting.length > 0 && (
						<DragDropProvider
							onDragEnd={event => {
								table.setSorting(prev => move(prev, event))
							}}
						>
							<ul className="flex flex-col gap-2 pt-2" ref={listRef}>
								{sorting.map((sort, index) => (
									<SortableFilterRow
										columns={availableColumns}
										index={index}
										key={sort.id}
										parentRef={listRef}
										sort={sort}
										trigger={columnsMap.get(sort.id) as string}
									/>
								))}
							</ul>
						</DragDropProvider>
					)}
				</div>
				<div className="mt-2 flex gap-4">
					<Button
						disabled={availableColumns.length === 0}
						onClick={addSortingRow}
					>
						Add Sort
					</Button>
					<Button
						disabled={sorting.length === 0}
						onClick={resetSorting}
						variant="outline"
					>
						Reset Sorting
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
