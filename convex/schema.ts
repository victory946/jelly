// Import Convex schema definition tools
import { defineSchema, defineTable} from "convex/server";
// Import Convex value validators for type safety
import { v } from "convex/values";

/**
 * Define the Convex database schema
 * This schema defines all tables and their structure
 */
export default defineSchema({
    /**
     * Users table - stores user information synced from Clerk
     * Maintains user profile data like name, email, and image
     */
    users: defineTable({
      // Clerk's unique user identifier
      userId: v.string(),
      // User's display name
      name: v.string(),
      // User's email address
      email: v.string(),
      // URL to user's profile image
      imageUrl: v.string(), 
    })
    // Index on userId for fast lookup when retrieving users by Clerk ID
    .index("by_UserId", ["userId"]) 
    // Index on email for fast lookup when searching by email address
    .index("by_Email", ["email"]),
});
