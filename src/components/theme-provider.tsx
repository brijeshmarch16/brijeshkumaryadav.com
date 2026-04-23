"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = Exclude<Theme, "system">

type ThemeProviderProps = {
  children: ReactNode
  attribute?: "class"
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const storageKey = "theme"
const systemThemeQuery = "(prefers-color-scheme: dark)"

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(systemThemeQuery).matches ? "dark" : "light"
}

function getStoredTheme(defaultTheme: Theme): Theme {
  if (typeof window === "undefined") {
    return defaultTheme
  }

  const storedTheme = localStorage.getItem(storageKey)

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme
  }

  return defaultTheme
}

function temporarilyDisableTransitions() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode("*{transition:none!important}")
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    setTimeout(() => {
      document.head.removeChild(style)
    }, 1)
  }
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    getStoredTheme(defaultTheme)
  )
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    typeof window === "undefined" ? "light" : getSystemTheme()
  )

  const resolvedTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    const mediaQuery = window.matchMedia(systemThemeQuery)
    const handleChange = () => setSystemTheme(getSystemTheme())

    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (attribute !== "class") {
      return
    }

    const enableTransitions = disableTransitionOnChange
      ? temporarilyDisableTransitions()
      : null
    const root = document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    root.style.colorScheme = resolvedTheme

    enableTransitions?.()
  }, [attribute, disableTransitionOnChange, resolvedTheme])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    localStorage.setItem(storageKey, nextTheme)
  }, [])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return
      }

      setThemeState(getStoredTheme(defaultTheme))
    }

    window.addEventListener("storage", handleStorage)

    return () => window.removeEventListener("storage", handleStorage)
  }, [defaultTheme])

  const value = useMemo(
    (): ThemeContextValue => ({
      theme,
      resolvedTheme: enableSystem || theme !== "system" ? resolvedTheme : "light",
      setTheme,
    }),
    [enableSystem, resolvedTheme, setTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.")
  }

  return context
}
