import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFairyTaleReaderContext } from "@/features/fairy-tale/hooks";
import { useIsWebview } from "@/shared/hooks/use-is-webview";

export function FairyTaleNavigation() {
  const { currentPage, nextPage, prevPage } = useFairyTaleReaderContext();
  const { isWebView } = useIsWebview();

  if (isWebView) return null;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={prevPage}
        disabled={currentPage === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                   shadow-lg bg-card/90 backdrop-blur-sm hover:bg-card 
                   disabled:opacity-50 disabled:cursor-not-allowed border-border"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={nextPage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                   shadow-lg bg-card/90 backdrop-blur-sm hover:bg-card 
                   disabled:opacity-50 disabled:cursor-not-allowed border-border"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </Button>
    </>
  );
}
