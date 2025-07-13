import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// No updates needed for formatPercentage function

// No updates needed for formatKD function

// No updates needed for getRoleColor function

// No updates needed for calculateTeamAverage function

// No updates needed for formatDate function
