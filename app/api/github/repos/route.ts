import { getServerSession } from "@/modules/auth";
import { getUserInstallationId } from "@/modules/github/server/installation";
import { getInstallationReposPage } from "@/modules/github/server/repos";
import { getRepoSyncStatuses } from "@/modules/repo-sync/server/repo-sync";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const installationId = await getUserInstallationId(session.user.id);

  if (!installationId) {
    return NextResponse.json(
      { error: "Github App not connected" },
      { status: 400 },
    );
  }

  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

  const data = await getInstallationReposPage(installationId, page);

  const repoFullNames = data.repos.map((repo) => repo.fullName);

  const syncStatuses = await getRepoSyncStatuses(repoFullNames);

  const repos = data.repos.map((repo) => ({
    ...repo,
    syncStatus: syncStatuses[repo.fullName] ?? null,
  }));

  return NextResponse.json({ ...data, repos });
}
