import { useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import { useCustomFairyTaleReaderContext, useCustomTtsContext } from "@/features/fairy-tale/hooks";
import { useDragScroll } from "@/shared/hooks";
import { useDragPreventClick } from "@/shared/hooks";
import { Button } from "@/shared/components/ui/button";

export function CustomFairyTaleOverlay() {
  const { data, goToPage, isOverlayOpen, setIsOverlayOpen } = useCustomFairyTaleReaderContext();
  const { currentPage, isPlaying, play, pause } = useCustomTtsContext();
  const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();
  const { handleMouseDown, handleMouseMove, handleClick, isDragging } = useDragPreventClick(8);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOverlayOpen && thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      if (!container) return;

      const currentThumbnail = container.children[currentPage] as HTMLElement;

      if (currentThumbnail) {
        const containerWidth = container.offsetWidth;
        const thumbnailLeft = currentThumbnail.offsetLeft;
        const thumbnailWidth = currentThumbnail.offsetWidth;

        const scrollPosition = thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;

        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }
    }
  }, [isOverlayOpen, currentPage]);

  const totalPages = data.length;
  const title = data[0].title;
  const currentPageNumber = currentPage + 1;

  const handleThumbnailClick = (pageIndex: number) => (e: React.MouseEvent) => {
    handleClick(e);
    if (!isDragging) {
      goToPage(pageIndex);
      setIsOverlayOpen(false);
    }
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseDown(e);
    handleMouseDown(e);
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove(e);
    handleMouseMove(e);
  };

  const getPageNumberStyles = (pageIndex: number) => {
    const isCurrentPage = pageIndex === currentPage;
    return isCurrentPage ? "text-primary font-semibold" : "text-white/70 group-hover:text-white";
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
        isOverlayOpen ? "opacity-100 visible z-50" : "opacity-0 invisible -z-10 pointer-events-none"
      }`}
      onClick={() => setIsOverlayOpen(false)}
    >
      <header className="absolute top-0 left-0 right-0 px-6 py-4 flex justify-between items-center text-secondary bg-gradient-to-b from-black/70 to-transparent">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-white/80">현재 페이지: {currentPageNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/80">전체 페이지</p>
          <p className="text-lg font-semibold text-primary">{totalPages}</p>
        </div>
      </header>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Button
          size="icon"
          variant="secondary"
          className="h-16 w-16 rounded-full bg-black/60 hover:bg-black/80 pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            if (isPlaying) pause();
            else play();
          }}
        >
          {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white" />}
        </Button>
      </div>

      <footer
        className="absolute bottom-0 left-0 right-0 bg-foreground/95 pb-4 pt-3"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom)" }}
      >
        <div className="px-6">
          <div
            ref={thumbnailContainerRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
          >
            {data.map((page, pageIndex) => (
              <div
                key={page.id}
                onClick={handleThumbnailClick(pageIndex)}
                className="flex-shrink-0 cursor-pointer group"
              >
                <div className="relative">
                  <div className="w-24 h-16 sm:w-32 sm:h-20 md:w-36 md:h-24 rounded-lg overflow-hidden transition-all duration-200">
                    <img src={page.imageUrl} alt={`페이지 ${pageIndex + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <p className={`text-center mt-2 text-xs ${getPageNumberStyles(pageIndex)}`}>{pageIndex + 1} 페이지</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
