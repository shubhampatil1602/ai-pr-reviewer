import { prisma } from "@/lib/db";
import { getGithubApp } from "@/modules/github/utils/github-app";

/**
 * Fetches the total number of PRs reviewed by the app for a given installation.
 */
export async function getTotalPrs(installationId: number | null): Promise<number> {
  if (!installationId) return 0;
  return prisma.pullRequest.count({
    where: {
      installationId,
      status: "reviewed",
    },
  });
}

/**
 * Fetches the total number of commits for the authenticated GitHub user.
 * We use the installation octokit to query the user's contribution collection via GraphQL.
 */
export async function getTotalCommits(
  installationId: number | null,
  accountLogin: string | null
): Promise<number> {
  if (!installationId) return -1;
  if (!accountLogin) return -2;

  try {
    const response = await fetch(`https://github-contributions-api.deno.dev/${accountLogin}.json`, {
      cache: 'no-store',
      headers: { 'User-Agent': 'PR-Pilot' }
    });
    
    if (!response.ok) {
      return -3;
    }
    
    const data = await response.json();
    return data.totalContributions || -4;
  } catch (error) {
    return -5;
  }
}
