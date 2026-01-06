// Enable client-side rendering for this wrapper component
"use client"

// Import Convex API generated types
import { api } from "@/convex/_generated/api";
// Import Clerk user hook
import { useUser } from "@clerk/nextjs";
// Import React hooks
import React, { useCallback, useEffect, useState } from "react";
// Import Convex mutation hook
import { useMutation } from "convex/react";
// Import loading spinner component
import LoadingSpinner from "./LoadingSpinner";
// Import Stream Chat client
import streamClient from "@/lib/stream";
// Import server action for token creation
import { createToken } from "@/actions/createToken";

/**
 * UserSyncWrapper Component
 * Synchronizes Clerk user data with Convex database and Stream Chat
 * Must wrap any component that uses Convex or Stream Chat
 * @param {React.ReactNode} children - Components to wrap
 */
function UserSyncWrapper ({children}: {children: React.ReactNode }) {
  // Get current user and loading state from Clerk
  const {user, isLoaded: isUserLoaded} = useUser();
  // Track loading state during user synchronization
  const [isLoading, setIsLoading] = useState(true);
  // Track any errors that occur during sync
  const [ error, setError ] = useState<string | null>(null);

  // Convex mutation function to create or update user in database
  const createOrUpdateUser = useMutation(api.users.upsertUser);

  /**
   * Synchronizes the current Clerk user with Convex database and Stream Chat
   * Handles token creation and user connection to messaging service
   */
  const syncUser = useCallback(async () => {
    // Exit early if user ID is not available
    if (!user?.id) return;

    try{
      // Set loading state and clear any previous errors
      setIsLoading(true);
      setError(null);

      /**
       * Token provider function for Stream Chat authentication
       * Creates a new token for the user's Stream Chat connection
       */
      const tokenProvider =async () => {
        // Ensure user is authenticated
        if (!user?.id) {
          throw new Error("User is not authenticated");
        }
        // Create and return Stream Chat token for this user
        const token =await createToken(user.id);
        return token;
      }

      // Sync user data to Convex database
      await createOrUpdateUser({
        userId: user.id,
        // Use available name fields with fallback
        name:
         user.fullName || 
        user.firstName ||
        user.emailAddresses[0].emailAddress ||
        "Unknown User",
        // Get user's primary email
        email: user.emailAddresses[0].emailAddress || "",
        // Get user's profile image
        imageUrl: user.imageUrl || "",
      });

      // Connect user to Stream Chat service with token authentication
      await streamClient.connectUser(
        {
          // Stream Chat user ID must match Clerk user ID
          id: user.id,
          // User display name for chat
          name:
           user.fullName ||
          user.firstName ||
          user.emailAddresses[0].emailAddress ||
          "Unknown User",
          // User profile image for chat
          image: user.imageUrl || "",
        },
        tokenProvider
      )

    }catch (err) {
      // Log error for debugging
      console.error("Failed to sync user:", err);
      // Store error message for display
      setError(err instanceof Error ? err.message : "Failed to sync user");
    } finally {
      // Stop loading regardless of success or failure
      setIsLoading(false);
    }

  }, [createOrUpdateUser, user]);

  /**
   * Disconnects user from Stream Chat
   * Called when user logs out
   */
  const disconnectUser = useCallback(async () => {
    try {
      // Disconnect from Stream Chat service
      await streamClient.disconnectUser();
    } catch (err) {
      // Log disconnection errors but don't fail
      console.error("Failed to disconnect user:", err);
    }
  }, []);

  /**
   * Effect hook to manage user sync lifecycle
   * Syncs user when they log in, disconnects when they log out
   */
  useEffect(() => {
    // Wait until Clerk has finished loading user data
    if (!isUserLoaded) return;

    // If user is logged in, sync their data
    if (user) {
      syncUser();
    } else {
      // If user is logged out, disconnect from chat and stop loading
      disconnectUser();
      setIsLoading(false);
    }

    // Cleanup function - disconnect user when component unmounts
    return () => {
      if (user) { 
        disconnectUser();
      }
    };
  },[user, isUserLoaded, syncUser, disconnectUser]);

  // Show loading spinner while Clerk is fetching user data
  if (!isUserLoaded || isLoading) {
    return (
      <LoadingSpinner
        size="lg"
        label={!isUserLoaded ? "Loading user..." : "Syncing user data..."}
        withOverlay
      />

    );
  }
  

  // Show error message if sync failed
  if (error) { 
    return (
      <div className="flex-1 items-center justify-center bg-white px-6">
        {/* Error title */}
        <p className="text-red-500 text-lg font-semibold mb-2">Sync Error</p>
        {/* Error message from catch block */}
        <p className="text-gray-600 text-center mb-4">{error}</p>
        {/* Help text for user */}
        <p className="text-gray-500 text-sm text-center">Please try restarting the app or contact support if the issue persists. </p>
      </div>
    )
  }

  // Render children once user is synced successfully
  return<>{children}</>;

}

export default UserSyncWrapper