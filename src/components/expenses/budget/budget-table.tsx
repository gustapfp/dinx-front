import { useMemo, useState } from 'react'
import {
  Briefcase,
  Car,
  CreditCard,
  Film,
  Heart,
  Home,
  ShoppingCart,
  Utensils,
  Zap,
} from 'lucide-react'

import TransctionsTable, {
  type PaginatedTableColumn,
  type PaginatedTablePagination,
} from '../transactions/transctions-table'
import { TableCell, TableRow } from '@/components/ui/table'
import type { BudgetCategory } from './budget-chart'

type BudgetRow = BudgetCategory

type BudgetTableProps = {
  data: BudgetRow[]
  onChangeLimit: (category: string, newLimit: number) => void
  totalBudget: number
  onChangeTotalBudget: (newTotal: number) => void
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const getCategoryIcon = (category: string) => {
  const baseClass = 'size-4'

  switch (category) {
    case 'Groceries':
      return <ShoppingCart className={baseClass} />
    case 'Rent':
      return <Home className={baseClass} />
    case 'Utilities':
      return <Zap className={baseClass} />
    case 'Entertainment':
      return <Film className={baseClass} />
    case 'Dining':
      return <Utensils className={baseClass} />
    case 'Health':
      return <Heart className={baseClass} />
    case 'Transport':
      return <Car className={baseClass} />
    case 'Work':
      return <Briefcase className={baseClass} />
    default:
      return <CreditCard className={baseClass} />
  }
}

export function BudgetTable({
  data,
  onChangeLimit,
  totalBudget,
  onChangeTotalBudget,
}: BudgetTableProps) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const pagination: PaginatedTablePagination = {
    page,
    setPage,
    perPage,
    setPerPage,
  }

  const totalUsed = useMemo(
    () => data.reduce((sum, item) => sum + item.used, 0),
    [data]
  )

  const columns: PaginatedTableColumn<BudgetRow>[] = [
    {
      id: 'category',
      header: 'Category',
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-muted">
            {getCategoryIcon(item.category)}
          </span>
          <span className="truncate">{item.category}</span>
        </div>
      ),
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
      render: (item) => (
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
      ),
    },
  ]

  return (
    <TransctionsTable
      title="Budgets"
      data={data}
      getRowId={(item) => item.category}
      columns={columns}
      emptyMessage="No budgets found"
      emptyDescription="Create a budget to get started."
      pagination={pagination}
      itemLabel="budget"
      footerRow={
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
                const value = Number(event.target.value.replace(',', '.'))
                if (Number.isNaN(value)) return
                onChangeTotalBudget(value)
              }}
            />
          </TableCell>
        </TableRow>
      }
    />
  )
}

