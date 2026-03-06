import * as React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  type LabelProps,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type chartBarNegativeData } from './types'

export const description = 'A bar chart with negative values'

// ─── Helpers ───────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function getYear(date: string) { return new Date(date).getFullYear() }
function getMonth(date: string) { return new Date(date).getMonth() } // 0-based

/** All distinct years present in the data, descending */
function getAvailableYears(data: chartBarNegativeData[]): number[] {
  return [...new Set(data.map((d) => getYear(d.date)))].sort((a, b) => b - a)
}

// ─── Custom value label (above positive / below negative) ──────────────────

function ValueLabel(props: LabelProps & { color?: string }) {
  const { x, y, width, height, value, color } = props
  const numX = (x as number) + (width as number) / 2
  const numH = height as number
  const isNeg = numH < 0
  const numY = isNeg ? (y as number) + numH - 8 : (y as number) - 8

  return (
    <text
      x={numX}
      y={numY}
      fill={color ?? 'currentColor'}
      textAnchor='middle'
      dominantBaseline='auto'
      fontSize={11}
      fontWeight={700}
      opacity={0.75}
    >
      {value}
    </text>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

export function ChartBarNegative({
  data,
  title,
  description,
  labelValue = 'Value',
  colorPositive = 'oklch(39.3% 0.095 152.535)',
  colorNegative = 'oklch(44.4% 0.177 26.899)',
  colorCompare = 'oklch(55% 0.18 250)',  // blue for comparison year
  colorCompareNeg = 'oklch(50% 0.2 30)', // darker red for comparison year negatives
  className,
}: {
  data: chartBarNegativeData[]
  title: string
  description: string
  labelValue?: string
  colorPositive?: string
  colorNegative?: string
  colorCompare?: string
  colorCompareNeg?: string
  className?: string
}) {
  const availableYears = React.useMemo(() => getAvailableYears(data), [data])
  const latestYear = availableYears[0] ?? new Date().getFullYear()

  const [mode, setMode] = React.useState<'single' | 'compare'>('single')
  const [yearA, setYearA] = React.useState<string>(String(latestYear))
  const [yearB, setYearB] = React.useState<string>(
    String(availableYears[1] ?? latestYear)
  )

  // ── Single-year mode: one bar per available month ──────────────────────
  const singleData = React.useMemo(() => {
    const yr = Number(yearA)
    return data
      .filter((d) => getYear(d.date) === yr)
      .sort((a, b) => getMonth(a.date) - getMonth(b.date))
      .map((d) => ({ ...d, label: MONTH_NAMES[getMonth(d.date)] }))
  }, [data, yearA])

  // ── Compare mode: one entry per month, two value keys ─────────────────
  const compareData = React.useMemo(() => {
    const yA = Number(yearA)
    const yB = Number(yearB)

    const byMonthA: Record<number, number> = {}
    const byMonthB: Record<number, number> = {}

    data.forEach((d) => {
      const yr = getYear(d.date)
      const mo = getMonth(d.date)
      if (yr === yA) byMonthA[mo] = d.value
      if (yr === yB) byMonthB[mo] = d.value
    })

    // Union of all months present in either year
    const months = [...new Set([...Object.keys(byMonthA), ...Object.keys(byMonthB)])]
      .map(Number)
      .sort((a, b) => a - b)

    return months.map((mo) => ({
      month: MONTH_NAMES[mo],
      valueA: byMonthA[mo] ?? null,
      valueB: byMonthB[mo] ?? null,
    }))
  }, [data, yearA, yearB])

  const chartConfig = React.useMemo(() => ({
    value:  { label: labelValue },
    valueA: { label: yearA, color: colorPositive },
    valueB: { label: yearB, color: colorCompare },
  } satisfies ChartConfig), [labelValue, yearA, yearB, colorPositive, colorCompare])

  // ── Year selectors ────────────────────────────────────────────────────
  const renderYearSelect = (value: string, onChange: (v: string) => void, exclude?: string) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-[120px] rounded-lg'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className='rounded-xl'>
        {availableYears
          .filter((y) => exclude === undefined || String(y) !== exclude)
          .map((y) => (
            <SelectItem key={y} value={String(y)} className='rounded-lg'>
              {y}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )

  return (
    <Card className='pt-0'>
      <CardHeader className='flex flex-wrap items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        {/* Mode toggle */}
        <div className='hidden sm:flex items-center gap-2'>
          <div className='flex rounded-lg border overflow-hidden text-xs'>
            <button
              className={`px-3 py-1.5 font-medium transition-colors ${
                mode === 'single'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setMode('single')}
            >
              Year
            </button>
            <button
              className={`px-3 py-1.5 font-medium transition-colors ${
                mode === 'compare'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setMode('compare')}
            >
              Compare
            </button>
          </div>

          {renderYearSelect(yearA, setYearA, mode === 'compare' ? yearB : undefined)}
          {mode === 'compare' && (
            <>
              <span className='text-muted-foreground text-xs'>vs</span>
              {renderYearSelect(yearB, setYearB, yearA)}
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className={className ?? 'aspect-auto h-[300px] w-full'}
        >
          {mode === 'single' ? (
            /* ── Single year view ── */
            <BarChart accessibilityLayer data={singleData} margin={{ top: 28, bottom: 28 }}>
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel hideIndicator />}
              />
              <Bar dataKey='value'>
                <LabelList
                  dataKey='label'
                  position='insideTop'
                  offset={8}
                  className='fill-white'
                  fontSize={11}
                  fontWeight={700}
                />
                <LabelList dataKey='value' content={<ValueLabel />} />
                {singleData.map((item, index) => (
                  <Cell
                    key={item.label || index}
                    fill={item.value > 0 ? colorPositive : colorNegative}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            /* ── Compare two years view ── */
            <BarChart accessibilityLayer data={compareData} margin={{ top: 28, bottom: 4 }}>
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='dot' />}
              />
              <Legend
                formatter={(value) => (value === 'valueA' ? yearA : yearB)}
                wrapperStyle={{ paddingTop: 8, fontSize: 12 }}
              />
              {/* Year A bars */}
              <Bar dataKey='valueA' name='valueA' radius={[3, 3, 0, 0]}>
                <LabelList
                  dataKey='month'
                  position='insideTop'
                  offset={8}
                  className='fill-white'
                  fontSize={10}
                  fontWeight={700}
                />
                {compareData.map((item, i) => (
                  <Cell
                    key={`a-${i}`}
                    fill={(item.valueA ?? 0) >= 0 ? colorPositive : colorNegative}
                  />
                ))}
              </Bar>
              {/* Year B bars */}
              <Bar dataKey='valueB' name='valueB' radius={[3, 3, 0, 0]}>
                {compareData.map((item, i) => (
                  <Cell
                    key={`b-${i}`}
                    fill={(item.valueB ?? 0) >= 0 ? colorCompare : colorCompareNeg}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
