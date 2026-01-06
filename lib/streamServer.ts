// Import Stream Chat SDK for server-side operations
import { StreamChat } from "stream-chat";

// Validate that the Stream Chat API key is set in environment
if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
    throw new Error("NEXT_PUBLIC_STREAM_API_KEY is not set  ");
}

// Validate that the Stream Chat secret key is set in environment
if (!process.env.STREAM_API_SECRET_KEY) {
    throw new Error("STREAM_API_SECRET_KEY is not set  ");
}

/**
 * Initialize the Stream Chat server client
 * Used for server-side operations like token generation
 * Requires both API key and secret key for full permissions
 */
export const serverClient = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_API_SECRET_KEY
);

 