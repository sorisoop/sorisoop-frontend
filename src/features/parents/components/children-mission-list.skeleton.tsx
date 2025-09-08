import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ChildrenMissionListSkeleton() {
  return (
    <div className="space-y-4 py-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 rounded-xl border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-12 rounded-md" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-2 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
