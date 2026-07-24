import { TableCell } from '@awesome-tools/ui'
import { Cell, flexRender } from '@tanstack/react-table'

import { cn } from '#blocks/lib/utils'

export default function DataGridCell<TData>({
	cell,
	isDragging
}: {
	cell: Cell<TData, unknown>
	isDragging?: boolean
}) {
	return (
		<TableCell
			className={cn(
				'border-r border-l first:min-w-10 first:border-l-0 last:border-r-0',
				{
					'opacity-40': isDragging
				}
			)}
			style={{
				width: `calc(var(--col-${cell.column.id}-size) * 1px)`
			}}
			key={cell.id}
		>
			{flexRender(cell.column.columnDef.cell, cell.getContext())}
		</TableCell>
	)
}
