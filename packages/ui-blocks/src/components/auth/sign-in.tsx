import type React from 'react'

import { Button, FieldGroup, FieldLabel } from '@awesome-tools/ui'
import { type Dict, z } from '@awesome-tools/utils'

import type { FormValue, UseFormProps } from '#blocks/hooks'

import {
	AuthContent,
	FormBuilder,
	type FormBuilderChildren,
	PasswordField,
	TextField
} from '#blocks/components'

const signinDataSchema: z.ZodObject<Dict<string, z.ZodType<FormValue>>> =
	z.object({
		email: z.email(),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.minLower(1, 'Password must contain at least 1 lowercase letter')
			.minNumber(1, 'Password must contain at least 1 number')
			.minSymbol(1, 'Password must contain at least 1 special character')
			.minUpper(1, 'Password must contain at least 1 uppercase letter')
	})

const defaultSigninValues: Dict<string, FormValue> = {
	email: '',
	password: ''
}

function SigninContent<K extends string, V extends FormValue, T>(
	props: Omit<React.ComponentProps<typeof FieldGroup>, 'onError'> &
		Partial<Pick<UseFormProps<K, V, T>, 'action'>> & {
			children: FormBuilderChildren
		}
) {
	return (
		<AuthContent
			defaultValues={defaultSigninValues}
			schema={signinDataSchema}
			{...props}
		/>
	)
}

function SigninForm({
	children,
	forgotPassword,
	...rest
}: React.ComponentProps<typeof FieldGroup> & {
	forgotPassword?: React.ReactNode
}) {
	return (
		children ?? (
			<FieldGroup {...rest} className="gap-3">
				<TextField
					label="Email"
					name="email"
					placeholder="john@example.com"
					required
					type="email"
				/>
				<div className="grid gap-3">
					<PasswordField
						id="password"
						name="password"
						placeholder="Password"
						required
					>
						<FieldLabel
							className="group-has-required:after:text-red-500 group-has-required:after:content-['*']"
							htmlFor="password"
						>
							Password
						</FieldLabel>
						{forgotPassword}
					</PasswordField>
				</div>
				<FormBuilder.Submit>
					<Button className="w-full">Login</Button>
				</FormBuilder.Submit>
			</FieldGroup>
		)
	)
}

export { SigninContent, SigninForm }
