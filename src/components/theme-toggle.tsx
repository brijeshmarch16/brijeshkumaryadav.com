"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <SunIcon size={14} className="dark:hidden" />
      <MoonIcon size={14} className="hidden dark:block" />
      {mounted && (
        <span className="ml-1.5 text-xs">{resolvedTheme === "dark" ? "Light" : "Dark"}</span>
      )}
    </Button>
  );
}
