import { Loader2Icon } from 'lucide-react'

import { cn } from '#ui/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
	return (
		<Loader2Icon
			aria-label="Loading"
			className={cn('size-4 animate-spin', className)}
			// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
			role="status"
			{...props}
		/>
	)
}

export { Spinner }
