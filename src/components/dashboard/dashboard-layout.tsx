import { useState } from "react"
import { Moon, PanelLeft, Sun } from "lucide-react"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/theme/theme-provider"
import { PlaceholderCard } from "../shared/cards/place-holder-chart/placeHolderChart"
import { ChartAreaInteractive } from "../shared/charts/area-charts/areaCharts"
import { dummyChartAreaData } from "../shared/charts/area-charts/consts"
import { ChartPieDonut } from "../shared/charts/pie-chart/pieChart"
import {
  dummyPieChartDataExpenses,
  dummyPieChartDataIncome,
} from "../shared/charts/pie-chart/consts"
import { dummyTableData } from "./simple-table/consts"
import { DashboardTable } from "./simple-table/dashboardTable"
import type { dashboardTableData } from "./simple-table/types"

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar collapsed={sidebarCollapsed} />
      <main className="flex flex-1 flex-col">
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />
        <DashboardShell />
      </main>
    </div>
  )
}

type HeaderProps = {
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
}

function Header({ sidebarCollapsed, onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-2">
        <Button
          variant={sidebarCollapsed ? 'default' : 'outline'}
          size="icon"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onToggleSidebar}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        <div className="hidden flex-col text-left sm:flex">
          <h1 className="text-sm font-semibold tracking-tight">Overview</h1>
          <p className="text-xs text-muted-foreground">
            High-level view of your finances.
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </header>
  )
}

function DashboardShell() {
  return (
    <section className="flex flex-1 flex-col gap-6 bg-muted/40 px-6 py-6">
      <div className="grid gap-4 md:grid-cols-4">
        <PlaceholderCard title="Net Worth" value="$124,500.00" />
        <PlaceholderCard title="Monthly Total Income" value="$8,420.00" />
        <PlaceholderCard title="Monthly Total Expenses" value="$65,300.00" />
        <PlaceholderCard title="Savings Rate" value="32%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="col-span-2 ">
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
        <div className="rounded-xl border bg-card p-3 text-card-foreground">
          <DashboardTable data={dummyTableData as dashboardTableData[]} />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartPieDonut data={dummyPieChartDataIncome} title="Income" />
        <ChartPieDonut data={dummyPieChartDataExpenses} title="Expenses" />
      </div>
    </section>
  )
}
