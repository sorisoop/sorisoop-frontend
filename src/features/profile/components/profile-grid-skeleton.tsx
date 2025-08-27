export default function ProfileGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 place-items-center max-w-4xl mx-auto">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-muted animate-pulse 
                       shadow-2xl border border-border/50"
          />
          <div className="h-4 w-12 rounded bg-muted-foreground animate-pulse" />
        </div>
      ))}
    </div>
  );
}
