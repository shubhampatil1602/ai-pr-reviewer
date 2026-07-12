import type { SubscriptionPlan } from "@/modules/dashboard/types";

export const PLAN_DETAILS: Record<
  SubscriptionPlan,
  { label: string; features: string[] }
> = {
  free: {
    label: "Free",
    features: [
      "Up to 5 AI reviews per month",
      "Public and private repository support",
      "Community support",
    ],
  },
  pro: {
    label: "Pro",
    features: [
      "Unlimited AI reviews on connected repos",
      "Public and private repository support",
      "Priority support",
    ],
  },
};
