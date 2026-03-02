'use client'

import type { LucideIcon } from 'lucide-react'
import { TrendingUp } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

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

export const description = 'A customizable donut chart'

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

export type PieChartDataItem = {
  name: string
  value: number
}

export type ChartPieDonutProps = {
  /** Chart segments: name (label) and value */
  data: PieChartDataItem[]
  /** Card title */
  title?: string
  /** Text under the title (e.g. date range) */
  subtitle?: string
  /** Colors for each segment (CSS values or variables). Defaults to chart-1..5 */
  colors?: string[]
  /** Label for the value in tooltip/config */
  valueLabel?: string
  /** Icon shown in the footer (e.g. TrendingUp) */
  icon?: LucideIcon
  /** Main footer text (e.g. "Trending up by 5.2% this month") */
  footerText?: string
  /** Secondary footer description */
  footerDescription?: string
  /** Donut inner radius. Set to 0 for a filled pie */
  innerRadius?: number
  /** Optional class for the card */
  className?: string
  /** Optional class for the chart container */
  chartClassName?: string
}

export function ChartPieDonut({
  data,
  title = 'Pie Chart - Donut',
  subtitle,
  colors = DEFAULT_COLORS,
  valueLabel = 'Value',
  icon: Icon = TrendingUp,
  footerText,
  footerDescription,
  innerRadius = 60,
  className,
  chartClassName = 'mx-auto aspect-square max-h-[250px]',
}: ChartPieDonutProps) {
  const chartData = data.map((item) => {
    const key = slugify(item.name)
    return {
      name: item.name,
      value: item.value,
      browser: key,
      fill: `var(--color-${key})`,
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
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="w-full  "
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
