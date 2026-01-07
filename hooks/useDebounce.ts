// Import React hooks for state and effect management
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook for debouncing values or functions
 * Delays updates to prevent excessive function calls or re-renders
 * Useful for search inputs, API calls, and form validations
 * @template T - The type of value being debounced
 * @param {T} value - The value to debounce
 * @param {number} delay - Delay in milliseconds before updating the debounced value
 * @returns {T} The debounced value that updates after the delay
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  // Reference to store the timeout ID for cleanup
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear the previous timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to update the debounced value after the specified delay
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout when component unmounts or dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for debouncing callback functions
 * Delays function execution and cancels previous pending calls
 * Useful for event handlers that trigger expensive operations
 * @template T - The callback function type
 * @param {T} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds before executing the callback
 * @returns {T} The debounced callback function
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 500
): T {
  // Reference to store the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Debounced version of the callback
   * Clears any pending execution and schedules a new one
   */
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Clear the previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Schedule the callback execution after the delay
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Cleanup function to clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback as T;
}

/**
 * Utility function to debounce a callback function outside of React
 * Useful for non-React contexts or standalone functions
 * @template T - The callback function type
 * @param {T} func - The function to debounce
 * @param {number} delay - Delay in milliseconds before executing the function
 * @returns {Object} Object with the debounced function and a cancel method
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number = 500
): { debounced: T; cancel: () => void } {
  // Store the timeout ID
  let timeoutId: NodeJS.Timeout | null = null;

  /**
   * Debounced function that delays execution
   */
  const debounced = ((...args: Parameters<T>) => {
    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Schedule the function execution after the delay
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  }) as T;

  /**
   * Cancel method to immediately clear any pending execution
   */
  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return { debounced, cancel };
}
