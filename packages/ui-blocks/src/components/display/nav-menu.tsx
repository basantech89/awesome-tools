import {
	cn,
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
} from '@awesome-tools/ui'
import type React from 'react'

function NavMenu({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenu>) {
	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full border-b bg-background/95 px-4 backdrop-blur **:no-underline supports-backdrop-filter:bg-background/60 md:px-6',
				className,
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
					'group relative inline-flex h-10 w-max cursor-pointer items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-active:bg-accent/50',
					'before:absolute before:right-0 before:bottom-0 before:left-0 before:h-0.5 before:scale-x-0 before:bg-primary before:transition-transform before:duration-300 hover:before:scale-x-100',
					props.active && 'text-primary before:scale-x-100',
				)}
				{...props}
			/>
		</NavigationMenuItem>
	)
}

export { NavMenu, NavMenuItem }
