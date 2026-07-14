import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ReposLoading() {
  return (
    <>
      <DashboardHeader
        title='Repositories'
        description='All public and private repositories available to the Github App.'
      />
      <div className='flex flex-1 flex-col p-6'>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <Card>
          <CardContent className="p-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
                <Skeleton className="h-8 w-[80px]" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
