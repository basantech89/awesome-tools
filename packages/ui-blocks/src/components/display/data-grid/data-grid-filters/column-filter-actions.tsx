'use client'

import { Column } from '@tanstack/react-table'
import React from 'react'

import { useDataGrid } from '#blocks'

import { BaseFilter } from '../data-grid-features'
import { ColumnFilterRowFilter } from './column-filter'
import { FilterValue } from './filters'

const BasicColumnFiltersContext = React.createContext<unknown>(null)
const AdvancedColumnFiltersContext = React.createContext<unknown>(null)

export function BasicColumnFilterActions<TData>({
	filter,
	...props
}: {
	filter: ColumnFilterRowFilter
	children: React.ReactNode
}) {
	const { table } = useDataGrid<TData>()

	const updateColumn = React.useCallback(
		(newColumn: Column<TData, unknown>) => {
			table.setColumnFilters(prev => {
				const operator = newColumn.getFilters()[0].operator

				return prev.map(prevFilter =>
					prevFilter.id === filter.id
						? {
								...prevFilter,
								id: newColumn.id,
								value: {
									type: newColumn.cellType,
									operator,
									value: ''
								}
							}
						: prevFilter
				)
			})
		},
		[table, filter.id]
	)

	const updateFilter = React.useCallback(
		(updates: Partial<FilterValue>) => {
			table.setColumnFilters(prev =>
				prev.map(prevFilter =>
					prevFilter.id === filter.id
						? {
								...prevFilter,
								value: { ...(prevFilter.value as FilterValue), ...updates }
							}
						: prevFilter
				)
			)
		},
		[table, filter.id]
	)

	const value = React.useMemo(
		() => ({ updateFilter, updateColumn }),
		[updateColumn, updateFilter]
	)

	return <BasicColumnFiltersContext.Provider value={value} {...props} />
}

export function AdvancedColumnFilterActions<TData>({
	filter,
	...props
}: {
	filter: BaseFilter
	children: React.ReactNode
}) {
	const { table } = useDataGrid<TData>()

	const updateFilter = React.useCallback(
		(updates: Partial<FilterValue>) => {
			table.setAdvancedColumnFilters(prev => ({
				...prev,
				nodes: {
					...prev.nodes,
					[filter.id]: {
						...prev.nodes[filter.id],
						value: {
							...(prev.nodes[filter.id].value as FilterValue),
							...updates
						}
					} as BaseFilter
				}
			}))
		},
		[filter, table]
	)

	const updateColumn = React.useCallback(
		(newColumn: Column<TData, unknown>) => {
			const operator = newColumn.getFilters()[0].operator

			table.setAdvancedColumnFilters(prev => ({
				...prev,
				nodes: {
					...prev.nodes,
					[filter.id]: {
						...prev.nodes[filter.id],
						columnId: newColumn.id,
						value: {
							...(prev.nodes[filter.id].value as FilterValue),
							operator,
							type: newColumn.cellType
						}
					} as BaseFilter
				}
			}))
		},
		[filter, table]
	)

	const value = React.useMemo(
		() => ({ updateFilter, updateColumn }),
		[updateColumn, updateFilter]
	)

	return <AdvancedColumnFiltersContext value={value} {...props} />
}

export enum ColumnFilterSlot {
	BASIC = 'basic',
	ADVANCED = 'advanced'
}

export function useColumnFilters<TData>(slot: ColumnFilterSlot) {
	const context = React.useContext(
		slot === ColumnFilterSlot.BASIC
			? BasicColumnFiltersContext
			: AdvancedColumnFiltersContext
	)

	if (!context) {
		throw new Error(
			'useColumnFilters must be used within a BasicColumnFilters or AdvancedColumnFilters component.'
		)
	}

	return context as {
		updateFilter: (updates: Partial<FilterValue>) => void
		updateColumn: (newColumn: Column<TData, unknown>) => void
	}
}
