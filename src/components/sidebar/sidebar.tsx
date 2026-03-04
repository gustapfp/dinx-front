import {
  BarChart3,
  CreditCard,
  LineChart,
  PiggyBank,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import type { SidebarItem } from './types'
import { SidebarNavItem } from './sidebar-nav-item'

const primaryItems: SidebarItem[] = [
  { label: 'Overview', icon: BarChart3, to: '/' },
  { label: 'Analytics', icon: LineChart, to: '/analytics' },
  { label: 'Expenses', icon: CreditCard, to: '/expenses' },
  { label: 'Investments', icon: PiggyBank, to: '/investments' },
]

const secondaryItems: SidebarItem[] = [
  { label: 'Settings', icon: Settings, to: '/settings' },
]

type SidebarProps = {
  collapsed: boolean
}

export function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex min-h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center gap-2 px-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-lg font-semibold">
            D
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Dinx Finance
              </span>
              <span className="text-xs text-muted-foreground">
                Control your money
              </span>
            </div>
          )}
        </div>
      </div>

      <Separator className="mx-3" />

      <nav className="flex-1 space-y-4 overflow-hidden px-2 py-4">
        <div>
          {!collapsed && (
            <p className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Main
            </p>
          )}
          <div className="mt-2 space-y-1">
            {primaryItems.map((item) => (
              <SidebarNavItem
                key={item.label}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>

        <div>
          {!collapsed && (
            <p className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Other
            </p>
          )}
          <div className="mt-2 space-y-1">
            {secondaryItems.map((item) => (
              <SidebarNavItem
                key={item.label}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4 text-xs text-muted-foreground">
        {!collapsed ? (
          <>
            <p>Logged in as</p>
            <p className="font-medium text-foreground">you@example.com</p>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-[10px] font-medium uppercase tracking-wide">
              Account
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}
