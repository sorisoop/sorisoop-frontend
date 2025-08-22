import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFairyTaleReaderContext } from "@/features/fairy-tale/hooks";

export function FairyTaleNavigation() {
  const { currentPage, isTransitioning, nextPage, prevPage, data } = useFairyTaleReaderContext();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={prevPage}
        disabled={currentPage === 0 || isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                   shadow-lg bg-card/90 backdrop-blur-sm hover:bg-card 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={nextPage}
        disabled={currentPage === data.length - 1 || isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                   shadow-lg bg-card/90 backdrop-blur-sm hover:bg-card 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </Button>
    </>
  );
}
