import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWeight(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return value.toFixed(1);
}
