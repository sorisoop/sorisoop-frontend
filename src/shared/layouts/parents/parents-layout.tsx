import { Link } from "react-router-dom";
import ParentsBottomNavigation from "./parents-bottom-navigation";

interface ParentsLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function ParentsLayout({ children, title = "" }: ParentsLayoutProps) {
  return (
    <div
      id="main-container"
      className="flex min-h-dvh w-full max-w-screen-xl mx-auto flex-col items-center bg-background text-foreground"
    >
      <header className="sticky top-0 z-20 w-full border-b border-border bg-background pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-screen-xl h-[52px] px-4 flex items-center justify-between gap-4">
          <Link to="/parents" className="inline-flex items-center">
            <span className="sr-only">Parents Home</span>
            <img src="/logo.webp" width={62} height={62} alt="logo" className="h-[56px] pt-1" />
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2 truncate text-sm font-bold text-muted-foreground">
            {title}
          </div>

          <div className="w-8" />
        </div>
      </header>

      <main id="main-content" className="w-full flex-1">
        <div className="mx-auto max-w-screen-xl px-4 pb-safe-bottom pb-24">{children}</div>
      </main>

      <ParentsBottomNavigation />

      <div aria-hidden className="pointer-events-none -z-50">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 -z-40 w-full max-w-screen-xl bg-background" />
      </div>
    </div>
  );
}
