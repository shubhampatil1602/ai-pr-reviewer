"use client";

/**
 * Dashboard Overview page body — stat cards, connect banner, and activity feed.
 *
 * Receives pre-fetched `OverviewData` from the server page and renders
 * four summary cards plus a list of recent AI review activity.
 */

import type { ComponentType } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  FolderGit2Icon,
  GitPullRequestIcon,
  SparklesIcon,
  GitCommitIcon,
  ActivityIcon,
} from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

import { GithubLogoIcon } from "@phosphor-icons/react";
import { DASHBOARD_ROUTES } from "@/modules/dashboard/lib/routes";
import { statusBadge } from "../lib/status-style";
import type {
  OverviewActivityItem,
  OverviewData,
  OverviewRepoSummary,
} from "@/modules/overview/types";
import { PLAN_DETAILS } from "@/modules/settings/lib/plan-details";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** Maps activity status values to badge label and color tone. */
const ACTIVITY_STATUS = {
  approved: { label: "Approved", tone: "success" as const },
  changes_requested: { label: "Changes requested", tone: "warning" as const },
  rate_limited: { label: "Rate limited", tone: "danger" as const },
};

/**
 * Builds the subtitle text under the Repositories stat value.
 *
 * @param repos - Repo summary counts, or empty state when total is zero.
 * @returns A short human-readable description string.
 */
function getRepoDescription(repos: OverviewRepoSummary): string {
  if (repos.totalCount === 0) {
    return "No repositories selected for the app";
  }

  if (repos.hasMorePages) {
    return `${repos.totalCount} repositories connected`;
  }

  return `${repos.publicCount} public · ${repos.privateCount} private`;
}

/**
 * Derives display value and description for the Github App stat card.
 *
 * @param installation - Connection status from `OverviewData`.
 * @returns Value string, description, and optional success accent.
 */
function getGithubStat(installation: OverviewData["installation"]) {
  if (!installation.connected) {
    return {
      value: "Not connected",
      description: "Install the Github App to start",
      accent: undefined,
    };
  }

  const account = installation.accountLogin
    ? `@${installation.accountLogin}`
    : "Installation active";

  return {
    value: "Connected",
    description: account,
    accent: "success" as const,
  };
}

/**
 * Derives display value for the Repositories stat card.
 *
 * @param repos - Repo summary or null when Github is not connected.
 * @returns Value, description, and optional info accent.
 */
function getRepositoriesStat(repos: OverviewRepoSummary | null) {
  if (!repos) {
    return {
      value: "—",
      description: "Connect Github App first",
      accent: undefined,
    };
  }

  return {
    value: String(repos.totalCount),
    description: getRepoDescription(repos),
    accent: "info" as const,
  };
}

/** Shape of one stat card in the top grid. */
type StatCard = {
  title: string;
  value: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  accent?: "success" | "info";
};

/**
 * Formats the "Reviews this month" stat for free vs Pro plans.
 *
 * @param overview - Full overview data including usage and plan.
 * @returns Value and description strings for the reviews stat card.
 */
function getReviewsStat(overview: OverviewData) {
  if (overview.reviewsLimit === null) {
    return {
      value: String(overview.reviewsUsed),
      description: "Unlimited reviews on Pro",
    };
  }

  return {
    value: `${overview.reviewsUsed} / ${overview.reviewsLimit}`,
    description: "AI reviews used this month",
  };
}

/**
 * Assembles all six stat cards from overview data.
 *
 * @param overview - Server-loaded overview payload.
 * @returns Array of stat card configs for rendering the grid.
 */
function buildStats(overview: OverviewData): StatCard[] {
  const repoStat = getRepositoriesStat(overview.repos);
  const githubStat = getGithubStat(overview.installation);
  const planLabel = PLAN_DETAILS[overview.plan].label;
  const reviewsStat = getReviewsStat(overview);

  return [
    {
      title: "Repositories",
      value: repoStat.value,
      description: repoStat.description,
      icon: FolderGit2Icon,
      accent: repoStat.accent,
    },
    {
      title: "Reviews this month",
      value: reviewsStat.value,
      description: reviewsStat.description,
      icon: ActivityIcon,
    },
    {
      title: "Total PRs",
      value: String(overview.totalPrs),
      description: "AI-reviewed pull requests",
      icon: GitPullRequestIcon,
    },
    {
      title: "Total Contributions",
      value: String(overview.totalCommits),
      description: "Contributions in the last year",
      icon: GitCommitIcon,
    },
    {
      title: "Github App",
      value: githubStat.value,
      description: githubStat.description,
      icon: GithubLogoIcon,
      accent: githubStat.accent,
    },
    {
      title: "Current plan",
      value: planLabel,
      description: "Manage in settings",
      icon: SparklesIcon,
      accent: overview.plan === "free" ? undefined : "success",
    },
  ];
}

/**
 * Prominent CTA shown when Github App is not connected.
 *
 * @returns A highlighted card linking to the Github App settings page.
 */
function ConnectGithubBanner() {
  return (
    <Card className='border-blue-500/25 bg-blue-500/5'>
      <CardHeader className='flex flex-row items-start justify-between gap-4'>
        <div>
          <CardTitle className='text-sm'>
            Connect Github to get started
          </CardTitle>
          <CardDescription>
            Install the Github App to list repositories and enable AI reviews on
            pull requests.
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
  );
}

/**
 * Renders the recent activity list or an empty-state message.
 *
 * @param items - Recent review activity rows from the server.
 * @returns A vertical list of activity entries with status badges.
 */
function ActivityList({ items }: { items: OverviewActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p className='text-sm text-muted-foreground'>
        No reviews yet. Once AI PR reviews are enabled, summaries will appear
        here.
      </p>
    );
  }

  return (
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
                <span className='text-muted-foreground'>{item.prNumber}</span>
              </p>
              <p className='text-xs text-muted-foreground'>
                {formatDistanceToNow(new Date(item.reviewedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <span className={statusBadge(config.tone)}>{config.label}</span>
          </div>
        );
      })}
    </div>
  );
}

type OverviewContentProps = {
  overview: OverviewData;
};

/**
 * Main Overview page content — stat grid, optional banner, activity card.
 *
 * @param overview - Pre-fetched data from `getOverview()`.
 * @returns The overview page body below `DashboardHeader`.
 */
export function OverviewContent({ overview }: OverviewContentProps) {
  const stats = buildStats(overview);
  const showConnectBanner = !overview.installation.connected;
  const { resolvedTheme } = useTheme();

  return (
    <div className='flex flex-1 flex-col gap-3 p-6'>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={cn(
              stat.accent === "success" && "border-green-500/25",
              stat.accent === "info" && "border-blue-500/25",
            )}
          >
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-xs font-medium text-muted-foreground'>
                {stat.title}
              </CardTitle>
              <stat.icon
                className={cn(
                  "size-4",
                  stat.accent === "success" &&
                    "text-green-600 dark:text-green-400",
                  stat.accent === "info" && "text-blue-600 dark:text-blue-400",
                  !stat.accent && "text-muted-foreground",
                )}
              />
            </CardHeader>
            <CardContent>
              <p
                className={cn(
                  "text-2xl font-semibold tracking-tight",
                  stat.accent === "success" &&
                    "text-green-700 dark:text-green-400",
                  stat.accent === "info" && "text-blue-700 dark:text-blue-400",
                )}
              >
                {stat.value}
              </p>
              <p className='text-xs text-muted-foreground'>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {showConnectBanner ? <ConnectGithubBanner /> : null}

      <Card>
        <CardHeader>
          <CardTitle>Contribution activity</CardTitle>
          <CardDescription>
            Your GitHub contributions over the last year.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center overflow-x-auto pb-6'>
          {overview.installation.accountLogin ? (
            <GitHubCalendar
              username={overview.installation.accountLogin}
              colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
            />
          ) : (
            <p className='text-sm text-muted-foreground'>
              Connect your Github account to view contribution activity.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>
            Latest AI review summaries from your repositories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityList items={overview.recentActivity} />
        </CardContent>
      </Card>
    </div>
  );
}
