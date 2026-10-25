import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => (
  <div className="space-y-8 p-6">
    <Skeleton className="h-48 w-full rounded-[2rem]" />

    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>

    <div className="grid gap-6 md:grid-cols-12">
      <Skeleton className="md:col-span-8 h-80 rounded-[2rem]" />
      <Skeleton className="md:col-span-4 h-80 rounded-[2rem]" />
    </div>
  </div>
);

export default DashboardSkeleton;
