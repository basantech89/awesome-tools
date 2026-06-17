import {
	Button,
	ButtonGroup,
	ButtonGroupText,
	ELLIPSIS,
	Input,
	Label,
	Pagination,
	PaginationButton,
	PaginationContent,
	PaginationEllipsis,
	PaginationNext,
	PaginationPrevious,
	usePaginationRange
} from '@awesome-tools/ui'

import { useDataGrid } from './data-grid'

export function DataGridPagination() {
	const { table } = useDataGrid()

	const isManualPagination = table.options.manualPagination

	const pageIndex = table.getState().pagination.pageIndex + 1
	const pageSize = table.getState().pagination.pageSize

	const prePaginationTotalRows = table.getPrePaginationRowModel().rows.length

	const totalRows = isManualPagination
		? (table.options.rowCount ?? prePaginationTotalRows)
		: prePaginationTotalRows

	const pageCount = isManualPagination
		? table.getPageCount()
		: Math.ceil(totalRows / pageSize)

	const paginationRange = usePaginationRange({
		totalPages: pageCount,
		activePage: pageIndex
	})

	return (
		<Pagination className="flex-wrap justify-between">
			<div className="flex gap-4">
				<ButtonGroup>
					<Input
						aria-invalid={
							table.getState().pagination.pageSize <= 0 ||
							table.getState().pagination.pageSize >
								table.getCoreRowModel().rows.length
						}
						className="min-w-[6ch]"
						id="rows-per-page"
						onChange={e => {
							table.setPageSize(Number(e.target.value))
						}}
						type="number"
						value={pageSize > totalRows ? totalRows : pageSize}
					/>
					<ButtonGroupText>of</ButtonGroupText>
					<Button disabled variant="outline">
						{totalRows}
					</Button>
					<ButtonGroupText render={<Label htmlFor="rows-per-page" />}>
						Per Page
					</ButtonGroupText>
				</ButtonGroup>
			</div>
			<PaginationContent>
				<PaginationPrevious
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}
				/>
				{paginationRange.map((pageNumber, index) =>
					pageNumber === ELLIPSIS.PREVIOUS ? (
						<PaginationEllipsis
							key={pageNumber}
							onClick={() => {
								table.setPageIndex(
									Math.max(+paginationRange[index + 1] - 20, 0)
								)
							}}
						>
							...
						</PaginationEllipsis>
					) : pageNumber === ELLIPSIS.NEXT ? (
						<PaginationEllipsis
							key={pageNumber}
							onClick={() => {
								table.setPageIndex(
									Math.min(
										+paginationRange[index - 1] + 20,
										table.getPageCount() - 1
									)
								)
							}}
						>
							...
						</PaginationEllipsis>
					) : (
						<PaginationButton
							aria-label={`Go to page ${pageNumber}`}
							isActive={pageNumber === pageIndex}
							key={pageNumber}
							onClick={() => table.setPageIndex(+pageNumber - 1)}
						>
							{pageNumber}
							<span className="sr-only">
								{pageNumber === pageIndex
									? 'Current page'
									: `Go to page ${pageNumber}`}
							</span>
						</PaginationButton>
					)
				)}

				<PaginationNext
					disabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}
				/>
			</PaginationContent>
			<ButtonGroup>
				<ButtonGroupText render={<Label htmlFor="page" />}>
					Page
				</ButtonGroupText>
				<Input
					aria-invalid={pageIndex > table.getPageCount()}
					className="min-w-[5.5ch]"
					id="page"
					max={table.getPageCount()}
					min={1}
					onChange={e => {
						const page = e.target.value ? Number(e.target.value) - 1 : 0
						table.setPageIndex(page)
					}}
					type="number"
					value={pageIndex}
				/>
				<ButtonGroupText>of {pageCount}</ButtonGroupText>
			</ButtonGroup>
		</Pagination>
	)
}
