import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { cn, tv, type VariantProps } from '@/lib/utils'

const buttonVariants = tv({
	base: "group/button inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-clip-padding font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/80',
			outline:
				'border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
			secondary:
				'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
			ghost:
				'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
			destructive:
				'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 dark:hover:bg-destructive/30',
			link: 'text-primary underline-offset-4 hover:underline',
		},
		size: {
			default:
				'bs-9 gap-1.5 in-data-[slot=button-group]:rounded-md px-2.5 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2',
			xs: "bs-6 gap-1 in-data-[slot=button-group]:rounded-md rounded-[min(var(--radius-md),8px)] px-2 text-xs has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&_svg:not([class*='size-'])]:size-rem-3",
			sm: 'bs-8 gap-1 in-data-[slot=button-group]:rounded-md rounded-[min(var(--radius-md),10px)] px-2.5 has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5',
			lg: 'bs-10 gap-1.5 px-2.5 has-data-[icon=inline-start]:ps-3 has-data-[icon=inline-end]:pe-3',
			icon: 'size-rem-9',
			'icon-xs':
				"size-rem-6 in-data-[slot=button-group]:rounded-md rounded-[min(var(--radius-md),8px)] [&_svg:not([class*='size-'])]:size-rem-3",
			'icon-sm':
				'size-rem-8 in-data-[slot=button-group]:rounded-md rounded-[min(var(--radius-md),10px)]',
			'icon-lg': 'size-rem-10',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
})

export type ButtonVariants = VariantProps<typeof buttonVariants>

function Button({
	className,
	variant = 'default',
	size = 'default',
	...props
}: ButtonPrimitive.Props & ButtonVariants) {
	return (
		<ButtonPrimitive
			className={cn(buttonVariants({ variant, size }), className)}
			data-size={size}
			data-slot="button"
			data-variant={variant}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
