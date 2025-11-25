import { expectTypeOf, test } from 'vitest'

import type { DeepRequireKeys } from '../lib/types.js'

test('deep require keys work as expected', () => {
	type PartialObj = {
		a?: string
		b?: {
			c?: number
			d?: {
				e?: boolean
			}
		}
	}

	type DeepRequiredObj = DeepRequireKeys<PartialObj, 'a' | 'b'>
	const requiredObj: DeepRequiredObj = {
		a: 'hello',
		b: {
			c: 42,
			d: {
				e: true,
			},
		},
	}

	expectTypeOf(requiredObj).branded.toEqualTypeOf<{
		a: string
		b: { c: number; d: { e: boolean } }
	}>()
})
