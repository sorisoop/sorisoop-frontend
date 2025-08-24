import { cn } from "@/shared/lib/utils";

type FairyTaleCardGridTwoColSkeletonProps = {
  count?: number;
  className?: string;
};

export default function FairyTaleCardGridTwoColSkeleton({
  count = 6,
  className,
}: FairyTaleCardGridTwoColSkeletonProps) {
  return (
    <div className={cn("mt-4 grid gap-4 grid-cols-2", className)} aria-label="검색 결과 로딩중">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative block aspect-[3/4] rounded-md overflow-hidden bg-muted animate-pulse">
          <div className="absolute inset-0 bg-muted/70" />

          <div className="absolute right-2 top-2 h-5 w-12 rounded-full bg-muted-foreground/30" />

          <div className="absolute inset-x-0 bottom-0 p-3 space-y-2">
            <div className="h-4 w-3/4 bg-muted-foreground/30 rounded" />
            <div className="h-3 w-1/2 bg-muted-foreground/20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
