import { PlaceholderCard } from '@/components/shared/cards/place-holder-chart/placeHolderCard'
import { ChartAreaInteractive } from '@/components/shared/charts/area-charts/areaCharts'
import { dummyChartAreaData } from '@/components/shared/charts/area-charts/consts'
import {
  dummyPieChartDataExpenses,
  dummyPieChartDataIncome,
} from '@/components/shared/charts/pie-chart/consts'
import { ChartPieDonut } from '@/components/shared/charts/pie-chart/pieChart'
import { dummyTableData } from './simple-table/consts'
import { DashboardTable } from './simple-table/dashboardTable'
import type { dashboardTableData } from './simple-table/types'
import { SectionHeader } from '@/components/shared/section-header/sectionHeader'

export function DashboardShell() {
  return (
    <section className="flex flex-1 flex-col gap-4  px-4 py-4 sm:gap-5 sm:px-5 sm:py-5 md:gap-6 md:px-6 md:py-6">
      <SectionHeader
        title="Dashboard"
        description="Overview of your financial situation"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <PlaceholderCard title="Net Worth" value="$124,500.00" />
        <PlaceholderCard title="Monthly Total Income" value="$8,420.00" />
        <PlaceholderCard title="Monthly Total Expenses" value="$65,300.00" />
        <PlaceholderCard title="Savings Rate" value="32%" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4">
        <div className="min-w-0 lg:col-span-2">
          <ChartAreaInteractive
            data={dummyChartAreaData}
            title="Cashflow"
            description="Preview of your cashflow"
            colorArea1="oklch(44.8% 0.119 151.328)"
            colorArea2="oklch(50.5% 0.213 27.518)"
            labelArea1="Income"
            labelArea2="Expenses"
          />
        </div>
        <div className="min-w-0 rounded-xl border bg-card p-3 shadow-sm text-card-foreground">
          <DashboardTable data={dummyTableData as dashboardTableData[]} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChartPieDonut
          data={dummyPieChartDataIncome}
          title="Income"
          subtitle="Income breakdown from the last 30 days"
          colors={['#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534']}
        />
        <ChartPieDonut
          data={dummyPieChartDataExpenses}
          title="Expenses"
          subtitle="Expenses breakdown from the last 30 days"
          colors={['#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b']}
        />
      </div>
    </section>
  )
}
