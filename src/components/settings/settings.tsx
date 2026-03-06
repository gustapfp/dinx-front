import * as React from 'react'
import { Building2, CheckCircle2, Globe, Plus, Trash2, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { SectionHeader } from '../shared/section-header/sectionHeader'

// ─── Data ──────────────────────────────────────────────────────────────────

type Bank = {
  id: string
  name: string
  color: string
  textColor: string
  description: string
  logo: string // emoji / initials fallback
}

const AVAILABLE_BANKS: Bank[] = [
  {
    id: 'nubank',
    name: 'Nubank',
    color: '#820AD1',
    textColor: '#ffffff',
    description: 'Conta digital, cartão de crédito e investimentos',
    logo: 'Nu',
  },
  {
    id: 'inter',
    name: 'Banco Inter',
    color: '#FF7A00',
    textColor: '#ffffff',
    description: 'Banco digital completo com cashback',
    logo: 'In',
  },
  {
    id: 'itau',
    name: 'Itaú',
    color: '#EC7000',
    textColor: '#ffffff',
    description: 'Um dos maiores bancos do Brasil',
    logo: 'It',
  },
  {
    id: 'bradesco',
    name: 'Bradesco',
    color: '#CC1818',
    textColor: '#ffffff',
    description: 'Banco com ampla rede de agências',
    logo: 'Br',
  },
  {
    id: 'bb',
    name: 'Banco do Brasil',
    color: '#F9DD16',
    textColor: '#003882',
    description: 'Maior banco público do país',
    logo: 'BB',
  },
  {
    id: 'santander',
    name: 'Santander',
    color: '#EC0000',
    textColor: '#ffffff',
    description: 'Banco multinacional com presença nacional',
    logo: 'Sa',
  },
  {
    id: 'c6',
    name: 'C6 Bank',
    color: '#242424',
    textColor: '#ffffff',
    description: 'Banco digital com conta global',
    logo: 'C6',
  },
  {
    id: 'xp',
    name: 'XP Investimentos',
    color: '#1C1C1E',
    textColor: '#ffffff',
    description: 'Plataforma de investimentos',
    logo: 'XP',
  },
]

const CURRENCIES = [
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$', flag: '🇧🇷' },
  { code: 'USD', name: 'Dólar Americano', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£', flag: '🇬🇧' },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$', flag: '🇦🇷' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '🟡' },
]

// ─── Settings Page ─────────────────────────────────────────────────────────

export function Settings() {
  const [connectedBanks, setConnectedBanks] = React.useState<string[]>(['nubank', 'inter'])
  const [currency, setCurrency] = React.useState('BRL')
  const [saved, setSaved] = React.useState(false)

  function toggleBank(id: string) {
    setConnectedBanks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency)

  return (
    
    <div className="flex flex-col gap-8 px-6 py-8 max-w-4xl mx-auto">
      <SectionHeader
        title='Settings'
        description='Manage your connected banks, currency preferences and account configuration.'
        />

      {/* ── Currency Section ─────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Currency</h2>
        </div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Display Currency</CardTitle>
            <CardDescription>
              All balances, charts and reports will be shown in this currency.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue>
                    {selectedCurrency && (
                      <span className="flex items-center gap-2">
                        <span>{selectedCurrency.flag}</span>
                        <span>{selectedCurrency.code} — {selectedCurrency.name}</span>
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span className="font-medium">{c.code}</span>
                        <span className="text-muted-foreground">{c.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Preview badge */}
              {selectedCurrency && (
                <div className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Preview:</span>
                  <span className="font-semibold">
                    {selectedCurrency.symbol} 1.234,56
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Connected Banks Section ──────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Connected Banks</h2>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Bank Institutions</CardTitle>
            <CardDescription>
              Select the banks and financial institutions you want to sync with Dinx.
              {connectedBanks.length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {connectedBanks.length} connected
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AVAILABLE_BANKS.map((bank) => {
                const isConnected = connectedBanks.includes(bank.id)
                return (
                  <button
                    key={bank.id}
                    onClick={() => toggleBank(bank.id)}
                    className={`
                      group relative flex items-center gap-4 rounded-xl border p-4 text-left
                      transition-all duration-150 hover:shadow-md
                      ${isConnected
                        ? 'border-primary/40 bg-primary/5 shadow-sm'
                        : 'border-border bg-card hover:border-primary/20'
                      }
                    `}
                  >
                    {/* Bank logo */}
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold shadow-sm"
                      style={{ backgroundColor: bank.color, color: bank.textColor }}
                    >
                      {bank.logo}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm leading-tight">{bank.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-1">
                        {bank.description}
                      </p>
                    </div>

                    {/* Status icon */}
                    <div className="shrink-0">
                      {isConnected ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Plus className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Connected list summary */}
            {connectedBanks.length > 0 && (
              <div className="mt-5 rounded-lg border border-dashed p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Connected accounts
                </p>
                <div className="flex flex-col gap-2">
                  {connectedBanks.map((id) => {
                    const bank = AVAILABLE_BANKS.find((b) => b.id === id)!
                    return (
                      <div key={id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold"
                            style={{ backgroundColor: bank.color, color: bank.textColor }}
                          >
                            {bank.logo}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{bank.name}</p>
                            <p className="text-xs text-muted-foreground">Sync enabled · Last updated just now</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleBank(id)}
                          className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ── Save Button ──────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Button variant="outline" onClick={() => { setConnectedBanks([]); setCurrency('BRL') }}>
          Reset to defaults
        </Button>
        <Button onClick={handleSave} className="min-w-[120px]">
          {saved ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Saved!
            </span>
          ) : (
            'Save changes'
          )}
        </Button>
      </div>
    </div>
  )
}
