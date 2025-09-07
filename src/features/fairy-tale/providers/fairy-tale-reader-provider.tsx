import { useCallback, useEffect, useRef, useState } from "react";
import { type FlipBookRef } from "react-pageflip";
import { useFairyTaleContents } from "@/entities/fairy-tale/api/hooks";
import type { FairyTaleContentResponse } from "@/entities/fairy-tale/model";
import { FairyTaleReaderContext } from "@/features/fairy-tale/contexts";
import { useReadLog, useTtsContext } from "@/features/fairy-tale/hooks";

/**
 * - 동화책 뷰어 상태(Context) 관리 (UI 전용)
 * - 페이지 이동은 TtsProvider의 currentPage/setCurrentPage와 동기화
 */
export function FairyTaleReaderProvider({ id, children }: { id: number; children: React.ReactNode }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isBookEndOpen, setIsBookEndOpen] = useState(false);
  const [showText, setShowText] = useState(true);

  const flipBookRef = useRef<FlipBookRef | null>(null);

  const { data } = useFairyTaleContents(id);
  const { currentPage, pause, bookEnded, setBookEnded } = useTtsContext();
  const { logAction } = useReadLog("FAIRY_TALE", id);

  /**
   * 다음 페이지로 이동
   */
  const nextPage = useCallback(() => {
    if (!data || !flipBookRef.current) return;

    const book = flipBookRef.current.pageFlip();
    if (currentPage < data.length - 1) {
      logAction(currentPage, "READ");
      pause();
      book.flip(currentPage + 1, "top");
    } else {
      logAction(currentPage, "READ");
      setIsBookEndOpen(true);
    }
  }, [currentPage, data, pause, logAction]);

  /**
   * 이전 페이지로 이동
   */
  const prevPage = useCallback(() => {
    if (!data || !flipBookRef.current) return;

    const book = flipBookRef.current.pageFlip();
    if (currentPage > 0) {
      pause();
      book.flip(currentPage - 1, "top");
    }
  }, [currentPage, data, pause]);

  /**
   * 특정 페이지로 이동
   */
  const goToPage = useCallback(
    (pageIndex: number) => {
      if (!data || !flipBookRef.current) return;
      if (pageIndex < 0 || pageIndex >= data.length) return;

      const book = flipBookRef.current.pageFlip();
      if (pageIndex > currentPage) logAction(currentPage, "READ");

      pause();
      if (Math.abs(pageIndex - currentPage) > 1) {
        book.turnToPage(pageIndex);
      } else {
        book.flip(pageIndex, "top");
      }
    },
    [data, currentPage, pause, logAction]
  );

  /**
   * 키보드 단축키 지원 (좌우 화살표)
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowRight") nextPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  useEffect(() => {
    if (!data || !flipBookRef.current) return;

    const book = flipBookRef.current.pageFlip?.();
    if (!book) return;

    // 현재 flipbook이 가리키는 페이지와 동기화
    if (book.getCurrentPageIndex() !== currentPage) {
      book.flip(currentPage, "top");
    }
  }, [currentPage, data, setIsBookEndOpen]);

  useEffect(() => {
    if (bookEnded) {
      setIsBookEndOpen(true);
      setBookEnded(false);
    }
  }, [bookEnded, setBookEnded]);

  const value = {
    data: data ?? ([] as FairyTaleContentResponse[]),
    isOverlayOpen,
    isBookEndOpen,
    flipBookRef,
    showText,
    nextPage,
    prevPage,
    goToPage,
    setIsOverlayOpen,
    setIsBookEndOpen,
    setShowText,
  };

  return <FairyTaleReaderContext.Provider value={value}>{children}</FairyTaleReaderContext.Provider>;
}
