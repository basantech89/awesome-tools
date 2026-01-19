import type { Button } from '@awesome-tools/ui'
import React from 'react'

import {
	FormProvider,
	type FormValue,
	type UseFormProps,
	useForm,
	useFormContext,
} from '#blocks/hooks/use-form'

function FormBuilder<K extends string, V extends FormValue, T>({
	children,
	action,
	schema,
	defaultValues,
	onError,
	onSuccess,
	...rest
}: UseFormProps<K, V, T> & {
	children: React.ReactElement<React.ComponentProps<'form'>>
}) {
	const { contextValue, formAction } = useForm({
		action,
		schema,
		defaultValues,
		onError,
		onSuccess,
	})

	const child = React.cloneElement(children, {
		...rest,
		action: formAction,
	})

	return <FormProvider value={contextValue}>{child}</FormProvider>
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
		...rest,
	})
}

FormBuilder.Submit = Submit

export { FormBuilder }
