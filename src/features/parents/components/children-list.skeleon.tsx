import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ChildrenListSkeleton() {
  return (
    <div className="space-y-4 py-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-2 bg-background rounded-xl">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
