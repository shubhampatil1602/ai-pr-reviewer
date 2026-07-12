import type { Metadata } from "next";
import Link from "next/link";

import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";

import { DASHBOARD_ROUTES } from "@/modules/dashboard/lib/routes";
import { getInstallationStatus } from "@/modules/github/server/installation";

import { Button } from "@/components/ui/button";
import { requireAuth } from "@/modules/auth/actions";
import { RepoList } from "@/modules/dashboard/components/repo-list";

export const metadata: Metadata = {
  title: "Repositories · Dashboard",
  description:
    "All public and private repositories available to the Github App.",
};

function ReposNotConnected() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 p-6'>
      <p className='text-sm text-muted-foreground'>
        Install the Github App first to see your repositories.
      </p>
      <Button
        nativeButton={false}
        render={<Link href={DASHBOARD_ROUTES.github} />}
      >
        Go to Github App
      </Button>
    </div>
  );
}

/**
 * Repositories list page with GitHub connection guard.
 *
 * @returns Header plus either connect prompt or interactive repo table.
 */
export default async function DashboardReposPage() {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);

  const header = (
    <DashboardHeader
      title='Repositories'
      description='All public and private repositories available to the Github App.'
    />
  );

  if (!installation.connected) {
    return (
      <>
        {header}
        <ReposNotConnected />
      </>
    );
  }

  return (
    <>
      {header}
      <RepoList />
    </>
  );
}
