import type { Row } from '@tanstack/react-table'

import { rankItem } from '@tanstack/match-sorter-utils'
import { isAfter, isBefore, isEqual } from 'date-fns'

import {
	DATA_GRID_CELL,
	DataGridActionableCell,
	DataGridCell,
	type FilterValue,
	isDataGridActionableCell
} from './filters'

export const isEmpty = (value: unknown) =>
	value === null ||
	value === undefined ||
	value === '' ||
	(Array.isArray(value) && value.filter(Boolean).length === 0)

const areEqual = (
	cellValue: unknown,
	filterValue: unknown,
	caseSensitive = false
) => {
	if (typeof cellValue === 'string' && typeof filterValue === 'string') {
		if (caseSensitive) {
			return cellValue === filterValue
		} else {
			return cellValue.toLowerCase() === filterValue.toLowerCase()
		}
	}

	if (typeof cellValue === 'number' && typeof filterValue === 'number') {
		return cellValue === filterValue
	}

	if (
		cellValue instanceof Date &&
		(filterValue instanceof Date || typeof filterValue === 'string')
	) {
		const cellDate = new Date(cellValue)
		const filterDate = new Date(filterValue)

		return cellDate.toDateString() === filterDate.toDateString()
	}

	return String(cellValue) === String(filterValue)
}

const areDatesInRange = (cellDate: Date, range: { from: Date; to: Date }) => {
	const { from, to } = range

	return (
		(isEqual(cellDate, from) || isAfter(cellDate, from)) &&
		(isEqual(cellDate, to) || isBefore(cellDate, to))
	)
}

export function dataGridFilterFn<TData>(
	cellType: DataGridCell,
	row: Row<TData>,
	columnId: string,
	valueFromFilter: unknown
) {
	if (!valueFromFilter || typeof valueFromFilter !== 'object') {
		return true
	}

	const cellValue = row.getValue(columnId)

	const { operator, value: filterValue } = valueFromFilter as FilterValue

	if (operator === 'isEmpty') {
		return isEmpty(cellValue)
	}

	if (operator === 'notEmpty') {
		return !isEmpty(cellValue)
	}

	if (filterValue === undefined || filterValue === null || filterValue === '') {
		return true
	}

	if (operator === 'equals') {
		return areEqual(cellValue, filterValue)
	}

	if (operator === 'equalsSensitive') {
		return areEqual(cellValue, filterValue, true)
	}

	if (operator === 'notEquals') {
		return !areEqual(cellValue, filterValue)
	}

	if (operator === 'notEqualsSensitive') {
		return !areEqual(cellValue, filterValue, true)
	}

	if (isDataGridActionableCell(cellType)) {
		return filterFunctions[cellType]?.(cellValue, valueFromFilter)
	}

	return false
}

function dataGridTextFilterFn(
	cellValue: unknown,
	valueFromFilter: FilterValue
) {
	const { operator, value: filterValue } = valueFromFilter as FilterValue

	const cellValueStr =
		typeof cellValue === 'string' ? cellValue : String(cellValue)

	const filterValueStr =
		typeof filterValue === 'string' ? filterValue : String(filterValue)

	if (operator === 'matchRegex') {
		return new RegExp(filterValue as string).test(String(cellValue))
	}

	if (operator === 'notMatchRegex') {
		return !new RegExp(filterValue as string).test(String(cellValue))
	}

	if (operator === 'fuzzy') {
		const itemRank = rankItem(cellValueStr, filterValueStr)
		return itemRank.passed
	}

	if (operator === 'contains') {
		return cellValueStr.toLowerCase().includes(filterValueStr.toLowerCase())
	}

	if (operator === 'containsSensitive') {
		return cellValueStr.includes(filterValueStr)
	}

	if (operator === 'notContains') {
		return !cellValueStr.toLowerCase().includes(filterValueStr.toLowerCase())
	}

	if (operator === 'notContainsSensitive') {
		return !cellValueStr.includes(filterValueStr)
	}

	if (operator === 'startsWith') {
		return cellValueStr.toLowerCase().startsWith(filterValueStr.toLowerCase())
	}

	if (operator === 'startsWithSensitive') {
		return cellValueStr.startsWith(filterValueStr)
	}

	if (operator === 'notStartsWith') {
		return !cellValueStr.toLowerCase().startsWith(filterValueStr.toLowerCase())
	}

	if (operator === 'notStartsWithSensitive') {
		return !cellValueStr.startsWith(filterValueStr)
	}

	if (operator === 'endsWith') {
		return cellValueStr.toLowerCase().endsWith(filterValueStr.toLowerCase())
	}

	if (operator === 'endsWithSensitive') {
		return cellValueStr.endsWith(filterValueStr)
	}

	if (operator === 'notEndsWith') {
		return !cellValueStr.toLowerCase().endsWith(filterValueStr.toLowerCase())
	}

	if (operator === 'notEndsWithSensitive') {
		return !cellValueStr.endsWith(filterValueStr)
	}

	return false
}

function dataGridNumberFilterFn(
	cellValue: unknown,
	valueFromFilter: FilterValue
) {
	const { operator, value: filterValue } = valueFromFilter as FilterValue
	const cellValueNum = Number(cellValue)

	if (operator === 'lt') {
		return cellValueNum < Number(filterValue)
	}

	if (operator === 'lte') {
		return cellValueNum <= Number(filterValue)
	}

	if (operator === 'gt') {
		return cellValueNum > Number(filterValue)
	}

	if (operator === 'gte') {
		return cellValueNum >= Number(filterValue)
	}

	if (
		operator === 'inRange' &&
		Array.isArray(filterValue) &&
		filterValue.length === 2
	) {
		const [min, max] = filterValue.map(Number)
		return cellValueNum >= min && cellValueNum <= max
	}

	if (
		operator === 'notInRange' &&
		Array.isArray(filterValue) &&
		filterValue.length === 2
	) {
		const [min, max] = filterValue.map(Number)
		return cellValueNum < min || cellValueNum > max
	}

	return false
}

function dataGridSelectFilterFn(
	cellValue: unknown,
	valueFromFilter: FilterValue
) {
	const { operator, value } = valueFromFilter as FilterValue

	const filterValue = value as unknown[]

	if (operator === 'hasAnyOf') {
		return filterValue.includes(cellValue)
	}

	if (operator === 'hasNoneOf') {
		return !filterValue.includes(cellValue)
	}

	const cellValueArray = Array.isArray(cellValue) ? cellValue : [cellValue]
	if (operator === 'hasAllOf') {
		return filterValue.every(filterVal =>
			cellValueArray.some(
				cellVal =>
					String(filterVal).toLowerCase() === String(cellVal).toLowerCase()
			)
		)
	}

	return false
}

function dataGridMultiSelectFilterFn(
	cellValue: unknown,
	valueFromFilter: FilterValue
) {
	const { operator, value } = valueFromFilter as FilterValue

	const filterValue = value as unknown[]
	const cellValueArray = Array.isArray(cellValue) ? cellValue : [cellValue]

	if (operator === 'hasAnyOf') {
		return filterValue.some(filterVal => cellValueArray.includes(filterVal))
	}

	if (operator === 'hasNoneOf') {
		return !filterValue.some(filterVal => cellValueArray.includes(filterVal))
	}

	if (operator === 'hasAllOf') {
		return filterValue.every(filterVal => cellValueArray.includes(filterVal))
	}

	return false
}

function dataGridDateFilterFn(
	cellValue: unknown,
	valueFromFilter: FilterValue
) {
	const { operator, value } = valueFromFilter as FilterValue

	const cellDate =
		cellValue instanceof Date ? cellValue : new Date(String(cellValue))
	const filterDate = value instanceof Date ? value : new Date(String(value))

	if (operator === 'isBefore') {
		return isBefore(cellDate, filterDate)
	}

	if (operator === 'isAfter') {
		return isAfter(cellDate, filterDate)
	}

	if (operator === 'isOnOrBefore') {
		return isEqual(cellDate, filterDate) || isBefore(cellDate, filterDate)
	}

	if (operator === 'isOnOrAfter') {
		return isEqual(cellDate, filterDate) || isAfter(cellDate, filterDate)
	}

	if (operator === 'inBetween') {
		return areDatesInRange(cellDate, value as { from: Date; to: Date })
	}

	if (operator === 'notInBetween') {
		return !areDatesInRange(cellDate, value as { from: Date; to: Date })
	}

	return false
}

function dataGridCheckboxFilterFn(
	cellValue: unknown,
	valueFromFilter: FilterValue
) {
	const { operator } = valueFromFilter as FilterValue

	if (operator === 'isChecked') {
		return cellValue === true
	}

	if (operator === 'isUnchecked') {
		return cellValue === false
	}

	return false
}

const filterFunctions: Record<DataGridActionableCell, Function> = {
	[DATA_GRID_CELL.String]: dataGridTextFilterFn,
	[DATA_GRID_CELL.Number]: dataGridNumberFilterFn,
	[DATA_GRID_CELL.Select]: dataGridSelectFilterFn,
	[DATA_GRID_CELL.MultiSelect]: dataGridMultiSelectFilterFn,
	[DATA_GRID_CELL.Date]: dataGridDateFilterFn,
	[DATA_GRID_CELL.Checkbox]: dataGridCheckboxFilterFn,
	[DATA_GRID_CELL.File]: dataGridTextFilterFn
}
