'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import type * as React from 'react'

import { cn } from '@/lib/utils'

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
	return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
	return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
	return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
	align = 'start',
	alignOffset = 0,
	side = 'bottom',
	sideOffset = 4,
	className,
	...props
}: MenuPrimitive.Popup.Props &
	Pick<
		MenuPrimitive.Positioner.Props,
		'align' | 'alignOffset' | 'side' | 'sideOffset'
	>) {
	return (
		<DropdownMenuPortal>
			<MenuPrimitive.Backdrop data-slot="dropdown-menu-backdrop" />
			<MenuPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				className="isolate z-50 outline-none"
				data-slot="dropdown-menu-positioner"
				side={side}
				sideOffset={sideOffset}
			>
				<MenuPrimitive.Popup
					className={cn(
						'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-bs-(--available-height) is-(--anchor-width) min-is-32 overflow-inline-hidden overflow-block-auto z-50 origin-(--transform-origin) rounded-md bg-popover p-1 text-popover-foreground shadow-md outline-none ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in data-closed:overflow-hidden',
						className,
					)}
					data-slot="dropdown-menu-popup"
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</DropdownMenuPortal>
	)
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
	return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
	className,
	inset,
	...props
}: MenuPrimitive.GroupLabel.Props & {
	inset?: boolean
}) {
	return (
		<MenuPrimitive.GroupLabel
			className={cn(
				'px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-8',
				className,
			)}
			data-inset={inset}
			data-slot="dropdown-menu-label"
			{...props}
		/>
	)
}

function DropdownMenuItem({
	className,
	inset,
	variant = 'default',
	...props
}: MenuPrimitive.Item.Props & {
	inset?: boolean
	variant?: 'default' | 'destructive'
}) {
	return (
		<MenuPrimitive.Item
			className={cn(
				"group/dropdown-menu-item relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive",
				className,
			)}
			data-inset={inset}
			data-slot="dropdown-menu-item"
			data-variant={variant}
			{...props}
		/>
	)
}

function DropdownSubMenu({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
	return <MenuPrimitive.SubmenuRoot data-slot="dropdown-sub-menu" {...props} />
}

function DropdownSubMenuTrigger({
	className,
	inset,
	children,
	...props
}: MenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean
}) {
	return (
		<MenuPrimitive.SubmenuTrigger
			className={cn(
				"flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-open:bg-accent data-inset:ps-8 data-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			data-inset={inset}
			data-slot="dropdown-sub-menu-trigger"
			{...props}
		>
			{children}
			<ChevronRightIcon className="ms-auto" />
		</MenuPrimitive.SubmenuTrigger>
	)
}

function DropdownSubMenuContent({
	align = 'start',
	alignOffset = -3,
	side = 'right',
	sideOffset = 0,
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
	return (
		<DropdownMenuContent
			align={align}
			alignOffset={alignOffset}
			className={cn(
				'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 is-auto min-is-24 rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in',
				className,
			)}
			data-slot="dropdown-sub-menu-popup"
			side={side}
			sideOffset={sideOffset}
			{...props}
		/>
	)
}

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: MenuPrimitive.CheckboxItem.Props) {
	return (
		<MenuPrimitive.CheckboxItem
			checked={checked}
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 ps-2 pe-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			data-slot="dropdown-menu-checkbox-item"
			{...props}
		>
			<span
				className="pointer-events-none absolute right-2 flex items-center justify-center"
				data-slot="dropdown-menu-checkbox-item-indicator"
			>
				<MenuPrimitive.CheckboxItemIndicator data-slot="dropdown-menu-checkbox-item-indicator">
					<CheckIcon />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	)
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
	return (
		<MenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	)
}

function DropdownMenuRadioItem({
	className,
	children,
	...props
}: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 ps-2 pe-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			data-slot="dropdown-menu-radio-item"
			{...props}
		>
			<span
				className="pointer-events-none absolute right-2 flex items-center justify-center"
				data-slot="dropdown-menu-radio-item-indicator"
			>
				<MenuPrimitive.RadioItemIndicator data-slot="dropdown-menu-radio-item-indicator">
					<CheckIcon />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	)
}

function DropdownMenuSeparator({
	className,
	...props
}: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			className={cn('-mx-1 bs-px my-1 bg-border', className)}
			data-slot="dropdown-menu-separator"
			{...props}
		/>
	)
}

function DropdownMenuShortcut({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			className={cn(
				'ms-auto text-muted-foreground text-xs tracking-widest group-focus/dropdown-menu-item:text-accent-foreground',
				className,
			)}
			data-slot="dropdown-menu-shortcut"
			{...props}
		/>
	)
}

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownSubMenu,
	DropdownSubMenuTrigger,
	DropdownSubMenuContent,
}
