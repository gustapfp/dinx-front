import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  type ExpenseCategoryId,
  getExpenseCategoryConfig,
} from '@/components/dashboard/expenses/categories'

export type BudgetIconKey =
  | 'groceries'
  | 'rent'
  | 'utilities'
  | 'entertainment'
  | 'dining'
  | 'health'
  | 'transport'
  | 'work'
  | 'other'

export type BudgetCategory = {
  category: ExpenseCategoryId
  /** Total budget limit for this category. */
  limit: number
  /** How much of the budget has been used. */
  used: number
  /** Optional icon to represent this category in UI. */
  icon?: BudgetIconKey
}

export type BudgetChartProps = {
  data: BudgetCategory[]
}

const chartConfig = {
  used: {
    label: 'Used',
    color: 'var(--chart-1)',
  },
  remaining: {
    label: 'Remaining',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function darkenOklch(color: string, amount = 10): string {
  const match = color.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/)
  if (!match) return color
  const [, l, c, h] = match
  const newL = Math.max(0, Number(l) - amount)
  return `oklch(${newL}% ${c} ${h})`
}

export function BudgetChart({ data }: BudgetChartProps) {
  const chartData = data.map((item) => {
    const remaining = Math.max(item.limit - item.used, 0)
    const config = getExpenseCategoryConfig(item.category)
    const baseColor = config?.color ?? 'oklch(60% 0 0)'
    const usedColor = darkenOklch(baseColor, 10)
    const remainingColor = baseColor
    return {
      category: item.category,
      used: item.used,
      remaining,
      limit: item.limit,
      usedColor,
      remainingColor,
    }
  })

  const totalLimit = data.reduce((sum, item) => sum + item.limit, 0)
  const totalUsed = data.reduce((sum, item) => sum + item.used, 0)
  const usedPercentage = totalLimit > 0 ? (totalUsed / totalLimit) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budgets</CardTitle>
        <CardDescription>
          Total budget and used amount by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart accessibilityLayer data={chartData} barCategoryGap="20%">
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => currencyFormatter.format(value)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="used" stackId="budget" radius={[0, 0, 6, 6]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`used-${entry.category}-${index}`}
                  fill={entry.usedColor}
                />
              ))}
            </Bar>
            <Bar dataKey="remaining" stackId="budget" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`remaining-${entry.category}-${index}`}
                  fill={entry.remainingColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {`You have used ${usedPercentage.toFixed(1)}% of your total budget`}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {`${currencyFormatter.format(totalUsed)} of ${currencyFormatter.format(
            totalLimit
          )} total`}
        </div>
      </CardFooter>
    </Card>
  )
}
