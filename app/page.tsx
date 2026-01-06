// Enable client-side rendering for this page
"use client";

// Import Header component
import Header from "@/components/Header";
// Import Button component
import { Button } from "@/components/ui/button";
// Import Clerk's SignedOut component for showing UI to unauthenticated users
import { SignedOut, SignInButton } from "@clerk/nextjs";
// Import Framer Motion for animations
import { motion } from "framer-motion";

/**
 * Home Page Component
 * Landing page for the Jelly application
 * Displays hero section, social proof, and feature highlights
 * Includes authentication CTAs for new users
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      {/* Navigation header */}
      <Header />

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14 gap-16">
        
        {/* Hero Section with animated entrance */}
        <motion.div
          // Fade in and slide up animation
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl relative text-center px-2"
        >
          {/* Responsive gradient glow background effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200/40 via-purple-200/40 to-pink-200/40 dark:from-blue-900/25 dark:via-purple-900/25 dark:to-pink-900/25 rounded-3xl blur-2xl sm:blur-3xl opacity-60" />

          {/* Main headline with gradient text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            {/* Blue to purple gradient text - first part */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-300 dark:via-purple-300 dark:to-indigo-300">
              From Small Talk to Real Bonds.
            </span>
            {/* Line break - visible only on desktop */}
            <br className="hidden sm:block" />
            {/* Purple to pink gradient text - second part */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300">
              Jelly&apos;s Got You.
            </span>
          </h1>

          {/* Subtitle with description */}
          <p className="mt-6 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the next evolution of social interaction with Jelly — 
            the AI companion that turns casual chats into genuine connections.
          </p>

          {/* Call-to-action button - only shown to unauthenticated users */}
          <SignedOut>
            <div className="mt-8 flex justify-center">
              {/* Sign in button that opens modal and redirects to dashboard */}
              <SignInButton mode="modal">
                <Button size="lg" className="text-base sm:text-lg px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition w-full sm:w-auto">
                  Get Started
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
        </motion.div>

        {/* Social Proof Section - Statistics about the app */}
        <motion.div
          // Staggered animation - appears after hero
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-5xl w-full text-center"
        >
          {/* Subheading */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Trusted by thousands of users worldwide.
          </p>

          {/* Statistics grid - responsive layout */}
          <div className="grid grid-cols-3 max-w-xs sm:max-w-none mx-auto gap-4 sm:gap-10">
            {/* Map through statistics array */}
            {[
              { value: "50k+", label: "Active Users" },
              { value: "1M+", label: "Messages Sent" },
              { value: "99.9%", label: "Uptime" },
            ].map((item, index) => (
              <div key={index}>
                {/* Statistic value */}
                <div className="text-lg sm:text-2xl font-bold text-foreground drop-shadow-sm">{item.value}</div>
                {/* Statistic label */}
                <div className="text-[10px] sm:text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Section - Highlights unique features */}
        <motion.section
          // Staggered animation - appears last
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full max-w-6xl"
        >
          {/* Section title */}
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-4 drop-shadow-sm">
            More Than Just Chat: Jelly&apos;s Unique Features
          </h2>
          {/* Section subtitle */}
          <p className="text-sm sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Discover intelligent, mood-aware conversations that evolve with you.
          </p>

          {/* Features grid - responsive cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map through features array */}
            {[
              {
                title: "Personalized Starters",
                desc: "Ice-breakers tailored to your vibe and interests.",
              },
              {
                title: "Mood-Based Interactions",
                desc: "Jelly adapts to your emotional tone for natural chats.",
              },
              {
                title: "Adaptive Learning",
                desc: "The more you talk, the better Jelly understands you.",
              },
            ].map((card, index) => (
              // Feature card with hover animation
              <motion.div
                key={index}
                // Scale up slightly on hover
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl border border-black/5 dark:border-white/5 transition-all"
              >
                {/* Card title */}
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                  {card.title}
                </h3>
                {/* Card description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
