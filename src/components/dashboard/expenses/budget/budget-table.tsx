import { useMemo } from 'react'
import type { PaginatedTableColumn } from '../transactions/transctions-table'
import { CreditCard } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { BudgetCategory } from './budget-chart'
import {
  type ExpenseCategoryId,
  getExpenseCategoryConfig,
} from '@/components/dashboard/expenses/categories'

type BudgetTableProps = {
  data: BudgetCategory[]
  onChangeLimit: (category: string, newLimit: number) => void
  totalBudget: number
  onChangeTotalBudget: (newTotal: number) => void
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const getCategoryVisuals = (category: ExpenseCategoryId) => {
  const config = getExpenseCategoryConfig(category)
  if (!config) {
    return {
      Icon: CreditCard,
      color: 'hsl(var(--muted-foreground))',
    }
  }
  return {
    Icon: config.Icon,
    color: config.color,
  }
}

export function BudgetTable({
  data,
  onChangeLimit,
  totalBudget,
  onChangeTotalBudget,
}: BudgetTableProps) {
  const totalUsed = useMemo(
    () => data.reduce((sum, item) => sum + item.used, 0),
    [data]
  )

  const columns: PaginatedTableColumn<BudgetCategory>[] = [
    {
      id: 'category',
      header: 'Category',
      render: (item) => {
        const { Icon, color } = getCategoryVisuals(item.category)
        return (
          <div className="flex items-center gap-2">
            <span
              className="flex size-7 items-center justify-center rounded-full border"
              style={{ borderColor: color, color }}
            >
              <Icon className="size-4" />
            </span>
            <span className="truncate">{item.category}</span>
          </div>
        )
      },
    },
    {
      id: 'used',
      header: 'Expended',
      align: 'right',
      className: 'font-medium',
      render: (item) => currencyFormatter.format(item.used),
    },
    {
      id: 'limit',
      header: 'Limit',
      align: 'right',
      render: (item) => {
        return (
          <input
            type="number"
            min={0}
            className="h-8 w-full max-w-[120px] rounded-md border border-input bg-background px-2 py-1 text-right text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={item.limit}
            onChange={(event) => {
              const value = Number(event.target.value.replace(',', '.'))
              if (Number.isNaN(value)) return
              onChangeLimit(item.category, value)
            }}
          />
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-base font-semibold">Budgets</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border/60 bg-muted/30 py-10 text-center text-sm text-muted-foreground">
              <p className="font-medium text-foreground">No budgets found</p>
              <p className="mt-1">
                Create a budget to get started. Click &quot;Add category&quot;.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead
                      key={col.id}
                      className={
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                            ? 'text-center'
                            : undefined
                      }
                    >
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={`${item.category}-${index}`}>
                    {columns.map((col) => (
                      <TableCell
                        key={col.id}
                        className={[
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                          col.className,
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {col.render(item)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow className="font-medium">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">
                    {currencyFormatter.format(totalUsed)}
                  </TableCell>
                  <TableCell className="text-right">
                    <input
                      type="number"
                      min={0}
                      className="h-8 w-full max-w-[140px] rounded-md border border-input bg-background px-2 py-1 text-right text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={totalBudget}
                      onChange={(event) => {
                        const value = Number(
                          event.target.value.replace(',', '.')
                        )
                        if (Number.isNaN(value)) return
                        onChangeTotalBudget(value)
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
