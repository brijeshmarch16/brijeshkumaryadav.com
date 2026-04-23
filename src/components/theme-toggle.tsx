"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useSyncExternalStore } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const emptySubscribe = () => () => {}

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  const nextTheme = mounted && resolvedTheme === "dark" ? "light" : "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      <SunIcon data-icon="inline-start" className="dark:hidden" />
      <MoonIcon data-icon="inline-start" className="hidden dark:block" />
    </Button>
  )
}
