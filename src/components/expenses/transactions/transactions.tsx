import { useState } from 'react'
import {
  Car,
  CreditCard,
  Film,
  Home,
  ShoppingCart,
  Utensils,
  Briefcase,
  Heart,
  Zap,
} from 'lucide-react'
import { BarChartCard } from '@/components/shared/charts/bar-chart/barChart'
import TransctionsTable, {
  type PaginatedTableColumn,
} from './transctions-table'

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  paymentMethod: string
  status: 'Completed' | 'Pending'
}

const dummyTransactions: Transaction[] = [
  {
    id: '1',
    date: '2026-03-01',
    description: 'Groceries at Market',
    category: 'Groceries',
    amount: 86.45,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    id: '2',
    date: '2026-03-02',
    description: 'Monthly Rent',
    category: 'Rent',
    amount: 1200,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: '3',
    date: '2026-03-03',
    description: 'Electricity Bill',
    category: 'Utilities',
    amount: 145.9,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    id: '4',
    date: '2026-03-03',
    description: 'Streaming Subscription',
    category: 'Entertainment',
    amount: 19.99,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    id: '5',
    date: '2026-03-04',
    description: 'Restaurant Dinner',
    category: 'Dining',
    amount: 64.5,
    paymentMethod: 'Debit Card',
    status: 'Completed',
  },
  {
    id: '6',
    date: '2026-03-04',
    description: 'Gym Membership',
    category: 'Health',
    amount: 55,
    paymentMethod: 'Credit Card',
    status: 'Pending',
  },
  {
    id: '7',
    date: '2026-03-05',
    description: 'Taxi Ride',
    category: 'Transport',
    amount: 23.75,
    paymentMethod: 'Cash',
    status: 'Completed',
  },
  {
    id: '8',
    date: '2026-03-05',
    description: 'Office Supplies',
    category: 'Work',
    amount: 34.2,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
]

const getCategoryIcon = (category: string) => {
  const baseClass = 'size-4 text-muted-foreground'

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
        <span className="flex size-7 items-center justify-center rounded-full bg-muted">
          {getCategoryIcon(item.category)}
        </span>
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

  return (
    <div className="flex flex-col gap-4">
      <BarChartCard
        chartClassName="h-96 w-full"
        title="Expenses"
        description="Expenses breakdown from the last 30 days"
        data={[
          { category: 'Groceries', amount: 186 },
          { category: 'Rent', amount: 305 },
          { category: 'Utilities', amount: 237 },
          { category: 'Entertainment', amount: 73 },
          { category: 'Health', amount: 209 },
        ]}
        xKey="category"
        series={[
          { dataKey: 'amount', label: 'Amount', color: 'var(--chart-1)' },
        ]}
      />
      <TransctionsTable
        title="Transactions"
        data={dummyTransactions}
        getRowId={(item) => item.id}
        columns={transactionColumns}
        emptyMessage="No transactions found"
        emptyDescription="No transactions found"
        pagination={{ page, setPage, perPage, setPerPage }}
      />
    </div>
  )
}
