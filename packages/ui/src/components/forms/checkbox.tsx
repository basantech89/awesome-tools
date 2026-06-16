import {
	Checkbox as CheckboxPrimitive,
	type CheckboxRootChangeEventDetails
} from '@base-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import React from 'react'

import { cn } from '#ui/lib/utils'

function Checkbox({
	className,
	...props
}: CheckboxPrimitive.Root.Props & { ref?: React.Ref<HTMLInputElement> }) {
	return (
		<CheckboxPrimitive.Root
			className={cn(
				'peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:bg-input/30 dark:data-checked:bg-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px]',
				className
			)}
			data-slot="checkbox"
			{...props}
		>
			<CheckboxPrimitive.Indicator
				className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
				data-slot="checkbox-indicator"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox, type CheckboxRootChangeEventDetails }
