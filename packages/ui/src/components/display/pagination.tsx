import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon
} from 'lucide-react'
import * as React from 'react'

import { Button, ButtonGroup } from '#ui'
import { cn } from '#ui/lib/utils'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			aria-label="pagination"
			className={cn('mx-auto flex w-full justify-center', className)}
			data-slot="pagination"
			{...props}
		/>
	)
}

function PaginationContent(props: React.ComponentProps<typeof ButtonGroup>) {
	return <ButtonGroup data-slot="pagination-content" {...props} />
}

type PaginationButtonProps = {
	isActive?: boolean
	render?: React.ReactElement<{ children?: React.ReactNode }>
} & React.ComponentProps<typeof Button>

function PaginationButton({
	className,
	isActive,
	size = 'default',
	render,
	...props
}: PaginationButtonProps) {
	let renderAs = render

	const ariaProps = {
		'aria-current': isActive ? 'page' : undefined,
		'data-active': isActive,
		'data-slot': 'pagination-button'
	} as const

	if (render) {
		renderAs = React.cloneElement(render, {
			children: render.props.children ?? props.children
		})
	}

	const btnProps: React.ComponentProps<typeof Button> = {
		className: cn(className, {
			'bg-secondary!': isActive
		}),
		size,
		variant: 'outline'
	}

	if (renderAs) {
		btnProps.render = renderAs
	}

	return <Button {...btnProps} {...props} {...ariaProps} />
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationButton>) {
	return (
		<PaginationButton
			aria-label="Go to previous page"
			className={cn('pl-2', className)}
			size="default"
			{...props}
		>
			<ChevronLeftIcon data-icon="inline-start" />
			<span className="hidden sm:block">Previous</span>
		</PaginationButton>
	)
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationButton>) {
	return (
		<PaginationButton
			aria-label="Go to next page"
			className={cn('pr-2', className)}
			size="default"
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<ChevronRightIcon data-icon="inline-end" />
		</PaginationButton>
	)
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	return (
		<Button
			className={cn(
				"flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			data-slot="pagination-ellipsis"
			variant="outline"
			{...props}
		>
			<MoreHorizontalIcon />
			<span className="sr-only">More pages</span>
		</Button>
	)
}

const range = (start: number, end: number) => {
	const length = end - start + 1
	return Array.from({ length }, (_, index) => index + start)
}

export enum ELLIPSIS {
	PREVIOUS = 'previous_ellipsis',
	NEXT = 'next_ellipsis'
}

function usePaginationRange({
	totalPages,
	activePage,
	siblings = 1,
	boundaries = 1
}: {
	totalPages: number
	activePage: number
	/**
	 * Siblings amount on left/right side of active page, defaults to 1.
	 */
	siblings?: number
	/**
	 * Amount of elements visible on left/right edges, defaults to 1.
	 */
	boundaries?: number
}) {
	const totalPageNumbers = siblings * 2 + 3 + boundaries * 2

	// If we don't need to show dots, then we return all the pages range [1..totalPages]
	if (totalPageNumbers >= totalPages) {
		return range(1, totalPages)
	}

	const leftSiblingIndex = Math.max(activePage - siblings, boundaries)
	const rightSiblingIndex = Math.min(
		activePage + siblings,
		totalPages - boundaries
	)

	const shouldShowLeftDots = leftSiblingIndex > boundaries + 2
	const shouldShowRightDots = rightSiblingIndex < totalPages - (boundaries + 1)

	if (!shouldShowLeftDots && shouldShowRightDots) {
		const leftItemCount = siblings * 2 + boundaries + 2
		return [
			...range(1, leftItemCount),
			ELLIPSIS.NEXT,
			...range(totalPages - (boundaries - 1), totalPages)
		] as const
	}

	if (shouldShowLeftDots && !shouldShowRightDots) {
		const rightItemCount = boundaries + 1 + 2 * siblings
		return [
			...range(1, boundaries),
			ELLIPSIS.PREVIOUS,
			...range(totalPages - rightItemCount, totalPages)
		] as const
	}

	return [
		...range(1, boundaries),
		ELLIPSIS.PREVIOUS,
		...range(leftSiblingIndex, rightSiblingIndex),
		ELLIPSIS.NEXT,
		...range(totalPages - boundaries + 1, totalPages)
	] as const
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationButton,
	PaginationNext,
	PaginationPrevious,
	usePaginationRange
}
