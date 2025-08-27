export default function MypageProfileFallback() {
  return (
    <section className="pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-muted animate-pulse" />

          <div className="flex flex-col gap-2">
            <div className="h-5 w-24 rounded bg-muted animate-pulse" />
            <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          </div>
        </div>

        <div className="h-8 w-20 rounded bg-muted animate-pulse" />
      </div>
    </section>
  );
}
