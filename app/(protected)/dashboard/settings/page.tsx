import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { SettingsContent } from "@/modules/dashboard/components/settings-content";
import { requireAuth } from "@/modules/auth";
import { getUserSettings } from "@/modules/settings/server/get-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PR Pilot· Settings",
  description: "Manage your profile and subscription.",
};

export default async function DashboardSettingsPage() {
  const session = await requireAuth();
  const settings = await getUserSettings(session.user.id);

  return (
    <div className='w-full'>
      <DashboardHeader
        title='Settings'
        description='Manage your profile and subscription.'
      />
      <SettingsContent
        profile={settings.profile}
        subscription={settings.subscription}
        usage={settings.usage}
      />
    </div>
  );
}
