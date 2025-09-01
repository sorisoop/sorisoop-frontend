import { useCallback, useEffect, useRef, useState } from "react";
import { useFairyTaleContents } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleReaderContext } from "../contexts";
import type { FairyTaleContentResponse } from "@/entities/fairy-tale/model";
import { type FlipBookRef } from "react-pageflip";
import { useTts } from "@/entities/voice/api/hooks";

/**
 * - 동화책 뷰어 전체 상태(Context) 관리
 * - 현재 페이지, 텍스트 표시 여부, 오버레이 상태, flipBook Ref를 관리
 * - 다음/이전/특정 페이지 이동 API 제공
 */
export function FairyTaleReaderProvider({
  id,
  voiceUuid,
  children,
}: {
  id: number;
  voiceUuid: string;
  children: React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isBookEndOpen, setIsBookEndOpen] = useState(false);
  const [showText, setShowText] = useState(true);

  const flipBookRef = useRef<FlipBookRef | null>(null);

  const { data } = useFairyTaleContents(id);
  const { data: ttsData } = useTts(voiceUuid, id, currentPage + 1);
  /**
   * 다음 페이지로 이동
   * - 현재 페이지 +1 로 flip 애니메이션
   */
  const nextPage = useCallback(() => {
    if (!data || !flipBookRef.current) return;
    const book = flipBookRef.current.pageFlip();
    if (currentPage < data.length - 1) {
      book.flip(currentPage + 1, "top");
    } else {
      setIsBookEndOpen(true);
    }
  }, [currentPage, data]);

  /**
   * 이전 페이지로 이동
   * - 현재 페이지 -1 로 flip 애니메이션
   */
  const prevPage = useCallback(() => {
    if (!data || !flipBookRef.current) return;

    const book = flipBookRef.current.pageFlip();
    if (currentPage > 0) {
      book.flip(currentPage - 1, "top");
    }
  }, [currentPage, data]);

  /**
   * 특정 페이지로 이동
   * - 가까운 페이지면 flip 애니메이션
   * - 멀리 떨어진 페이지면 turnToPage (애니메이션 없이 즉시 이동)
   */
  const goToPage = useCallback(
    (pageIndex: number) => {
      if (!data || !flipBookRef.current) return;
      if (pageIndex < 0 || pageIndex >= data.length) return;

      const book = flipBookRef.current.pageFlip();

      if (Math.abs(pageIndex - currentPage) > 1) book.turnToPage(pageIndex);
      else book.flip(pageIndex, "top");
    },
    [data, currentPage]
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
    currentPage,
    isOverlayOpen,
    isBookEndOpen,
    flipBookRef,
    showText,
    ttsData,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage,
    setIsOverlayOpen,
    setIsBookEndOpen,
    setShowText,
  };

  return <FairyTaleReaderContext.Provider value={value}>{children}</FairyTaleReaderContext.Provider>;
}
