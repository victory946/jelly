// Import class name utility from clsx for conditional CSS classes
import { clsx, type ClassValue } from "clsx"
// Import Tailwind CSS merge utility to resolve conflicting classes
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge CSS class names
 * Combines clsx for conditional classes with twMerge for Tailwind CSS conflicts
 * This ensures that conflicting Tailwind classes are properly resolved
 * @param {...ClassValue[]} inputs - CSS class names or conditional objects
 * @returns {string} Merged and optimized CSS class string
 */
export function cn(...inputs: ClassValue[]) {
  // Use twMerge to handle Tailwind CSS class conflicts,
  // wrapped with clsx for conditional class support
  return twMerge(clsx(inputs))
}
