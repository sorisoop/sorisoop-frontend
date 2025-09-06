import { forwardRef, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useFairyTaleReaderStandaloneContext } from "@/features/fairy-tale/hooks";
import type { FairyTaleContentResponse } from "@/entities/fairy-tale/model";

const Page = forwardRef<HTMLDivElement, { pageData: FairyTaleContentResponse }>(({ pageData }, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { showText } = useFairyTaleReaderStandaloneContext();

  return (
    <div ref={ref} className="relative w-full h-full max-w-screen-xl bg-foreground overflow-hidden">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
      <img
        src={pageData.imageUrl}
        alt={`페이지 ${pageData.page}`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 ${
          showText ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="bg-black/50 pb-[env(safe-area-inset-bottom)]">
          <div className="p-4 md:p-6 lg:px-8">
            <p className="text-white text-xl md:text-xl lg:text-2xl leading-relaxed font-semibold tracking-wide break-keep whitespace-pre-wrap">
              {pageData.script}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-background/10" />
    </div>
  );
});

Page.displayName = "Page";

export function FairyTaleBook() {
  const { data, flipBookRef, setCurrentPage } = useFairyTaleReaderStandaloneContext();
  const [bookKey, setBookKey] = useState(0);

  useEffect(() => {
    const handleResize = () => setBookKey((prev) => prev + 1);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || data.length === 0) return null;

  return (
    <HTMLFlipBook
      key={bookKey}
      width={window.innerWidth}
      height={window.innerHeight}
      size="fixed"
      showCover={false}
      drawShadow={true}
      flippingTime={600}
      usePortrait={true}
      startZIndex={0}
      autoSize={false}
      maxShadowOpacity={0.5}
      mobileScrollSupport={false}
      swipeDistance={50}
      clickEventForward={false}
      useMouseEvents={false}
      showPageCorners={false}
      disableFlipByClick={false}
      ref={flipBookRef}
      onFlip={(e: { data: number }) => setCurrentPage(e.data)}
      className="max-w-screen-xl !h-dvh"
    >
      {data.map((pageData, index) => (
        <Page key={`${pageData.id}-${index}`} pageData={pageData} />
      ))}
    </HTMLFlipBook>
  );
}
