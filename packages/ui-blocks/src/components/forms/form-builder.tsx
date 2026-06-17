'use client'

import type { Button } from '@awesome-tools/ui'

import React from 'react'

import {
	FormProvider,
	type FormValue,
	type UseFormProps,
	useForm,
	useFormContext
} from '#blocks/hooks/use-form'

export type FormBuilderChildren = React.ReactElement<
	Omit<React.ComponentProps<'form'>, 'action'> & {
		action?: Exclude<React.ComponentProps<'form'>['action'], string | undefined>
	}
>

export type FormBuilderProps<
	K extends string,
	V extends FormValue,
	T
> = Partial<Pick<UseFormProps<K, V, T>, 'action'>> &
	Omit<UseFormProps<K, V, T>, 'action'> & {
		children: FormBuilderChildren
	}

function FormBuilder<K extends string, V extends FormValue, T>({
	children,
	action,
	schema,
	defaultValues,
	onError,
	onSuccess,
	...rest
}: FormBuilderProps<K, V, T>) {
	const child = React.Children.only(children)

	const givenAction = action ?? child.props.action
	if (!givenAction) {
		throw new Error(
			'SigninContent/SignupContent/AuthContent or its child requires an action prop.'
		)
	}

	const { contextValue, formAction } = useForm({
		action: givenAction,
		schema,
		defaultValues,
		onError,
		onSuccess
	})

	const clonedChild = React.cloneElement(children, {
		...rest,
		action: formAction
	})

	return <FormProvider value={contextValue}>{clonedChild}</FormProvider>
}

function Submit({
	children,
	...rest
}: React.ComponentProps<'button'> & {
	children: React.ReactElement<React.ComponentProps<typeof Button>>
}) {
	const { isValid, isPending } = useFormContext()

	return React.cloneElement(children, {
		type: 'submit',
		disabled: !isValid || isPending,
		...rest
	})
}

FormBuilder.Submit = Submit

export { FormBuilder }
