import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Budgets } from '@/components/dashboard/expenses/budget/budgets'
import { Transactions } from '@/components/dashboard/expenses/transactions/transactions'

export function Expenses() {
  return (
    <>
      <section className="flex flex-1 flex-col gap-4 bg-muted/40 px-4 py-4 sm:gap-5 sm:px-5 sm:py-5 md:gap-6 md:px-6 md:py-6">
        <div className="mt-4">
          <Tabs defaultValue="transactions" className="">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="budgets">Budgets</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions">
              <Transactions />
            </TabsContent>
            <TabsContent value="budgets">
              <Budgets />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
