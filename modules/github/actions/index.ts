"use server";

import { getServerSession } from "@/modules/auth";
import { redirect } from "next/navigation";
import { deleteGithubAppFromGithub } from "../server/installation";
import { DASHBOARD_ROUTES } from "@/modules/dashboard/lib/routes";

export async function disconnectGithubApp() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  await deleteGithubAppFromGithub(session.user.id);
  redirect(DASHBOARD_ROUTES.github);
}
