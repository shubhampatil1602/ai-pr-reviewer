"use client";

import { ArrowSquareOut, GithubLogo, Plugs } from "@phosphor-icons/react";

import type { GithubInstallationStatus } from "@/modules/dashboard/types";
import {
  statusBadge,
  statusButtonClass,
} from "@/modules/dashboard/lib/status-style";
import { getGithubInstallUrl } from "@/modules/github/utils/github-app";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { disconnectGithubApp } from "../actions";

type GithubConnectCardProps = {
  userId: string;
  installation: GithubInstallationStatus;
};

function ConnectedDetails({ accountLogin }: { accountLogin: string | null }) {
  return (
    <p className='text-xs text-muted-foreground'>
      Installed for{" "}
      <span className='font-medium text-green-700 dark:text-green-400'>
        @{accountLogin}
      </span>
      . The app can read repository metadata and post review comments on pull
      requests.
    </p>
  );
}

function DisconnectedDetails() {
  return (
    <ul className='list-inside list-disc space-y-1 text-xs text-muted-foreground'>
      <li>Access public and private repositories you select</li>
      <li>Receive webhooks for pull request events</li>
      <li>Post AI-generated review comments on PRs</li>
    </ul>
  );
}

function ConnectedActions() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant='outline' className={statusButtonClass.danger}>
            <Plugs />
            Disconnect Github App
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disconnect Github App?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to disconnect? PR Pilot will no longer be able
            to receive webhooks or automatically review your pull requests. You
            can always connect again later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={disconnectGithubApp}>
            <AlertDialogAction
              type='submit'
              className={statusButtonClass.danger}
            >
              Disconnect
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DisconnectedActions({ installUrl }: { installUrl: string }) {
  return (
    <Button
      nativeButton={false}
      render={<a href={installUrl} />}
      className={statusButtonClass.success}
    >
      <GithubLogo />
      Install Github App
      <ArrowSquareOut className='size-3 opacity-80' />
    </Button>
  );
}

function ConnectionDetails({
  connected,
  accountLogin,
}: {
  connected: boolean;
  accountLogin: string | null;
}) {
  if (connected) {
    return <ConnectedDetails accountLogin={accountLogin} />;
  }

  return <DisconnectedDetails />;
}

function ConnectionActions({
  connected,
  installUrl,
}: {
  connected: boolean;
  installUrl: string;
}) {
  if (connected) {
    return <ConnectedActions />;
  }

  return <DisconnectedActions installUrl={installUrl} />;
}

export function GithubConnectCard({
  userId,
  installation,
}: GithubConnectCardProps) {
  const { connected, accountLogin } = installation;
  // Install URL encodes userId so the callback can associate the installation
  const installUrl = getGithubInstallUrl(userId);

  // Default to neutral styling; switch to green when connected
  let cardBorderClass = "border-border";
  let iconWrapperClass = "border-border bg-muted";
  let statusTone: "success" | "neutral" = "neutral";
  let statusLabel = "Not connected";

  if (connected) {
    cardBorderClass = "border-green-500/30";
    iconWrapperClass =
      "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400";
    statusTone = "success";
    statusLabel = "Connected";
  }

  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      <Card className={cn("transition-colors", cardBorderClass)}>
        <CardHeader>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-none border",
                  iconWrapperClass,
                )}
              >
                <GithubLogo className='size-6' />
              </span>
              <div>
                <CardTitle>Github App</CardTitle>
                <CardDescription className='text-xs leading-tight mt-0.5 max-w-xs sm:max-w-full'>
                  Install the PR Pilot reviewer app on your Github account or
                  organization to access public and private repositories.
                </CardDescription>
              </div>
            </div>
            <span className={statusBadge(statusTone)}>{statusLabel}</span>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ConnectionDetails
            connected={connected}
            accountLogin={accountLogin}
          />
        </CardContent>
        <CardFooter className='flex flex-wrap gap-2'>
          <ConnectionActions connected={connected} installUrl={installUrl} />
        </CardFooter>
      </Card>
    </div>
  );
}
