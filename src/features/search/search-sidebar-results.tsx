import { forwardRef } from "react";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";
import { Spinner } from "@/shared/components/ui/spinner";
import type { FairyTaleResponse } from "@/entities/fairy-tale/models";

interface Props {
  tales: FairyTaleResponse[];
  isFetchingNextPage: boolean;
}

export const SearchSidebarResults = forwardRef<HTMLDivElement, Props>(({ tales, isFetchingNextPage }, ref) => {
  return (
    <div className="p-4 overflow-y-auto h-full">
      <FairyTaleCard.GridTwoCol tales={tales} />
      <div ref={ref} className="h-12" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </div>
  );
});
SearchSidebarResults.displayName = "SearchSidebarResults";
