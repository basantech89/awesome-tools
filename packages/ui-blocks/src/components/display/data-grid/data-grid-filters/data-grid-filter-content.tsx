import type { Column } from '@tanstack/react-table'

import {
	Button,
	CommandBox,
	CommandBoxContent,
	CommandBoxList,
	CommandInput,
	DebouncedInput,
	InputGroupAddon,
	PopoverTrigger
} from '@awesome-tools/ui'
import { ChevronsUpDown, SearchIcon } from 'lucide-react'
import React from 'react'

import { DATA_GRID_CELL, useDataGrid } from '#blocks'

import {
	DataGridDateFilter,
	DataGridMultiSelectFilter,
	DataGridNumberFilter
} from './data-grid-filters'
import { type FilterValue, isDataGridActionableCell, Operator } from './filters'

export function DataGridFilterContent<TData>({
	updateFilter,
	column,
	filterValue: filterValueProp
}: React.ComponentProps<typeof CommandBox> & {
	updateFilter: (updates: Partial<FilterValue>) => void
	column: Column<TData>
	filterValue?: FilterValue
}) {
	const { table } = useDataGrid<TData>()

	const dataGridFilters = table.dataGridFilters

	const cellType = column.cellType
	const filters = column.getFilters()

	const filterValue = (filterValueProp ??
		column.getFilterValue()) as FilterValue

	const filtersForCellType = isDataGridActionableCell(cellType)
		? dataGridFilters[cellType]
		: {}

	const selectedOperator = filtersForCellType?.[filterValue?.operator]

	const filterNeedInput = selectedOperator?.needInput ?? true

	const updateOperator = React.useCallback(
		(newOperator: string) => {
			updateFilter({ operator: newOperator as Operator, value: '' })
		},
		[updateFilter]
	)

	const updateValue = React.useCallback(
		(value: unknown) => {
			updateFilter({ value } as { value: string })
		},
		[updateFilter]
	)

	return (
		<>
			<CommandBox>
				<PopoverTrigger
					render={
						<Button className="min-w-36 justify-between" variant="outline">
							<span className="truncate">{selectedOperator?.label}</span>
							<ChevronsUpDown className="opacity-50" />
						</Button>
					}
				/>
				<CommandBoxContent className="p-0">
					<CommandInput placeholder="Search operators...">
						<InputGroupAddon>
							<SearchIcon className="size-4 shrink-0 opacity-50" />
						</InputGroupAddon>
					</CommandInput>
					<CommandBoxList
						emptyMessage="No operators found."
						items={filters.map(operator => ({
							id: operator.operator,
							label: operator.label,
							value: operator.operator,
							onSelect: updateOperator
						}))}
					/>
				</CommandBoxContent>
			</CommandBox>

			{filterNeedInput &&
				(cellType === DATA_GRID_CELL.Number ? (
					<DataGridNumberFilter
						needRangeInput={selectedOperator?.needRangeInput}
						column={column}
						updateValue={updateValue}
					/>
				) : cellType === DATA_GRID_CELL.Select ? (
					<DataGridMultiSelectFilter
						column={column}
						updateValue={updateValue}
					/>
				) : cellType === DATA_GRID_CELL.MultiSelect ? (
					<DataGridMultiSelectFilter
						column={column}
						updateValue={updateValue}
					/>
				) : cellType === DATA_GRID_CELL.Date ? (
					<DataGridDateFilter
						column={column}
						needDateInput={selectedOperator?.needDateInput}
						updateValue={updateValue}
					/>
				) : (
					<DebouncedInput
						onChange={updateValue}
						placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
						value={(filterValue?.value as string) || ''}
						className="min-w-36"
					/>
				))}
		</>
	)
}
