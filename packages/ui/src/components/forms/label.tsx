import type * as React from 'react'

import { cn } from '#ui/lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
	return (
		// oxlint-disable-next-line jsx-a11y/label-has-associated-control - label will be associated with a control via htmlFor prop
		<label
			className={cn(
				'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
				className
			)}
			data-slot="label"
			{...props}
		/>
	)
}

export { Label }
