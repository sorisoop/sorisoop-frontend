import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSearchStore } from "@/store/search";
import { cn } from "@/shared/lib/utils";
import { SearchSidebarHeader } from "./search-sidebar-header";
import { SearchSidebarContent } from "./search-sidebar-content";
import { SearchSidebarOverlay } from "./search-sidebar-overlay";

function Root({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isOpen = useSearchStore((s) => s.isOpen);
  const close = useSearchStore((s) => s.close);

  useEffect(() => {
    close();
  }, [location.pathname, close]);
  return (
    <>
      <SearchSidebarOverlay />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[512px] bg-background border-l border-border z-50",
          "transform transition-transform duration-300 ease-out shadow-xl",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {children}
      </div>
    </>
  );
}

export const SearchSidebar = Object.assign(Root, {
  Header: SearchSidebarHeader,
  Content: SearchSidebarContent,
});
