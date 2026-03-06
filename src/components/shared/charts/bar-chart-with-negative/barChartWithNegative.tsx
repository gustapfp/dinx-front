
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { type chartBarNegativeData } from "./types"

export const description = "A bar chart with negative values"

export function ChartBarNegative({
  data,
  title,
  description,
  labelValue = "Value",
  colorPositive = "#22c55e", // green
  colorNegative = "#ef4444", // red
}: {
  data: chartBarNegativeData[]
  title: string
  description: string
  labelValue?: string
  colorPositive?: string
  colorNegative?: string
}) {
  const chartConfig = {
    value: {
      label: labelValue,
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="value">
              <LabelList position="top" dataKey="label" fillOpacity={1} />
              {data.map((item, index) => (
                <Cell
                  key={item.label || index}
                  fill={item.value > 0 ? colorPositive : colorNegative}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
