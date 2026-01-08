"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { LogOutIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  useChatContext,
  Window,
} from "stream-chat-react";

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const { channel, setActiveChannel } = useChatContext();
  const { setOpen } = useSidebar();

  const handleCall = () => {
    if (!channel) return;
    router.push(`/dashboard/video-call/${channel.id}`);
    setOpen(false);
  };

  const handleLeaveChat = async () => {
    if (!channel || !user?.id) {
      console.log("No active channel or user");
      return;
    }

    const confirmLeave = window.confirm(
      "Are you sure you want to leave the chat?"
    );
    if (!confirmLeave) return;

    try {
      await channel.removeMembers([user.id]);
      setActiveChannel(undefined);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error leaving chat", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full flex-1">
      {channel ? (
        <Channel>
          <Window>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-2 mb-2">
              <div className="flex-1 w-full">
                {channel.data?.member_count === 1 ? (
                  <ChannelHeader title="Everyone else has left this chat" />
                ) : (
                  <ChannelHeader />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={handleCall}
                  className="flex items-center gap-1 whitespace-nowrap"
                >
                  <VideoIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Video Call</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLeaveChat}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 whitespace-nowrap"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Leave Chat</span>
                </Button>
              </div>
            </div>

            {/* Messages */}
            <MessageList />

            {/* Message Input */}
            <div className="sticky bottom-0 w-full mt-auto">
              <MessageInput />
            </div>
          </Window>

          <Thread />
        </Channel>
      ) : (
        <div className="flex flex-col items-center justify-center h-full px-4 text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            No chat selected
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Select a chat from the sidebar or start a new conversation.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
