import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseBold(text: string): { text: string; bold: boolean }[] {
  return text.split(/(\*\*.*?\*\*)/).map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return { text: part.slice(2, -2), bold: true }
    }
    return { text: part, bold: false }
  })
}
