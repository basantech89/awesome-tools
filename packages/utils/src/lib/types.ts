type DeepRequired<T> = T extends Array<infer U>
	? Array<DeepRequired<U>>
	: T extends object
		? { [K in keyof T]-?: DeepRequired<T[K]> }
		: T

export type DeepRequireKeys<T extends object, K extends keyof T> = Omit<
	T,
	K
> & {
	[P in K]-?: DeepRequired<NonNullable<T[P]>>
}
