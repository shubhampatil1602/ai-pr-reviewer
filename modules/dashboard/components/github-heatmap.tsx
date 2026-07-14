"use client";

import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function GithubHeatmapCard({ accountLogin }: { accountLogin: string | null }) {
  const { resolvedTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution activity</CardTitle>
        <CardDescription>
          Your GitHub contributions over the last year.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center overflow-x-auto pb-6'>
        {accountLogin ? (
          <GitHubCalendar
            username={accountLogin}
            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          />
        ) : (
          <p className='text-sm text-muted-foreground'>
            Connect your Github account to view contribution activity.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
