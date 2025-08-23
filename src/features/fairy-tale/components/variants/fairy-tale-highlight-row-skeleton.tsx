export default function FairyTaleHighlightRowSkeleton({ className = "" }: { className?: string }) {
  const placeholders = Array.from({ length: 5 });

  return (
    <div className={`w-full overflow-x-auto scrollbar-hide mt-4 ${className}`}>
      <div className="flex gap-4">
        {placeholders.map((_, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 w-[240px] md:w-[280px] overflow-hidden rounded-md shadow-md animate-pulse bg-muted"
          >
            <div className="w-full aspect-[3/4] bg-muted-foreground/20" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-3 pb-4">
              <div className="h-5 w-16 rounded-full bg-muted-foreground/30" />
              <div className="h-4 w-3/4 rounded-md bg-muted-foreground/30" />
              <div className="h-3 w-1/2 rounded-md bg-muted-foreground/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
