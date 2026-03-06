import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { dashboardTableData } from "./types"

export function DashboardTable({ data }: { data: dashboardTableData[] }) {

  const getBalance = (): number => {
    const income = data.filter((item) => item.type === "income").reduce((acc, item) => acc + Number(item.totalAmount), 0)
    const expenses = data.filter((item) => item.type === "expense").reduce((acc, item) => acc + Number(item.totalAmount), 0)
    return income - expenses as number
  }
  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead className="text-right ">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.invoice}>
            <TableCell className="font-medium">{item.invoice}</TableCell>
            <TableCell
              className={`text-right  ${
                item.type === "income"
                  ? "text-green-500"
                  : item.type === "expense"
                    ? "text-red-500"
                    : ""
              }`}
            >
              {item.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right ">{getBalance()}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
