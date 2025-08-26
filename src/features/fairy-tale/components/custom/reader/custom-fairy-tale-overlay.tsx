import { useEffect, useRef } from "react";
import { useCustomFairyTaleReaderContext } from "@/features/fairy-tale/hooks";
import { useDragScroll } from "@/shared/hooks";
import { useDragPreventClick } from "@/shared/hooks";

export function CustomFairyTaleOverlay() {
  const { data, currentPage, goToPage, isOverlayOpen, setIsOverlayOpen } = useCustomFairyTaleReaderContext();
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

  if (!isOverlayOpen) return null;

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
      className="absolute inset-0 z-50 flex flex-col justify-between bg-black/30 backdrop-blur-sm"
      onClick={() => setIsOverlayOpen(false)}
    >
      <header className="absolute top-0 left-0 right-0 px-6 py-4 flex justify-between items-center text-white bg-gradient-to-b from-black/70 to-transparent">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-white/80">현재 페이지: {currentPageNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/80">전체 페이지</p>
          <p className="text-lg font-semibold text-primary">{totalPages}</p>
        </div>
      </header>

      <footer
        className="absolute bottom-0 left-0 right-0 bg-foreground/95 pb-4 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 mb-2">
          <p className="text-white text-sm font-medium">전체 페이지 {totalPages}</p>
        </div>

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
                  <div
                    className={`w-24 h-16 sm:w-32 sm:h-20 md:w-36 md:h-24 rounded-lg overflow-hidden transition-all duration-200
                    `}
                  >
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
