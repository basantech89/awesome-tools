import {
	Badge,
	Button,
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	DebouncedInput,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	useComboboxAnchor
} from '@awesome-tools/ui'
import { Column } from '@tanstack/react-table'
import { format } from 'date-fns'
import { CalendarIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import React from 'react'
import { DateRange } from 'react-day-picker'

import { Calendar } from '#blocks/index'

import { FilterValue } from './filters'

const getFilterOptions = <TData,>(column: Column<TData>) => {
	const configuredOptions = column.columnDef.meta?.options

	if (configuredOptions && configuredOptions.length > 0) {
		return Array.from(new Set(configuredOptions))
	}

	return Array.from(column.getFacetedUniqueValues().keys())
}

export function DataGridMultiSelectFilter<TData>({
	column,
	updateValue,
	...props
}: React.ComponentProps<typeof Combobox> & {
	column: Column<TData>
	updateValue: React.ComponentProps<typeof Combobox>['onValueChange']
}) {
	const anchor = useComboboxAnchor()

	const filterValue = column.getFilterValue() as FilterValue
	const uniqueFilterValues = getFilterOptions(column)

	const handleValueChange: typeof updateValue = (value, eventDetails) => {
		if (Array.isArray(value) && value.length === 0) {
			updateValue?.('', eventDetails)
		} else {
			updateValue?.(value, eventDetails)
		}
	}

	const resetColumnFilter = () => {
		updateValue?.('', {} as Parameters<typeof updateValue>[1])
	}

	return (
		<Combobox
			multiple
			items={uniqueFilterValues}
			value={filterValue.value}
			onValueChange={handleValueChange}
			{...props}
		>
			<ComboboxChips ref={anchor} className="w-full max-w-xs">
				<ComboboxValue>
					{values => (
						<React.Fragment>
							{values?.length > 1 ? (
								<Tooltip>
									<TooltipTrigger
										render={
											<Badge variant="secondary" className="rounded-md">
												{values.length} selected
												<Button
													size="icon-xs"
													variant="ghost"
													onClick={resetColumnFilter}
												>
													<XIcon className="pointer-events-none" />
												</Button>
											</Badge>
										}
									/>
									<TooltipContent>{values.join(', ')}</TooltipContent>
								</Tooltip>
							) : (
								values?.map?.((value: string) => (
									<ComboboxChip key={value}>{value}</ComboboxChip>
								))
							)}
							<ComboboxChipsInput
								placeholder={`Search... (${uniqueFilterValues.length})`}
							/>
						</React.Fragment>
					)}
				</ComboboxValue>
			</ComboboxChips>
			<ComboboxContent anchor={anchor}>
				<ComboboxList>
					{item => (
						<ComboboxItem key={item} value={item}>
							{item}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	)
}

export function DataGridNumberFilter<TData>({
	needRangeInput,
	updateValue,
	column,
	...props
}: Partial<React.ComponentProps<typeof DebouncedInput>> & {
	needRangeInput?: boolean
	column: Column<TData>
	updateValue: (value: unknown) => void
}) {
	const filterValue = column.getFilterValue() as FilterValue

	const updateMinValue = React.useCallback(
		(minValue: number) => {
			updateValue([minValue, (filterValue.value as [number, number])?.[1]])
		},
		[updateValue, filterValue]
	)

	const updateMaxValue = React.useCallback(
		(maxValue: number) => {
			updateValue([(filterValue.value as [number, number])?.[0], maxValue])
		},
		[updateValue, filterValue]
	)

	const facetedMinMaxValues = column.getFacetedMinMaxValues()

	if (needRangeInput) {
		return (
			<div className="flex gap-4">
				<DebouncedInput
					{...props}
					type="number"
					min={Number(facetedMinMaxValues?.[0] ?? '')}
					max={Number(facetedMinMaxValues?.[1] ?? '')}
					onChange={updateMinValue}
					placeholder={`Min ${
						facetedMinMaxValues?.[0] !== undefined
							? `(${facetedMinMaxValues?.[0]})`
							: ''
					}`}
					value={(filterValue?.value as [number, number])?.[0]}
				/>
				<DebouncedInput
					{...props}
					type="number"
					min={Number(facetedMinMaxValues?.[0] ?? '')}
					max={Number(facetedMinMaxValues?.[1] ?? '')}
					onChange={updateMaxValue}
					placeholder={`Max ${facetedMinMaxValues?.[1] ? `(${facetedMinMaxValues?.[1]})` : ''}`}
					value={(filterValue?.value as [number, number])?.[1]}
				/>
			</div>
		)
	}

	return (
		<DebouncedInput
			{...props}
			type="number"
			min={Number(facetedMinMaxValues?.[0] ?? '')}
			max={Number(facetedMinMaxValues?.[1] ?? '')}
			onChange={updateValue}
			placeholder="Type a number..."
			value={filterValue?.value as number}
		/>
	)
}

export function DataGridDateFilter<TData>({
	column,
	needDateInput,
	updateValue
}: {
	column: Column<TData>
	needDateInput?: boolean
	updateValue: (value: unknown) => void
}) {
	const filterValue = column.getFilterValue() as FilterValue

	if (needDateInput) {
		const date = filterValue?.value as Date

		return (
			<Popover>
				<PopoverTrigger
					render={
						<Button
							className="min-w-36 justify-start px-2.5 font-normal"
							variant="outline"
						>
							{date ? format(date, 'PPP') : <span>Pick a date</span>}
							<ChevronDownIcon className="ml-auto" data-icon="inline-start" />
						</Button>
					}
				/>
				<PopoverContent>
					<Calendar
						required
						captionLayout="dropdown"
						mode="single"
						onSelect={updateValue}
						selected={(filterValue?.value || new Date()) as Date}
					/>
				</PopoverContent>
			</Popover>
		)
	}

	const range = filterValue?.value as DateRange

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						className="min-w-36 justify-start px-2.5! font-normal"
						id="date-picker-range"
						variant="outline"
					>
						<CalendarIcon data-icon="inline-start" />
						{range?.from ? (
							range.to ? (
								<>
									{format(range.from, 'LLL dd, y')} -{' '}
									{format(range.to, 'LLL dd, y')}
								</>
							) : (
								format(range.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date range</span>
						)}
					</Button>
				}
			/>
			<PopoverContent className="w-fit">
				<Calendar
					required
					defaultMonth={range?.from}
					mode="range"
					numberOfMonths={2}
					onSelect={updateValue}
					selected={range}
				/>
			</PopoverContent>
		</Popover>
	)
}
