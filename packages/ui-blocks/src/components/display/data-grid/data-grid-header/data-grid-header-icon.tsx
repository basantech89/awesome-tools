import { SortDirection } from '@tanstack/react-table'
import {
	ArrowDown01,
	ArrowDownAz,
	ArrowUp10,
	ArrowUpZA,
	Baseline,
	Calendar,
	CalendarArrowDown,
	CalendarArrowUp,
	File,
	Hash,
	List,
	ListChecks,
	type LucideProps,
	Pickaxe,
	SquareCheckBig
} from 'lucide-react'
import React from 'react'

import { DATA_GRID_CELL, DataGridCell } from '../data-grid-filters'

export default function DataGridHeaderIcon({
	cellType,
	...rest
}: {
	cellType: DataGridCell
} & React.RefAttributes<SVGSVGElement> &
	LucideProps) {
	if (cellType === DATA_GRID_CELL.Number) {
		return <Hash {...rest} />
	}

	if (cellType === DATA_GRID_CELL.Date) {
		return <Calendar {...rest} />
	}

	if (cellType === DATA_GRID_CELL.Select) {
		return <List {...rest} />
	}

	if (cellType === DATA_GRID_CELL.MultiSelect) {
		return <ListChecks {...rest} />
	}

	if (cellType === DATA_GRID_CELL.Checkbox) {
		return <SquareCheckBig {...rest} />
	}

	if (cellType === DATA_GRID_CELL.File) {
		return <File {...rest} />
	}

	if (cellType === DATA_GRID_CELL.String) {
		return <Baseline {...rest} />
	}

	if (cellType === DATA_GRID_CELL.Actions) {
		return <Pickaxe {...rest} />
	}

	return null
}

export enum Sort {
	ASC = 'asc',
	DESC = 'desc'
}

export function getDataGridSortIcon({
	cellType,
	sortDirection,
	...props
}: LucideProps & {
	cellType: DataGridCell
	sortDirection: false | SortDirection
}) {
	if (sortDirection === 'asc') {
		if (cellType === DATA_GRID_CELL.Number) {
			return <ArrowDown01 {...props} />
		}

		if (cellType === DATA_GRID_CELL.Date) {
			return <CalendarArrowDown {...props} />
		}

		return <ArrowDownAz {...props} />
	}

	if (sortDirection === 'desc') {
		if (cellType === DATA_GRID_CELL.Number) {
			return <ArrowUp10 {...props} />
		}

		if (cellType === DATA_GRID_CELL.Date) {
			return <CalendarArrowUp {...props} />
		}

		return <ArrowUpZA {...props} />
	}

	return null
}
