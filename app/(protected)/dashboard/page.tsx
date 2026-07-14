import { requireAuth } from "@/modules/auth";
import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { OverviewContent } from "@/modules/dashboard/components/overview-content";
import { getOverview } from "@/modules/overview/server/get-overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PR Pilot · Dashboard",
  description: "Track, manage, your GitHub PR review workflows with AI",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const session = await requireAuth();
  const overview = await getOverview(session.user.id);
  return (
    <>
      <DashboardHeader
        title='Overview'
        description='Summary of reviews and connected repositories.'
      />
      <OverviewContent overview={overview} />
    </>
  );
}
