import { UsageSummary } from "@/modules/billing/server/usage";
import { UserSubscription } from "@/modules/dashboard/types";

export type SettingsProfile = {
  name: string;
  email: string;
  image: string | null;
  memberSince: string;
};

export type UserSettings = {
  profile: SettingsProfile;
  subscription: UserSubscription;
  usage: UsageSummary;
};
