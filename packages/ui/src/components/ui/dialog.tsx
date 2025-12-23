import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import type * as React from 'react'

import { XIcon } from '../icons'
import { cn } from '@/lib/utils'

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogBackdrop({
	className,
	...props
}: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			className={cn(
				'data-closed:fade-out-0 data-open:fade-in-0 data-closed:animation-duration-[200ms] fixed inset-0 z-50 bg-black/50 data-closed:animate-out data-open:animate-in',
				className,
			)}
			data-slot="dialog-backdrop"
			{...props}
		/>
	)
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean
}) {
	return (
		<DialogPortal>
			<DialogBackdrop />
			<DialogPrimitive.Viewport data-slot="dialog-viewport">
				<DialogPrimitive.Popup
					className={cn(
						'data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 is-full max-is-[calc(100%-2rem)] sm:max-is-lg fixed top-[50%] left-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-closed:animate-out data-open:animate-in',
						className,
					)}
					data-slot="dialog-popup"
					{...props}
				>
					{children}
					{showCloseButton && (
						<DialogPrimitive.Close
							className="absolute top-4 right-4 cursor-pointer rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-accent data-open:text-muted-foreground [&_svg:not([class*='size-'])]:size-rem-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
							data-slot="dialog-close"
						>
							<XIcon />
							<span className="sr-only">Close</span>
						</DialogPrimitive.Close>
					)}
				</DialogPrimitive.Popup>
			</DialogPrimitive.Viewport>
		</DialogPortal>
	)
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
			data-slot="dialog-header"
			{...props}
		/>
	)
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
				className,
			)}
			data-slot="dialog-footer"
			{...props}
		/>
	)
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			className={cn('font-semibold text-lg leading-none', className)}
			data-slot="dialog-title"
			{...props}
		/>
	)
}

function DialogDescription({
	className,
	...props
}: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			className={cn('text-muted-foreground text-sm', className)}
			data-slot="dialog-description"
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogBackdrop,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
