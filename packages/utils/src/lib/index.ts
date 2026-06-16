export const callAll =
	<T extends unknown[]>(
		...fns: Array<((...args: T) => void) | undefined | null | false>
	) =>
	(...args: T) => {
		fns.forEach(fn => {
			if (typeof fn === 'function') {
				fn(...args)
			}
		})
	}

export const keys = <K extends string, V>(obj: Partial<Record<K, V>>) =>
	Object.keys(obj) as K[]

export const values = <K extends string, V>(obj: Partial<Record<K, V>>) =>
	Object.values(obj) as V[]

export const entries = <K extends string, V>(obj: Partial<Record<K, V>>) =>
	Object.entries(obj) as [K, V][]

export function hasOwn<T extends object, K extends PropertyKey>(
	obj: T,
	key: K
): obj is T & Record<K, unknown> {
	return Object.hasOwn(obj, key)
}

function clearAndUpper(text: string) {
	return text.replace(/-/, '').toUpperCase()
}

export const toPascalCase = (str: string) =>
	str
		.replace(/(^\w|-\w)/g, clearAndUpper)
		.replace(/\s+/g, '')
		.replace(/_/g, '')

export function pick<T extends object, K extends keyof T>(
	obj: T,
	keys: K[]
): Pick<T, K> {
	const newObj = {} as Pick<T, K>

	for (const key of keys) {
		if (key in obj) {
			newObj[key] = obj[key]
		}
	}
	return newObj
}

export function omit<T extends object, K extends keyof T>(
	obj: T,
	keys: K[]
): Omit<T, K> {
	const newObj: Partial<T> = { ...obj }

	for (const key of keys) {
		delete newObj[key]
	}

	return newObj as Omit<T, K>
}

export * from './zod'
