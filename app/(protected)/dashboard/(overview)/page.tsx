import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { DashboardOverview } from "@/modules/dashboard/components/overview-content";
import { requireAuth } from "@/modules/auth/actions";

export const metadata = {
  title: "Dashboard Overview",
  description: "Track, manage, your GitHub PR review workflows with AI",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const session = await requireAuth();
  
  return (
    <>
      <DashboardHeader
        title='Overview'
        description='Summary of reviews and connected repositories.'
      />
      <DashboardOverview userId={session.user.id} />
    </>
  );
}
