import { Link, useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useSearchStore } from "@/store/search";
import { SearchSidebar } from "@/features/search";
import { useUnreadNotifications } from "@/entities/notification/api/hooks";
import BottomNavigation from "./bottom-navigation";

interface CommonLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function CommonLayout({ children, title = "" }: CommonLayoutProps) {
  const navigate = useNavigate();
  const open = useSearchStore((s) => s.open);
  const hasUnread = useUnreadNotifications();

  return (
    <div
      id="main-container"
      className="flex min-h-dvh w-full max-w-screen-xl mx-auto flex-col items-center bg-background text-foreground"
    >
      <SearchSidebar>
        <SearchSidebar.Header />
        <SearchSidebar.Content />
      </SearchSidebar>

      <header className="sticky top-0 z-20 w-full border-b border-border bg-background pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-screen-xl h-[52px] px-4 flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center">
            <span className="sr-only">Home</span>
            <img src="/logo.webp" width={102} height={52} alt="logo" className="h-[52px] pt-1" />
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2 truncate text-sm font-bold text-muted-foreground">
            {title}
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="link"
              className="h-8 w-8 p-0 cursor-pointer"
              onClick={open}
              aria-label="검색"
            >
              <Search className="!h-6 !w-6 text-foreground" />
            </Button>
            <Button
              type="button"
              variant="link"
              className="relative h-8 w-8 p-0 cursor-pointer"
              aria-label="알림"
              onClick={() => navigate("/notifications")}
            >
              {hasUnread && <Badge variant="destructive" className="absolute top-0 right-0 h-2 w-2 rounded-full p-0" />}{" "}
              <Bell className="!h-6 !w-6 text-foreground cursor-pointer" />
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="w-full flex-1">
        <div className="mx-auto max-w-screen-xl px-4 pb-safe-bottom pb-24">{children}</div>
      </main>

      <BottomNavigation />

      <div aria-hidden className="pointer-events-none -z-50">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 -z-40 w-full max-w-screen-xl bg-background" />
      </div>
    </div>
  );
}
