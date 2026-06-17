import {
	Badge,
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	TypographyH5,
	TypographyMuted
} from '@awesome-tools/ui'
import { ListFilter, Trash2 } from 'lucide-react'
import React from 'react'

import { useDataGrid } from '../../data-grid'
import {
	BasicColumnFilterActions,
	ColumnFilterSlot
} from '../column-filter-actions'
import { FilterValue } from '../filters'
import ColumnFilterRow, { ColumnFilterRowFilter } from './column-filter-row'

export function ColumnsFilter<TData>() {
	const { table } = useDataGrid<TData>()

	const { columnFilters } = table.getState()
	const columns = table.getAllLeafColumns()

	const { availableColumns, columnsMap } = React.useMemo(() => {
		const filteringIds = new Set(columnFilters.map(filter => filter.id))

		const availableColumns: (typeof columns)[number][] = []
		const columnsMap: Record<string, (typeof columns)[number]> = {}

		columns.forEach(column => {
			if (!column.getCanFilter()) {
				return
			}

			columnsMap[column.id] = column

			if (!filteringIds.has(column.id)) {
				availableColumns.push(column)
			}
		})

		return { availableColumns, columnsMap }
	}, [columns, columnFilters])

	const availableColumnsRef = React.useRef(availableColumns)
	availableColumnsRef.current = availableColumns

	const getAvailableColumns = React.useCallback(
		() => availableColumnsRef.current,
		[]
	)

	const triggerFilter = React.useCallback(() => {
		const firstAvailableColumn = availableColumns[0]
		const filters = firstAvailableColumn.getFilters()

		table.resetAdvancedColumnFilters()
		table.setColumnFilters(prev => [
			...prev,
			{
				id: firstAvailableColumn.id,
				value: {
					type: firstAvailableColumn.cellType,
					operator: filters[0].operator,
					value: ''
				}
			}
		])
	}, [table, availableColumns])

	const resetFilters = React.useCallback(
		() => table.setColumnFilters(table.initialState.columnFilters),
		[table]
	)

	const removeFilterRow = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const filterId = event.currentTarget.dataset.filterId

			if (filterId) {
				table.setColumnFilters(prev =>
					prev.filter(item => item.id !== filterId)
				)
			}
		},
		[table]
	)

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						aria-label="Toggle columns"
						className="justify-between font-normal"
						variant="outline"
					>
						<ListFilter className="text-muted-foreground size-3" />
						Filter
						{columnFilters.length > 0 && (
							<Badge
								className="h-[18.24px] rounded-[3.2px] px-[5.12px] font-mono text-[10.4px] font-normal"
								variant="outline"
							>
								{columnFilters.length}
							</Badge>
						)}
					</Button>
				}
			/>
			<PopoverContent
				align="start"
				side="inline-end"
				className="w-fit max-w-[70vw]"
			>
				<div className="flex flex-col gap-1">
					<TypographyH5>
						{columnFilters.length > 0 ? 'Filters' : 'No filters applied'}
					</TypographyH5>
					<TypographyMuted>
						{columnFilters.length > 0 ? 'Modify' : 'Add'} filters to refine your
						rows
					</TypographyMuted>
					{columnFilters.length > 0 && (
						<ul className="flex max-h-[30vh] flex-col gap-2 overflow-y-auto pt-2">
							{columnFilters.map(filter => (
								<li key={filter.id} className="flex flex-col gap-4 md:flex-row">
									<BasicColumnFilterActions
										filter={filter as ColumnFilterRowFilter}
									>
										<ColumnFilterRow<TData>
											slot={ColumnFilterSlot.BASIC}
											getAvailableColumns={getAvailableColumns}
											column={columnsMap[filter.id]}
											filterValue={filter.value as FilterValue}
										/>
									</BasicColumnFilterActions>
									<Button
										className="rounded"
										data-filter-id={filter.id}
										onClick={removeFilterRow}
										size="icon-sm"
										variant="outline"
									>
										<Trash2 />
									</Button>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="mt-2 flex gap-4">
					<Button
						disabled={availableColumns.length === 0}
						onClick={triggerFilter}
					>
						Add filter
					</Button>
					<Button
						disabled={columnFilters.length === 0}
						onClick={resetFilters}
						variant="outline"
					>
						Reset filters
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
