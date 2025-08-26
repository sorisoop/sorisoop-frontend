import { useCustomFairyTaleReaderContext } from "@/features/fairy-tale/hooks";
import { useSwipe } from "@/shared/hooks";
import { CustomFairyTaleBook } from "./custom-fairy-tale-book";
import { CustomFairyTaleNavigation } from "./custom-fairy-tale-navigation";
import { CustomFairyTaleIndicator } from "./custom-fairy-tale-indicator";
import { CustomFairyTaleHint } from "./custom-fairy-tale-hint";
import { CustomFairyTaleOverlay } from "./custom-fairy-tale-overlay";
import { CustomFairyTaleToggleTextButton } from "./custom-fairy-tale-toggle-text-button";
import { CustomFairyTaleBookEndDialog } from "./custom-fairy-tale-book-end-dialog";

function Root({ children }: { children: React.ReactNode }) {
  const { nextPage, prevPage, isOverlayOpen, setIsOverlayOpen } = useCustomFairyTaleReaderContext();
  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: nextPage,
    onSwipeRight: prevPage,
    enabled: !isOverlayOpen,
  });

  return (
    <div
      className="w-full h-dvh relative overflow-hidden bg-background text-foreground"
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

export const CustomFairyTaleReader = Object.assign(Root, {
  Book: CustomFairyTaleBook,
  Navigation: CustomFairyTaleNavigation,
  Indicator: CustomFairyTaleIndicator,
  Hint: CustomFairyTaleHint,
  Overlay: CustomFairyTaleOverlay,
  ToggleTextButton: CustomFairyTaleToggleTextButton,
  EndDialog: CustomFairyTaleBookEndDialog,
});
