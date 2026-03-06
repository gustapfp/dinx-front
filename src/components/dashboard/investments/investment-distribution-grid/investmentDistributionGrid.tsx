import { InvestmentDistributionChart } from '../investment-distribution-chart/investmentDistributionChart'
import { type InvestmentDistributionCategory } from './types'

export function InvestmentDistributionGrid({
  categories,
  innerRadius = 50,
  chartClassName = 'mx-auto aspect-square max-h-[180px]',
}: {
  /** Up to 4 investment categories, each rendered as a labelled donut chart */
  categories: InvestmentDistributionCategory[]
  /** Inner radius of each donut (px). Set to 0 for filled pie */
  innerRadius?: number
  /** Class applied to each ChartContainer */
  chartClassName?: string
}) {
  // Pad to exactly 4 slots so the grid always stays 2×2
  const cells = [...categories].slice(0, 4)

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {cells.map((category) => (
        <div key={category.name} className="flex flex-col gap-2">
          
          <InvestmentDistributionChart
            data={category.items}
            colors={category.colors}
            innerRadius={innerRadius}
            chartClassName={chartClassName}
            title={category.name}
            subtitle={`Distribution from you ${category.name} activates`}
          />
        </div>
      ))}
    </div>
  )
}
