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
import { Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function SidebarUsageWidget({
  plan,
  usage,
}: {
  plan?: string;
  usage?: { used: number; limit: number | null };
}) {
  if (plan === "Pro" || !usage || usage.limit === null) {
    return (
      <div className='flex flex-col items-start gap-2 p-4 text-sm bg-primary/5 border border-primary/10 mx-2 mb-2'>
        <div className='flex items-center gap-2 font-medium text-primary'>
          <Zap className='size-4' />
          Pro User
        </div>
        <p className='text-xs text-muted-foreground'>
          Unlimited AI code reviews
        </p>
      </div>
    );
  }

  const { used, limit } = usage;
  const percentage = Math.min((used / limit) * 100, 100);

  return (
    <div className='flex flex-col gap-3 p-4 text-sm bg-muted/50 border mx-2 mb-2'>
      <div className='flex items-center justify-between font-medium'>
        <span>Reviews Used</span>
        <span className='text-muted-foreground'>
          {used} / {limit}
        </span>
      </div>
      <div className='h-2 w-full bg-secondary rounded-full overflow-hidden'>
        <div
          className='h-full bg-primary transition-all'
          style={{ width: `${percentage}%` }}
        />
      </div>
      <Button className='w-full mt-1' size='sm'>
        <Link href='/dashboard/settings'>Upgrade to Pro</Link>
      </Button>
    </div>
  );
}

export function DashboardSidebar({
  user,
  plan = "Pro",
  usage,
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
      <SidebarFooter className='flex flex-col justify-center gap-2 pb-2'>
        <div className='group-data-[collapsible=icon]:hidden'>
          <SidebarUsageWidget plan={plan} usage={usage} />
        </div>
        <SidebarUserButton user={user} plan={plan} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
