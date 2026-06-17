import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	InputGroupAddon,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@awesome-tools/ui'
import { SearchIcon, Settings2 } from 'lucide-react'

import { useDataGrid } from '../data-grid'

export function ViewFilter<TData>() {
	const { table } = useDataGrid<TData>()
	const columns = table.getAllLeafColumns()

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						aria-label="Toggle columns"
						className="justify-between font-normal"
						variant="outline"
					>
						<Settings2 className="text-muted-foreground" />
						View
					</Button>
				}
			/>

			<PopoverContent align="start" className="w-45 p-0">
				<Command>
					<CommandInput placeholder="Search columns...">
						<InputGroupAddon>
							<SearchIcon className="size-4 shrink-0 opacity-50" />
						</InputGroupAddon>
					</CommandInput>
					<CommandList>
						<CommandEmpty>No columns found.</CommandEmpty>
						<CommandGroup>
							{columns.map(column => (
								<CommandItem
									className="[&>svg]:stroke-muted-foreground"
									data-checked={column.getIsVisible()}
									key={column.id}
									onSelect={() =>
										column.toggleVisibility(!column.getIsVisible())
									}
								>
									<span className="truncate">{column.label}</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
