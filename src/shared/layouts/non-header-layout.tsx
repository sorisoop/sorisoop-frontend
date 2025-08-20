interface NonHeaderLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function NonHeaderLayout({ children, title = "" }: NonHeaderLayoutProps) {
  return (
    <div
      id="main-container"
      className="flex min-h-screen w-full max-w-screen-lg mx-auto flex-col items-center bg-background text-foreground"
    >
      <header className="sticky top-0 z-20 w-full bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-screen-lg h-[52px] px-4 flex items-center justify-between gap-4">
          <div className="flex-1 truncate text-center text-sm font-bold text-muted-foreground">{title}</div>
          <div className="h-6 w-6" />
        </div>
      </header>

      <main id="main-content" className="w-full flex-1">
        <div className="mx-auto max-w-screen-lg px-4 pb-safe-bottom pb-16">{children}</div>
      </main>

      <div aria-hidden className="pointer-events-none -z-50">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 -z-40 w-full max-w-screen-lg bg-background" />
      </div>
    </div>
  );
}
