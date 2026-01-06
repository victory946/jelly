// Enable client-side rendering for this component
"use client";

// Import React and utility functions for class name merging
import React from "react";
import { cn } from "@/lib/utils";

// Type for spinner size - can be predefined sizes or custom number in pixels
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

/**
 * Props interface for the LoadingSpinner component
 * Extends standard HTML div attributes
 */
export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Size of the spinner - predefined or custom number
  size?: SpinnerSize;
  // Thickness of the spinner stroke
  thickness?: number;
  // Color variant - default, accent, or muted
  variant?: "default" | "accent" | "muted";
  // Optional label text to display below spinner
  label?: string;
  // Whether to center the spinner
  center?: boolean;
  // Whether to show full-screen overlay with the spinner
  withOverlay?: boolean;
  // Accessibility label for screen readers
  ariaLabel?: string;
}

// Map predefined size names to Tailwind CSS width and height classes
const sizeMap: Record<Exclude<SpinnerSize, number>, string> = {
  // Extra small spinner (16x16px)
  xs: "w-4 h-4",
  // Small spinner (20x20px)
  sm: "w-5 h-5",
  // Medium spinner (24x24px) - default size
  md: "w-6 h-6",
  // Large spinner (32x32px)
  lg: "w-8 h-8",
  // Extra large spinner (40x40px)
  xl: "w-10 h-10",
};

/**
 * LoadingSpinner Component
 * Customizable rotating spinner with optional overlay and label
 * Provides accessible loading indicator with multiple size and color options
 */
export default function LoadingSpinner({
  size = "md",
  thickness = 3,
  variant = "default",
  label,
  center = true,
  withOverlay = false,
  ariaLabel = "Loading",
  className,
  ...props
}: LoadingSpinnerProps) {
  // Determine text color based on the selected variant
  const colorClass =
    variant === "accent"
      ? "text-accent"
      : variant === "muted"
      ? "text-muted-foreground"
      : "text-primary";

  // Get the CSS class for the size (or empty string for custom numeric size)
  const sizeClass =
    typeof size === "number" ? "" : sizeMap[size] ?? sizeMap.md;

  // Create inline style for custom numeric sizes
  const sizeStyle =
    typeof size === "number"
      ? { width: size, height: size }
      : undefined;

  // SVG spinner element with rotation animation
  const spinner = (
    <svg
      className={cn(
        // Apply rotation animation
        "animate-spin",
        sizeClass,
        colorClass
      )}
      style={sizeStyle}
      viewBox="0 0 24 24"
      role="img"
      // Hidden from screen readers since the wrapper has the accessible label
      aria-hidden
    >
      {/* Background ring - partially transparent */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={thickness}
        className="opacity-20"
        fill="none"
      />

      {/* Foreground arc - the animated rotating part */}
      <path
        fill="currentColor"
        d="M22 12a10 10 0 0 0-10-10v4a6 6 0 0 1 6 6h4z"
        className="opacity-90"
      />
    </svg>
  );

  // Content wrapper with spinner and optional label
  const content = (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        // Center the spinner if center prop is true
        center && "justify-center",
        className
      )}
      // Accessibility role to indicate loading state
      role="status"
      aria-label={ariaLabel}
      {...props}
    >
      {/* Render the spinner SVG */}
      {spinner}
      {/* Render optional label text with pulsing animation */}
      {label && (
        <span className="text-sm text-muted-foreground animate-pulse">
          {label}
        </span>
      )}
    </div>
  );

  // If withOverlay is true, render spinner on a full-screen overlay
  if (withOverlay) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center">
        {/* Semi-transparent glass morphism overlay covering entire screen */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />

        {/* Spinner container card centered on overlay */}
        <div className="relative z-10 rounded-2xl border bg-card px-6 py-5 shadow-xl">
          {content}
        </div>
      </div>
    );
  }

  // Return spinner content without overlay
  return content;
}
