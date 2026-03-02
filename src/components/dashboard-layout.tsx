import { useState } from "react"
import { Moon, PanelLeft, Sun } from "lucide-react"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/theme/theme-provider"

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

  const isDark = theme === "dark"

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-2">
        <Button
          variant={sidebarCollapsed ? "default" : "outline"}
          size="icon"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
    </header>
  )
}

function DashboardShell() {
  return (
    <section className="flex flex-1 flex-col gap-6 bg-muted/40 px-6 py-6">
      <div className="grid gap-4 md:grid-cols-4">
        <PlaceholderCard title="Total Balance" value="$124,500.00" />
        <PlaceholderCard title="Monthly Expenses" value="$8,420.00" />
        <PlaceholderCard title="Investments" value="$65,300.00" />
        <PlaceholderCard title="Savings Rate" value="32%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="col-span-2 rounded-xl border bg-card p-4 text-card-foreground">
          <h2 className="text-sm font-medium">Cashflow (Preview)</h2>
          <div className="mt-4 h-48 rounded-lg bg-muted" />
        </div>
        <div className="rounded-xl border bg-card p-4 text-card-foreground">
          <h2 className="text-sm font-medium">Upcoming payments</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>No payments scheduled.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

type PlaceholderCardProps = {
  title: string
  value: string
}

function PlaceholderCard({ title, value }: PlaceholderCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4 text-card-foreground">
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      <p className="mt-3 text-xl font-semibold">{value}</p>
      <div className="mt-4 h-10 rounded-md bg-muted" />
    </div>
  )
}

