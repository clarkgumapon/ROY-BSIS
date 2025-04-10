'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface SettingsContextType {
  currency: string;
  monthlyBudget: number;
  darkMode: boolean;
  setCurrency: (currency: string) => void;
  setMonthlyBudget: (budget: number) => void;
  setDarkMode: (enabled: boolean) => void;
  saveSettings: () => void;
  resetSettings: () => void;
}

const defaultSettings = {
  currency: 'PHP',
  monthlyBudget: 2000,
  darkMode: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const [currency, setCurrency] = useState(defaultSettings.currency);
  const [monthlyBudget, setMonthlyBudget] = useState(defaultSettings.monthlyBudget);
  const [darkMode, setDarkMode] = useState(defaultSettings.darkMode);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('expense-tracker-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setCurrency(settings.currency);
      setMonthlyBudget(settings.monthlyBudget);
      setDarkMode(settings.darkMode);
      setTheme(settings.darkMode ? 'dark' : 'light');
    }
  }, [setTheme]);

  const saveSettings = () => {
    const settings = {
      currency,
      monthlyBudget,
      darkMode,
    };
    localStorage.setItem('expense-tracker-settings', JSON.stringify(settings));
    setTheme(darkMode ? 'dark' : 'light');
  };

  const resetSettings = () => {
    setCurrency(defaultSettings.currency);
    setMonthlyBudget(defaultSettings.monthlyBudget);
    setDarkMode(defaultSettings.darkMode);
    setTheme(defaultSettings.darkMode ? 'dark' : 'light');
    localStorage.removeItem('expense-tracker-settings');
  };

  return (
    <SettingsContext.Provider
      value={{
        currency,
        monthlyBudget,
        darkMode,
        setCurrency,
        setMonthlyBudget,
        setDarkMode,
        saveSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 