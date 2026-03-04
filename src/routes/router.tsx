import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Expenses } from '@/components/expenses/expenses'
// import { DashboardOverviewPage } from '@/routes/dashboard/overview'
// import { SettingsPage } from '@/routes/dashboard/settings'

const router = createBrowserRouter([
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardShell }, // default dashboard page
      { path: 'expenses', Component: Expenses },
      // { path: 'settings', Component: SettingsPage },
    ],
  },
])

export default router
