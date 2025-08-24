import { useSearchStore } from "@/store/search";
import { cn } from "@/shared/lib/utils";
import { SearchSidebarHeader } from "./search-sidebar-header";
import { SearchSidebarContent } from "./search-sidebar-content";
import { SearchSidebarOverlay } from "./search-sidebar-overlay";

function Root({ children }: { children: React.ReactNode }) {
  const isOpen = useSearchStore((s) => s.isOpen);

  return (
    <>
      <SearchSidebarOverlay />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-50 transform transition-transform duration-300 ease-out shadow-xl",
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
