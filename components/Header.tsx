// Enable client-side rendering for this component
"use client";

// Import React hooks
import React, { useState } from "react";
// Import Clerk authentication components and hooks
import { SignInButton, UserButton } from "@clerk/nextjs";
// Import Convex authentication state components
import { Authenticated, Unauthenticated } from "convex/react";
// Import Next.js navigation utilities
import Link from "next/link";
import { usePathname } from "next/navigation";
// Import custom button component
import { Button } from "./ui/button";
// Import theme management hook
import { useTheme } from "next-themes";

/**
 * Header Component
 * Navigation header with authentication state handling
 * Displays different UI for authenticated vs unauthenticated users
 * Includes theme toggle and responsive mobile menu
 */
function Header() {
  // Get current page pathname
  const pathname = usePathname();
  // Check if currently on the dashboard page
  const isDashboard = pathname?.startsWith("/dashboard");
  // Track mobile menu open/closed state
  const [open, setOpen] = useState(false);
  // Get current theme and function to change it
  const { theme, setTheme } = useTheme();

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  /**
   * Close mobile menu
   */
  const closeMobile = () => setOpen(false);

  // Render the header with navigation
  return (
    <header className="relative w-full border-b border-border/50 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center bg-background/80 backdrop-blur-md z-50">
      {/* Logo/Brand */}
      <Link href="/" className="font-bold text-lg">JELLY</Link>

      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden sm:flex items-center gap-3">
        {/* Show only when user is authenticated */}
        <Authenticated>
          {/* Dashboard link - only show if not already on dashboard */}
          {!isDashboard && (
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          )}
          {/* Theme toggle button */}
          <Button
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
          {/* Clerk user menu button */}
          <UserButton />
        </Authenticated>

        {/* Show only when user is not authenticated */}
        <Unauthenticated>
          {/* Sign in button */}
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          {/* Theme toggle button */}
          <Button
            variant="ghost"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
        </Unauthenticated>
      </nav>

      {/* Mobile Menu Toggle Button - Shown only on mobile */}
      <button
        className="sm:hidden p-2 border rounded-md"
        onClick={() => setOpen(!open)}
        aria-label="toggle-menu"
      >
        {/* Display hamburger or close icon based on menu state */}
        {open ? "✖" : "☰"}
      </button>

      {/* Mobile Dropdown Menu - Shown only when open on mobile */}
      {open && (
        <div className="absolute left-0 top-full w-full mt-2 px-4 py-3 bg-background shadow-lg border-t flex flex-col gap-3 sm:hidden">
          {/* Show only when user is authenticated */}
          <Authenticated>
            {/* Dashboard link - only show if not already on dashboard */}
            {!isDashboard && (
              <Link href="/dashboard" onClick={closeMobile}>
                <Button variant="outline" className="w-full">
                  Dashboard
                </Button>
              </Link>
            )}
            {/* Clerk user menu button */}
            <UserButton />
          </Authenticated>

          {/* Show only when user is not authenticated */}
          <Unauthenticated>
            {/* Sign in button */}
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button variant="outline" className="w-full" onClick={closeMobile}>
                Sign In
              </Button>
            </SignInButton>
          </Unauthenticated>

          {/* Theme toggle button (Mobile) - Shows with descriptive text */}
          <Button variant="outline" className="w-full" onClick={toggleTheme}>
            {theme === "light" ? "Switch to Dark 🌙" : "Switch to Light ☀️"}
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
