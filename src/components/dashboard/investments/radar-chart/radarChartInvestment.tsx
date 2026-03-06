import * as React from 'react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

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
} from '@/components/ui/chart'
import { type radarChartDataItem } from './types'

export const description = 'A radar chart with dots'

export function RadarChartInvestment({
  data,
  title,
  description,
  color = 'var(--chart-1)',
  valueLabel = 'Value',
  fillOpacity = 0.6,
  showDots = true,
  dotRadius = 4,
  footerText,
  footerDescription,
  className,
  chartClassName = 'mx-auto aspect-square max-h-[250px]',
}: {
  /** Data points for the radar axes */
  data: radarChartDataItem[]
  title: string
  description?: string
  /** Fill/stroke color — CSS value or var() */
  color?: string
  /** Tooltip label for the value key */
  valueLabel?: string
  /** Opacity of the filled area (0–1) */
  fillOpacity?: number
  /** Whether to render dots at each data point */
  showDots?: boolean
  /** Radius of the dot if showDots is true */
  dotRadius?: number
  /** Primary footer text */
  footerText?: string
  /** Secondary muted footer description */
  footerDescription?: string
  /** Extra class for the Card wrapper */
  className?: string
  /** Class for the ChartContainer */
  chartClassName?: string
}) {
  const chartConfig = React.useMemo(
    () =>
      ({
        value: {
          label: valueLabel,
          color,
        },
      }) satisfies ChartConfig,
    [valueLabel, color]
  )

  const hasFooter = footerText != null || footerDescription != null

  return (
    <Card className={className}>
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
        {description != null && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className={chartClassName}>
          <RadarChart data={data} outerRadius={80}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="axis" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill={color}
              stroke={color}
              fillOpacity={fillOpacity}
              dot={showDots ? { r: dotRadius, fillOpacity: 1 } : false}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>

      {hasFooter && (
        <CardFooter className="flex-col gap-2 text-sm">
          {footerText != null && (
            <div className="flex items-center gap-2 leading-none font-medium">
              {footerText}
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
