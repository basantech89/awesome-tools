import { omit } from '@awesome-tools/utils'
import { DateRange } from 'react-day-picker'

type CommonOperators = 'equals' | 'notEquals' | 'isEmpty' | 'notEmpty'

export const DATA_GRID_CELL = {
	Number: 'number',
	Date: 'date',
	Select: 'select',
	MultiSelect: 'multi-select',
	String: 'string',
	Checkbox: 'checkbox',
	File: 'file',
	Actions: 'actions',
	RowNumber: 'row-number'
} as const

export type DataGridCell = (typeof DATA_GRID_CELL)[keyof typeof DATA_GRID_CELL]

export type DataGridActionableCell = Exclude<
	DataGridCell,
	typeof DATA_GRID_CELL.Actions | typeof DATA_GRID_CELL.RowNumber
>

export const FILTER_TYPE = {
	...omit(DATA_GRID_CELL, ['Actions', 'RowNumber'])
} as const

export type FilterType = (typeof FILTER_TYPE)[keyof typeof FILTER_TYPE]

const commonFilters: Record<
	CommonOperators,
	DataGridTableFilter<CommonOperators>
> = {
	equals: {
		label: 'Is',
		operator: 'equals',
		order: 20
	},
	notEquals: {
		label: 'Is not',
		operator: 'notEquals',
		order: 22
	},
	isEmpty: {
		label: 'Is empty',
		operator: 'isEmpty',
		order: 24,
		needInput: false
	},
	notEmpty: {
		label: 'Is not empty',
		operator: 'notEmpty',
		order: 25,
		needInput: false
	}
}

type RegexOperators = 'matchRegex' | 'notMatchRegex'

const regexFilters: Record<
	RegexOperators,
	DataGridTableFilter<RegexOperators>
> = {
	matchRegex: {
		label: 'Matches regex',
		operator: 'matchRegex',
		order: 18
	},
	notMatchRegex: {
		label: 'Does not match regex',
		operator: 'notMatchRegex',
		order: 19
	}
}

type TextOperators =
	| CommonOperators
	| RegexOperators
	| 'fuzzy'
	| 'equalsSensitive'
	| 'notEqualsSensitive'
	| 'contains'
	| 'containsSensitive'
	| 'notContains'
	| 'notContainsSensitive'
	| 'startsWith'
	| 'startsWithSensitive'
	| 'notStartsWith'
	| 'notStartsWithSensitive'
	| 'endsWith'
	| 'endsWithSensitive'
	| 'notEndsWith'
	| 'notEndsWithSensitive'

export type DataGridTableFilter<TOperator> = {
	label: string
	operator: TOperator
	order?: number
	needInput?: boolean // default true
	needRangeInput?: boolean // default false
	needDateInput?: boolean // default false
	needDateRangeInput?: boolean // default false
}

export const textFilters: Record<
	TextOperators,
	DataGridTableFilter<TextOperators>
> = {
	fuzzy: {
		label: 'Looks like (fuzzy)',
		operator: 'fuzzy',
		order: 1
	},
	equalsSensitive: {
		label: 'Is (case sensitive)',
		operator: 'equalsSensitive',
		order: 21
	},
	notEqualsSensitive: {
		label: 'Is not (case sensitive)',
		operator: 'notEqualsSensitive',
		order: 23
	},
	contains: {
		label: 'Contains',
		operator: 'contains',
		order: 4
	},
	containsSensitive: {
		label: 'Contains (case sensitive)',
		operator: 'containsSensitive',
		order: 5
	},
	notContains: {
		label: 'Does not contain',
		operator: 'notContains',
		order: 6
	},
	notContainsSensitive: {
		label: 'Does not contain (case sensitive)',
		operator: 'notContainsSensitive',
		order: 7
	},
	startsWith: {
		label: 'Starts with',
		operator: 'startsWith',
		order: 8
	},
	startsWithSensitive: {
		label: 'Starts with (case sensitive)',
		operator: 'startsWithSensitive',
		order: 9
	},
	notStartsWith: {
		label: 'Does not start with',
		operator: 'notStartsWith',
		order: 10
	},
	notStartsWithSensitive: {
		label: 'Does not start with (case sensitive)',
		operator: 'notStartsWithSensitive',
		order: 11
	},
	endsWith: {
		label: 'Ends with',
		operator: 'endsWith',
		order: 12
	},
	endsWithSensitive: {
		label: 'Ends with (case sensitive)',
		operator: 'endsWithSensitive',
		order: 13
	},
	notEndsWith: {
		label: 'Does not end with',
		operator: 'notEndsWith',
		order: 14
	},
	notEndsWithSensitive: {
		label: 'Does not end with (case sensitive)',
		operator: 'notEndsWithSensitive',
		order: 15
	},
	...commonFilters,
	...regexFilters
}

type NumberOperators =
	| CommonOperators
	| 'inRange'
	| 'notInRange'
	| 'lt'
	| 'lte'
	| 'gt'
	| 'gte'

export const numberFilters: Record<
	NumberOperators,
	DataGridTableFilter<NumberOperators>
> = {
	lt: {
		label: 'Less than',
		operator: 'lt',
		order: 2
	},
	lte: {
		label: 'Less than or equal to',
		operator: 'lte',
		order: 3
	},
	gt: {
		label: 'Greater than',
		operator: 'gt',
		order: 4
	},
	gte: {
		label: 'Greater than or equal to',
		operator: 'gte',
		order: 5
	},
	inRange: {
		label: 'In range',
		operator: 'inRange',
		order: 6,
		needRangeInput: true
	},
	notInRange: {
		label: 'Not in range',
		operator: 'notInRange',
		order: 7,
		needRangeInput: true
	},
	...commonFilters
}

type DateOperators =
	| CommonOperators
	| 'isBefore'
	| 'isAfter'
	| 'isOnOrBefore'
	| 'isOnOrAfter'
	| 'inBetween'
	| 'notInBetween'

export const dateFilters: Record<
	DateOperators,
	DataGridTableFilter<DateOperators>
> = {
	isBefore: {
		label: 'Is before',
		operator: 'isBefore',
		order: 2,
		needDateInput: true
	},
	isAfter: {
		label: 'Is after',
		operator: 'isAfter',
		order: 3,
		needDateInput: true
	},
	isOnOrBefore: {
		label: 'Is on or before',
		operator: 'isOnOrBefore',
		order: 4,
		needDateInput: true
	},
	isOnOrAfter: {
		label: 'Is on or after',
		operator: 'isOnOrAfter',
		order: 5,
		needDateInput: true
	},
	inBetween: {
		label: 'In between',
		operator: 'inBetween',
		order: 6,
		needDateRangeInput: true
	},
	notInBetween: {
		label: 'Not in between',
		operator: 'notInBetween',
		order: 7,
		needDateRangeInput: true
	},
	...commonFilters
}

type SelectOperators = 'hasAnyOf' | 'hasNoneOf'

export const selectFilters: Record<
	SelectOperators,
	DataGridTableFilter<SelectOperators>
> = {
	hasAnyOf: {
		label: 'Has any of',
		operator: 'hasAnyOf',
		order: 2
	},
	hasNoneOf: {
		label: 'Has none of',
		operator: 'hasNoneOf',
		order: 3
	}
}

type MultiSelectOperators = SelectOperators | 'hasAllOf'

export const multiSelectFilters: Record<
	MultiSelectOperators,
	DataGridTableFilter<MultiSelectOperators>
> = {
	...selectFilters,
	hasAllOf: {
		label: 'Has all of',
		operator: 'hasAllOf',
		order: 4
	}
}

type CheckboxOperators = 'isChecked' | 'isUnchecked'

export const checkboxFilters: Record<
	CheckboxOperators,
	DataGridTableFilter<CheckboxOperators>
> = {
	isChecked: {
		label: 'Is checked',
		operator: 'isChecked',
		order: 2,
		needInput: false
	},
	isUnchecked: {
		label: 'Is not checked',
		operator: 'isUnchecked',
		order: 3,
		needInput: false
	}
}

export type Operator =
	| TextOperators
	| NumberOperators
	| DateOperators
	| SelectOperators
	| MultiSelectOperators
	| CheckboxOperators

export const allFilters: Record<
	DataGridActionableCell,
	Record<string, DataGridTableFilter<Operator>>
> = {
	[DATA_GRID_CELL.String]: textFilters,
	[DATA_GRID_CELL.Number]: numberFilters,
	[DATA_GRID_CELL.Date]: dateFilters,
	[DATA_GRID_CELL.File]: textFilters,
	[DATA_GRID_CELL.Select]: selectFilters,
	[DATA_GRID_CELL.MultiSelect]: multiSelectFilters,
	[DATA_GRID_CELL.Checkbox]: checkboxFilters
}

export type FilterValue = {
	operator: Operator
	type: FilterType
	value:
		| string
		| number
		| boolean
		| [number, number]
		| string[]
		| Date
		| DateRange
		| undefined
}

export const isDataGridActionableCell = (
	value: unknown
): value is DataGridActionableCell =>
	value !== DATA_GRID_CELL.Actions &&
	value !== DATA_GRID_CELL.RowNumber &&
	Object.values(DATA_GRID_CELL).includes(value as DataGridCell)
