import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/modules/auth/components/user-menu";
import { getServerSession, SIGN_IN_PATH } from "@/modules/auth";
import { getUserSubscription } from "@/modules/billing/server/subscription";
import { PLAN_DETAILS } from "@/modules/settings/lib/plan-details";

export async function NavbarActions() {
  const session = await getServerSession();

  if (!session?.user) {
    return (
      <Button className='font-medium'>
        <Link href={SIGN_IN_PATH}>Sign In</Link>
      </Button>
    );
  }

  const subscription = await getUserSubscription(session.user.id);
  const planLabel = PLAN_DETAILS[subscription.plan].label;

  return (
    <div className='flex items-center gap-4'>
      <Button className='font-medium'>
        <Link href='/dashboard'>Dashboard</Link>
      </Button>
      <UserMenu user={session.user} variant='compact' plan={planLabel} />
    </div>
  );
}
