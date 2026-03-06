import type { InvestmentDistributionItem } from '../investment-distribution-chart/investmentDistributionChart'

export type InvestmentDistributionCategory = {
  /** Category name shown as the section label (e.g. "Renda Fixa", "Ações") */
  name: string
  /** Segments to display in the donut chart for this category */
  items: InvestmentDistributionItem[]
  /** Optional per-category color palette — falls back to the component default */
  colors?: string[]
}
