import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	TypographyMuted,
	TypographyP
} from '@awesome-tools/ui'
import { keys, omit, values } from '@awesome-tools/utils'
import {
	ColumnFiltersState,
	PaginationState,
	Row,
	SortingState
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { HardDriveDownload } from 'lucide-react'
import React from 'react'

import { useDataGrid } from './data-grid'
import {
	AdvancedColumnFilters,
	initialAdvancedColumnFilters
} from './data-grid-features'

function exportData<T extends object>(
	headersMap: Map<string, string>,
	data: T[],
	fileName: string,
	includeIndex = true
) {
	const headers = []
	const notFoundColumns: (keyof T)[] = []

	for (const key of keys(data[0])) {
		if (headersMap.has(key)) {
			headers.push(headersMap.get(key)!)
		} else {
			notFoundColumns.push(key)
		}
	}

	const rows = []
	data.map(row => values(row).filter(item => !notFoundColumns.includes(item)))

	let index = 1
	for (const item of data) {
		const rowData: unknown[] = values(omit(item, notFoundColumns))

		if (includeIndex) {
			rowData.unshift(index)
		}

		rows.push(rowData)
		++index
	}

	if (includeIndex) {
		headers.unshift('Index')
	}

	const csv = [headers, ...rows].map(row => row.join(';')).join('\n')
	const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
	const url = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.href = url
	link.download = `${fileName}.csv`
	document.body.appendChild(link)

	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

function getDataFromRows<TData extends object>(rows: Row<TData>[]) {
	return rows.map(row => ({
		rowNumber: row.index + 1,
		...keys(row.original).reduce(
			(acc, key) => {
				acc[key] = Array.isArray(row.original[key])
					? (row.original[key] as unknown[]).join(', ')
					: row.original[key]

				return acc
			},
			{} as Record<string, unknown>
		)
	}))
}

function getData<TData extends object>(data: TData[]) {
	return data.map((item, index) => ({
		rowNumber: index + 1,
		...keys(item).reduce(
			(acc, key) => {
				acc[key] = Array.isArray(item[key])
					? (item[key] as unknown[]).join(', ')
					: item[key]
				return acc
			},
			{} as Record<string, unknown>
		)
	}))
}

export function DataGridTableExport<TData extends object>({
	fileName,
	totalRowCount,
	fetchFn,
	...props
}: React.ComponentProps<typeof DropdownMenuContent> & {
	fileName: string
	totalRowCount?: number
	fetchFn?: (state: {
		pagination: PaginationState
		sorting: SortingState
		columnFilters: ColumnFiltersState
		advancedColumnFilters: AdvancedColumnFilters
	}) => Promise<TData[]>
}) {
	const { table } = useDataGrid<TData>()

	const isManualPagination = table.options.manualPagination
	const { pagination, sorting, columnFilters, advancedColumnFilters } =
		table.getState()

	const totalRows = totalRowCount || table.options.rowCount || 0

	const columns = table.getAllLeafColumns()

	const timeNow = format(new Date(), 'yyyy-MM-dd-HH-mm-ss')

	const headers = columns.reduce((acc, c) => {
		acc.set(c.id, c.label)
		return acc
	}, new Map<string, string>())

	const exportAll = async () => {
		let data

		if (fetchFn) {
			const pagination = { pageIndex: 0, pageSize: totalRows }
			const rows = await fetchFn({
				pagination,
				sorting: [],
				columnFilters: [],
				advancedColumnFilters: initialAdvancedColumnFilters
			})

			data = getData(rows)
		} else {
			const rows = table.getCoreRowModel().rows
			data = getDataFromRows(rows)
		}

		exportData(headers, data, `${fileName}-${timeNow}-all-data`, false)
	}

	const exportAllRows = async () => {
		let data
		if (fetchFn) {
			const rows = await fetchFn({
				pagination: { pageIndex: 0, pageSize: totalRows },
				sorting,
				columnFilters,
				advancedColumnFilters
			})

			data = getData(rows)
		} else {
			const rows = table.getPrePaginationRowModel().rows
			data = getDataFromRows(rows)
		}

		exportData(
			headers,
			data,
			`${fileName}-${timeNow}-all-rows`,
			!isManualPagination
		)
	}

	const exportPageRows = async () => {
		let data
		if (fetchFn) {
			const rows = await fetchFn({
				pagination,
				sorting,
				columnFilters,
				advancedColumnFilters
			})

			data = getData(rows)
		} else {
			const pageRows = table.getRowModel().rows
			data = getDataFromRows(pageRows)
		}

		exportData(
			headers,
			data,
			`${fileName}-${timeNow}-page-rows`,
			!isManualPagination
		)
	}

	const exportSelectedRows = () => {
		const selectedRows = table.getSelectedRowModel().rows
		const data = getDataFromRows(selectedRows)
		exportData(
			headers,
			data,
			`${fileName}-${timeNow}-selected-rows`,
			!isManualPagination
		)
	}

	const canExportSelectedRows =
		table.getIsSomePageRowsSelected() ||
		table.getIsSomeRowsSelected() ||
		table.getIsAllPageRowsSelected() ||
		table.getIsAllRowsSelected()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						aria-label="Export table data"
						className="justify-between font-normal"
						variant="outline"
					>
						<HardDriveDownload className="text-muted-foreground size-3.5" />
						Export
					</Button>
				}
			/>
			<DropdownMenuContent {...props} className="min-w-96">
				<DropdownMenuItem onClick={exportAll} className="block cursor-pointer">
					<TypographyP>Export All Data</TypographyP>
					<TypographyMuted>
						Export all the original data that is currently in the table (ignore
						pagination, sorting, filtering, etc.)
					</TypographyMuted>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={exportAllRows}
					className="block cursor-pointer"
				>
					<TypographyP>Export All Rows</TypographyP>
					<TypographyMuted>
						Export all rows, including from the next pages, (still respects
						filtering and sorting but not pagination.)
					</TypographyMuted>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={exportPageRows}
					className="block cursor-pointer"
				>
					<TypographyP>Export Page Rows</TypographyP>
					<TypographyMuted>
						Export all rows as seen on the page (respects pagination, sorting,
						filtering, etc.)
					</TypographyMuted>
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={!canExportSelectedRows}
					onClick={exportSelectedRows}
					className="block cursor-pointer"
				>
					<TypographyP>Export Selected Rows</TypographyP>
					<TypographyMuted>Export only selected rows.</TypographyMuted>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
