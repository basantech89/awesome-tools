export type AuthProvider = 'google' | 'meta' | 'apple' | 'github'

export type Provider = {
	name: AuthProvider
	icon?: React.ReactNode
	action: () => void | Promise<void>
}
