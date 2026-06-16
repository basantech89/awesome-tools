import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '#ui/lib/utils'

const badgeVariants = tv({
	base: 'group/badge focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!',
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
			secondary:
				'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
			destructive:
				'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
			outline:
				'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
			ghost:
				'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
			link: 'text-primary underline-offset-4 hover:underline'
		},
		indicator: {
			outset:
				'absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 -translate-y-1/2 rounded-full p-0 px-0.5 empty:h-2.5 empty:min-w-2.5',
			inset:
				'absolute top-1.75 right-1 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-slate-500 p-0 empty:h-2.5 empty:min-w-2.5'
		}
	},
	defaultVariants: {
		variant: 'default',
		indicator: undefined
	}
})

function Badge({
	className,
	variant = 'default',
	indicator,
	render,
	...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: 'span',
		props: mergeProps<'span'>(
			{
				className: cn(badgeVariants({ className, variant, indicator }))
			},
			props
		),
		render,
		state: {
			slot: 'badge',
			variant,
			indicator
		}
	})
}

export { Badge, badgeVariants }
