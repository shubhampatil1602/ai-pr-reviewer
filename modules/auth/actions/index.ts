"use server";

import { auth } from "../lib/auth";
import {
  DEFAULT_AUTH_CALLBACK,
  SIGN_IN_PATH,
  getSafeCallbackPath,
} from "../utils";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithGithub(formData: FormData) {
  const callbackUrl = formData.get("callbackUrl") as string | null;

  const redirectTo = getSafeCallbackPath(callbackUrl);

  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: redirectTo,
    },
    headers: await headers(),
  });

  if (result.url) {
    redirect(result.url);
  }
}

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth(redirectTo: string = SIGN_IN_PATH) {
  const session = await getServerSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}

export async function requireUnAuth(
  redirectTo: string = DEFAULT_AUTH_CALLBACK,
) {
  const session = await getServerSession();

  if (session) {
    redirect(redirectTo);
  }
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect(SIGN_IN_PATH);
}
