import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Label } from './label'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
	title: 'Components/Forms/Slider',
	component: Slider,
	decorators: [
		Story => (
			<div className="min-w-80 p-10">
				<Story />
			</div>
		),
	],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => <Slider defaultValue={50} max={100} step={1} />,
}

export const Range: Story = {
	render: () => <Slider defaultValue={[25, 50]} max={100} step={5} />,
}

export const Multiple: Story = {
	render: () => <Slider defaultValue={[10, 20, 70]} max={100} step={10} />,
}

export const Vertical: Story = {
	render: () => (
		<div className="flex h-30 items-center gap-6">
			<Slider
				className="h-40"
				defaultValue={[50]}
				max={100}
				orientation="vertical"
				step={1}
			/>
			<Slider
				className="h-40"
				defaultValue={[25]}
				max={100}
				orientation="vertical"
				step={1}
			/>
		</div>
	),
}

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = React.useState([0.3, 0.7])

		return (
			<div className="grid w-full gap-3">
				<div className="flex items-center justify-between gap-2">
					<Label htmlFor="slider-demo-temperature">Temperature</Label>
					<span className="text-muted-foreground text-sm">
						{value.join(', ')}
					</span>
				</div>
				<Slider
					id="slider-demo-temperature"
					max={1}
					min={0}
					onValueChange={value => setValue(value as number[])}
					step={0.1}
					value={value}
				/>
			</div>
		)
	},
}

export const Disabled: Story = {
	render: () => <Slider defaultValue={[50]} disabled max={100} step={1} />,
}
