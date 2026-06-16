import type { Column, ColumnFilter } from '@tanstack/react-table'

import {
	Button,
	CommandBox,
	CommandBoxContent,
	CommandBoxList,
	CommandInput,
	InputGroupAddon,
	PopoverTrigger
} from '@awesome-tools/ui'
import { ChevronsUpDown, SearchIcon } from 'lucide-react'
import React from 'react'

import { ColumnFilterSlot, useColumnFilters } from '../column-filter-actions'
import { DataGridFilterContent } from '../data-grid-filter-content'
import { type FilterValue } from '../filters'

export interface ColumnFilterRowFilter extends ColumnFilter {
	id: string
	value: FilterValue
}

function ColumnFilterRowInternal<TData>({
	getAvailableColumns,
	column,
	slot,
	filterValue
}: React.ComponentProps<'li'> & {
	column: Column<TData, unknown>
	getAvailableColumns: () => Column<TData, unknown>[]
	slot: ColumnFilterSlot
	filterValue?: FilterValue
}) {
	const { updateColumn, updateFilter } = useColumnFilters<TData>(slot)

	return (
		<>
			<CommandBox>
				<PopoverTrigger
					render={
						<Button className="min-w-36 justify-between" variant="outline">
							<span className="truncate">{column.label}</span>
							<ChevronsUpDown className="opacity-50" />
						</Button>
					}
				/>
				<CommandBoxContent className="p-0">
					<CommandInput placeholder="Search columns...">
						<InputGroupAddon>
							<SearchIcon className="size-4 shrink-0 opacity-50" />
						</InputGroupAddon>
					</CommandInput>
					<CommandBoxList
						emptyMessage="No columns found."
						items={getAvailableColumns().map(column => ({
							id: column.id,
							label: <span className="truncate">{column.label}</span>,
							value: column.id,
							onSelect: () => updateColumn(column),
							className: '[&>svg]:stroke-muted-foreground'
						}))}
					/>
				</CommandBoxContent>
			</CommandBox>

			<DataGridFilterContent<TData>
				column={column}
				updateFilter={updateFilter}
				filterValue={filterValue}
			/>
		</>
	)
}

const ColumnFilterRow = React.memo(
	ColumnFilterRowInternal
) as typeof ColumnFilterRowInternal

export default ColumnFilterRow
