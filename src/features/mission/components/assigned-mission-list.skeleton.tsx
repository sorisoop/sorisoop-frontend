import { Skeleton } from "@/shared/components/ui/skeleton";

export default function AssignedMissionListSkeleton() {
  return (
    <div className="w-full py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-6 rounded-xl border bg-card space-y-4">
          <div className="flex items-start justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-2 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
