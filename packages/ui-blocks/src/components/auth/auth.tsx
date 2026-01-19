import {
	Button,
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	cn,
	Field,
	type FieldGroup,
	FieldSeparator,
} from '@awesome-tools/ui'
import type React from 'react'

import { icons } from './icons'
import { FormBuilder } from '#blocks/components'
import type { FormValue, UseFormProps } from '#blocks/hooks/use-form'
import type { Provider } from '#blocks/types'

function Auth({ className, ...props }: React.ComponentProps<typeof Card>) {
	return (
		<Card className={cn('mx-auto w-full max-w-sm', className)} {...props} />
	)
}

function AuthHeader({
	children,
	className,
	...props
}: React.ComponentProps<typeof CardHeader>) {
	return (
		<CardHeader
			{...props}
			className={cn('justify-items-center-safe *:text-center', className)}
		>
			{children}
		</CardHeader>
	)
}

function AuthFooter({
	className,
	...props
}: React.ComponentProps<typeof CardFooter>) {
	return <CardFooter {...props} className={cn('justify-center', className)} />
}

function AuthAction({
	children,
	className,
	providers = [],
	...rest
}: React.ComponentProps<typeof CardFooter> & {
	providers?: Provider[]
}) {
	return (
		children ?? (
			<CardAction
				className={cn(
					'flex w-full flex-col gap-8 px-6',
					{ hidden: !providers.length },
					className,
				)}
				{...rest}
			>
				<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
					Or continue with
				</FieldSeparator>
				<Field className="flex flex-row flex-wrap [&>button]:w-fit">
					{providers.map(provider => (
						<Button
							className="min-w-20 flex-1"
							key={provider.name}
							type="button"
							variant="outline"
						>
							{provider.icon ?? icons[provider.name]}
						</Button>
					))}
				</Field>
			</CardAction>
		)
	)
}

function AuthContent<K extends string, V extends FormValue, T>({
	className,
	...props
}: React.ComponentProps<typeof FieldGroup> &
	UseFormProps<K, V, T> & {
		children: React.ReactElement<React.ComponentProps<'form'>>
	}) {
	return (
		<CardContent className={className}>
			<FormBuilder {...props} />
		</CardContent>
	)
}

export { Auth, AuthHeader, AuthFooter, AuthAction, AuthContent }
