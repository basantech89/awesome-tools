'use client'

import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import * as React from 'react'

import { cn } from '#ui/lib/utils'

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: SliderPrimitive.Root.Props) {
	const values = React.useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
					? defaultValue
					: [min, max],
		[value, defaultValue, min, max]
	)

	return (
		<SliderPrimitive.Root
			className="data-horizontal:w-full data-vertical:h-full"
			data-slot="slider"
			defaultValue={defaultValue}
			max={max}
			min={min}
			thumbAlignment="edge"
			value={value}
			{...props}
		>
			<SliderPrimitive.Control
				className={cn(
					'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
					className
				)}
			>
				<SliderPrimitive.Track
					className="bg-muted relative overflow-hidden rounded-full select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
					data-slot="slider-track"
				>
					<SliderPrimitive.Indicator
						className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
						data-slot="slider-range"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						aria-label={`slider thumb ${index + 1}`}
						className="border-primary ring-ring/50 block size-4 shrink-0 cursor-pointer rounded-full border bg-white shadow-sm transition-[color,box-shadow] select-none hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
						data-slot="slider-thumb"
						// biome-ignore lint/suspicious/noArrayIndexKey: this is a static array
						key={index}
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	)
}

export { Slider }
