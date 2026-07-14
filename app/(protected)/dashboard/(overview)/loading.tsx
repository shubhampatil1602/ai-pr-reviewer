import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { CardSkeleton, HeatmapSkeleton, ActivitySkeleton } from "@/modules/dashboard/components/overview-skeletons";

export default function DashboardOverviewLoading() {
  return (
    <>
      <DashboardHeader
        title='Overview'
        description='Summary of reviews and connected repositories.'
      />
      <div className='flex flex-1 flex-col gap-3 p-6'>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <HeatmapSkeleton />
        <ActivitySkeleton />
      </div>
    </>
  );
}
