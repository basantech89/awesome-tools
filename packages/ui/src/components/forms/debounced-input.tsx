import React from 'react'

import { Input } from '.'

export function DebouncedInput<
	T extends React.ComponentProps<typeof Input>['value']
>({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: T
	onChange: (value: T) => void
	debounce?: number
} & Omit<React.ComponentProps<typeof Input>, 'onChange'>) {
	const [value, setValue] = React.useState<T>(initialValue)
	const prevValueRef = React.useRef<T>(value)

	React.useEffect(() => {
		if (Object.is(prevValueRef.current, value)) {
			return
		}

		let timeout: NodeJS.Timeout | null = null

		if (timeout) {
			clearTimeout(timeout)
		}

		timeout = setTimeout(() => {
			onChange(value)
			prevValueRef.current = value
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value, debounce, onChange])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setValue(e.target.value as T)

	return (
		<Input
			{...props}
			data-slot="debounced-input"
			onChange={handleChange}
			value={value}
		/>
	)
}
