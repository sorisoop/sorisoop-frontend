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
  const { nextPage, prevPage, isOverlayOpen, setIsOverlayOpen, ttsData } = useFairyTaleReaderContext();
  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: nextPage,
    onSwipeRight: prevPage,
    enabled: !isOverlayOpen,
  });

  const audioUrl = ttsData?.audio
    ? URL.createObjectURL(
        new Blob([Uint8Array.from(atob(ttsData.audio), (c) => c.charCodeAt(0))], { type: "audio/mpeg" })
      )
    : null;

  return (
    <div
      className="w-full min-h-dvh relative overflow-hidden bg-background text-foreground"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {audioUrl && <audio key={ttsData?.page} src={audioUrl} autoPlay controls className="hidden" />}

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
