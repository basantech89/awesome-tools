import { Field, FieldError, FieldLabel, Input } from '@awesome-tools/ui'
import React, { useId } from 'react'

import { useField } from '#blocks/hooks'
import { cn } from '#blocks/lib/utils'

export type TextFieldProps = React.ComponentProps<typeof Input> & {
	id?: string
	label?: string
	name: string
}

const TextField = React.memo(function InnerTextField({
	id,
	label,
	name,
	orientation,
	...rest
}: TextFieldProps & React.ComponentProps<typeof Field>) {
	const { errors, ...field } = useField(name)

	const generatedId = useId()
	id ??= generatedId

	return (
		<Field
			className={cn('group', label && 'grid gap-3')}
			orientation={orientation}
		>
			{label && (
				<FieldLabel
					className="group-has-required:after:text-red-500 group-has-required:after:content-['*']"
					htmlFor={id}
				>
					{label}
				</FieldLabel>
			)}
			<div className="peer flex flex-col gap-1">
				<Input id={id} {...rest} {...field} />
				<FieldError errors={errors} />
			</div>
		</Field>
	)
})

export { TextField }
