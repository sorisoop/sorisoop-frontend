export default function NotificationListSkeleton() {
  return (
    <div className="flex flex-col divide-y divide-border">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-4 py-4 animate-pulse">
          <div className="h-14 w-14 rounded-full bg-muted" />

          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-3 w-48 rounded bg-muted" />
            <div className="h-3 w-24 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
