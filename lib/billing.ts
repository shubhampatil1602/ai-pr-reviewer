"use server";

import { getServerSession } from "@/modules/auth";
import {
  cancelProSubscription,
  createProSubscription,
  resetProSubscription,
} from "@/modules/billing/server/subscription";
import { redirect } from "next/navigation";

export async function startProSubscription() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  return createProSubscription(session.user.id);
}

export async function cancelSubscription() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  await cancelProSubscription(session.user.id);
}

export async function resetSubscription() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  await resetProSubscription(session.user.id);
}
