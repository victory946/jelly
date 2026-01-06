// Import Convex query and mutation functions for database operations
import { query, mutation } from "./_generated/server";
// Import Convex value validators
import { v } from "convex/values";

/**
 * Query function to retrieve a user by their Clerk user ID
 * @param {string} userId - The Clerk user ID to search for
 * @returns {Object|null} User document or null if not found
 */
export const getUserByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    // Return null if no userId provided
    if (!userId)  return null;
    
    // Query users table filtered by Clerk user ID
    return await ctx.db
    // Use the by_UserId index for efficient lookup
    .query("users")
    .withIndex("by_UserId", (q) => q.eq("userId", userId))
    // Return only the first matching user
    .first();
  },
});

/**
 * Mutation to create a new user or update an existing one
 * Syncs user data from Clerk authentication
 * @param {string} userId - Clerk user ID
 * @param {string} name - User's display name
 * @param {string} email - User's email address
 * @param {string} imageUrl - User's profile image URL
 * @returns {string} The Convex document ID of the user
 */
export const upsertUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    },
    handler: async (ctx, { userId, name, email, imageUrl }) => {
        // Check if user already exists in the database
        const existingUser = await ctx.db
        .query("users")
        .withIndex("by_UserId", (q) => q.eq("userId", userId))
        .first();

        // If user exists, update their name and image
        if (existingUser) {
            await ctx.db.patch(existingUser._id, { name, imageUrl });
            // Return the existing user's ID
            return existingUser._id;
        } 

        // If user doesn't exist, insert a new user document
        return await ctx.db.insert("users", { userId, name, email, imageUrl });
    },
});

/**
 * Query to search users by name or email address
 * Returns up to 20 matching results
 * @param {string} searchTerm - The search query string
 * @returns {Array} Array of matching user documents
 */
export const searchUsers = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, { searchTerm }) => {
    // Return empty array if no search term provided
    if (!searchTerm) return [];

    // Normalize search term to lowercase and trim whitespace
    const normalizedSearch = searchTerm.toLowerCase().trim();

    // Fetch all users from the database
    const allUsers = await ctx.db.query("users").collect();

    // Filter users by matching name or email against search term
    return allUsers
    .filter((user) =>
      // Check if user name or email contains the search term (case-insensitive)
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch)
    )
    // Limit results to 20 users
    .slice(0, 20);

  },
});