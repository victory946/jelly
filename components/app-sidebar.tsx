"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ChannelList } from "stream-chat-react";
import { ChannelFilters, ChannelSort } from "stream-chat";
import { NewChatDialog } from "./NewChatDialog";

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  // Filters for channels where the current user is a member
  const filters: ChannelFilters = {
    members: { $in: [user?.id as string] },
    type: { $in: ["messaging", "team"] },
  };

  // Options for the channel list
  const options = { presence: true, state: true };

  // Sort channels by last message
  const sort: ChannelSort = { last_message_at: -1 };

  return (
    <Sidebar variant="floating" {...props}>
      {/* Sidebar Header with user info */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Welcome back
                  </span>
                  <span className="text-sm font-semibold">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <UserButton signInUrl="/sign-in" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {/* New Chat Button */}
            <NewChatDialog>
              <Button className="w-full" variant="outline">
                Start New Chat
              </Button>
            </NewChatDialog>

            {/* Channels List */}
            <ChannelList
              sort={sort}
              filters={filters}
              options={options}
              EmptyStateIndicator={() => (
                <div className="flex flex-col items-center justify-center h-full py-12 px-4">
                  <div className="text-6xl mb-6 opacity-20">💬</div>
                  <h2 className="text-xl font-medium text-foreground mb-2">
                    Ready to chat?
                  </h2>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-[200px]">
                    Your conversations will appear here once you start chatting
                    with others.
                  </p>
                </div>
              )}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
