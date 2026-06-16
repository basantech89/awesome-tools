import { BaseFilter, LogicalFilter } from '../../data-grid-features'

export enum LOGICAL_OPERATORS {
	AND = 'AND',
	OR = 'OR'
}

export const isLogicalFilter = (
	filter: LogicalFilter | BaseFilter
): filter is LogicalFilter => {
	return (
		(filter as LogicalFilter).value === LOGICAL_OPERATORS.AND ||
		(filter as LogicalFilter).value === LOGICAL_OPERATORS.OR
	)
}

export const areFiltersEqual = (
	filterA: BaseFilter | LogicalFilter,
	filterB: BaseFilter | LogicalFilter
): boolean => {
	if (isLogicalFilter(filterA) && isLogicalFilter(filterB)) {
		return filterA.value === filterB.value
	}

	if (!isLogicalFilter(filterA) && !isLogicalFilter(filterB)) {
		return (
			filterA.columnId === filterB.columnId && filterA.value === filterB.value
		)
	}

	return false
}

export * from './advanced-column-filter'
