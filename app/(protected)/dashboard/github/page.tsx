import { requireAuth } from "@/modules/auth";
import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { GithubConnectCard } from "@/modules/github/components/github-connect-card";
import { getInstallationStatus } from "@/modules/github/server/installation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PR Pilot · Github App",
  description: "Integrate your Github account with PR Pilot - AI Code Reviewer",
};

export default async function DashboardGithubPage() {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);

  return (
    <>
      <DashboardHeader
        title='Github App'
        description='Install or disconnect the reviewer app on your Github account.'
      />
      <GithubConnectCard userId={session.user.id} installation={installation} />
    </>
  );
}
