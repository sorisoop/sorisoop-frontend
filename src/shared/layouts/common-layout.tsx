import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Search, Bell } from "lucide-react";
import BottomNavigation from "./bottom-navigation";

interface CommonLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function CommonLayout({ children, title = "" }: CommonLayoutProps) {
  const navigate = useNavigate();

  return (
    <div
      id="main-container"
      className="flex min-h-screen w-full max-w-screen-lg mx-auto flex-col items-center bg-background text-foreground"
    >
      <header className="sticky top-0 z-20 w-full border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-screen-lg h-[52px] px-4 flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center">
            <span className="sr-only">Home</span>
            <img src="/logo.webp" width={50} height={48} alt="logo" className="h-[48px] pt-1" />
          </Link>

          <div className="flex-1 truncate text-center text-sm font-bold text-muted-foreground">{title}</div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="link"
              className="h-8 w-8 p-0 cursor-pointer"
              onClick={() => navigate("/search")}
              aria-label="검색"
            >
              <Search className="!h-6 !w-6 text-foreground" />
            </Button>
            <Button type="button" variant="link" className="h-8 w-8 p-0" aria-label="알림">
              <Bell className="!h-6 !w-6 text-foreground cursor-pointer" />
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="w-full flex-1">
        <div className="mx-auto max-w-screen-lg px-4 pb-safe-bottom pb-24">{children}</div>
      </main>

      <BottomNavigation />

      <div aria-hidden className="pointer-events-none -z-50">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 -z-40 w-full max-w-screen-lg bg-background" />
      </div>
    </div>
  );
}
