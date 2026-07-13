import { requireAuth } from "@/modules/auth";
import { DashboardShell } from "@/modules/dashboard";
import { getUserSubscription } from "@/modules/billing/server/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();
  const subscription = await getUserSubscription(session.user.id);

  return <DashboardShell user={session.user} plan={subscription.plan}>{children}</DashboardShell>;
}
