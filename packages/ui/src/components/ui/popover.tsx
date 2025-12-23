import { Popover as PopoverPrimitive } from '@base-ui/react/popover'

import { ArrowIcon } from '../icons'
import { cn } from '@/lib/utils'

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
	className,
	children,
	align,
	side,
	alignOffset,
	sideOffset = 8,
	...props
}: PopoverPrimitive.Popup.Props &
	Pick<
		PopoverPrimitive.Positioner.Props,
		'align' | 'side' | 'sideOffset' | 'alignOffset'
	>) {
	return (
		<PopoverPrimitive.Portal data-slot="popover-portal">
			<PopoverPrimitive.Backdrop data-slot="popover-backdrop" />
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				className={cn('isolate z-50 outline-none', className)}
				data-slot="popover-positioner"
				side={side}
				sideOffset={sideOffset}
			>
				<PopoverPrimitive.Popup
					className={cn(
						'dark:-outline-offset-1 bg-[canvas] shadow-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-starting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:shadow-none dark:outline-gray-300',
						'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-md p-4 text-popover-foreground shadow-md outline outline-gray-200 data-closed:animate-out data-open:animate-in',
						className,
					)}
					data-slot="popover-popup"
					{...props}
				>
					<PopoverAnchor />
					<PopoverPrimitive.Viewport data-slot="popover-viewport">
						{children}
						<PopoverPrimitive.Close data-slot="popover-close" />
					</PopoverPrimitive.Viewport>
				</PopoverPrimitive.Popup>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	)
}

function PopoverAnchor({ ...props }: PopoverPrimitive.Arrow.Props) {
	return (
		<PopoverPrimitive.Arrow
			className="data-[side=right]:-rotate-90 data-[side=bottom]:-top-2 data-[side=left]:-right-3.25 data-[side=top]:-bottom-2 data-[side=right]:-left-3.25 data-[side=left]:rotate-90 data-[side=top]:rotate-180"
			data-slot="popover-anchor"
			{...props}
		>
			<ArrowIcon />
		</PopoverPrimitive.Arrow>
	)
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
