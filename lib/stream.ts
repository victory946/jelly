// Import Stream Chat SDK for client-side messaging
import { StreamChat } from "stream-chat";

// Validate that the Stream Chat API key is set in environment
if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
    throw new Error("NEXT_PUBLIC_STREAM_API_KEY is not set  ");
}

/**
 * Initialize the Stream Chat client instance
 * Used for client-side chat operations
 * Only requires the public API key (no secret)
 */
const streamClient = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY 
);

// Export the initialized Stream Chat client for use throughout the app
export default streamClient;