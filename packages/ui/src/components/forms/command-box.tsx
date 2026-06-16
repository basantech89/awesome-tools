'use client'

import React from 'react'

import { Popover, PopoverContent } from '../primitives'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList
} from './command'

const CommandBoxContext = React.createContext<unknown>(null)

function useCommandBox() {
	const ctx = React.use(CommandBoxContext) as {
		open: boolean
		setOpen: (open: boolean) => void
	}

	if (!ctx) {
		throw new Error('useCommandBox must be used within a CommandBox.')
	}

	return ctx
}

function CommandBox(props: React.ComponentProps<typeof Popover>) {
	const [open, setOpen] = React.useState(false)

	const value = React.useMemo(() => ({ open, setOpen }), [open])

	return (
		<CommandBoxContext value={value}>
			<Popover onOpenChange={setOpen} open={open} {...props} />
		</CommandBoxContext>
	)
}

function CommandBoxContent({
	children,
	...props
}: React.ComponentProps<typeof PopoverContent>) {
	return (
		<PopoverContent {...props}>
			<Command>{children}</Command>
		</PopoverContent>
	)
}

function CommandBoxList({
	emptyMessage,
	items,
	...props
}: {
	emptyMessage: string
	items: ({
		id: string
		label: string | React.ReactNode
	} & React.ComponentProps<typeof CommandItem>)[]
} & React.ComponentProps<typeof CommandList>) {
	const { setOpen } = useCommandBox()

	return (
		<CommandList {...props}>
			<CommandEmpty>{emptyMessage}</CommandEmpty>
			<CommandGroup>
				{items.map(({ id, label, onSelect, ...rest }) => (
					<CommandItem
						key={id}
						onSelect={value => {
							onSelect?.(value)
							setOpen(false)
						}}
						{...rest}
					>
						{label}
					</CommandItem>
				))}
			</CommandGroup>
		</CommandList>
	)
}

export { CommandBox, CommandBoxContent, CommandBoxList }
