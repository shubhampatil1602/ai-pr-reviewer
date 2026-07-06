import { requireAuth } from "@/modules/auth";
import { DashboardShell } from "@/modules/dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}
