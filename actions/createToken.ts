// Enable server-side execution only (not callable from client)
"use server";

// Import the Stream Chat server client for token generation
import { serverClient } from "@/lib/streamServer";

/**
 * Server action to create a Stream Chat authentication token for a user
 * This token is required for client-side Stream Chat connection
 * @param {string} userId - The unique identifier of the user
 * @returns {string} Stream Chat authentication token
 */
export async function createToken(userId: string) {
    // Generate a Stream Chat token for the given user ID
    const token = serverClient.createToken(userId);
    // Log the token creation (though the userId reference has a typo in the original)
    console.log("creating token for user, userId");
    // Return the generated token to the client
    return token;
}   