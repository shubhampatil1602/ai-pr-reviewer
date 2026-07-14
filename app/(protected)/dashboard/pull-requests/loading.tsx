import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PullRequestsLoading() {
  return (
    <>
      <DashboardHeader
        title='Pull Requests'
        description='History and status of PRs reviewed by the app.'
      />
      <div className='flex flex-1 flex-col p-6'>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <Card>
          <CardContent className="p-0">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b last:border-0">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[300px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
                <div className="flex gap-4 items-center">
                  <Skeleton className="h-6 w-[80px] rounded-full" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
