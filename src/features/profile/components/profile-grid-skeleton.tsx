export default function ProfileGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 place-items-center max-w-4xl mx-auto">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-muted animate-pulse" />
      ))}
    </div>
  );
}
