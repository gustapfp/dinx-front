import {
  BarChart3,
  CreditCard,
  LineChart,
  PiggyBank,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type SidebarItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
}

const primaryItems: SidebarItem[] = [
  { label: 'Overview', icon: BarChart3, active: true },
  { label: 'Analytics', icon: LineChart },
  { label: 'Expenses', icon: CreditCard },
  { label: 'Investments', icon: PiggyBank },
]

const secondaryItems: SidebarItem[] = [{ label: 'Settings', icon: Settings }]

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

type SidebarNavItemProps = {
  item: SidebarItem
  collapsed: boolean
}

function SidebarNavItem({ item, collapsed }: SidebarNavItemProps) {
  const Icon = item.icon
  const variant = item.active ? 'default' : 'ghost'

  return (
    <Button
      variant={variant}
      size="sm"
      className={cn(
        'group flex w-full items-center justify-start gap-2 rounded-lg px-3',
        collapsed && 'justify-center px-0',
        item.active && 'bg-sidebar-primary text-sidebar-primary-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
      {!collapsed && <span className="text-sm">{item.label}</span>}
    </Button>
  )
}
