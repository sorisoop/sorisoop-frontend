import { useRef, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Search, X, ArrowLeft } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { useSearchStore } from "@/store/search";

export function SearchSidebarHeader() {
  const { query, setQuery, close, isOpen } = useSearchStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen && searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, [isOpen]);

  const handleClose = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    close();
  };

  return (
    <div className="flex items-center gap-3 p-4 border-b border-border bg-background">
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer" onClick={handleClose}>
        <ArrowLeft className="!h-5 !w-5" />
      </Button>

      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목으로 검색"
          className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-none outline-none text-sm"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 cursor-pointer"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
