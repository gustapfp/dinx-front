import { useState } from 'react'

import { BudgetChart, type BudgetCategory } from './budget-chart'
import {
  type ExpenseCategoryId,
  EXPENSE_CATEGORIES,
} from '@/components/dashboard/expenses/categories'
import { BudgetTable } from './budget-table'

const initialBudgets: BudgetCategory[] = (
  [
    'Saúde',
    'Moradia',
    'Mercado',
    'Educação',
    'Imposto',
    'Doação',
    'Transporte',
    'Viagem',
    'Entretenimento',
    'Ferramentas de Trabalho',
    'Fatura Cartão de Crédito',
  ] as ExpenseCategoryId[]
).map((id) => {
  const config = EXPENSE_CATEGORIES[id]
  return {
    category: config.label,
    limit: 300,
    used: 0,
    icon: 'other',
  }
})

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
      />
    </div>
  )
}
