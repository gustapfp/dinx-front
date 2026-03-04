import { useState } from 'react'
import { Moon, PanelLeft, Sun } from 'lucide-react'

import { Sidebar } from '@/components/sidebar/sidebar'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/theme/theme-provider'
import { Outlet } from 'react-router'

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      <main className="flex min-w-0 flex-1 flex-col">
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />
        <Outlet />
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
    <header className="flex h-14 items-center justify-between border-b px-4 sm:h-16 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button
          className="shrink-0"
          variant={sidebarCollapsed ? 'default' : 'outline'}
          size="icon"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onToggleSidebar}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        <div className="hidden min-w-0 flex-col text-left sm:flex">
          <h1 className="truncate text-sm font-semibold tracking-tight">
            Overview
          </h1>
          <p className="truncate text-xs text-muted-foreground">
            High-level view of your finances.
          </p>
        </div>
      </div>
      <Button
        className="shrink-0"
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
