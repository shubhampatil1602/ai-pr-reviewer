import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";

import { DashboardShellProps } from "../types";

export function DashboardShell({ children, user, plan }: DashboardShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <DashboardSidebar user={user} plan={plan} />
        <SidebarInset className='min-h-svh'>{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
