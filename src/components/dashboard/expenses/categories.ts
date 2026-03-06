import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  CreditCard,
  HeartPulse,
  HandHeart,
  Home,
  Plane,
  ShoppingCart,
  Ticket,
  Train,
  Wrench,
} from 'lucide-react'

export type ExpenseCategoryId =
  | 'Saúde'
  | 'Moradia'
  | 'Mercado'
  | 'Educação'
  | 'Imposto'
  | 'Doação'
  | 'Transporte'
  | 'Viagem'
  | 'Entretenimento'
  | 'Ferramentas de Trabalho'
  | 'Fatura Cartão de Crédito'

export interface ExpenseCategoryConfig {
  id: ExpenseCategoryId
  /** User-facing label (Portuguese). */
  label: ExpenseCategoryId
  /** Icon used in tables/cards. */
  Icon: LucideIcon
  /** Primary color for this category (used in icons and charts). */
  color: string
}

export const EXPENSE_CATEGORIES: Record<ExpenseCategoryId, ExpenseCategoryConfig> =
  {
    Saúde: {
      id: 'Saúde',
      label: 'Saúde',
      Icon: HeartPulse,
      color: 'oklch(65% 0.18 10)',
    },
    Moradia: {
      id: 'Moradia',
      label: 'Moradia',
      Icon: Home,
      color: 'oklch(60% 0.16 150)',
    },
    Mercado: {
      id: 'Mercado',
      label: 'Mercado',
      Icon: ShoppingCart,
      color: 'oklch(70% 0.17 85)',
    },
    Educação: {
      id: 'Educação',
      label: 'Educação',
      Icon: Briefcase,
      color: 'oklch(62% 0.19 260)',
    },
    Imposto: {
      id: 'Imposto',
      label: 'Imposto',
      Icon: Ticket,
      color: 'oklch(58% 0.17 35)',
    },
    Doação: {
      id: 'Doação',
      label: 'Doação',
      Icon: HandHeart,
      color: 'oklch(68% 0.2 355)',
    },
    Transporte: {
      id: 'Transporte',
      label: 'Transporte',
      Icon: Train,
      color: 'oklch(64% 0.18 210)',
    },
    Viagem: {
      id: 'Viagem',
      label: 'Viagem',
      Icon: Plane,
      color: 'oklch(70% 0.19 230)',
    },
    Entretenimento: {
      id: 'Entretenimento',
      label: 'Entretenimento',
      Icon: Ticket,
      color: 'oklch(67% 0.2 30)',
    },
    'Ferramentas de Trabalho': {
      id: 'Ferramentas de Trabalho',
      label: 'Ferramentas de Trabalho',
      Icon: Wrench,
      color: 'oklch(63% 0.18 280)',
    },
    'Fatura Cartão de Crédito': {
      id: 'Fatura Cartão de Crédito',
      label: 'Fatura Cartão de Crédito',
      Icon: CreditCard,
      color: 'oklch(55% 0.16 340)',
    },
  }

export const expenseCategoryIds = Object.keys(
  EXPENSE_CATEGORIES
) as ExpenseCategoryId[]

export function getExpenseCategoryConfig(
  category: ExpenseCategoryId | string
): ExpenseCategoryConfig | undefined {
  if (category in EXPENSE_CATEGORIES) {
    return EXPENSE_CATEGORIES[category as ExpenseCategoryId]
  }
  return undefined
}

