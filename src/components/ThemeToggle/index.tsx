'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-dark dark:hover:bg-gray-light transition-colors text-text-primary"
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
      title={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}