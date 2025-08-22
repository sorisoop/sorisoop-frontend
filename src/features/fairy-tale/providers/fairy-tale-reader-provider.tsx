import { useCallback, useEffect, useState } from "react";
import { useFairyTaleContents } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleReaderContext } from "../contexts";
import type { FairyTaleContentResponse } from "@/entities/fairy-tale/models";

export function FairyTaleReaderProvider({ id, children }: { id: string; children: React.ReactNode }) {
  const { data } = useFairyTaleContents(id);

  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const nextPage = useCallback(() => {
    if (!data) return;
    if (currentPage < data.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((p) => p + 1);
        setIsTransitioning(false);
      }, 200);
    }
  }, [currentPage, isTransitioning, data]);

  const prevPage = useCallback(() => {
    if (!data) return;
    if (currentPage > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((p) => p - 1);
        setIsTransitioning(false);
      }, 200);
    }
  }, [currentPage, isTransitioning, data]);

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
    isTransitioning,
    isOverlayOpen,
    nextPage,
    prevPage,
    setCurrentPage,
    setIsOverlayOpen,
  };

  return <FairyTaleReaderContext.Provider value={value}>{children}</FairyTaleReaderContext.Provider>;
}
