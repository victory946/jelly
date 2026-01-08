"use client";

import React, { useState } from "react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Jelly Header with 3D & interactive animations
 */
function Header() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  const closeMobile = () => setOpen(false);

  // 3D button hover effect
  const buttonHover = {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: { duration: 0.2 },
  };

  // Jelly logo hover effect
  const logoHover = {
    scale: 1.1,
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" },
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/30 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
        
        {/* Jelly Logo */}
        <Link href="/" className="transform-gpu">
         <motion.div
  whileHover={{
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.2 },
  }}
  animate={{
    rotate: [0, 5, -5, 0], // jelly wobble animation continuously
  }}
  transition={{
    duration: 0.6,
    repeat: Infinity,
    repeatType: "reverse" as const,
  }}
  className="text-3xl font-extrabold tracking-tight text-primary cursor-pointer select-none"
>
  JELLY
</motion.div>

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-4">
          <Authenticated>
            {!isDashboard && (
              <Link href="/dashboard">
                <motion.div whileHover={buttonHover}>
                  <Button variant="outline">Dashboard</Button>
                </motion.div>
              </Link>
            )}
            <motion.div whileHover={buttonHover}>
              <Button
                variant="ghost"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </Button>
            </motion.div>
            <UserButton />
          </Authenticated>

          <Unauthenticated>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <motion.div whileHover={buttonHover}>
                <Button variant="outline">Sign In</Button>
              </motion.div>
            </SignInButton>
            <motion.div whileHover={buttonHover}>
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === "light" ? "🌙" : "☀️"}
              </Button>
            </motion.div>
          </Unauthenticated>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden p-2 rounded-md border border-border hover:bg-muted transition-all"
          onClick={() => setOpen(!open)}
          aria-label="toggle-menu"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden px-4 py-3 bg-background shadow-lg border-t border-border flex flex-col gap-3"
          >
            <Authenticated>
              {!isDashboard && (
                <Link href="/dashboard" onClick={closeMobile}>
                  <motion.div whileHover={buttonHover}>
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </motion.div>
                </Link>
              )}
              <UserButton />
            </Authenticated>

            <Unauthenticated>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <motion.div whileHover={buttonHover}>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={closeMobile}
                  >
                    Sign In
                  </Button>
                </motion.div>
              </SignInButton>
            </Unauthenticated>

            <motion.div whileHover={buttonHover}>
              <Button
                variant="outline"
                className="w-full"
                onClick={toggleTheme}
              >
                {theme === "light" ? "Switch to Dark 🌙" : "Switch to Light ☀️"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
