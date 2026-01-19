import type React from 'react'

import { cn } from '#ui/lib/utils'

export function TypographyH1({
	children,
	className,
}: React.ComponentProps<'h1'>) {
	return (
		<h1
			className={cn(
				'scroll-m-20 text-balance py-[2ch] text-center font-extrabold text-4xl tracking-tight',
				className,
			)}
		>
			{children}
		</h1>
	)
}

export function TypographyH2({
	children,
	className,
}: React.ComponentProps<'h2'>) {
	return (
		<h2
			className={cn(
				'scroll-m-20 border-b pt-[2ch] pb-[1ch] font-semibold text-3xl tracking-tight first:mt-0',
				className,
			)}
		>
			{children}
		</h2>
	)
}

export function TypographyH3({
	children,
	className,
}: React.ComponentProps<'h3'>) {
	return (
		<h3
			className={cn(
				'mt-[2ch] scroll-m-20 font-semibold text-2xl tracking-tight',
				className,
			)}
		>
			{children}
		</h3>
	)
}

export function TypographyH4({
	children,
	className,
}: React.ComponentProps<'h4'>) {
	return (
		<h4
			className={cn(
				'scroll-m-20 font-semibold text-xl tracking-tight',
				className,
			)}
		>
			{children}
		</h4>
	)
}

export function TypographyP({
	children,
	className,
}: React.ComponentProps<'p'>) {
	return <p className={cn('not-first:mt-6 leading-7', className)}>{children}</p>
}

export function TypographyBlockquote({
	children,
	className,
}: React.ComponentProps<'blockquote'>) {
	return (
		<blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
			{children}
		</blockquote>
	)
}

export function TypographyInlineCode({
	children,
	className,
}: React.ComponentProps<'code'>) {
	return (
		<code
			className={cn(
				'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
				className,
			)}
		>
			{children}
		</code>
	)
}

export function TypographyLead({
	children,
	className,
}: React.ComponentProps<'p'>) {
	return (
		<p className={cn('text-muted-foreground text-xl', className)}>{children}</p>
	)
}

export function TypographyLarge({
	children,
	className,
}: React.ComponentProps<'div'>) {
	return (
		<div className={cn('font-semibold text-lg', className)}>{children}</div>
	)
}

export function TypographySmall({
	children,
	className,
}: React.ComponentProps<'small'>) {
	return (
		<small className={cn('font-medium text-sm leading-none', className)}>
			{children}
		</small>
	)
}

export function TypographyMuted({
	children,
	className,
}: React.ComponentProps<'p'>) {
	return (
		<p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
	)
}
