import type React from 'react'

import { Button, Field, FieldGroup } from '@awesome-tools/ui'
import { type Dict, z } from '@awesome-tools/utils'

import type { FormValue, UseFormProps } from '#blocks/hooks/use-form'

import { FormBuilder, type FormBuilderChildren } from '#blocks/components'

import { PasswordField } from '../forms/password-field'
import { TextField } from '../forms/text-field'
import { AuthContent } from './auth'

const signupDataSchema: z.ZodObject<Dict<string, z.ZodType<FormValue>>> = z
	.object({
		firstName: z
			.string()
			.min(1, 'First name is required')
			.max(100, 'First name must be at most 100 characters long'),
		lastName: z
			.string()
			.min(1, 'Last name is required')
			.max(100, 'Last name must be at most 100 characters long'),
		email: z.email(),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.minLower(1, 'Password must contain at least 1 lowercase letter')
			.minNumber(1, 'Password must contain at least 1 number')
			.minSymbol(1, 'Password must contain at least 1 special character')
			.minUpper(1, 'Password must contain at least 1 uppercase letter')
			.meta({ dependOn: ['confirmPassword'] }),
		confirmPassword: z
			.string()
			.min(1, 'Passwords do not match')
			.meta({ dependOn: ['password'] })
	})
	.refine(
		values =>
			!values.password ||
			!values.confirmPassword ||
			values.password === values.confirmPassword,
		{
			message: 'Passwords do not match',
			path: ['password', 'confirmPassword']
		}
	)

const defaultSignupValues: Dict<string, FormValue> = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

function SignupContent<K extends string, V extends FormValue, T>(
	props: Omit<React.ComponentProps<typeof FieldGroup>, 'onError'> &
		Partial<Pick<UseFormProps<K, V, T>, 'action'>> & {
			children: FormBuilderChildren
		}
) {
	return (
		<AuthContent
			defaultValues={defaultSignupValues}
			schema={signupDataSchema}
			{...props}
		/>
	)
}

function SignupForm({
	children,
	...rest
}: React.ComponentProps<typeof FieldGroup>) {
	return (
		children ?? (
			<FieldGroup {...rest} className="gap-3">
				<Field className="grid grid-cols-2">
					<TextField
						id="firstName"
						label="First Name"
						name="firstName"
						placeholder="John"
						required
						type="text"
					/>
					<TextField
						id="lastName"
						label="Last Name"
						name="lastName"
						placeholder="Doe"
						required
						type="text"
					/>
				</Field>
				<TextField
					id="email"
					label="Email"
					name="email"
					placeholder="m@example.com"
					required
					type="email"
				/>
				<PasswordField
					id="password"
					label="Password"
					name="password"
					placeholder="Password"
					required
					showTooltip
				/>
				<PasswordField
					id="confirmPassword"
					label="Confirm Password"
					name="confirmPassword"
					placeholder="Confirm Password"
					required
					showTooltip
				/>
				<FormBuilder.Submit>
					<Button className="w-full">Sign Up</Button>
				</FormBuilder.Submit>
			</FieldGroup>
		)
	)
}

export { SignupContent, SignupForm }
