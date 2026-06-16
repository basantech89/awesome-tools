import { Button, Checkbox } from '@awesome-tools/ui'
import React from 'react'

import { cn } from '#blocks/lib/utils'

export default function IndeterminateCheckbox({
	indeterminate,
	className,
	onStateChange,
	rowNumber,
	...rest
}: {
	indeterminate?: boolean
	onStateChange: (event: unknown) => void
	rowNumber?: number
} & React.ComponentProps<typeof Checkbox>) {
	const ref = React.useRef<HTMLInputElement | null>(null)

	React.useEffect(() => {
		if (typeof indeterminate === 'boolean' && ref.current) {
			ref.current.indeterminate = !rest.checked && indeterminate
		}
	}, [indeterminate, rest.checked])

	const onCheckedChange = (checked: boolean) => {
		const event = { target: { checked } }
		onStateChange(event)
	}

	if (!rowNumber) {
		return (
			<div className="flex justify-center">
				<Checkbox
					className={cn('cursor-pointer', className)}
					indeterminate={indeterminate}
					onCheckedChange={onCheckedChange}
					ref={ref}
					{...rest}
				/>
			</div>
		)
	}

	return (
		<div className="group relative flex items-center justify-center">
			<Button
				className={cn(
					'text-muted-foreground text-xs opacity-100 transition-opacity group-hover:opacity-0 group-has-checked:opacity-0'
				)}
				size="xs"
				variant="ghost"
			>
				{rowNumber}
			</Button>
			<Checkbox
				className={cn(
					'absolute cursor-pointer group-hover:opacity-100 data-checked:opacity-100 data-unchecked:opacity-0',
					className
				)}
				indeterminate={indeterminate}
				onCheckedChange={onCheckedChange}
				ref={ref}
				{...rest}
			/>
		</div>
	)
}
