// Import Stream Chat client for messaging functionality
import streamClient from "@/lib/stream";
import { channel } from "diagnostics_channel";
import { create } from "domain";

/**
 * Custom hook for creating new chat conversations
 * Handles both one-on-one and group chat creation
 * @returns {Object} Object with createNewChat async function
 */
export const useCreateNewChat = () => {
  /**
   * Creates a new chat channel with specified members
   * Checks for existing channels to avoid duplicates
   * @param {Array<string>} members - User IDs of chat members
   * @param {string} createdBy - User ID of the creator
   * @param {string} groupName - Optional name for group chats
   */
  const createNewChat = async ({
    members,
    createdBy,
    groupName
}: {
    members: string[];
    createdBy: string;
     groupName?: string;
}) => {
    // Determine if this is a group chat (more than 2 members)
    const isGroupChat = members.length > 2;

    // Check for existing channels with the same members
    if (isGroupChat) {
        const existingChannel =await streamClient.queryChannels(
            {
                // Query for messaging type channels
                type: "messaging",
                // Filter by exact member list
                members: { $eq: members },
            },
            // Sort by creation date in descending order
            { created_at: -1 },
            // Limit to 1 result
            { limit: 1 }
        );

        // If an existing channel is found
        if (existingChannel.length > 0) {
            const channel = existingChannel[0];
            // Get the list of channel members
            const channelMembers = Object.keys(channel.state.members);

            // Check if this is a 1-1 chat with matching members
            if (
                channelMembers.length === 2 &&
                members.length === 2 &&
                // Verify all requested members are in the channel
                members.every((member) => channelMembers.includes(member))
            ) {
                // Return existing one-on-one chat
                console.log("Existing 1-1 chat found")
                return channel;
            };
        };
    };

    // Generate a unique channel ID using timestamp and random string
    const channelId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    try {
        // Prepare channel data with member list and creator info
        const channelData: {
            members: string[];
            created_by_id: string;
            name?: string;
        } = {
            members,
            created_by_id: createdBy,
        };

        // Add group name for group chats
        if (isGroupChat ) {
            channelData.name = 
            // Use provided name or generate default
            groupName ||`Group Chat (${members.length} members)`;
        }

        // Create the Stream Chat channel with appropriate type
        const channel = streamClient.channel(
            // Use 'team' type for groups, 'messaging' for one-on-one
            isGroupChat ? "team" : "messaging",
            channelId,
            channelData,
        );

        // Watch the channel for real-time updates
        await channel.watch({
            // Enable presence tracking
            presence: true,
        });

        // Return the created and initialized channel
        return channel;

    } catch (error) {
      // Re-throw error for caller to handle
      throw error;
    };
  };

  // Return the createNewChat function
  return createNewChat;
}