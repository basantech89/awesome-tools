'use client'

import {
	createColumnHelper,
	getCoreRowModel,
	type HeaderContext,
	type CellContext,
	type RowData,
	type Table,
	type TableOptions,
	useReactTable
} from '@tanstack/react-table'
import React from 'react'

import {
	AdvancedColumnFeature,
	AdvancedColumnFiltersFeature
} from './data-grid-features'
import {
	dataGridFilterFn,
	DATA_GRID_CELL,
	DataGridCell
} from './data-grid-filters'
import IndeterminateCheckbox from './indeterminate-checkbox'

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		type?: DataGridCell
		label?: string
		options?: readonly string[]
	}
}

const TableContext = React.createContext<unknown>(null)

export function useDataGrid<TData>() {
	const context = React.useContext(TableContext)

	if (!context) {
		throw new Error('useDataGrid must be used within a DataGrid component.')
	}

	return context as {
		table: Table<TData>
	}
}

let currentPage = 0
let pageSize = 1

function SelectAllHeader<TData>({ table }: HeaderContext<TData, unknown>) {
	return (
		<IndeterminateCheckbox
			aria-label="Select all rows"
			checked={table.getIsAllPageRowsSelected()}
			indeterminate={table.getIsSomePageRowsSelected()}
			onStateChange={table.getToggleAllPageRowsSelectedHandler()}
		/>
	)
}

function SelectRowCell<TData>({ row }: CellContext<TData, unknown>) {
	return (
		<IndeterminateCheckbox
			aria-label="Select this row"
			checked={row.getIsSelected()}
			disabled={!row.getCanSelect()}
			indeterminate={row.getIsSomeSelected()}
			onStateChange={row.getToggleSelectedHandler()}
			rowNumber={currentPage * pageSize + row.index + 1}
		/>
	)
}

function RowNumberCell<TData>({ row }: CellContext<TData, unknown>) {
	return (
		<div className="text-muted-foreground text-center text-xs">
			{row.index + 1}
		</div>
	)
}

export function DataGrid<TData>({
	children,
	isLoading,
	...props
}: Omit<TableOptions<TData>, 'getCoreRowModel'> &
	React.ComponentProps<'div'> & {
		isLoading?: boolean
	}) {
	if (props.state?.pagination && !isLoading) {
		currentPage = props.state.pagination?.pageIndex
		pageSize = props.state.pagination?.pageSize
	}

	const columns = React.useMemo(() => {
		const cols = [...props.columns]

		cols.forEach(column => {
			column.filterFn ||= dataGridFilterFn.bind(
				null,
				column.meta?.type || DATA_GRID_CELL.String
			)
		})

		const columnHelper = createColumnHelper<TData>()

		if (props.enableRowSelection) {
			cols.unshift(
				columnHelper.display({
					id: 'rowNumber',
					meta: { type: DATA_GRID_CELL.RowNumber, label: 'Row Number' },
					header: SelectAllHeader,
					cell: SelectRowCell
				})
			)
		} else {
			cols.unshift(
				columnHelper.display({
					id: 'rowNumber',
					header: '#',
					meta: { type: DATA_GRID_CELL.RowNumber, label: 'Row Number' },
					cell: RowNumberCell
				})
			)
		}

		return cols
	}, [props.columns, props.enableRowSelection])

	const table = useReactTable({
		...props,
		columns,
		initialState: {
			...props.initialState,
			columnPinning: { left: ['rowNumber'] },
			columnOrder: columns.map(
				column => column.id || (column as { accessorKey: string }).accessorKey
			)
		},
		defaultColumn: {
			minSize: 10,
			maxSize: Number.MAX_SAFE_INTEGER
		},
		getCoreRowModel: getCoreRowModel(),
		_features: [AdvancedColumnFiltersFeature, AdvancedColumnFeature]
	})

	if (!table) {
		throw new Error(
			'DataGrid requires either a table instance or data and columns.'
		)
	}

	const state = table.getState()
	const contextValue = React.useMemo(() => {
		void state

		return {
			table
		}
	}, [table, state])

	return <TableContext value={contextValue}>{children}</TableContext>
}
