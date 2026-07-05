import { SignInForm, SignInPageProps } from "@/modules/auth";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | PR Pilot - AI Code Reviewer",
  description: "Sign in to access PR Pilot - AI-powered code reviews.",
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;
  return <SignInForm callbackUrl={callbackUrl} />;
}
