import type React from 'react'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink
} from '@awesome-tools/ui'

import { cn } from '#blocks/lib/utils'

function NavMenu({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenu>) {
	return (
		<header
			className={cn(
				'bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b px-4 shadow-md backdrop-blur **:no-underline md:px-6',
				className
			)}
		>
			<NavigationMenu className="flex w-full max-w-full" {...props} />
		</header>
	)
}

function NavMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuLink>) {
	return (
		<NavigationMenuItem className={cn(className)}>
			<NavigationMenuLink
				className={cn(
					'group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent/50 data-active:bg-accent/50 relative inline-flex h-10 w-max cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50',
					'before:bg-primary before:absolute before:right-0 before:bottom-0 before:left-0 before:h-0.5 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100',
					props.active && 'text-primary before:scale-x-100'
				)}
				{...props}
			/>
		</NavigationMenuItem>
	)
}

export { NavMenu, NavMenuItem }
