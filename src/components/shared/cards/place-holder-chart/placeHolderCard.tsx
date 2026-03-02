import type { PlaceholderCardProps } from './type'

export function PlaceholderCard({ title, value }: PlaceholderCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4 text-card-foreground">
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      <p className="mt-3 text-xl font-semibold">{value}</p>
      {/* <div className="mt-4 h-10 rounded-md bg-muted" /> */}
    </div>
  )
}
