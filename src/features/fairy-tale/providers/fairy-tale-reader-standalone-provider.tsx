import { useCallback, useEffect, useRef, useState } from "react";
import { type FlipBookRef } from "react-pageflip";
import { useFairyTaleContents } from "@/entities/fairy-tale/api/hooks";
import type { FairyTaleContentResponse } from "@/entities/fairy-tale/model";
import { FairyTaleReaderStandaloneContext } from "@/features/fairy-tale/contexts/fairy-tale-reader-standalone-context";
import { useReadLog } from "@/features/fairy-tale/hooks";

export function FairyTaleReaderStandaloneProvider({ id, children }: { id: number; children: React.ReactNode }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isBookEndOpen, setIsBookEndOpen] = useState(false);
  const [showText, setShowText] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const flipBookRef = useRef<FlipBookRef | null>(null);
  const { data } = useFairyTaleContents(id);
  const { logPage } = useReadLog("FAIRY_TALE", id);

  const nextPage = useCallback(() => {
    if (!data || !flipBookRef.current) return;
    const book = flipBookRef.current.pageFlip();
    if (currentPage < data.length - 1) {
      logPage(currentPage);
      setCurrentPage((p) => p + 1);
      book.flip(currentPage + 1, "top");
    } else {
      logPage(currentPage);
      setIsBookEndOpen(true);
    }
  }, [currentPage, data, logPage]);

  const prevPage = useCallback(() => {
    if (!data || !flipBookRef.current) return;
    const book = flipBookRef.current.pageFlip();
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      book.flip(currentPage - 1, "top");
    }
  }, [currentPage, data]);

  const goToPage = useCallback(
    (pageIndex: number) => {
      if (!data || !flipBookRef.current) return;
      if (pageIndex < 0 || pageIndex >= data.length) return;
      const book = flipBookRef.current.pageFlip();
      if (pageIndex > currentPage) logPage(currentPage);

      setCurrentPage(pageIndex);

      if (Math.abs(pageIndex - currentPage) > 1) {
        book.turnToPage(pageIndex);
      } else {
        book.flip(pageIndex, "top");
      }
    },
    [data, currentPage, logPage]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowRight") nextPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  const value = {
    data: data ?? ([] as FairyTaleContentResponse[]),
    isOverlayOpen,
    isBookEndOpen,
    flipBookRef,
    showText,
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    setIsOverlayOpen,
    setIsBookEndOpen,
    setShowText,
    setCurrentPage,
  };

  return (
    <FairyTaleReaderStandaloneContext.Provider value={value}>{children}</FairyTaleReaderStandaloneContext.Provider>
  );
}
