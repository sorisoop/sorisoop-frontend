import { cn } from "@/shared/lib/utils";

type FairyTaleCardGridSkeletonProps = {
  count?: number;
  className?: string;
};

export default function FairyTaleCardGridSkeleton({ count = 8, className }: FairyTaleCardGridSkeletonProps) {
  return (
    <div
      className={cn("mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", className)}
      aria-label="동화책 그리드 로딩 중"
      role="list"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative rounded-md overflow-hidden bg-muted animate-pulse aspect-[3/4]">
          <div className="absolute right-2 top-2 w-12 h-5 rounded-full bg-gray-300/50" />

          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="h-4 w-3/4 bg-gray-300/50 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-300/40 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
