import { Select as SelectPrimitive } from '@base-ui/react/select'
import type * as React from 'react'

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '../icons'
import { cn } from '@/lib/utils'

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
	return (
		<SelectPrimitive.Group
			className={cn('scroll-my-1 p-1', className)}
			data-slot="select-group"
			{...props}
		/>
	)
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
	return (
		<SelectPrimitive.Value
			className={cn('flex flex-1 text-left', className)}
			data-slot="select-value"
			{...props}
		/>
	)
}

function SelectTrigger({
	className,
	size = 'default',
	children,
	...props
}: SelectPrimitive.Trigger.Props & {
	size?: 'sm' | 'default'
}) {
	return (
		<SelectPrimitive.Trigger
			className={cn(
				"is-fit data-[size=default]:bs-9 data-[size=sm]:bs-8 flex items-center justify-between gap-1.5 whitespace-nowrap rounded-md border border-input bg-transparent py-2 ps-2.5 pe-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			data-size={size}
			data-slot="select-trigger"
			{...props}
		>
			{children}
			<SelectPrimitive.Icon
				render={
					<ChevronDownIcon className="pointer-events-none size-rem-4 text-muted-foreground" />
				}
			/>
		</SelectPrimitive.Trigger>
	)
}

function SelectContent({
	className,
	children,
	side,
	sideOffset = 5,
	align,
	alignOffset,
	alignItemWithTrigger = true,
	...props
}: SelectPrimitive.Popup.Props &
	Pick<
		SelectPrimitive.Positioner.Props,
		'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
	>) {
	return (
		<SelectPrimitive.Portal data-slot="select-portal">
			<SelectPrimitive.Backdrop data-slot="select-backdrop" />
			<SelectPrimitive.Positioner
				align={align}
				alignItemWithTrigger={alignItemWithTrigger}
				alignOffset={alignOffset}
				className="isolate z-50"
				data-slot="select-positioner"
				side={side}
				sideOffset={sideOffset}
			>
				<SelectPrimitive.Popup
					className={cn(
						'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-is-36 overflow-inline-hidden overflow-block-auto relative isolate z-50 origin-(--transform-origin) rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in',
						// 'max-bs-(--available-height) is-(--anchor-width)',
						className,
					)}
					data-slot="select-popup"
					{...props}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.List>{children}</SelectPrimitive.List>
					<SelectScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	)
}

function SelectLabel({
	className,
	...props
}: SelectPrimitive.GroupLabel.Props) {
	return (
		<SelectPrimitive.GroupLabel
			className={cn('px-2 py-1.5 text-muted-foreground text-xs', className)}
			data-slot="select-label"
			{...props}
		/>
	)
}

function SelectItem({
	className,
	children,
	...props
}: SelectPrimitive.Item.Props) {
	return (
		<SelectPrimitive.Item
			className={cn(
				"is-full relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 ps-2 pe-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className,
			)}
			data-slot="select-item"
			{...props}
		>
			<SelectPrimitive.ItemText
				className="flex flex-1 shrink-0 gap-2 whitespace-nowrap"
				data-slot="select-item-text"
			>
				{children}
			</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator
				data-slot="select-item-indicator"
				render={
					<span className="pointer-events-none absolute right-2 flex size-rem-4 items-center justify-center" />
				}
			>
				<CheckIcon className="pointer-events-none" />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	)
}

function SelectSeparator({
	className,
	...props
}: SelectPrimitive.Separator.Props) {
	return (
		<SelectPrimitive.Separator
			className={cn(
				'-mx-1 bs-px pointer-events-none my-1 bg-border',
				className,
			)}
			data-slot="select-separator"
			{...props}
		/>
	)
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
	return (
		<SelectPrimitive.ScrollUpArrow
			className={cn(
				"is-full top-0 z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-rem-4",
				className,
			)}
			data-slot="select-scroll-up-button"
			{...props}
		>
			<ChevronUpIcon />
		</SelectPrimitive.ScrollUpArrow>
	)
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
	return (
		<SelectPrimitive.ScrollDownArrow
			className={cn(
				"is-full bottom-0 z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-rem-4",
				className,
			)}
			data-slot="select-scroll-down-button"
			{...props}
		>
			<ChevronDownIcon />
		</SelectPrimitive.ScrollDownArrow>
	)
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
}
