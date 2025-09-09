import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";

export default function SubscribeManageActiveSkeleton() {
  return (
    <section
      className={cn(
        "bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl p-6 mt-4 border border-border/50 shadow-sm",
        "flex flex-col gap-4 sm:gap-5 sm:p-8 relative overflow-hidden"
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-full translate-y-10 -translate-x-10" />

      {/* 상단 영역: 아이콘 + 타이틀 + 뱃지 */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Skeleton className="w-4 h-4 rounded-full" />
          </div>
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      {/* 설명 + 날짜 */}
      <div className="relative z-10 space-y-2">
        <Skeleton className="h-4 w-40 rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-2 h-2 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-10 w-full rounded-md bg-primary/50" />
    </section>
  );
}
