import {
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Popover,
	PopoverContent,
	PopoverTrigger,
	TableHead,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@awesome-tools/ui'
import { toPascalCase } from '@awesome-tools/utils'
import {
	type ColumnSort,
	flexRender,
	type Header,
	type SortDirection,
	type SortingState
} from '@tanstack/react-table'
import {
	ChevronDown,
	EyeOff,
	ListFilter,
	Pin,
	PinOff,
	XIcon
} from 'lucide-react'
import React from 'react'

import { useDataGrid } from '../data-grid'
import {
	DATA_GRID_CELL,
	FilterValue,
	DataGridFilterContent,
	isEmpty
} from '../data-grid-filters'
import DataGridHeaderIcon, {
	getDataGridSortIcon,
	Sort
} from './data-grid-header-icon'

export default function DataGridHeader<TData>({
	header
}: {
	header: Header<TData, unknown>
}) {
	const { table } = useDataGrid<TData>()
	const column = header.column
	const cellType = column.cellType

	const pinLeft = () => column.pin('left')
	const pinRight = () => column.pin('right')
	const unpin = () => column.pin(false)

	const onSortingChange = React.useCallback(
		(direction: SortDirection) => {
			table.setSorting((prev: SortingState) => {
				const newSort: ColumnSort = {
					id: column.id,
					desc: direction === 'desc'
				}

				return [...prev, newSort]
			})
		},
		[column.id, table]
	)

	const canHide = column.getCanHide()
	const canPin = column.getCanPin()
	const canFilter = column.getCanFilter() && cellType !== DATA_GRID_CELL.Actions
	const canSort = column.getCanSort() && cellType !== DATA_GRID_CELL.Actions

	const shouldShowOnlyTitle =
		cellType === DATA_GRID_CELL.RowNumber ||
		(!canFilter && !canSort && !canHide && !canPin)

	const pinnedTo = column.getIsPinned()
	const sortDirection = column.getIsSorted()

	const isColumnFiltered = column.getIsFiltered()
	const filterValue = column.getFilterValue() as FilterValue

	const resetColumnFilter = React.useCallback(
		(open: boolean) => {
			if (!open && isColumnFiltered && isEmpty(filterValue.value)) {
				column.setFilterValue(undefined)
			}
		},
		[column, isColumnFiltered, filterValue]
	)

	const filters = column.getFilters()

	const triggerFilter = React.useCallback(() => {
		table.resetAdvancedColumnFilters()

		if (!filterValue?.value && !filterValue?.operator) {
			column.setFilterValue((prev: FilterValue) => ({
				...prev,
				operator: filters[0].operator,
				value: '',
				type: cellType
			}))
		}
	}, [column, filters, cellType, table, filterValue])

	const updateFilter = React.useCallback(
		(updates: Partial<FilterValue>) => {
			column.setFilterValue((prev: FilterValue) => ({
				...prev,
				...updates
			}))
		},
		[column]
	)

	if (header.subHeaders.length >= 1) {
		return (
			<TableHead
				className="border-t-0 border-r border-b border-l-0 text-center"
				colSpan={header.colSpan}
				key={header.id}
			>
				{header.isPlaceholder
					? null
					: flexRender(column.columnDef.header, header.getContext())}
			</TableHead>
		)
	}

	if (shouldShowOnlyTitle) {
		return (
			<TableHead
				className="text-muted-foreground border-t-0 border-r border-b border-l-0 text-center text-xs"
				colSpan={header.colSpan}
				key={header.id}
			>
				{header.isPlaceholder ? null : (
					<span className="max-w-[20ch] truncate">
						{flexRender(column.columnDef.header, header.getContext())}
					</span>
				)}
			</TableHead>
		)
	}

	return (
		<TableHead
			className="border-t-0 border-r border-b border-l-0 last:border-r-0"
			colSpan={header.colSpan}
			key={header.id}
		>
			<div className="flex items-center justify-between gap-6">
				<div className="flex">
					<Tooltip>
						<TooltipTrigger
							render={
								<DataGridHeaderIcon
									cellType={cellType}
									className="text-muted-foreground"
									size={16}
								/>
							}
						/>
						<TooltipContent>
							{cellType === 'string' ? 'Text' : toPascalCase(cellType)}
						</TooltipContent>
					</Tooltip>

					{header.isPlaceholder ? null : (
						<Button variant="ghost" onClick={column.getToggleSortingHandler()}>
							{flexRender(column.columnDef.header, header.getContext())}
							{getDataGridSortIcon({
								cellType,
								sortDirection,
								className: 'text-muted-foreground',
								size: 16
							})}
						</Button>
					)}
				</div>

				<div className="flex gap-1">
					{canFilter && (
						<Popover onOpenChange={resetColumnFilter}>
							<PopoverTrigger
								onClick={triggerFilter}
								className="relative"
								aria-label="trigger filters"
								render={
									isColumnFiltered ? (
										<Button variant="secondary" size="icon-xs">
											<ListFilter className="text-muted-foreground" size={16} />
											<Badge indicator="inset" variant="ghost">
												<div />
											</Badge>
										</Button>
									) : (
										<Button variant="link" size="icon-xs">
											<ListFilter className="text-muted-foreground" size={18} />
										</Button>
									)
								}
							/>
							<PopoverContent align="start">
								<DataGridFilterContent
									column={column}
									updateFilter={updateFilter}
								/>
							</PopoverContent>
						</Popover>
					)}

					<DropdownMenu>
						<DropdownMenuTrigger
							className="flex w-full justify-between gap-1"
							aria-label="trigger column actions"
						>
							<ChevronDown className="text-muted-foreground" size="16" />
						</DropdownMenuTrigger>
						<DropdownMenuContent
							alignOffset={-8}
							className="min-w-45"
							sideOffset={11}
						>
							{canSort && (
								<>
									{sortDirection === Sort.ASC ? (
										<DropdownMenuItem onClick={column.clearSorting}>
											<XIcon className="text-muted-foreground" />
											Remove sort asc
										</DropdownMenuItem>
									) : (
										<DropdownMenuItem onClick={() => onSortingChange(Sort.ASC)}>
											{getDataGridSortIcon({
												cellType,
												sortDirection: Sort.ASC,
												className: 'text-muted-foreground',
												size: 16
											})}
											Sort asc
										</DropdownMenuItem>
									)}
									{sortDirection === Sort.DESC ? (
										<DropdownMenuItem onClick={column.clearSorting}>
											<XIcon className="text-muted-foreground" />
											Remove sort desc
										</DropdownMenuItem>
									) : (
										<DropdownMenuItem
											onClick={() => onSortingChange(Sort.DESC)}
										>
											{getDataGridSortIcon({
												cellType,
												sortDirection: Sort.DESC,
												className: 'text-muted-foreground',
												size: 16
											})}
											Sort desc
										</DropdownMenuItem>
									)}
									<DropdownMenuSeparator />
								</>
							)}

							{canPin && (
								<>
									{pinnedTo === 'left' ? (
										<DropdownMenuItem onClick={unpin}>
											<PinOff className="text-muted-foreground" size={16} />
											Unpin from left
										</DropdownMenuItem>
									) : (
										<DropdownMenuItem onClick={pinLeft}>
											<Pin className="text-muted-foreground" size={16} />
											Pin to left
										</DropdownMenuItem>
									)}
									{pinnedTo === 'right' ? (
										<DropdownMenuItem onClick={unpin}>
											<PinOff className="text-muted-foreground" size={16} />
											Unpin from right
										</DropdownMenuItem>
									) : (
										<DropdownMenuItem onClick={pinRight}>
											<Pin className="text-muted-foreground" size={16} />
											Pin to right
										</DropdownMenuItem>
									)}
									<DropdownMenuSeparator />
								</>
							)}

							{canHide && (
								<DropdownMenuItem onClick={column.getToggleVisibilityHandler()}>
									<EyeOff className="text-muted-foreground" size={16} />
									Hide column
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</TableHead>
	)
}
