import {
	FieldError,
	FieldLabel,
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@awesome-tools/ui'
import { Eye, EyeClosed, InfoIcon } from 'lucide-react'
import React from 'react'

import { useField } from '#blocks/hooks/use-form'

import type { TextFieldProps } from './text-field'

const PasswordField = React.memo(function InnerPasswordField({
	label,
	showTooltip = false,
	children,
	...rest
}: TextFieldProps & { showTooltip?: boolean }) {
	const { errors, ...field } = useField(rest.name)
	const [passwordVisible, setPasswordVisible] = React.useState(false)

	const togglePasswordVisible = () => setPasswordVisible(!passwordVisible)

	return (
		<div className="group grid gap-3">
			<div className="flex gap-2">
				{label ? (
					<FieldLabel
						className="group-has-required:after:text-red-500 group-has-required:after:content-['*']"
						htmlFor={rest.id}
					>
						{label}
					</FieldLabel>
				) : (
					(children ?? null)
				)}
				{showTooltip && (
					<Tooltip>
						<TooltipTrigger
							render={
								<InputGroupButton
									aria-label="Info"
									size="icon-xs"
									variant="ghost"
								>
									<InfoIcon />
								</InputGroupButton>
							}
						/>
						<TooltipContent>
							<p>
								Your password must be at least 8 characters long and contain a
								mix of letters, numbers, and symbols.
							</p>
						</TooltipContent>
					</Tooltip>
				)}
			</div>

			<InputGroup>
				<InputGroupInput
					type={passwordVisible ? 'text' : 'password'}
					{...field}
					{...rest}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						aria-label="Toggle password visibility"
						onClick={togglePasswordVisible}
						size="icon-xs"
						title="Toggle password visibility"
					>
						{passwordVisible ? <EyeClosed /> : <Eye />}
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<FieldError errors={errors} />
		</div>
	)
})

export { PasswordField }
