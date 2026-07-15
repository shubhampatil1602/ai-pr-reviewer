import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  FolderGit2Icon,
  GitPullRequestIcon,
  SparklesIcon,
  GitCommitIcon,
  ActivityIcon,
} from "lucide-react";
import { GithubIcon } from "./github-icon";

import { DASHBOARD_ROUTES } from "@/modules/dashboard/lib/routes";
import { statusBadge } from "../lib/status-style";

import { PLAN_DETAILS } from "@/modules/settings/lib/plan-details";
import { cn, formatCompactNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubHeatmapCard } from "./github-heatmap";
import {
  ActivitySkeleton,
  CardSkeleton,
  HeatmapSkeleton,
} from "./overview-skeletons";

// --- FETCHERS ---
import { getUsageSummary } from "@/modules/billing/server/usage";
import {
  getInstallationStatus,
  getUserInstallationId,
} from "@/modules/github/server/installation";
import { getUserSubscription } from "@/modules/billing/server/subscription";
import { getRecentReviewActivity } from "@/modules/overview/server/activity";
import { getInstallationRepoSummary } from "@/modules/overview/server/repo-summary";
import { getTotalCommits, getTotalPrs } from "@/modules/overview/server/stats";
import { Suspense } from "react";

// --- HELPERS ---
const ACTIVITY_STATUS = {
  approved: { label: "Approved", tone: "success" as const },
  changes_requested: { label: "Changes requested", tone: "warning" as const },
  rate_limited: { label: "Rate limited", tone: "danger" as const },
};

// --- STAT CARDS ---

async function ReposCard({
  installationId,
}: {
  installationId: number | null;
}) {
  if (!installationId) {
    return (
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-xs font-medium text-muted-foreground'>
            Repositories
          </CardTitle>
          <FolderGit2Icon className='size-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <p className='text-2xl font-semibold tracking-tight'>—</p>
          <p className='text-xs text-muted-foreground'>
            Connect Github App first
          </p>
        </CardContent>
      </Card>
    );
  }

  const repos = await getInstallationRepoSummary(installationId);

  let description = "";
  if (repos.totalCount === 0)
    description = "No repositories selected for the app";
  else if (repos.hasMorePages)
    description = `${repos.totalCount} repositories connected`;
  else
    description = `${repos.publicCount} public · ${repos.privateCount} private`;

  return (
    <Card className='border-blue-500/25'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xs font-medium text-muted-foreground'>
          Repositories
        </CardTitle>
        <FolderGit2Icon className='size-4 text-blue-600 dark:text-blue-400' />
      </CardHeader>
      <CardContent>
        <p className='text-2xl font-semibold tracking-tight text-blue-700 dark:text-blue-400'>
          {repos.totalCount}
        </p>
        <p className='text-xs text-muted-foreground'>{description}</p>
      </CardContent>
    </Card>
  );
}

async function TotalCommitsCard({
  installationId,
  accountLogin,
}: {
  installationId: number | null;
  accountLogin: string | null;
}) {
  const totalCommits = await getTotalCommits(installationId, accountLogin);
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xs font-medium text-muted-foreground'>
          Total Contributions
        </CardTitle>
        <GitCommitIcon className='size-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <p className='text-2xl font-semibold tracking-tight'>{formatCompactNumber(totalCommits)}</p>
        <p className='text-xs text-muted-foreground'>
          Contributions in the last year
        </p>
      </CardContent>
    </Card>
  );
}

// --- SECTIONS ---

export async function DashboardOverview({ userId }: { userId: string }) {
  const installation = await getInstallationStatus(userId);
  const installationId = await getUserInstallationId(userId);
  const subscription = await getUserSubscription(userId);
  const usage = await getUsageSummary(userId);
  const totalPrs = await getTotalPrs(installationId);
  const planLabel = PLAN_DETAILS[subscription.plan].label;

  const showConnectBanner = !installation.connected;

  return (
    <div className='flex flex-1 flex-col gap-3 p-6'>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Fast Cards (loaded immediately with DB queries above) */}
        <Card className={installation.connected ? "border-green-500/25" : ""}>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-xs font-medium text-muted-foreground'>
              Github App
            </CardTitle>
            <GithubIcon
              className={cn(
                "size-4",
                installation.connected
                  ? "text-green-600 dark:text-green-400"
                  : "text-muted-foreground",
              )}
            />
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                "text-2xl font-semibold tracking-tight",
                installation.connected && "text-green-700 dark:text-green-400",
              )}
            >
              {installation.connected ? "Connected" : "Not connected"}
            </p>
            <p className='text-xs text-muted-foreground'>
              {installation.connected
                ? installation.accountLogin
                  ? `@${installation.accountLogin}`
                  : "Installation active"
                : "Install the Github App to start"}
            </p>
          </CardContent>
        </Card>

        <Card
          className={subscription.plan !== "free" ? "border-green-500/25" : ""}
        >
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-xs font-medium text-muted-foreground'>
              Current plan
            </CardTitle>
            <SparklesIcon
              className={cn(
                "size-4",
                subscription.plan !== "free"
                  ? "text-green-600 dark:text-green-400"
                  : "text-muted-foreground",
              )}
            />
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                "text-2xl font-semibold tracking-tight",
                subscription.plan !== "free" &&
                  "text-green-700 dark:text-green-400",
              )}
            >
              {planLabel}
            </p>
            <p className='text-xs text-muted-foreground'>Manage in settings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-xs font-medium text-muted-foreground'>
              Reviews this month
            </CardTitle>
            <ActivityIcon className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold tracking-tight'>
              {usage.limit === null
                ? usage.used
                : `${usage.used} / ${usage.limit}`}
            </p>
            <p className='text-xs text-muted-foreground'>
              {usage.limit === null
                ? "Unlimited reviews on Pro"
                : "AI reviews used this month"}
            </p>
          </CardContent>
        </Card>

        {/* Slow Cards (Wrapped in Suspense) */}
        <Suspense fallback={<CardSkeleton />}>
          <ReposCard installationId={installationId} />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <TotalCommitsCard
            installationId={installationId}
            accountLogin={installation.accountLogin}
          />
        </Suspense>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-xs font-medium text-muted-foreground'>
              Total PRs
            </CardTitle>
            <GitPullRequestIcon className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold tracking-tight'>{totalPrs}</p>
            <p className='text-xs text-muted-foreground'>
              AI-reviewed pull requests
            </p>
          </CardContent>
        </Card>
      </div>

      {showConnectBanner && (
        <Card className='border-blue-500/25 bg-blue-500/5'>
          <CardHeader className='flex flex-row items-start justify-between gap-4'>
            <div>
              <CardTitle className='text-sm'>
                Connect Github to get started
              </CardTitle>
              <CardDescription>
                Install the Github App to list repositories and enable AI
                reviews on pull requests.
              </CardDescription>
            </div>
            <Button
              nativeButton={false}
              render={<Link href={DASHBOARD_ROUTES.github} />}
              className='shrink-0'
            >
              Connect Github
            </Button>
          </CardHeader>
        </Card>
      )}

      {/* Heatmap */}
      <Suspense fallback={<HeatmapSkeleton />}>
        <GithubHeatmapCard accountLogin={installation.accountLogin} />
      </Suspense>

      {/* Recent Activity */}
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivitySection userId={userId} />
      </Suspense>
    </div>
  );
}

// --- ASYNC SECTIONS ---

async function RecentActivitySection({ userId }: { userId: string }) {
  const items = await getRecentReviewActivity(userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>
          Latest AI review summaries from your repositories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            No reviews yet. Once AI PR reviews are enabled, summaries will
            appear here.
          </p>
        ) : (
          <div className='space-y-4'>
            {items.map((item) => {
              const config = ACTIVITY_STATUS[item.status];
              return (
                <div
                  key={item.id}
                  className='flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4 last:border-0 last:pb-0'
                >
                  <div>
                    <p className='text-xs font-medium'>
                      {item.repoFullName}{" "}
                      <span className='text-muted-foreground'>
                        {item.prNumber}
                      </span>
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {formatDistanceToNow(new Date(item.reviewedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <span className={statusBadge(config.tone)}>
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
