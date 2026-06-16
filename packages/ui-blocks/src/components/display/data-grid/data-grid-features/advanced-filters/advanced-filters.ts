import { entries, values } from '@awesome-tools/utils'
import {
	functionalUpdate,
	makeStateUpdater,
	OnChangeFn,
	RowData,
	Table,
	TableFeature,
	Updater
} from '@tanstack/react-table'

import {
	allFilters,
	LOGICAL_OPERATORS,
	DataGridTableFilter,
	FilterValue,
	Operator
} from '../../data-grid-filters'

export function sortFilters(filters: typeof allFilters): typeof allFilters {
	return entries(filters).reduce(
		(acc, [cellType, cellFilters]) => {
			acc[cellType] = values(cellFilters)
				.sort((a, b) => (a.order || 0) - (b.order || 0))
				.reduce(
					(filtersAcc, filter) => {
						filtersAcc[filter.operator] = filter
						return filtersAcc
					},
					{} as Record<string, DataGridTableFilter<Operator>>
				)
			return acc
		},
		{} as typeof allFilters
	)
}

export type BaseFilter = {
	id: string
	columnId: string
	parentId: string
	value: FilterValue
	depth: number
}

export type LogicalFilter = {
	id: string
	parentId?: string
	childIds: string[]
	value: LOGICAL_OPERATORS
	depth: number
}

export type AdvancedColumnFilters = {
	rootId: string
	nodes: {
		[id: string]: LogicalFilter | BaseFilter
	}
}

export interface AdvancedColumnFiltersState {
	advancedColumnFilters: AdvancedColumnFilters
}

export interface AdvancedColumnFiltersOptions {
	dataGridFilters?: typeof allFilters
	onAdvancedColumnFiltersChange?: OnChangeFn<AdvancedColumnFilters>
}

export interface AdvancedColumnFiltersInstance {
	setAdvancedColumnFilters: (updater: Updater<AdvancedColumnFilters>) => void
	resetAdvancedColumnFilters: () => void
}

declare module '@tanstack/react-table' {
	interface TableState extends AdvancedColumnFiltersState {}

	interface TableOptionsResolved<
		TData extends RowData
	> extends AdvancedColumnFiltersOptions {}

	interface Table<TData extends RowData> extends AdvancedColumnFiltersInstance {
		dataGridFilters: typeof allFilters
	}
}

export const initialAdvancedColumnFilters: AdvancedColumnFilters = {
	rootId: '',
	nodes: {}
}

export const AdvancedColumnFiltersFeature: TableFeature = {
	getInitialState: (state): AdvancedColumnFiltersState => ({
		advancedColumnFilters: initialAdvancedColumnFilters,
		...state
	}),

	getDefaultOptions: <TData extends RowData>(
		table: Table<TData>
	): AdvancedColumnFiltersOptions => {
		return {
			dataGridFilters: allFilters,
			onAdvancedColumnFiltersChange: makeStateUpdater(
				'advancedColumnFilters',
				table
			)
		}
	},

	createTable: <TData extends RowData>(table: Table<TData>): void => {
		table.dataGridFilters = sortFilters(table.options.dataGridFilters!)

		table.setAdvancedColumnFilters = updater => {
			const safeUpdater: Updater<AdvancedColumnFilters> = old => {
				return functionalUpdate(updater, old)
			}

			return table.options.onAdvancedColumnFiltersChange?.(safeUpdater)
		}

		table.resetAdvancedColumnFilters = () => {
			table.setAdvancedColumnFilters(() => initialAdvancedColumnFilters)
		}
	}
}
