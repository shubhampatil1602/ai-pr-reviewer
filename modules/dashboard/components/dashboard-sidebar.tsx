import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardNav } from "./dashboard-nav";
import { SidebarUserButton } from "./sidebar-user-button";
import { DashboardSidebarProps } from "../types";
import { DASHBOARD_ROUTES } from "../lib/routes";

import Link from "next/link";
import { Rocket } from "lucide-react";

export function DashboardSidebar({
  user,
  plan = "Pro",
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              tooltip='PR Pilot - AI Code Reviewer'
              render={
                <Link href={DASHBOARD_ROUTES.overview}>
                  <div className='flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-none bg-sidebar'>
                    <div className='flex h-12 w-12 items-center justify-center bg-primary/10 text-primary'>
                      <Rocket className='h-6 w-6' />
                    </div>
                  </div>
                  <span className='grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden'>
                    <span className='truncate font-semibold'>PR Pilot</span>
                  </span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <DashboardNav />
      </SidebarContent>
      <SidebarFooter className='flex flex-col items-center justify-center'>
        <SidebarUserButton user={user} plan={plan} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
