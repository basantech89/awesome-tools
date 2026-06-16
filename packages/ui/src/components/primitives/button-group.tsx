import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { tv, type VariantProps } from 'tailwind-variants'

import { Separator } from '#ui'
import { cn } from '#ui/lib/utils'

const buttonGroupVariants = tv({
	base: "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	variants: {
		orientation: {
			horizontal:
				'*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0',
			vertical:
				'flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0'
		},
		size: {
			default: 'h-9 *:h-9',
			xs: 'h-6 *:h-6',
			sm: 'h-8 *:h-8',
			lg: 'h-10 *:h-10'
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'sm'
	}
})

function ButtonGroup({
	className,
	orientation,
	size,
	...props
}: React.ComponentProps<'fieldset'> &
	VariantProps<typeof buttonGroupVariants>) {
	return (
		<fieldset
			className={cn(buttonGroupVariants({ orientation, size }), className)}
			data-orientation={orientation}
			data-size={size}
			data-slot="button-group"
			{...props}
		/>
	)
}

function ButtonGroupText({
	className,
	render,
	...props
}: useRender.ComponentProps<'div'>) {
	return useRender({
		defaultTagName: 'div',
		props: mergeProps<'div'>(
			{
				className: cn(
					"bg-muted flex items-center gap-2 rounded-md border px-2.5 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
					className
				)
			},
			props
		),
		render,
		state: {
			slot: 'button-group-text'
		}
	})
}

function ButtonGroupSeparator({
	className,
	orientation = 'vertical',
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			className={cn(
				'bg-input relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto',
				className
			)}
			data-slot="button-group-separator"
			orientation={orientation}
			{...props}
		/>
	)
}

export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	buttonGroupVariants
}
