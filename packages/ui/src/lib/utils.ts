import { cn, type TV, tv as tvBase, type VariantProps } from 'tailwind-variants'

const twMergeConfig = {
	classGroups: {
		'size-rem': [{ 'size-rem': [() => true] }],
		'block-size': [{ bs: [() => true] }],
		'inline-size': [{ is: [() => true] }],
	},
	conflictingClassGroups: {
		'size-rem': ['block-size', 'inline-size', 'w', 'h', 'size'],
		'block-size': ['size-rem', 'h', 'size'],
		'inline-size': ['size-rem', 'w', 'size'],
	},
}

export const tv: TV = (options, config) =>
	tvBase(options, {
		...config,
		twMerge: config?.twMerge ?? true,
		twMergeConfig: {
			...config?.twMergeConfig,
			classGroups: {
				...config?.twMergeConfig?.classGroups,
				...twMergeConfig.classGroups,
			},
			conflictingClassGroups: {
				...config?.twMergeConfig?.conflictingClassGroups,
				...twMergeConfig.conflictingClassGroups,
			},
		},
	})

export { cn, type VariantProps }
