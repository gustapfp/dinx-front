import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import { BarChartCard } from '@/components/shared/charts/bar-chart/barChart'
import TransctionsTable, {
  type PaginatedTableColumn,
} from '@/components/dashboard/expenses/transactions/transctions-table'
import {
  type ExpenseCategoryId,
  expenseCategoryIds,
  getExpenseCategoryConfig,
} from '@/components/dashboard/expenses/categories'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Transaction {
  id: string
  date: string
  description: string
  category: ExpenseCategoryId
  amount: number
  paymentMethod: string
  status: 'Completed' | 'Pending'
}

const initialTransactions: Transaction[] = [
  {
    id: '1',
    date: '2026-03-01',
    description: 'Compras no mercado',
    category: 'Mercado',
    amount: 86.45,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    id: '2',
    date: '2026-03-02',
    description: 'Aluguel do apartamento',
    category: 'Moradia',
    amount: 1200,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: '3',
    date: '2026-03-03',
    description: 'Conta de energia',
    category: 'Imposto',
    amount: 145.9,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    id: '4',
    date: '2026-03-03',
    description: 'Streaming de filmes e séries',
    category: 'Entretenimento',
    amount: 19.99,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    id: '5',
    date: '2026-03-04',
    description: 'Jantar em restaurante',
    category: 'Saúde',
    amount: 64.5,
    paymentMethod: 'Debit Card',
    status: 'Completed',
  },
  {
    id: '6',
    date: '2026-03-04',
    description: 'Plano de academia',
    category: 'Saúde',
    amount: 55,
    paymentMethod: 'Credit Card',
    status: 'Pending',
  },
  {
    id: '7',
    date: '2026-03-05',
    description: 'Uber para o trabalho',
    category: 'Transporte',
    amount: 23.75,
    paymentMethod: 'Cash',
    status: 'Completed',
  },
  {
    id: '8',
    date: '2026-03-05',
    description: 'Ferramentas para trabalho remoto',
    category: 'Ferramentas de Trabalho',
    amount: 34.2,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
]

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

const transactionColumns: PaginatedTableColumn<Transaction>[] = [
  {
    id: 'date',
    header: 'Date',
    render: (item) => item.date,
  },
  {
    id: 'name',
    header: 'Name',
    render: (item) => (
      <div className="flex items-center gap-2">
        {(() => {
          const { Icon, color } = getCategoryVisuals(item.category)
          return (
            <span
              className="flex size-7 items-center justify-center rounded-full border"
              style={{ borderColor: color, color }}
            >
              <Icon className="size-4" />
            </span>
          )
        })()}
        <span className="truncate">{item.description}</span>
      </div>
    ),
  },
  {
    id: 'category',
    header: 'Category',
    render: (item) => item.category,
  },
  {
    id: 'amount',
    header: 'Amount',
    align: 'right',
    render: (item) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(item.amount),
    className: 'font-medium',
  },
]

export function Transactions() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions)
  const [newDescription, setNewDescription] = useState('')
  const [newCategory, setNewCategory] = useState<ExpenseCategoryId | ''>('')
  const [newAmount, setNewAmount] = useState<string>('')

  const totalsByCategory = transactions.reduce<
    Record<ExpenseCategoryId, number>
  >((acc, tx) => {
    acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount
    return acc
  }, {} as Record<ExpenseCategoryId, number>)

  const chartData = Object.entries(totalsByCategory).map(
    ([category, amount]) => {
      const visuals = getCategoryVisuals(category as ExpenseCategoryId)
      return {
        category,
        amount,
        color: visuals.color,
      }
    }
  )

  const handleAddTransaction = () => {
    const amountNumber = Number(newAmount.replace(',', '.'))
    if (
      !newDescription.trim() ||
      !newCategory ||
      Number.isNaN(amountNumber) ||
      amountNumber <= 0
    ) {
      return
    }

    const today = new Date().toISOString().slice(0, 10)
    const tx: Transaction = {
      id: String(Date.now()),
      date: today,
      description: newDescription.trim(),
      category: newCategory,
      amount: amountNumber,
      paymentMethod: 'Credit Card',
      status: 'Completed',
    }

    setTransactions((prev) => [tx, ...prev])
    setNewDescription('')
    setNewCategory('')
    setNewAmount('')
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <BarChartCard
        chartClassName="h-96 w-full"
        title="Expenses"
        description="Expenses breakdown from the last 30 days"
        data={chartData}
        xKey="category"
        series={[
          { dataKey: 'amount', label: 'Amount', color: 'var(--chart-1)' },
        ]}
        barColorKey="color"
      />
      <TransctionsTable
        title="Transactions"
        toolbar={
          <div className="flex flex-wrap items-end gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Description
              </label>
              <input
                className="h-8 w-40 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="e.g. Almoço"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Category
              </label>
              <Select
                value={newCategory}
                onValueChange={(value) =>
                  setNewCategory(value as ExpenseCategoryId)
                }
              >
                <SelectTrigger className="h-8 w-40">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategoryIds.map((id) => (
                    <SelectItem key={id} value={id}>
                      {id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Amount
              </label>
              <input
                type="number"
                min={0}
                className="h-8 w-28 rounded-md border border-input bg-background px-2 text-sm text-right outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </div>
            <Button className="h-8" size="sm" onClick={handleAddTransaction}>
              Add
            </Button>
          </div>
        }
        data={transactions}
        getRowId={(item) => item.id}
        columns={transactionColumns}
        emptyMessage="No transactions found"
        emptyDescription="No transactions found"
        pagination={{ page, setPage, perPage, setPerPage }}
      />
    </div>
  )
}
