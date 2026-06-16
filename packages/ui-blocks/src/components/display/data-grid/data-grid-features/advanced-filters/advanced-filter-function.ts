import { Row } from '@tanstack/react-table'

import {
	dataGridFilterFn,
	isLogicalFilter,
	LOGICAL_OPERATORS
} from '../../data-grid-filters'
import { AdvancedColumnFilters } from './advanced-filters'

export function dataGridAdvancedFilterFn<TData>(
	row: Row<TData>,
	filters: AdvancedColumnFilters['nodes'],
	filterId: string
): boolean {
	const filter = filters[filterId]

	if (filter.value === LOGICAL_OPERATORS.AND) {
		return filter.childIds.every(subFilterId =>
			dataGridAdvancedFilterFn(row, filters, subFilterId)
		)
	}

	if (filter.value === LOGICAL_OPERATORS.OR) {
		return filter.childIds.some(subFilterId =>
			dataGridAdvancedFilterFn(row, filters, subFilterId)
		)
	}

	if (!isLogicalFilter(filter)) {
		const filterValue = filter.value
		return dataGridFilterFn(filterValue.type, row, filter.columnId, filterValue)
	}

	return false
}
