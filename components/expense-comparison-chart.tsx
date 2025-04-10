"use client"

import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label as RechartLabel,
} from "recharts"
import { motion } from "framer-motion"
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, isSameMonth } from "date-fns"

import { useExpense } from "@/context/expense-context"

interface MonthlyComparison {
  month: string
  actual: number
  budget: number
}

export function ExpenseComparisonChart() {
  const { expenses, settings } = useExpense()
  const [chartData, setChartData] = useState<MonthlyComparison[]>([])

  useEffect(() => {
    if (expenses.length === 0) return

    // Sort expenses by date
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Get the first and last date from expenses
    const firstDate = parseISO(sortedExpenses[0].date)
    const lastDate = parseISO(sortedExpenses[sortedExpenses.length - 1].date)

    // Create a range of months from first expense to last expense
    const startDate = startOfMonth(firstDate)
    const endDate = endOfMonth(lastDate)

    // Generate all months in the range
    const months = eachMonthOfInterval({ start: startDate, end: endDate })

    // Create data for each month
    const monthlyData = months.map((month) => {
      // Sum expenses for this month
      const monthExpenses = expenses.filter((expense) => isSameMonth(parseISO(expense.date), month))
      const totalAmount = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0)

      return {
        month: format(month, "MMM yyyy"),
        actual: totalAmount,
        budget: settings.monthlyBudget,
      }
    })

    setChartData(monthlyData)
  }, [expenses, settings.monthlyBudget])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: settings.currency,
    }).format(value)
  }

  if (chartData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No expense data available</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full relative overflow-hidden rounded-lg p-2"
      whileHover={{ 
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        scale: 1.01,
        transition: { duration: 0.3 }
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => formatCurrency(value).split(".")[0]} />
          <Tooltip formatter={(value: number) => [formatCurrency(value), "Amount"]} />
          <Legend />
          <ReferenceLine y={settings.monthlyBudget} stroke="red" strokeDasharray="3 3">
            <RechartLabel value="Budget Limit" position="insideTopRight" />
          </ReferenceLine>
          <Bar dataKey="actual" name="Actual Spending" fill="#8884d8" />
          <Bar dataKey="budget" name="Monthly Budget" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

