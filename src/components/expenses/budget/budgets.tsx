import { useState } from 'react'

import { BudgetChart, type BudgetCategory } from './budget-chart'
import { BudgetTable } from './budget-table'

const initialBudgets: BudgetCategory[] = [
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
  const [budgets, setBudgets] = useState<BudgetCategory[]>(initialBudgets)
  const [totalBudget, setTotalBudget] = useState<number>(
    initialBudgets.reduce((sum, item) => sum + item.limit, 0)
  )

  return (
    <div className="flex flex-col gap-4">
      <BudgetChart data={budgets} />
      <BudgetTable
        data={budgets}
        onChangeLimit={(category, newLimit) => {
          setBudgets((prev) =>
            prev.map((item) =>
              item.category === category ? { ...item, limit: newLimit } : item
            )
          )
        }}
        totalBudget={totalBudget}
        onChangeTotalBudget={setTotalBudget}
      />
    </div>
  )
}
