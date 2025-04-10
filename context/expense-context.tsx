"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Bills"
  | "Shopping"
  | "Entertainment"
  | "Health"
  | "Education"
  | "Other"

export interface Expense {
  id: string
  amount: number
  category: ExpenseCategory
  description: string
  date: string
}

export interface UserSettings {
  currency: string
  darkMode: boolean
  monthlyBudget: number
}

interface ExpenseContextType {
  expenses: Expense[]
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>
  updateExpense: (id: string, expense: Partial<Expense>) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
  isLoading: boolean
  settings: UserSettings
  updateSettings: (settings: Partial<UserSettings>) => void
  totalExpenses: number
  remainingBudget: number
  expensesByCategory: Record<ExpenseCategory, number>
  filterExpenses: (startDate?: string, endDate?: string, category?: ExpenseCategory) => Expense[]
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined)

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [settings, setSettings] = useState<UserSettings>({
    currency: "PHP",
    darkMode: false,
    monthlyBudget: 2000,
  })

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const addExpense = async (expense: Omit<Expense, "id">) => {
    setIsLoading(true)
    try {
      // Mock API call
      const newExpense = {
        ...expense,
        id: Math.random().toString(36).substring(2, 9),
      }
      setExpenses((prev) => [newExpense, ...prev])
      showNotification("Expense added successfully")
    } catch (error) {
      console.error("Failed to add expense:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateExpense = async (id: string, updatedExpense: Partial<Expense>) => {
    setIsLoading(true)
    try {
      // Mock API call
      setExpenses((prev) => prev.map((expense) => (expense.id === id ? { ...expense, ...updatedExpense } : expense)))
      showNotification("Expense updated successfully")
    } catch (error) {
      console.error("Failed to update expense:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteExpense = async (id: string) => {
    setIsLoading(true)
    try {
      // Mock API call
      setExpenses((prev) => prev.filter((expense) => expense.id !== id))
      showNotification("Expense deleted successfully")
    } catch (error) {
      console.error("Failed to delete expense:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
    showNotification("Settings updated successfully")
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Calculate remaining budget
  const remainingBudget = settings.monthlyBudget - totalExpenses

  // Calculate expenses by category
  const expensesByCategory = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<ExpenseCategory, number>,
  )

  // Filter expenses by date range and category
  const filterExpenses = (startDate?: string, endDate?: string, category?: ExpenseCategory) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      const isAfterStart = startDate ? expenseDate >= new Date(startDate) : true
      const isBeforeEnd = endDate ? expenseDate <= new Date(endDate) : true
      const isCategory = category ? expense.category === category : true

      return isAfterStart && isBeforeEnd && isCategory
    })
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        isLoading,
        settings,
        updateSettings,
        totalExpenses,
        remainingBudget,
        expensesByCategory,
        filterExpenses,
      }}
    >
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Alert>
              <AlertTitle>Notification</AlertTitle>
              <AlertDescription>{notification}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </ExpenseContext.Provider>
  )
}

export function useExpense() {
  const context = useContext(ExpenseContext)
  if (context === undefined) {
    throw new Error("useExpense must be used within an ExpenseProvider")
  }
  return context
}

