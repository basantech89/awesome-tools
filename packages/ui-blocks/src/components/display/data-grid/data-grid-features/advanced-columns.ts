import { values } from '@awesome-tools/utils'
import { Column, RowData, Table, TableFeature } from '@tanstack/react-table'

import {
	DATA_GRID_CELL,
	DataGridCell,
	DataGridTableFilter,
	isDataGridActionableCell,
	Operator
} from '../data-grid-filters'

interface AdvancedColumnInstance {
	getFilters: () => DataGridTableFilter<Operator>[]
}

declare module '@tanstack/react-table' {
	interface Column<
		TData extends RowData,
		TValue
	> extends AdvancedColumnInstance {
		label: string
		cellType: DataGridCell
	}
}

export const AdvancedColumnFeature: TableFeature = {
	createColumn: <TData extends RowData, TValue>(
		column: Column<TData, TValue>,
		table: Table<TData>
	) => {
		column.label = column.columnDef.meta?.label
			? column.columnDef.meta.label
			: typeof column.columnDef.header === 'string'
				? column.columnDef.header
				: column.id

		column.cellType = column.columnDef.meta?.type || DATA_GRID_CELL.String

		column.getFilters = function () {
			const cellType = column.cellType

			if (isDataGridActionableCell(cellType)) {
				return values(table.dataGridFilters[cellType])
			}

			return []
		}

		return column
	}
}
