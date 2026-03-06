import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '@/components/dashboard/main/dashboard-layout'
import { DashboardShell } from '@/components/dashboard/main/dashboard-shell'
import { Expenses } from '@/components/dashboard/expenses/expenses'
import Investments from '@/components/dashboard/investments/investments'
import { Settings } from '@/components/settings/settings'

const router = createBrowserRouter([
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardShell }, // default dashboard page
      { path: 'expenses', Component: Expenses },
      { path: 'investments', Component: Investments },
      { path: 'settings', Component: Settings },
    ],
  },
])

export default router
