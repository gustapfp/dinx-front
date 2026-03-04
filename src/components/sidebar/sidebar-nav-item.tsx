// at top
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

type SidebarItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  to: string
}

// in SidebarNavItem
type SidebarNavItemProps = {
  item: SidebarItem
  collapsed: boolean
}

export function SidebarNavItem({ item, collapsed }: SidebarNavItemProps) {
  const Icon = item.icon
  const navigate = useNavigate()
  const location = useLocation()

  const isActive =
    item.to === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.to)

  const variant = isActive ? 'default' : 'ghost'

  return (
    <Button
      onClick={() => navigate(item.to)} // ⬅️ navigate
      variant={variant}
      size="sm"
      className={cn(
        'group flex w-full items-center justify-start gap-2 rounded-lg px-3',
        collapsed && 'justify-center px-0',
        isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
      {!collapsed && <span className="text-sm">{item.label}</span>}
    </Button>
  )
}
