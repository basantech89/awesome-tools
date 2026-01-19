import { type Dict, keys, values as objValues } from '@awesome-tools/utils'
import React, { useActionState } from 'react'
import type { z } from 'zod'

import type { StandardSchemaV1 } from '#blocks/types/standard-schema'

export type FormValue = string | number | readonly string[] | undefined

type Listener = () => void

const notify = (notifyListener: Listener) => {
	notifyListener()
}

function createFormStore<K extends string, V extends FormValue>(
	initialValues: Dict<K, V>,
	schema?: z.ZodObject<Dict<K, z.ZodType<V>>>,
) {
	const values = { ...initialValues }

	const errors: { [key in K]?: { message: string }[] } = {}

	const listeners = new Map<K, Set<Listener>>()
	const allListeners = new Set<Listener>()

	const fieldValues = keys(values).reduce(
		(acc, key) => {
			acc[key] = { value: values[key], errors: errors[key] }
			return acc
		},
		{} as { [key in K]: { value: V; errors?: { message: string }[] } },
	)

	const subscribe = (name: K, listener: Listener) => {
		let subscribers = listeners.get(name)

		if (!subscribers) {
			subscribers = new Set<Listener>()
			listeners.set(name, subscribers)
		}

		subscribers.add(listener)

		return () => {
			const subscribers = listeners.get(name)
			if (subscribers) {
				subscribers.delete(listener)
			}
		}
	}

	const subscribeAll = (listener: Listener) => {
		allListeners.add(listener)

		return () => {
			allListeners.delete(listener)
		}
	}

	const getValue = (name: K) => {
		const prev = fieldValues[name]
		const nextValue = values[name]
		const nextError = errors[name]

		const hasValueChanged = prev?.value !== nextValue
		let hasErrorsChanged = false

		if (prev?.errors?.length !== nextError?.length) {
			hasErrorsChanged = true
		} else {
			hasErrorsChanged = !!prev?.errors?.some?.((err, index) => {
				return err.message !== nextError?.[index]?.message
			})
		}

		if (!hasValueChanged && !hasErrorsChanged) {
			return prev
		}

		const next = { value: nextValue, errors: nextError }
		fieldValues[name] = next

		return next
	}

	const isFormValid = () => {
		const allFilled = objValues(values).every(Boolean)
		const noErrors = !objValues(errors).some(Boolean)

		return allFilled && noErrors
	}

	let cachedSnapshot = { values, errors, isValid: isFormValid() }

	const setValue = (name: K, value: V) => {
		if (values[name] === value) {
			return
		}

		values[name] = value

		// Recompute cached snapshot after value update
		cachedSnapshot = { values, errors, isValid: isFormValid() }

		const subscribers = listeners.get(name)
		if (subscribers) {
			// Notify field-level subscribers
			subscribers.forEach(notify)
		}

		// Notify form-level subscribers
		if (allListeners.size > 0) {
			allListeners.forEach(notify)
		}
	}

	const getValues = () => {
		// Return the cached snapshot to keep getServerSnapshot stable
		return cachedSnapshot
	}

	const notifyFields = (names: Set<K>) => {
		names.forEach(name => {
			const subscribers = listeners.get(name)
			if (subscribers) {
				subscribers.forEach(notify)
			}
		})
	}

	const validate = async (name: K) => {
		if (!schema) {
			return
		}

		let result = schema['~standard'].validate(values)
		if (result instanceof Promise) {
			result = await result
		}

		const fieldsToNotify = new Set<K>()

		const dependentFields: K[] = [name]

		let issues: StandardSchemaV1.Issue[] = []
		if (result.issues && result.issues.length > 0) {
			issues = result.issues.filter(issue => issue.path?.includes?.(name))

			const meta = schema.shape[name].meta()
			if (meta?.dependOn) {
				dependentFields.push(...(meta.dependOn as K[]))
			}

			if (issues.length > 0) {
				errors[name] = issues
			}
		}

		if (!result.issues?.length || !issues.length) {
			dependentFields.forEach(field => {
				delete errors[field]
			})
		}

		dependentFields.forEach(field => {
			fieldsToNotify.add(field)
		})

		// Recompute cached snapshot after validation updates
		cachedSnapshot = { values, errors, isValid: isFormValid() }

		notifyFields(fieldsToNotify)

		// Notify form-level subscribers
		if (allListeners.size > 0) {
			allListeners.forEach(notify)
		}
	}

	const resetForm = () => {
		keys(initialValues).forEach(key => {
			values[key] = initialValues[key]
			delete errors[key]
		})

		// Recompute cached snapshot after reset
		cachedSnapshot = { values, errors, isValid: true }

		// Notify all field-level subscribers
		keys(initialValues).forEach(key => {
			const subscribers = listeners.get(key)
			if (subscribers) {
				subscribers.forEach(notify)
			}
		})

		// Notify form-level subscribers
		if (allListeners.size > 0) {
			allListeners.forEach(notify)
		}
	}

	return {
		subscribe,
		subscribeAll,
		getValue,
		setValue,
		getValues,
		resetForm,
		validate,
		errors,
	}
}

// Context holds the store; consumers use useField to subscribe to a single key
const FormContext = React.createContext<unknown>(null)

export function FormProvider({
	children,
	value,
}: {
	children: React.ReactNode
	value: unknown
}) {
	return <FormContext value={value}>{children}</FormContext>
}

export function useFormContext<K extends string, V extends FormValue>() {
	const form = React.use(FormContext) as unknown as ReturnType<
		typeof createFormStore<K, V>
	> & {
		isValid: boolean
		isPending: boolean
		state: {
			success: boolean
			submitError: string
		}
	}

	if (!form) {
		throw new Error('useFormContext must be used within a StoreProvider')
	}

	return form
}

export function useField(name: string) {
	const form = useFormContext()

	const getValueSnapshot = React.useCallback(
		() => form.getValue(name),
		[name, form],
	)

	const { value, errors } = React.useSyncExternalStore(
		React.useCallback(cb => form.subscribe(name, cb), [name, form]),
		getValueSnapshot,
		getValueSnapshot,
	)

	const onChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			form.setValue(
				name,
				(event.target as EventTarget & { value: string }).value,
			)
		},
		[name, form],
	)

	const onBlur = React.useCallback(() => {
		form.validate(name)
	}, [name, form])

	return { name, value, onChange, onBlur, errors }
}

export type ActionResult<T> =
	| { success: false; error: string }
	| { success: true; data?: T }

export type ServerAction<T> = (
	formData: FormData,
) => Promise<void> | Promise<ActionResult<T>>

type FormState = {
	success: boolean
	submitError: string
}

export type UseFormProps<K extends string, V extends FormValue, T> = {
	defaultValues: Dict<K, V>
	schema?: z.ZodObject<Dict<K, z.ZodType<V>>, z.core.$strip>
	action: ServerAction<T>
	onSuccess?: (data: T) => unknown
	onError?: (error: string) => unknown
}

export function useForm<K extends string, V extends FormValue, T>({
	defaultValues,
	schema,
	action,
	onSuccess,
	onError,
}: UseFormProps<K, V, T>) {
	const formRef = React.useRef(createFormStore(defaultValues, schema))

	const initialFormState: FormState = {
		success: false,
		submitError: '',
	}

	const handleSubmit = async (
		state: Awaited<FormState>,
		formData: FormData,
	): Promise<FormState> => {
		try {
			const result = await action(formData)

			if (!result?.success) {
				const error = result?.error || 'Something went wrong. Please try again.'
				await onError?.(error)
				return {
					...state,
					submitError: error,
				}
			}

			await onSuccess?.(result.data as T)
			return {
				...state,
				success: true,
			}
		} catch (error) {
			return {
				...state,
				submitError:
					(error as Error)?.message ||
					'Something went wrong. Please try again.',
			}
		}
	}

	const [state, formAction, isPending] = useActionState(
		handleSubmit,
		initialFormState,
	)

	const getValuesSnapshot = React.useCallback(
		() => formRef.current.getValues(),
		[],
	)

	const subscribeValues = React.useCallback(
		(cb: Listener) => formRef.current.subscribeAll(cb),
		[],
	)

	const { values, errors, isValid } = React.useSyncExternalStore(
		subscribeValues,
		getValuesSnapshot,
		getValuesSnapshot,
	)

	const value = React.useMemo(
		() => ({
			...formRef.current,
			state,
			isPending,
			isValid,
		}),
		[isPending, state, isValid],
	)

	return {
		contextValue: value,
		values,
		errors,
		isValid,
		isPending,
		formAction,
		resetForm: formRef.current.resetForm,
		state,
	}
}
