"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserMenu } from "@/modules/auth/components/user-menu";
import type { UserMenuUser } from "@/modules/auth/types";
import { cn } from "@/lib/utils";

type SidebarUserButtonProps = {
  user: UserMenuUser;
  plan?: string;
};

export function SidebarUserButton({ user, plan }: SidebarUserButtonProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserMenu
          user={user}
          plan={plan}
          variant='profile'
          className={cn(
            "h-12 w-full !justify-start gap-2 px-2",
            // Collapse overrides
            "group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:p-0",
            "[&>.truncate]:group-data-[collapsible=icon]:hidden",
            "[&>svg]:group-data-[collapsible=icon]:hidden"
          )}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
