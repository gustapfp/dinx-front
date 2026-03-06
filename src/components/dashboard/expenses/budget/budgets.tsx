import { useState } from 'react'

import { BudgetChart, type BudgetCategory } from './budget-chart'
import { BudgetTable } from './budget-table'

const initialBudgets: BudgetCategory[] = [
  {
    category: 'Groceries',
    limit: 400,
    used: 186,
    icon: 'groceries',
  },
  {
    category: 'Rent',
    limit: 1200,
    used: 1200,
    icon: 'rent',
  },
  {
    category: 'Utilities',
    limit: 250,
    used: 146,
    icon: 'utilities',
  },
  {
    category: 'Entertainment',
    limit: 150,
    used: 94,
    icon: 'entertainment',
  },
  {
    category: 'Health',
    limit: 300,
    used: 209,
    icon: 'health',
  },
]

export function Budgets() {
  const [budgets, setBudgets] = useState<BudgetCategory[]>(initialBudgets)
  const [totalBudget, setTotalBudget] = useState<number>(
    initialBudgets.reduce((sum, item) => sum + item.limit, 0)
  )

  return (
    <div className="flex flex-col gap-4 mt-4">
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
        onAddCategory={(category, limit, icon) => {
          setBudgets((prev) => [...prev, { category, limit, used: 0, icon }])
        }}
      />
    </div>
  )
}
