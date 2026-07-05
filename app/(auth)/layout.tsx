import { AuthLayoutWrapper, requireUnAuth } from "@/modules/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUnAuth();
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}
