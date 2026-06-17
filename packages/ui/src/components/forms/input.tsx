import type * as React from 'react'

import { Input as InputPrimitive } from '@base-ui/react/input'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '#ui/lib/utils'

const inputVariants = tv({
	base: 'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 field-sizing-content w-full min-w-[7ch] rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px] md:text-sm',
	variants: {
		size: {
			default: 'h-9',
			xs: 'h-6',
			sm: 'h-8',
			lg: 'h-10'
		}
	},
	defaultVariants: {
		size: 'sm'
	}
})

function Input({
	className,
	type,
	size,
	...props
}: React.ComponentProps<typeof InputPrimitive> &
	VariantProps<typeof inputVariants>) {
	return (
		<InputPrimitive
			className={cn(inputVariants({ size }), className)}
			data-slot="input"
			type={type}
			{...props}
		/>
	)
}

export { Input }
