// Enable client-side rendering for this provider component
"use client";

// Import Clerk authentication hook
import { useAuth } from "@clerk/nextjs";
// Import Convex React client
import { ConvexReactClient } from "convex/react";
// Import provider component that integrates Convex with Clerk
import { ConvexProviderWithClerk } from "convex/react-clerk"

// Validate that Convex URL is set in environment
if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is your .env file");
}

/**
 * Initialize the Convex React client
 * Provides connection to Convex backend for database operations
 */
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

/**
 * ConvexClientProvider Component
 * Wraps the app with Convex and Clerk authentication integration
 * Enables use of Convex hooks throughout the app with Clerk auth
 * @param {React.ReactNode} children - App components to wrap
 */
function ConvexClientProvider ({children}: {children: React.ReactNode}) {
  // Provide Convex client with Clerk authentication integration
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}

export default ConvexClientProvider;