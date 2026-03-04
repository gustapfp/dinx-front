import { useEffect, useMemo, type ReactNode } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { cn, getPageNumbers } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const DEFAULT_PAGE_SIZES = [5, 10, 20, 30, 50] as const

export interface PaginatedTableColumn<T> {
  id: string
  header: string
  align?: 'left' | 'right' | 'center'
  render: (item: T) => ReactNode
  className?: string
}

export interface PaginatedTablePagination {
  page: number
  setPage: (page: number) => void
  perPage: number
  setPerPage: (perPage: number) => void
}

export interface PaginatedTableProps<T> {
  title: string
  data: T[]
  getRowId: (item: T) => string | number
  columns: PaginatedTableColumn<T>[]
  emptyMessage: string
  emptyDescription: string
  pagination: PaginatedTablePagination
  /** Label for item count (singular). If itemLabelPlural is not set, plural is itemLabel + "s". */
  itemLabel?: string
  /** Plural form for item count, e.g. "comissões" when itemLabel is "comissão". */
  itemLabelPlural?: string
  /** Page size options */
  pageSizes?: readonly number[]
  /** Optional toolbar (filters, etc.) rendered above the card */
  toolbar?: ReactNode
  /** Optional content before the table (e.g. filters inside card) */
  headerExtra?: ReactNode
  className?: string
  cardClassName?: string
  /** When true, resets to page 1 when data length changes (e.g. after filter). Set to false if you sync page externally. */
  clampPageWhenDataChanges?: boolean
  /** Optional custom footer row rendered at the end of the table body (e.g. totals). */
  footerRow?: ReactNode
}

export default function TransctionsTable<T>({
  title,
  data,
  getRowId,
  columns,
  emptyMessage,
  emptyDescription,
  pagination,
  itemLabel = 'itens',
  itemLabelPlural,
  pageSizes = DEFAULT_PAGE_SIZES,
  toolbar,
  headerExtra,
  className,
  cardClassName,
  clampPageWhenDataChanges = true,
  footerRow,
}: PaginatedTableProps<T>) {
  const { page, setPage, perPage, setPerPage } = pagination

  const totalItems = data.length
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * perPage
  const pageItems = useMemo(
    () => data.slice(startIndex, startIndex + perPage),
    [data, startIndex, perPage]
  )

  const pageNumbers = getPageNumbers(currentPage, totalPages)
  const canPrevious = currentPage > 1
  const canNext = currentPage < totalPages
  const isEmpty = data.length === 0

  useEffect(() => {
    if (!clampPageWhenDataChanges) return
    if (totalPages > 0 && currentPage > totalPages) setPage(totalPages)
  }, [totalPages, currentPage, setPage, clampPageWhenDataChanges])

  return (
    <div className={cn('space-y-4', className)}>
      {toolbar}
      <Card className={cn('rounded-xl shadow-sm', cardClassName)}>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
            </div>
            {headerExtra}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border/60 bg-muted/30 py-16 text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-muted"></div>
              <p className="text-base font-semibold text-foreground">
                {emptyMessage}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {emptyDescription}
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((col) => (
                      <TableHead
                        key={col.id}
                        className={cn(
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center'
                        )}
                      >
                        {col.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems.map((item, index) => {
                    const rowId = getRowId(item)
                    const key =
                      rowId !== undefined &&
                      rowId !== null &&
                      String(rowId).trim() !== ''
                        ? String(rowId)
                        : `row-${startIndex + index}`
                    return (
                      <TableRow key={key}>
                        {columns.map((col) => (
                          <TableCell
                            key={col.id}
                            className={cn(
                              col.align === 'right' && 'text-right',
                              col.align === 'center' && 'text-center',
                              col.className
                            )}
                          >
                            {col.render(item)}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                  {footerRow}
                </TableBody>
              </Table>

              <div
                className={cn(
                  'flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between'
                )}
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Linhas por página</p>
                  <Select
                    value={`${perPage}`}
                    onValueChange={(value) => {
                      setPerPage(Number(value))
                      setPage(1)
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {pageSizes.map((size) => (
                        <SelectItem key={size} value={`${size}`}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    Página {currentPage} de {totalPages}
                    <span className="ml-1 font-medium text-foreground">
                      ({totalItems}{' '}
                      {totalItems === 1
                        ? itemLabel
                        : (itemLabelPlural ?? `${itemLabel}s`)}
                      )
                    </span>
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => setPage(1)}
                      disabled={!canPrevious}
                      aria-label="Primeira página"
                    >
                      <ChevronsLeft className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => setPage(Math.max(1, currentPage - 1))}
                      disabled={!canPrevious}
                      aria-label="Página anterior"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    {pageNumbers.map((pageNumber, index) =>
                      pageNumber === '...' ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-1 text-sm text-muted-foreground"
                        >
                          ...
                        </span>
                      ) : (
                        <Button
                          key={pageNumber}
                          variant={
                            currentPage === pageNumber ? 'default' : 'outline'
                          }
                          size="sm"
                          className="size-8 min-w-8 px-2"
                          onClick={() => setPage(pageNumber as number)}
                          aria-label={`Página ${pageNumber}`}
                        >
                          {pageNumber}
                        </Button>
                      )
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() =>
                        setPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={!canNext}
                      aria-label="Próxima página"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => setPage(totalPages)}
                      disabled={!canNext}
                      aria-label="Última página"
                    >
                      <ChevronsRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
