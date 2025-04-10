import type { Expense, ExpenseCategory } from "@/context/expense-context"
import { format, subDays } from "date-fns"

// Generate dates for the past 3 months
const today = new Date()
const generatePastDate = (daysAgo: number) => format(subDays(today, daysAgo), "yyyy-MM-dd")

// Sample data for mock API
const sampleExpenses: Expense[] = [
  {
    id: "exp1",
    amount: 2500,
    category: "Food",
    description: "Grocery shopping",
    date: generatePastDate(5),
  },
  {
    id: "exp2",
    amount: 1400,
    category: "Transport",
    description: "Grab ride",
    date: generatePastDate(7),
  },
  {
    id: "exp3",
    amount: 6000,
    category: "Bills",
    description: "Electricity bill",
    date: generatePastDate(10),
  },
  {
    id: "exp4",
    amount: 4500,
    category: "Shopping",
    description: "New shirt",
    date: generatePastDate(15),
  },
  {
    id: "exp5",
    amount: 1800,
    category: "Entertainment",
    description: "Movie tickets",
    date: generatePastDate(20),
  },
  {
    id: "exp6",
    amount: 3500,
    category: "Health",
    description: "Doctor's appointment",
    date: generatePastDate(25),
  },
  {
    id: "exp7",
    amount: 10000,
    category: "Education",
    description: "Online course",
    date: generatePastDate(30),
  },
  {
    id: "exp8",
    amount: 750,
    category: "Other",
    description: "Donation",
    date: generatePastDate(35),
  },
  {
    id: "exp9",
    amount: 3200,
    category: "Food",
    description: "Restaurant dinner",
    date: generatePastDate(40),
  },
  {
    id: "exp10",
    amount: 1200,
    category: "Transport",
    description: "Taxi fare",
    date: generatePastDate(45),
  },
  {
    id: "exp11",
    amount: 5500,
    category: "Bills",
    description: "Water bill",
    date: generatePastDate(50),
  },
  {
    id: "exp12",
    amount: 8000,
    category: "Shopping",
    description: "New shoes",
    date: generatePastDate(55),
  },
  {
    id: "exp13",
    amount: 2500,
    category: "Entertainment",
    description: "Concert tickets",
    date: generatePastDate(60),
  },
  {
    id: "exp14",
    amount: 1500,
    category: "Health",
    description: "Medicine",
    date: generatePastDate(65),
  },
  {
    id: "exp15",
    amount: 7500,
    category: "Education",
    description: "Books",
    date: generatePastDate(70),
  },
  {
    id: "exp16",
    amount: 1000,
    category: "Other",
    description: "Gift",
    date: generatePastDate(75),
  },
]

// Mock API functions
export const mockFetchExpenses = async (): Promise<Expense[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...sampleExpenses]
}

export const mockAddExpense = async (expense: Omit<Expense, "id">): Promise<Expense> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const newExpense = {
    ...expense,
    id: Math.random().toString(36).substring(2, 9),
  }
  return newExpense
}

export const mockUpdateExpense = async (id: string, expense: Partial<Expense>): Promise<Expense> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const existingExpense = sampleExpenses.find((e) => e.id === id)
  if (!existingExpense) {
    throw new Error("Expense not found")
  }
  return { ...existingExpense, ...expense }
}

export const mockDeleteExpense = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  // In a real API, this would delete the expense
}

export const categories: ExpenseCategory[] = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Other",
]

export const categoryColors: Record<ExpenseCategory, string> = {
  Food: "#FF5B8D",
  Transport: "#4F7FFA",
  Bills: "#FFB800",
  Shopping: "#0CC0A3",
  Entertainment: "#9D4EDD",
  Health: "#FF8A48",
  Education: "#637BD1",
  Other: "#6A7280",
}

