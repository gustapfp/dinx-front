import { ChartBarNegative } from '@/components/shared/charts/bar-chart-with-negative/barChartWithNegative'
import { InvestmentDistributionChart } from '@/components/dashboard/investments/investment-distribution-chart/investmentDistributionChart'
import { RadarChartInvestment } from './radar-chart/radarChartInvestment'
import { InvestmentDistributionGrid } from './investment-distribution-grid/investmentDistributionGrid'
import { SectionHeader } from '@/components/shared/section-header/sectionHeader'

const investmentData = [
  // 2025
  { label: 'January', value: 100, date: '2025-01-15' },
  { label: 'February', value: -200, date: '2025-02-15' },
  { label: 'March', value: 300, date: '2025-03-15' },
  { label: 'April', value: 400, date: '2025-04-15' },
  { label: 'May', value: 500, date: '2025-05-15' },
  { label: 'June', value: -150, date: '2025-06-15' },
  { label: 'July', value: 620, date: '2025-07-15' },
  { label: 'August', value: 310, date: '2025-08-15' },
  { label: 'September', value: -90, date: '2025-09-15' },
  { label: 'October', value: 450, date: '2025-10-15' },
  { label: 'November', value: 530, date: '2025-11-15' },
  { label: 'December', value: 700, date: '2025-12-15' },
  // 2026
  { label: 'January', value: 210, date: '2026-01-15' },
  { label: 'February', value: -80, date: '2026-02-15' },
  { label: 'March', value: 390, date: '2026-03-15' },
]

const investmentDistributionData = [
  { name: 'Stocks', value: 100 },
  { name: 'Bonds', value: 200 },
  { name: 'Real Estate', value: 300 },
  { name: 'Cash', value: 400 },
  { name: 'Crypto', value: 500 },
  { name: 'Other', value: 600 },
]

const distributionCategories = [
  {
    name: 'Renda Fixa',
    items: [
      { name: 'CDB', value: 400 },
      { name: 'LCI', value: 250 },
      { name: 'Tesouro Selic', value: 350 },
      { name: 'Tesouro IPCA', value: 150 },
    ],
    colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#cbd5e1'],
  },
  {
    name: 'Ações',
    items: [
      { name: 'PETR4', value: 300 },
      { name: 'VALE3', value: 200 },
      { name: 'ITUB4', value: 180 },
      { name: 'BBDC4', value: 120 },
    ],
    colors: ['#22c55e', '#4ade80', '#86efac', '#bbf7d0'],
  },
  {
    name: 'Imobiliários',
    items: [
      { name: 'BTLG11', value: 280 },
      { name: 'CPTS11', value: 190 },
      { name: 'KNUQ11', value: 130 },
    ],
    colors: ['#f59e0b', '#fbbf24', '#fde68a'],
  },
  {
    name: 'Crypto',
    items: [
      { name: 'Bitcoin', value: 500 },
      { name: 'Ethereum', value: 220 },
      { name: 'Others', value: 80 },
    ],
    colors: ['#a855f7', '#c084fc', '#e9d5ff'],
  },
]

export default function Investments() {
  return (
    <>
      <SectionHeader
        title="Investments"
        description="Overview of your investments"
      />
      <div className="flex flex-col gap-4 mt-8 px-8">
        <ChartBarNegative
          data={investmentData}
          title="Investment Performance"
          description="Monthly performance across all holdings"
        />
      </div>

      <div className="flex flex-row w-full justify-between px-8 my-8">
        <InvestmentDistributionChart
          data={investmentDistributionData}
          title="Investment Distribution"
          subtitle="Distribution of investments across all holdings"
          className="w-full mr-5"
        />
        <RadarChartInvestment
          data={[
            { axis: 'Stocks', value: 80 },
            { axis: 'Bonds', value: 60 },
            { axis: 'Crypto', value: 40 },
            { axis: 'Cash', value: 90 },
          ]}
          title="Portfolio Risk Profile"
          description="Allocation across asset classes"
          color="oklch(29.1% 0.149 302.717)"
          className="w-full ml-4"
        />
      </div>

      <div className="px-8 mb-8">
        <InvestmentDistributionGrid categories={distributionCategories} />
      </div>
    </>
  )
}
