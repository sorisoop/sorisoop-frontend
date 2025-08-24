import { useFairyTaleReaderContext } from "@/features/fairy-tale/hooks";
import { useSwipe } from "@/shared/hooks";
import { FairyTaleNavigation } from "./fairy-tale-navigation";
import { FairyTaleIndicator } from "./fairy-tale-indicator";
import { FairyTaleHint } from "./fairy-tale-hint";
import { FairyTaleOverlay } from "./fairy-tale-overlay";
import { FairyTaleBook } from "./fairy-tale-book";
import { FairyTaleToggleTextButton } from "./fairy-tale-toggle-text-button";
import { FairyTaleBookEndDialog } from "./fairy-tale-book-end-dialog";

function Root({ children }: { children: React.ReactNode }) {
  const { nextPage, prevPage, isOverlayOpen, setIsOverlayOpen } = useFairyTaleReaderContext();
  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: nextPage,
    onSwipeRight: prevPage,
    enabled: !isOverlayOpen,
  });

  return (
    <div
      className="w-full h-[100vh] relative overflow-hidden bg-background text-foreground"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      {!isOverlayOpen && (
        <div className="absolute inset-0 z-0 pointer-events-auto" onClick={() => setIsOverlayOpen(true)} />
      )}
    </div>
  );
}

export const FairyTaleReader = Object.assign(Root, {
  Book: FairyTaleBook,
  Navigation: FairyTaleNavigation,
  Indicator: FairyTaleIndicator,
  Hint: FairyTaleHint,
  Overlay: FairyTaleOverlay,
  ToggleTextButton: FairyTaleToggleTextButton,
  EndDialog: FairyTaleBookEndDialog,
});
