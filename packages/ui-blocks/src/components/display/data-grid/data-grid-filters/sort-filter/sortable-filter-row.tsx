import type { Column, ColumnSort } from '@tanstack/react-table'

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	InputGroupAddon,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@awesome-tools/ui'
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'
import { RestrictToElement } from '@dnd-kit/dom/modifiers'
import { useSortable } from '@dnd-kit/react/sortable'
import {
	ArrowDownAZ,
	ArrowDownZA,
	ChevronsUpDown,
	GripVertical,
	SearchIcon,
	Trash2
} from 'lucide-react'
import React from 'react'

import { useDataGrid } from '#blocks'

export default function SortableFilterRow<TData>({
	index,
	sort,
	trigger,
	columns,
	parentRef,
	...props
}: React.ComponentProps<'li'> & {
	index: number
	sort: ColumnSort
	trigger: string
	parentRef: React.RefObject<HTMLUListElement | null>
	columns: (Column<TData, unknown> & { label: string })[]
}) {
	const { table } = useDataGrid<TData>()

	const { ref, handleRef } = useSortable({
		id: sort.id,
		index,
		modifiers: [
			RestrictToVerticalAxis,
			RestrictToElement.configure({ element: parentRef.current })
		]
	})

	const updateSortingRow = React.useCallback(
		(updates: Partial<ColumnSort>) => {
			table.setSorting(prev => {
				if (!prev) {
					return prev
				}

				return prev.map(prevSort =>
					prevSort.id === sort.id ? { ...prevSort, ...updates } : prevSort
				)
			})
		},
		[table, sort.id]
	)

	const removeSortingRow = React.useCallback(() => {
		table.setSorting(prev => prev.filter(item => item.id !== sort.id))
	}, [table, sort.id])

	const SORT_ORDERS = [
		{ label: 'Asc', value: 'asc' },
		{ label: 'Desc', value: 'desc' }
	]

	return (
		<li {...props} className="flex gap-4" ref={ref}>
			<Popover>
				<PopoverTrigger
					render={
						<Button className="min-w-40 justify-between" variant="outline">
							<span className="truncate">{trigger}</span>
							<ChevronsUpDown className="opacity-50" />
						</Button>
					}
				/>
				<PopoverContent className="min-w-40 p-0">
					<Command>
						<CommandInput placeholder="Search columns...">
							<InputGroupAddon>
								<SearchIcon className="size-4 shrink-0 opacity-50" />
							</InputGroupAddon>
						</CommandInput>
						<CommandList>
							<CommandEmpty>No columns found.</CommandEmpty>
							<CommandGroup>
								{columns.map(column => (
									<CommandItem
										className="[&>svg]:stroke-muted-foreground"
										key={column.id}
										onSelect={columnId => updateSortingRow({ id: columnId })}
										value={column.id}
									>
										<span className="truncate">{column.label}</span>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button className="min-w-20" variant="outline">
							{sort.desc ? 'Desc' : 'Asc'}
							{sort.desc ? <ArrowDownZA /> : <ArrowDownAZ />}
						</Button>
					}
				/>
				<DropdownMenuContent>
					{SORT_ORDERS.map(order => (
						<DropdownMenuCheckboxItem
							checked={sort.desc === (order.value === 'desc')}
							key={order.value}
							onCheckedChange={() =>
								updateSortingRow({ desc: order.value === 'desc' })
							}
						>
							{order.label}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<Button
				className="size-8 shrink-0 rounded"
				onClick={removeSortingRow}
				size="icon-sm"
				variant="outline"
			>
				<Trash2 />
			</Button>

			<Button
				className="size-8 shrink-0 rounded"
				ref={handleRef}
				size="icon-sm"
				variant="outline"
			>
				<GripVertical />
			</Button>
		</li>
	)
}
