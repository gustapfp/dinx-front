
import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp } from 'lucide-react'
import { Cell, Pie, PieChart, Sector, type SectorProps } from 'recharts'

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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const DEFAULT_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// Renders the hovered segment with a slightly larger outer radius
function ActiveShape(props: SectorProps) {
  const {
    cx, cy,
    innerRadius, outerRadius = 0,
    startAngle, endAngle,
    fill,
  } = props
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  )
}

export type InvestmentDistributionItem = {
  /** Segment label (e.g. "Stocks", "Bonds") */
  name: string
  /** Numeric value for this segment */
  value: number
}

export type InvestmentDistributionChartProps = {
  /** Distribution segments */
  data: InvestmentDistributionItem[]
  /** Card title */
  title?: string
  /** Subtitle shown below the title */
  subtitle?: string
  /** Colors for each segment — CSS values or variables. Falls back to chart-1…5 */
  colors?: string[]
  /** Label for the value shown in the tooltip */
  valueLabel?: string
  /** Icon rendered next to the footer text */
  footerIcon?: LucideIcon
  /** Primary footer text */
  footerText?: string
  /** Secondary footer description */
  footerDescription?: string
  /** Inner radius of the donut. Set to 0 for a filled pie */
  innerRadius?: number
  /** Extra class applied to the Card */
  className?: string
  /** Extra class applied to the ChartContainer */
  chartClassName?: string
}

export function InvestmentDistributionChart({
  data,
  title = 'Investment Distribution',
  subtitle,
  colors = DEFAULT_COLORS,
  valueLabel = 'Value',
  footerIcon: Icon = TrendingUp,
  footerText,
  footerDescription,
  innerRadius = 60,
  className,
  chartClassName = 'mx-auto aspect-square max-h-[250px]',
}: InvestmentDistributionChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)

  const chartData = data.map((item) => {
    const key = slugify(item.name)
    return {
      name: item.name,
      value: item.value,
      browser: key,
    }
  })

  const chartConfig: ChartConfig = {
    value: { label: valueLabel },
    ...Object.fromEntries(
      data.map((item, index) => {
        const key = slugify(item.name)
        const color = colors[index % colors.length]
        return [key, { label: item.name, color }]
      })
    ),
  }

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {subtitle != null && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className={chartClassName}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              activeIndex={activeIndex}
              activeShape={ActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="w-full gap-3 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      {(footerText != null || footerDescription != null) && (
        <CardFooter className="flex-col gap-2 text-sm">
          {footerText != null && (
            <div className="flex items-center gap-2 leading-none font-medium">
              {footerText}
              <Icon className="h-4 w-4" />
            </div>
          )}
          {footerDescription != null && (
            <div className="leading-none text-muted-foreground">
              {footerDescription}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
