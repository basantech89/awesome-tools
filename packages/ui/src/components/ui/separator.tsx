import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'

import { cn } from '@/lib/utils'

function Separator({
	className,
	orientation = 'horizontal',
	...props
}: SeparatorPrimitive.Props) {
	return (
		<SeparatorPrimitive
			className={cn(
				'data-[orientation=horizontal]:bs-px data-[orientation=horizontal]:is-full data-[orientation=vertical]:is-px shrink-0 bg-border data-[orientation=vertical]:self-stretch',
				className,
			)}
			data-slot="separator"
			orientation={orientation}
			{...props}
		/>
	)
}

export { Separator }
