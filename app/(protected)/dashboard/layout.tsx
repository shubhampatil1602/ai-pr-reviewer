import { requireAuth } from "@/modules/auth";
import { DashboardShell } from "@/modules/dashboard";
import { getUserSubscription } from "@/modules/billing/server/subscription";
import { getUsageSummary } from "@/modules/billing/server/usage";
import { QueryProvider } from "@/providers/query-provider";
import { PLAN_DETAILS } from "@/modules/settings/lib/plan-details";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();
  const subscription = await getUserSubscription(session.user.id);
  const planLabel = PLAN_DETAILS[subscription.plan].label;
  const usage = await getUsageSummary(session.user.id);

  return (
    <QueryProvider>
      <DashboardShell user={session.user} plan={planLabel} usage={usage}>
        {children}
      </DashboardShell>
    </QueryProvider>
  );
}
