'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return

  const domain = window.location.hostname
  let cookieDomain = ''

  if (domain === 'localhost' || domain === '127.0.0.1') {
    cookieDomain = ''
  } else {
    const mainDomain = domain.includes('meuchadigital.com')
      ? 'meuchadigital.com'
      : domain.split('.').slice(-2).join('.')
    cookieDomain = `domain=.${mainDomain};`
  }

  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/;${cookieDomain}SameSite=Lax`
}

export function ThemeProvider({
  children,
  serverTheme
}: {
  children: React.ReactNode
  serverTheme?: Theme
}) {
  const [theme, setTheme] = useState<Theme>(serverTheme || 'light')

  useEffect(() => {
    const savedTheme = getCookie('theme') as Theme | null

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')

    if (!savedTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    setCookie('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}