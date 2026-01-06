// Enable client-side rendering for this component
"use client";

// Import Dialog components for modal functionality
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Import data types and custom hooks
import { Doc } from "@/convex/_generated/dataModel";
import { useCreateNewChat } from "@/hooks/useCreateNewChat";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useChat, useChatContext } from "stream-chat-react";

/**
 * NewChatDialog Component
 * Displays a dialog for creating new chat conversations.
 * Allows users to select other users and optionally set a group name.
 * @param {React.ReactNode} children - Content to display as dialog trigger
 */
export function NewChatDialog({children}: {children: React.ReactNode}) {
    // Track whether the dialog is open or closed
    const [open, setOpen] = useState(false);
    
    // Store list of users selected for the new chat
    const [selectedUsers, setSelectedUsers] = useState<Doc<"users">[]>([]);
    
    // Store the group name if creating a group chat
    const [groupName, setGroupName] = useState("");
    
    // Hook to handle the creation of new chat conversations
    const createNewChat = useCreateNewChat();
    
    // Get the current logged-in user from Clerk authentication
    const {user} = useUser();
    
    // Get function to set the active channel in the chat context
    const{setActiveChannel} = useChatContext();

    /**
     * Handles selecting a user for the chat
     * Adds the user to the selectedUsers array if not already selected
     * @param {Doc<"users">} user - The user to select
     */
    const handleSelectUser = (user: Doc<"users">) => {
        // Check if user is already in selectedUsers array
        if (selectedUsers.find((u) => u._id === user._id)) {
            // Add user to the selection
            setSelectedUsers((prev) => [...prev, user])
        }
    };

    /**
     * Handles removing a user from the selection
     * @param {string} userId - The ID of the user to remove
     */
    const removeUser = (userId: string) => {
        // Filter out the user from selectedUsers array
        setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
    }

    /**
     * Handles opening and closing of the dialog
     * Clears the selection and group name when dialog is closed
     * @param {boolean} newOpen - Whether the dialog should be open
     */
    const handleOpenChange = (newOpen: boolean) => {
        // Update the open state
        setOpen(newOpen);
        // Reset form fields when closing the dialog
        if (!newOpen) {
            setSelectedUsers([]);
            setGroupName("");
        }
    }

    // Render the dialog component with the trigger and content
    return(
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {/* Trigger button to open the dialog - wraps the children element */}
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            {/* Dialog content with form for creating new chat */}
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                {/* Dialog header with title and description */}
                <DialogHeader>
                    <DialogTitle>Start a New Chat</DialogTitle>
                    <DialogDescription>
                        Select users to start a conversation with.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
<UserSearch onSelectUser={handleSelectUser} className="w-full" />
                </div>
            </DialogContent>
        </Dialog>
    )
}
