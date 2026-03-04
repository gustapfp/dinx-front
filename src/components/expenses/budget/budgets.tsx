import { BudgetChart, type BudgetCategory } from './budget-chart'

const dummyBudgets: BudgetCategory[] = [
  {
    category: 'Groceries',
    limit: 400,
    used: 186,
  },
  {
    category: 'Rent',
    limit: 1200,
    used: 1200,
  },
  {
    category: 'Utilities',
    limit: 250,
    used: 146,
  },
  {
    category: 'Entertainment',
    limit: 150,
    used: 94,
  },
  {
    category: 'Health',
    limit: 300,
    used: 209,
  },
]

export function Budgets() {
  return (
    <div className="flex flex-col gap-4">
      <BudgetChart data={dummyBudgets} />
    </div>
  )
}
