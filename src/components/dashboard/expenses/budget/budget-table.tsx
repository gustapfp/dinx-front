import { useMemo, useState } from 'react'
import {
  Briefcase,
  Car,
  CreditCard,
  Film,
  Heart,
  Home,
  Plus,
  ShoppingCart,
  Utensils,
  Zap,
} from 'lucide-react'

import type { PaginatedTableColumn } from '../transactions/transctions-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { BudgetCategory, BudgetIconKey } from './budget-chart'

type DraftBudgetRow = BudgetCategory & { __isDraft: true }

type BudgetRow = BudgetCategory | DraftBudgetRow

type BudgetTableProps = {
  data: BudgetRow[]
  onChangeLimit: (category: string, newLimit: number) => void
  totalBudget: number
  onChangeTotalBudget: (newTotal: number) => void
  onAddCategory: (category: string, limit: number, icon?: BudgetIconKey) => void
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const ICON_OPTIONS: {
  key: BudgetIconKey
  label: string
  Icon: React.ComponentType<{ className?: string }>
}[] = [
  { key: 'groceries', label: 'Groceries', Icon: ShoppingCart },
  { key: 'rent', label: 'Rent', Icon: Home },
  { key: 'utilities', label: 'Utilities', Icon: Zap },
  { key: 'entertainment', label: 'Entertainment', Icon: Film },
  { key: 'dining', label: 'Dining', Icon: Utensils },
  { key: 'health', label: 'Health', Icon: Heart },
  { key: 'transport', label: 'Transport', Icon: Car },
  { key: 'work', label: 'Work', Icon: Briefcase },
  { key: 'other', label: 'Other', Icon: CreditCard },
]

const getCategoryIcon = (item: BudgetRow) => {
  const baseClass = 'size-4'

  if (item.icon) {
    const match = ICON_OPTIONS.find((opt) => opt.key === item.icon)
    if (match) {
      const Icon = match.Icon
      return <Icon className={baseClass} />
    }
  }

  switch (item.category) {
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
  onAddCategory,
}: BudgetTableProps) {
  const [draftRow, setDraftRow] = useState<DraftBudgetRow | null>(null)

  const rows: BudgetRow[] = draftRow ? [...data, draftRow] : data

  const totalUsed = useMemo(
    () => rows.reduce((sum, item) => sum + item.used, 0),
    [rows]
  )

  const isDraftRow = (item: BudgetRow): item is DraftBudgetRow =>
    ('__isDraft' in item && item.__isDraft === true) as boolean

  const columns: PaginatedTableColumn<BudgetRow>[] = [
    {
      id: 'category',
      header: 'Category',
      render: (item) => {
        if (isDraftRow(item)) {
          return (
            <div className="flex items-center gap-2">
              <Select
                value={item.icon ?? 'other'}
                onValueChange={(value) => {
                  const icon = value as BudgetIconKey
                  setDraftRow((prev) => (prev ? { ...prev, icon } : prev))
                }}
              >
                <SelectTrigger className="h-8 w-16 justify-center px-1">
                  <SelectValue>
                    {(() => {
                      const key = item.icon ?? 'other'
                      const match =
                        ICON_OPTIONS.find((opt) => opt.key === key) ??
                        ICON_OPTIONS[ICON_OPTIONS.length - 1]
                      const Icon = match.Icon
                      return <Icon className="size-4" />
                    })()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((opt) => {
                    const Icon = opt.Icon
                    return (
                      <SelectItem key={opt.key} value={opt.key}>
                        <div className="flex items-center gap-2">
                          <Icon className="size-4" />
                          <span>{opt.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <input
                autoFocus
                placeholder="New category"
                className="h-8 w-full max-w-[200px] rounded-md border border-input bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={item.category}
                onChange={(event) => {
                  const value = event.target.value
                  setDraftRow((prev) =>
                    prev ? { ...prev, category: value } : prev
                  )
                }}
              />
            </div>
          )
        }

        return (
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-muted">
              {getCategoryIcon(item)}
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
        if (isDraftRow(item)) {
          return (
            <div className="flex items-center justify-end gap-2">
              <input
                type="number"
                min={0}
                className="h-8 w-full max-w-[120px] rounded-md border border-input bg-background px-2 py-1 text-right text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={item.limit}
                onChange={(event) => {
                  const value = Number(event.target.value.replace(',', '.'))
                  if (Number.isNaN(value)) return
                  setDraftRow((prev) =>
                    prev ? { ...prev, limit: value } : prev
                  )
                }}
              />
              <Button
                size="sm"
                className="h-8"
                onClick={() => {
                  const name = item.category.trim()
                  if (!name) return
                  onAddCategory(name, item.limit, item.icon)
                  setDraftRow(null)
                }}
              >
                Save
              </Button>
            </div>
          )
        }

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
            <Button
              size="sm"
              className="h-8"
              onClick={() => {
                if (draftRow) {
                  setDraftRow(null)
                  return
                }
                setDraftRow({
                  category: '',
                  used: 0,
                  limit: 0,
                  icon: 'other',
                  __isDraft: true,
                })
              }}
            >
              {!draftRow && <Plus className="mr-1 size-4" />}
              {draftRow ? 'Cancel' : 'Add category'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {rows.length === 0 ? (
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
                {rows.map((item, index) => (
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
                        const value = Number(event.target.value.replace(',', '.'))
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
