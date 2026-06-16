import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@awesome-tools/ui'
import { keys } from '@awesome-tools/utils'
import { Column } from '@tanstack/react-table'
import { CircleMinus, CirclePlus, SplitIcon } from 'lucide-react'
import React from 'react'

import { useDataGrid } from '#blocks/components'

import { LOGICAL_OPERATORS, isLogicalFilter } from '.'
import {
	BaseFilter,
	LogicalFilter
} from '../../data-grid-features/advanced-filters/advanced-filters'
import {
	AdvancedColumnFilterActions,
	ColumnFilterSlot
} from '../column-filter-actions'
import ColumnFilterRow from '../column-filter/column-filter-row'
import { DataGridActionableCell } from '../filters'

type AdvancedColumnFilterRowProps<TData> = {
	filterId: string
	rootId: string
	parentRef: React.RefObject<HTMLUListElement | null>
	getAvailableColumns: () => Column<TData, unknown>[]
	getFilter: (filterId?: string | undefined) => LogicalFilter | BaseFilter
	columnsMap: Record<string, Column<TData, unknown> & { label: string }>
}

function didFilterChange<TData>(
	prevProps: AdvancedColumnFilterRowProps<TData>,
	nextProps: AdvancedColumnFilterRowProps<TData>,
	filterId: string
): boolean {
	const prevFilter = prevProps.getFilter(filterId)
	const nextFilter = nextProps.getFilter(filterId)

	const areLogicalFilters =
		isLogicalFilter(prevFilter) && isLogicalFilter(nextFilter)

	if (areLogicalFilters) {
		if (prevFilter.value !== nextFilter.value) {
			return true
		}

		if (prevFilter.childIds.length !== nextFilter.childIds.length) {
			return true
		}

		for (let idx = 0; idx < nextFilter.childIds.length; idx++) {
			const prevChildId = prevFilter.childIds[idx]
			const nextChildId = nextFilter.childIds[idx]

			if (prevChildId !== nextChildId) {
				return true
			}

			if (didFilterChange(prevProps, nextProps, nextChildId)) {
				return true
			}
		}

		return false
	}

	return prevFilter !== nextFilter
}

function InternalAdvancedColumnFilterRow<TData>({
	filterId,
	getFilter,
	...props
}: AdvancedColumnFilterRowProps<TData>) {
	const { table } = useDataGrid<TData>()

	const filter = getFilter(filterId)

	const isLogical = isLogicalFilter(filter)

	const updateAndOrOperator = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		const dataFilter = event.currentTarget.dataset.filter as LOGICAL_OPERATORS

		if (dataFilter) {
			table.setAdvancedColumnFilters(prev => ({
				...prev,
				nodes: {
					...prev.nodes,
					[filter.id]: {
						...prev.nodes[filter.id],
						value: dataFilter
					} as LogicalFilter
				}
			}))
		}
	}

	const columns = props.getAvailableColumns()

	const firstAvailableColumn = columns[0]
	const filters = firstAvailableColumn.getFilters()

	const id = React.useId()

	const addBasicFilter = () => {
		let parent = getFilter(filter.parentId) as LogicalFilter
		parent = isLogical ? filter : parent

		const newFilter = {
			id: `${parent.id}-basic-${parent.childIds.length}-${id}`,
			columnId: firstAvailableColumn.id,
			parentId: parent.id,
			depth: parent.depth + 1,
			value: {
				type: firstAvailableColumn.cellType as DataGridActionableCell,
				operator: filters[0].operator,
				value: ''
			}
		}

		const filterIdx = parent.childIds.findIndex(id => id === filterId)
		table.setAdvancedColumnFilters(prev => ({
			...prev,
			nodes: {
				...prev.nodes,
				[newFilter.id]: newFilter,
				[parent.id]: {
					...prev.nodes[parent.id],
					childIds: isLogical
						? [newFilter.id, ...parent.childIds]
						: [
								...parent.childIds.slice(0, filterIdx + 1),
								newFilter.id,
								...parent.childIds.slice(filterIdx + 1)
							]
				}
			}
		}))
	}

	const addLogicalFilter = () => {
		let parent = getFilter(filter.parentId) as LogicalFilter
		parent = isLogical ? filter : parent

		const newFilter = {
			id: `${parent.id}-logical-${parent.childIds.length}-${id}`,
			parentId: parent.id,
			childIds: [],
			value: LOGICAL_OPERATORS.AND,
			depth: parent.depth + 1
		}

		const filterIdx = parent.childIds.findIndex(id => id === filterId)
		table.setAdvancedColumnFilters(prev => ({
			...prev,
			nodes: {
				...prev.nodes,
				[newFilter.id]: newFilter,
				[parent.id]: {
					...prev.nodes[parent.id],
					childIds: isLogical
						? [newFilter.id, ...parent.childIds]
						: [
								...parent.childIds.slice(0, filterIdx + 1),
								newFilter.id,
								...parent.childIds.slice(filterIdx + 1)
							]
				}
			}
		}))
	}

	const removeFilter = () => {
		const parent = getFilter(filter.parentId)
		const isRoot = props.rootId === filter.id

		const root = getFilter(props.rootId) as LogicalFilter
		const isLastFilter = parent.id === props.rootId && root.childIds.length <= 1

		if (!(isRoot || isLastFilter)) {
			table.setAdvancedColumnFilters(prev => {
				const updatedNodes = { ...prev.nodes }
				delete updatedNodes[filter.id]

				if (isLogicalFilter(parent)) {
					updatedNodes[parent.id] = {
						...parent,
						childIds: parent.childIds.filter((id: string) => id !== filter.id)
					}
				}

				return {
					...prev,
					nodes: updatedNodes
				}
			})
		} else {
			table.resetAdvancedColumnFilters()
		}
	}

	const column =
		props.columnsMap[(filter as unknown as BaseFilter).columnId || '']

	const getFilterValue = React.useCallback(() => filter.value, [filter.value])
	if (column) {
		column.getFilterValue = getFilterValue
	}

	return (
		<>
			<li
				className={
					isLogical ? 'flex justify-between' : 'flex flex-col gap-4 md:flex-row'
				}
				style={{ paddingLeft: filter.depth * 16 }}
			>
				{isLogical ? (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button variant="outline" className="w-fit px-6">
									{filter.value as LOGICAL_OPERATORS}
								</Button>
							}
						/>
						<DropdownMenuContent>
							{keys(LOGICAL_OPERATORS).map(andOrFilter => (
								<DropdownMenuItem
									key={andOrFilter}
									data-filter={andOrFilter}
									onClick={updateAndOrOperator}
								>
									{andOrFilter}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<AdvancedColumnFilterActions<TData> filter={filter}>
						<ColumnFilterRow
							slot={ColumnFilterSlot.ADVANCED}
							getAvailableColumns={props.getAvailableColumns}
							column={column}
						/>
					</AdvancedColumnFilterActions>
				)}
				<div className="flex">
					<Button
						className="mr-2 rounded"
						size="icon-sm"
						variant="outline"
						onClick={addLogicalFilter}
					>
						<SplitIcon />
					</Button>
					<Button
						className="mr-2 rounded"
						size="icon-sm"
						variant="outline"
						onClick={addBasicFilter}
					>
						<CirclePlus />
					</Button>
					<Button
						className="rounded"
						size="icon-sm"
						variant="outline"
						onClick={removeFilter}
					>
						<CircleMinus />
					</Button>
				</div>
			</li>

			{isLogical &&
				filter.childIds.map(childFilterId => (
					<AdvancedColumnFilterRow
						{...props}
						key={childFilterId}
						filterId={childFilterId}
						getFilter={getFilter}
					/>
				))}
		</>
	)
}

export const AdvancedColumnFilterRow = React.memo(
	InternalAdvancedColumnFilterRow,
	(prevProps, nextProps) => {
		if (
			prevProps.filterId !== nextProps.filterId ||
			prevProps.rootId !== nextProps.rootId ||
			prevProps.parentRef !== nextProps.parentRef ||
			prevProps.columnsMap !== nextProps.columnsMap ||
			prevProps.getAvailableColumns !== nextProps.getAvailableColumns
		) {
			return false
		}

		return !didFilterChange(prevProps, nextProps, nextProps.filterId)
	}
) as typeof InternalAdvancedColumnFilterRow
