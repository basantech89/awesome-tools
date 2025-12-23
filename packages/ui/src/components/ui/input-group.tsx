import type * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn, tv, type VariantProps } from '@/lib/utils'

/** Container component for grouping input elements */
function InputGroup({ className, ...props }: React.ComponentProps<'fieldset'>) {
	return (
		<fieldset
			className={cn(
				'group/input-group is-full relative flex items-center rounded-md border border-input shadow-xs outline-none transition-[color,box-shadow] dark:bg-input/30',
				'min-is-0 bs-9 has-[>textarea]:bs-auto',

				// Variants based on alignment.
				'has-[>[data-align=inline-start]]:[&>input]:ps-2',
				'has-[>[data-align=inline-end]]:[&>input]:pe-2',
				'has-[>[data-align=block-start]]:bs-auto has-[>[data-align=block-start]]:[&>input]:pbe-3 has-[>[data-align=block-start]]:flex-col',
				'has-[>[data-align=block-end]]:bs-auto has-[>[data-align=block-end]]:[&>input]:pbs-3 has-[>[data-align=block-end]]:flex-col',

				// Focus state.
				'has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50',

				// Error state.
				'has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',

				className,
			)}
			data-slot="input-group"
			{...props}
		/>
	)
}

const inputGroupAddonVariants = tv({
	base: "bs-auto flex cursor-text select-none items-center justify-center gap-2 font-medium text-muted-foreground text-sm group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-rem-4",
	variants: {
		align: {
			'inline-start':
				'order-first ps-3 has-[>button]:ms-[-0.45rem] has-[>kbd]:ms-[-0.35rem]',
			'inline-end':
				'order-last pe-3 has-[>button]:me-[-0.45rem] has-[>kbd]:me-[-0.35rem]',
			'block-start':
				'is-full pbs-3 [.border-b]:pbe-3 group-has-[>input]/input-group:pbs-2.5 order-first justify-start px-3',
			'block-end':
				'is-full pbe-3 [.border-t]:pbs-3 group-has-[>input]/input-group:pbe-2.5 order-last justify-start px-3',
		},
	},
	defaultVariants: {
		align: 'inline-start',
	},
})

function InputGroupAddon({
	className,
	align = 'inline-start',
	...props
}: React.ComponentProps<'fieldset'> &
	VariantProps<typeof inputGroupAddonVariants>) {
	const focusOnParent = (
		e:
			| React.MouseEvent<HTMLFieldSetElement>
			| React.KeyboardEvent<HTMLFieldSetElement>,
	) => {
		if (e.target instanceof HTMLElement && e.target.closest('button')) {
			return
		}

		e.currentTarget.parentElement?.querySelector('input')?.focus()
	}

	return (
		<fieldset
			className={cn(inputGroupAddonVariants({ align }), className)}
			data-align={align}
			data-slot="input-group-addon"
			onClick={focusOnParent}
			onKeyDown={focusOnParent}
			{...props}
		/>
	)
}

const inputGroupButtonVariants = tv({
	base: 'flex items-center gap-2 text-sm shadow-none',
	variants: {
		size: {
			xs: "bs-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-rem-3.5",
			sm: 'bs-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5',
			'icon-xs':
				'size-rem-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
			'icon-sm': 'size-rem-8 p-0 has-[>svg]:p-0',
		},
	},
	defaultVariants: {
		size: 'xs',
	},
})

function InputGroupButton({
	className,
	variant = 'ghost',
	size = 'xs',
	...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
	VariantProps<typeof inputGroupButtonVariants>) {
	return (
		<Button
			className={cn(inputGroupButtonVariants({ size }), className)}
			data-size={size}
			variant={variant}
			{...props}
		/>
	)
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			className={cn(
				"flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	)
}

function InputGroupInput({
	className,
	...props
}: React.ComponentProps<'input'>) {
	return (
		<Input
			className={cn(
				'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
				className,
			)}
			data-slot="input-group-control"
			{...props}
		/>
	)
}

function InputGroupTextarea({
	className,
	...props
}: React.ComponentProps<'textarea'>) {
	return (
		<Textarea
			className={cn(
				'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent',
				className,
			)}
			data-slot="input-group-control"
			{...props}
		/>
	)
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupInput,
	InputGroupTextarea,
}
