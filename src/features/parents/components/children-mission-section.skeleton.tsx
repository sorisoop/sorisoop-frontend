import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ChildrenMissionSectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">아이들</h3>
        <span className="text-sm text-muted-foreground">전체보기</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 rounded-md border bg-background space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            <div className="space-y-3">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="p-3 rounded-lg space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
