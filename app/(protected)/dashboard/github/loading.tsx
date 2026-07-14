import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function GithubLoading() {
  return (
    <>
      <DashboardHeader
        title='Github App'
        description='Manage your Github App installation and connection.'
      />
      <div className='flex flex-1 flex-col p-6'>
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-6 w-[200px] mb-2" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-[150px] mt-4" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
