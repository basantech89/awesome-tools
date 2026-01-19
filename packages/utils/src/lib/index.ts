export const keys = <K extends string, V>(obj: Partial<Record<K, V>>) =>
	Object.keys(obj) as K[]

export const values = <K extends string, V>(obj: Partial<Record<K, V>>) =>
	Object.values(obj) as V[]

export const entries = <K extends string, V>(obj: Partial<Record<K, V>>) =>
	Object.entries(obj) as [K, V][]

export const uppercaseFirst = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1)

export * from './zod'
