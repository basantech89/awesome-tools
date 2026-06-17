import {
	getFilteredRowModel,
	memo,
	RowData,
	RowModel,
	Table
} from '@tanstack/react-table'

import { dataGridAdvancedFilterFn } from './advanced-filter-function'

export function getAdvancedFilteredRowModel<TData extends RowData>(): (
	table: Table<TData>
) => () => RowModel<TData> {
	const builtInFilteredRowModel = getFilteredRowModel<TData>()

	return table => {
		const columnFilterModel = builtInFilteredRowModel(table)

		return memo(
			() => [
				table.getPreFilteredRowModel().rows,
				table.getState().advancedColumnFilters,
				table.getState().columnFilters
			],
			(rows, advancedColumnFilters) => {
				const hasAdvancedFilters = !!advancedColumnFilters.rootId

				if (!hasAdvancedFilters) {
					return columnFilterModel()
				}

				const filteredRows = rows.filter(row =>
					dataGridAdvancedFilterFn(
						row,
						advancedColumnFilters.nodes,
						advancedColumnFilters.rootId
					)
				)

				return {
					rows: filteredRows,
					flatRows: filteredRows,
					rowsById: Object.fromEntries(filteredRows.map(row => [row.id, row]))
				}
			},
			{ key: 'advancedFilteredRows' }
		)
	}
}
