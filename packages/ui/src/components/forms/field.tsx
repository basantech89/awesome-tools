'use client'

import { useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Separator, TypographySmall } from '#ui/components'
import { cn } from '#ui/lib/utils'

import { Label } from './label'

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
	return (
		<fieldset
			className={cn(
				'flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
				className
			)}
			data-slot="field-set"
			{...props}
		/>
	)
}

function FieldLegend({
	className,
	variant = 'legend',
	...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
	return (
		<legend
			className={cn(
				'mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
				className
			)}
			data-slot="field-legend"
			data-variant={variant}
			{...props}
		/>
	)
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
				className
			)}
			data-slot="field-group"
			{...props}
		/>
	)
}

const fieldVariants = tv({
	base: 'group/field data-[invalid=true]:text-destructive flex w-full gap-3',
	variants: {
		orientation: {
			vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
			horizontal:
				'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
			responsive:
				'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
		}
	},
	defaultVariants: {
		orientation: 'vertical'
	}
})

function Field({
	className,
	orientation = 'vertical',
	...props
}: React.ComponentProps<'fieldset'> & VariantProps<typeof fieldVariants>) {
	return (
		<fieldset
			className={cn(fieldVariants({ orientation }), className)}
			data-orientation={orientation}
			data-slot="field"
			{...props}
		/>
	)
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'group/field-content flex flex-1 flex-col gap-1 leading-snug',
				className
			)}
			data-slot="field-content"
			{...props}
		/>
	)
}

function FieldLabel({
	className,
	...props
}: React.ComponentProps<typeof Label>) {
	return (
		<Label
			className={cn(
				'group/field-label peer/field-label has-data-checked:border-primary has-data-checked:bg-primary/5 dark:has-data-checked:bg-primary/10 flex w-fit cursor-pointer gap-2 leading-snug group-has-disabled/field:cursor-default has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-3',
				'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
				className
			)}
			data-slot="field-label"
			{...props}
		/>
	)
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
				className
			)}
			data-slot="field-label"
			{...props}
		/>
	)
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
	return (
		<p
			className={cn(
				'text-muted-foreground text-left text-sm leading-normal font-normal group-has-data-[orientation=horizontal]/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
				'last:mt-0 nth-last-2:-mt-1',
				'[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
				className
			)}
			data-slot="field-description"
			{...props}
		/>
	)
}

function FieldSeparator({
	children,
	className,
	...props
}: React.ComponentProps<'div'> & {
	children?: React.ReactNode
}) {
	return (
		<div
			className={cn(
				'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
				className
			)}
			data-content={!!children}
			data-slot="field-separator"
			{...props}
		>
			<Separator className="absolute inset-0 top-1/2" />
			{children && (
				<TypographySmall
					className="bg-background text-muted-foreground relative mx-auto block w-fit px-2 leading-normal"
					data-slot="field-separator-content"
				>
					{children}
				</TypographySmall>
			)}
		</div>
	)
}

function FieldError({
	className,
	children,
	errors,
	...props
}: React.ComponentProps<'div'> & {
	errors?: Array<{ message?: string } | undefined>
}) {
	const content = useMemo(() => {
		if (children) {
			return children
		}

		if (!errors?.length) {
			return null
		}

		const uniqueErrors = [
			...new Map(errors.map(error => [error?.message, error])).values()
		]

		if (uniqueErrors?.length === 1) {
			return uniqueErrors[0]?.message
		}

		return (
			<ul className="flex list-disc flex-col gap-1 pl-5">
				{uniqueErrors.map(
					(error, index) =>
						// oxlint-disable-next-line react/no-array-index-key - the errors are read-only and won't change dynamically
						error?.message && <li key={index}>{error.message}</li>
				)}
			</ul>
		)
	}, [children, errors])

	return (
		<div
			className={cn(
				'text-destructive min-h-5 text-sm font-normal',
				content ? 'visible' : 'invisible',
				className
			)}
			data-slot="field-error"
			role="alert"
			{...props}
		>
			{content}
		</div>
	)
}

export {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldContent,
	FieldTitle
}
