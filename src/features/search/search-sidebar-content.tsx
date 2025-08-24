import { useSearchStore } from "@/store/search";
import { useFairyTaleSearchInfinite } from "@/entities/fairy-tale/api/hooks";
import { useDebounce, useInfiniteScroll } from "@/shared/hooks";
import { SearchSidebarPopular } from "./search-sidebar-popular";
import { SearchSidebarLoading } from "./search-sidebar-loading";
import { SearchSidebarEmpty } from "./search-sidebar-empty";
import { SearchSidebarResults } from "./search-sidebar-results";

function Content() {
  const { query } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFairyTaleSearchInfinite(debouncedQuery);

  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });
  const tales = data?.pages.flat() ?? [];

  if (!debouncedQuery) return <SearchSidebarPopular />;
  if (isLoading) return <SearchSidebarLoading />;
  if (tales.length === 0) return <SearchSidebarEmpty query={debouncedQuery} />;

  return <SearchSidebarResults tales={tales} ref={ref} isFetchingNextPage={isFetchingNextPage} />;
}

export const SearchSidebarContent = Content;
