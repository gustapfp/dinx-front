import { ChartBarNegative } from '@/components/shared/charts/bar-chart-with-negative/barChartWithNegative'

const investmentData = [
  // 2025
  { label: 'January',   value: 100,  date: '2025-01-15' },
  { label: 'February',  value: -200, date: '2025-02-15' },
  { label: 'March',     value: 300,  date: '2025-03-15' },
  { label: 'April',     value: 400,  date: '2025-04-15' },
  { label: 'May',       value: 500,  date: '2025-05-15' },
  { label: 'June',      value: -150, date: '2025-06-15' },
  { label: 'July',      value: 620,  date: '2025-07-15' },
  { label: 'August',    value: 310,  date: '2025-08-15' },
  { label: 'September', value: -90,  date: '2025-09-15' },
  { label: 'October',   value: 450,  date: '2025-10-15' },
  { label: 'November',  value: 530,  date: '2025-11-15' },
  { label: 'December',  value: 700,  date: '2025-12-15' },
  // 2026
  { label: 'January',   value: 210,  date: '2026-01-15' },
  { label: 'February',  value: -80,  date: '2026-02-15' },
  { label: 'March',     value: 390,  date: '2026-03-15' },
]

export default function Investments() {
  return (
    <>
      <div className='flex flex-col gap-4 mt-8 px-8'>
        <ChartBarNegative
          data={investmentData}
          title='Investment Performance'
          description='Monthly performance across all holdings'
        />
      </div>
    </>
  )
}
