import { ZodString, z } from 'zod/v4'

const regex = {
	minUpper: (min: number) => new RegExp(`^(?=.*[A-Z]).{${min},}$`),
	minLower: (min: number) => new RegExp(`^(?=.*[a-z]).{${min},}$`),
	minNumber: (min: number) => new RegExp(`^(?=.*[0-9]).{${min},}$`),
	minSymbol: (min: number) => new RegExp(`^(?=.*[^A-Za-z0-9]).{${min},}$`)
}

ZodString.prototype.minUpper = function (
	this: ZodString,
	min: number,
	message: string = `Must contain at least ${min} uppercase letter(s)`
) {
	return this.regex(regex.minUpper(min), message)
}

ZodString.prototype.minLower = function (
	this: ZodString,
	min: number,
	message: string = `Must contain at least ${min} lowercase letter(s)`
) {
	return this.regex(regex.minLower(min), message)
}

ZodString.prototype.minNumber = function (
	this: ZodString,
	min: number,
	message: string = `Must contain at least ${min} number(s)`
) {
	return this.regex(regex.minNumber(min), message)
}

ZodString.prototype.minSymbol = function (
	this: ZodString,
	min: number,
	message: string = `Must contain at least ${min} special character(s)`
) {
	return this.regex(regex.minSymbol(min), message)
}

declare module 'zod/v4' {
	interface ZodString {
		minUpper(min: number, message: string): ZodString
		minLower(min: number, message: string): ZodString
		minNumber(min: number, message: string): ZodString
		minSymbol(min: number, message: string): ZodString
	}
}

export { z }
