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
import { Column } from '@tanstack/react-table'
import { SlidersHorizontal } from 'lucide-react'
import React from 'react'

import { LogicalFilter, useDataGrid } from '#blocks'

import { LOGICAL_OPERATORS } from '.'
import { DataGridActionableCell } from '../filters'
import { AdvancedColumnFilterRow } from './advanced-column-filter-row'

export function AdvancedColumnFilter<TData>() {
	const { table } = useDataGrid<TData>()

	const { advancedColumnFilters } = table.getState()

	const columns = table.getAllLeafColumns()

	const columnsRef = React.useRef(columns)
	columnsRef.current = columns

	const listRef = React.useRef<HTMLUListElement>(null)

	const { filterableColumns, columnsMap } = React.useMemo(() => {
		const filterableColumns: Column<TData, unknown>[] = []
		const columnsMap: Record<string, Column<TData, unknown>> = {}

		const cols = columnsRef.current
		cols.forEach(column => {
			if (!column.getCanFilter()) {
				return
			}

			columnsMap[column.id] = column
			filterableColumns.push(column)
		})

		return { filterableColumns, columnsMap }
	}, [])

	const filterableColumnsRef = React.useRef(filterableColumns)
	filterableColumnsRef.current = filterableColumns

	const getAvailableColumns = React.useCallback(
		() => filterableColumnsRef.current,
		[]
	)

	const id = React.useId()
	const rootId = `logical-${id}`

	const addFilter = React.useCallback(() => {
		const firstAvailableColumn = filterableColumns[0]
		const filters = firstAvailableColumn.getFilters()

		if (!advancedColumnFilters.rootId) {
			table.setColumnFilters([])
			const childId = `logical-0-basic-${id}`

			table.setAdvancedColumnFilters({
				rootId,
				nodes: {
					[rootId]: {
						id: rootId,
						value: LOGICAL_OPERATORS.AND,
						childIds: [childId],
						depth: 0
					},
					[childId]: {
						id: childId,
						parentId: rootId,
						columnId: firstAvailableColumn.id,
						depth: 1,
						value: {
							type: firstAvailableColumn.cellType as DataGridActionableCell,
							operator: filters[0].operator,
							value: ''
						}
					}
				}
			})
		} else {
			const childId = `${advancedColumnFilters.rootId}-logical-${id}`
			table.setAdvancedColumnFilters(prev => ({
				...prev,
				nodes: {
					...prev.nodes,
					[prev.rootId]: {
						...prev.nodes[prev.rootId],
						childIds: [
							childId,
							...((prev.nodes[prev.rootId] as LogicalFilter)?.childIds || [])
						]
					},
					[childId]: {
						id: childId,
						parentId: advancedColumnFilters.rootId,
						childIds: [],
						value: LOGICAL_OPERATORS.AND,
						depth: 1
					}
				}
			}))
		}
	}, [table, advancedColumnFilters, filterableColumns, id, rootId])

	const resetFilters = React.useCallback(() => {
		table.resetAdvancedColumnFilters()
	}, [table])

	const filtersLength = Object.keys(advancedColumnFilters.nodes).length

	const getFilter = React.useCallback(
		(filterId?: string) => {
			filterId = filterId ||= rootId
			return advancedColumnFilters.nodes[filterId]
		},
		[advancedColumnFilters, rootId]
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
						<SlidersHorizontal className="text-muted-foreground size-3" />
						Advanced Filter
						{filtersLength > 0 && (
							<Badge
								className="h-[18.24px] rounded-[3.2px] px-[5.12px] font-mono text-[10.4px] font-normal"
								variant="outline"
							>
								{filtersLength}
							</Badge>
						)}
					</Button>
				}
			/>
			<PopoverContent align="start" side="inline-end" className="min-w-fit">
				<div className="flex flex-col gap-1">
					<TypographyH5>
						{filtersLength > 0 ? 'Filters' : 'No filters applied'}
					</TypographyH5>
					<TypographyMuted>
						{filtersLength > 0 ? 'Modify' : 'Add'} filters to refine your rows
					</TypographyMuted>
					{filtersLength > 0 && (
						<DragDropProvider
							onDragEnd={event => {
								table.setColumnFilters(prev => move(prev, event))
							}}
						>
							<ul
								className="flex max-h-[50vh] flex-col gap-4 overflow-auto pt-2"
								ref={listRef}
							>
								<AdvancedColumnFilterRow<TData>
									parentRef={listRef}
									getAvailableColumns={getAvailableColumns}
									columnsMap={columnsMap}
									getFilter={getFilter}
									filterId={rootId}
									rootId={rootId}
								/>
							</ul>
						</DragDropProvider>
					)}
				</div>
				<div className="mt-2 flex gap-4">
					<Button onClick={addFilter}>Add filter</Button>
					<Button
						disabled={filtersLength === 0}
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
