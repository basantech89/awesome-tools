import {
	Button,
	Card,
	CardContent,
	CardFooter,
	Field,
	FieldGroup,
	FieldLabel,
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@awesome-tools/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { addDays, format } from 'date-fns'
import { CalendarIcon, ChevronDownIcon, Clock2Icon } from 'lucide-react'
import React from 'react'
import type { DateRange } from 'react-day-picker'
import { es } from 'react-day-picker/locale'

import { Calendar, CalendarDayButton } from './calendar'

const meta = {
	title: 'Components/Display/Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(
			new Date(new Date().getFullYear(), new Date().getMonth(), 12)
		)

		return (
			<Card className="mx-auto w-fit p-0">
				<CardContent className="p-0">
					<Calendar
						captionLayout="dropdown"
						mode="single"
						onSelect={setDate}
						selected={date}
					/>
				</CardContent>
			</Card>
		)
	}
}

export const Multiple: Story = {
	render: () => (
		<Card className="mx-auto w-fit p-0">
			<CardContent className="p-0">
				<Calendar mode="multiple" />
			</CardContent>
		</Card>
	)
}

export const WeekNumbers: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(
			new Date(new Date().getFullYear(), 1, 3)
		)

		return (
			<Card className="mx-auto w-fit p-0">
				<CardContent className="p-0">
					<Calendar
						defaultMonth={date}
						mode="single"
						onSelect={setDate}
						selected={date}
						showWeekNumber
					/>
				</CardContent>
			</Card>
		)
	}
}

export const BookedDates: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(
			new Date(new Date().getFullYear(), 1, 3)
		)
		const bookedDates = Array.from(
			{ length: 15 },
			(_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
		)

		return (
			<Card className="mx-auto w-fit p-0">
				<CardContent className="p-0">
					<Calendar
						defaultMonth={date}
						disabled={bookedDates}
						mode="single"
						modifiers={{
							booked: bookedDates
						}}
						modifiersClassNames={{
							booked: '[&>button]:line-through opacity-100'
						}}
						onSelect={setDate}
						selected={date}
					/>
				</CardContent>
			</Card>
		)
	}
}

export const Range: Story = {
	render: () => {
		const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
			from: new Date(new Date().getFullYear(), 0, 12),
			to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
		})

		return (
			<Card className="mx-auto w-fit p-0">
				<CardContent className="p-0">
					<Calendar
						defaultMonth={dateRange?.from}
						disabled={date =>
							date > new Date() || date < new Date('1900-01-01')
						}
						mode="range"
						numberOfMonths={2}
						onSelect={setDateRange}
						selected={dateRange}
					/>
				</CardContent>
			</Card>
		)
	}
}

export const RangeMultipleMonths: Story = {
	render: () => {
		const [range, setRange] = React.useState<DateRange | undefined>({
			from: new Date(new Date().getFullYear(), 3, 12),
			to: addDays(new Date(new Date().getFullYear(), 3, 12), 60)
		})

		return (
			<Card className="mx-auto w-fit p-0">
				<CardContent className="p-0">
					<Calendar
						defaultMonth={range?.from}
						fixedWeeks
						locale={es}
						mode="range"
						numberOfMonths={3}
						onSelect={setRange}
						selected={range}
					/>
				</CardContent>
			</Card>
		)
	}
}

export const Time: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(
			new Date(new Date().getFullYear(), new Date().getMonth(), 12)
		)

		return (
			<Card className="mx-auto w-fit" size="sm">
				<CardContent>
					<Calendar
						className="p-0"
						mode="single"
						onSelect={setDate}
						selected={date}
					/>
				</CardContent>
				<CardFooter className="border-t bg-card">
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="time-from">Start Time</FieldLabel>
							<InputGroup>
								<InputGroupInput
									className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
									defaultValue="10:30:00"
									id="time-from"
									step="1"
									type="time"
								/>
								<InputGroupAddon>
									<Clock2Icon className="text-muted-foreground" />
								</InputGroupAddon>
							</InputGroup>
						</Field>
						<Field>
							<FieldLabel htmlFor="time-to">End Time</FieldLabel>
							<InputGroup>
								<InputGroupInput
									className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
									defaultValue="12:30:00"
									id="time-to"
									step="1"
									type="time"
								/>
								<InputGroupAddon>
									<Clock2Icon className="text-muted-foreground" />
								</InputGroupAddon>
							</InputGroup>
						</Field>
					</FieldGroup>
				</CardFooter>
			</Card>
		)
	}
}

export const Presets: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>(
			new Date(new Date().getFullYear(), 1, 12)
		)
		const [currentMonth, setCurrentMonth] = React.useState<Date>(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		)

		return (
			<Card className="mx-auto w-fit max-w-[300px]" size="sm">
				<CardContent>
					<Calendar
						className="p-0 [--cell-size:--spacing(9.5)]"
						fixedWeeks
						mode="single"
						month={currentMonth}
						onMonthChange={setCurrentMonth}
						onSelect={setDate}
						selected={date}
					/>
				</CardContent>
				<CardFooter className="flex flex-wrap gap-2 border-t">
					{[
						{ label: 'Today', value: 0 },
						{ label: 'Tomorrow', value: 1 },
						{ label: 'In 3 days', value: 3 },
						{ label: 'In a week', value: 7 },
						{ label: 'In 2 weeks', value: 14 }
					].map(preset => (
						<Button
							className="flex-1"
							key={preset.value}
							onClick={() => {
								const newDate = addDays(new Date(), preset.value)
								setDate(newDate)
								setCurrentMonth(
									new Date(newDate.getFullYear(), newDate.getMonth(), 1)
								)
							}}
							size="sm"
							variant="outline"
						>
							{preset.label}
						</Button>
					))}
				</CardFooter>
			</Card>
		)
	}
}

export const CustomDays: Story = {
	render: () => {
		const [range, setRange] = React.useState<DateRange | undefined>({
			from: new Date(new Date().getFullYear(), 11, 8),
			to: addDays(new Date(new Date().getFullYear(), 11, 8), 10)
		})

		return (
			<Card className="mx-auto w-fit p-0">
				<CardContent className="p-0">
					<Calendar
						captionLayout="dropdown"
						className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
						components={{
							DayButton: ({ children, modifiers, day, ...props }) => {
								const isWeekend =
									day.date.getDay() === 0 || day.date.getDay() === 6

								return (
									<CalendarDayButton day={day} modifiers={modifiers} {...props}>
										{children}
										{!modifiers.outside && (
											<span>{isWeekend ? '$120' : '$100'}</span>
										)}
									</CalendarDayButton>
								)
							}
						}}
						defaultMonth={range?.from}
						formatters={{
							formatMonthDropdown: date => {
								return date.toLocaleString('default', { month: 'long' })
							}
						}}
						mode="range"
						numberOfMonths={1}
						onSelect={setRange}
						selected={range}
					/>
				</CardContent>
			</Card>
		)
	}
}

export const DatePicker: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date>()

		return (
			<Field className="mx-auto w-72">
				<FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
				<Popover>
					<PopoverTrigger
						render={
							<Button
								className="justify-start px-2.5 font-normal"
								id="date-picker-simple"
								variant="outline"
							>
								<CalendarIcon data-icon="inline-start" />
								{date ? format(date, 'PPP') : <span>Pick a date</span>}
							</Button>
						}
					/>
					<PopoverContent align="start" className="w-auto p-0">
						<Calendar mode="single" onSelect={setDate} selected={date} />
					</PopoverContent>
				</Popover>
			</Field>
		)
	}
}

export const DatePickerWithDropdowns: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date>()
		const [open, setOpen] = React.useState(false)

		return (
			<Field className="mx-auto w-72">
				<Popover onOpenChange={setOpen} open={open}>
					<FieldLabel htmlFor="date-picker-with-dropdowns-desktop">
						Date
					</FieldLabel>
					<PopoverTrigger
						render={
							<Button
								className="justify-start px-2.5 font-normal"
								id="date-picker-with-dropdowns-desktop"
								variant="outline"
							>
								{date ? format(date, 'PPP') : <span>Pick a date</span>}
								<ChevronDownIcon className="ml-auto" data-icon="inline-start" />
							</Button>
						}
					/>
					<PopoverContent align="start" className="w-auto p-0">
						<Calendar
							captionLayout="dropdown"
							mode="single"
							onSelect={setDate}
							selected={date}
						/>
						<div className="flex gap-2 border-t p-2">
							<Button
								className="w-full"
								onClick={() => setOpen(false)}
								size="sm"
								variant="outline"
							>
								Done
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</Field>
		)
	}
}

export const DatePickerWithRange: Story = {
	render: () => {
		const [date, setDate] = React.useState<DateRange | undefined>({
			from: new Date(new Date().getFullYear(), 0, 20),
			to: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
		})

		return (
			<Field className="mx-auto w-72">
				<FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
				<Popover>
					<PopoverTrigger
						render={
							<Button
								className="justify-start px-2.5 font-normal"
								id="date-picker-range"
								variant="outline"
							>
								<CalendarIcon data-icon="inline-start" />
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, 'LLL dd, y')} -{' '}
											{format(date.to, 'LLL dd, y')}
										</>
									) : (
										format(date.from, 'LLL dd, y')
									)
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						}
					/>
					<PopoverContent align="start" className="w-auto p-0">
						<Calendar
							defaultMonth={date?.from}
							mode="range"
							numberOfMonths={2}
							onSelect={setDate}
							selected={date}
						/>
					</PopoverContent>
				</Popover>
			</Field>
		)
	}
}

export const InCard: Story = {
	render: () => (
		<Card className="mx-auto w-fit p-0">
			<CardContent className="p-0">
				<Calendar mode="single" />
			</CardContent>
		</Card>
	)
}

export const InPopover: Story = {
	decorators: [
		Story => (
			<div className="flex justify-center">
				<Story />
			</div>
		)
	],
	render: () => (
		<Popover>
			<PopoverTrigger
				render={
					<Button className="px-2.5 font-normal" variant="outline">
						<CalendarIcon data-icon="inline-start" />
						Open Calendar
					</Button>
				}
			/>
			<PopoverContent align="start" className="w-auto p-0">
				<Calendar mode="single" />
			</PopoverContent>
		</Popover>
	)
}
