import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

export const description = "A bar chart"

export type BarChartSeries<T> = {
  dataKey: keyof T & string
  label?: string
  color?: string
}

export type BarChartProps<T extends Record<string, unknown>> = {
  title: string
  description: string
  data: T[]
  xKey: keyof T & string
  series: BarChartSeries<T>[]
  xAxisTickFormatter?: (value: string) => string
  footer?: React.ReactNode
  barRadius?: number
  barColorKey?: keyof T & string
}

function buildChartConfig<T extends Record<string, unknown>>(
  series: BarChartSeries<T>[]
): ChartConfig {
  const config: ChartConfig = {}
  series.forEach((s, i) => {
    config[s.dataKey] = {
      label: s.label ?? s.dataKey,
      color: s.color ?? CHART_COLORS[i % CHART_COLORS.length],
    }
  })
  return config
}

export function BarChartCard<T extends Record<string, unknown>>(
  props: BarChartProps<T>
) {
  const {
    title,
    description: descriptionProp,
    data,
    xKey,
    series,
    xAxisTickFormatter = (value: string) => value.slice(0, 3),
    footer,
    barRadius = 8,
    barColorKey,
  } = props

  const chartConfig = buildChartConfig(series)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{descriptionProp}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={xAxisTickFormatter}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {series.map((s, seriesIndex) => {
              const seriesColor =
                s.color ?? CHART_COLORS[seriesIndex % CHART_COLORS.length]
              return (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  fill={
                    barColorKey ? undefined : `var(--color-${s.dataKey})`
                  }
                  radius={barRadius}
                >
                  {barColorKey
                    ? data.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={
                            (entry[barColorKey] as string | undefined) ??
                            seriesColor
                          }
                        />
                      ))
                    : null}
                </Bar>
              )
            })}
          </BarChart>
        </ChartContainer>
      </CardContent>
      {footer != null ? (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  )
}

const defaultChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

export function ChartBarDefault() {
  return (
    <BarChartCard
      title="Bar Chart"
      description="January - June 2024"
      data={defaultChartData}
      xKey="month"
      series={[
        { dataKey: "desktop", label: "Desktop", color: "var(--chart-1)" },
      ]}
      footer={
        <>
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </>
      }
    />
  )
}
