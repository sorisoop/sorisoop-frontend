import type { FairyTaleContentResponse } from "@/entities/fairy-tale/models";
import { createContext } from "react";

export interface FairyTaleReaderContextValue {
  data: FairyTaleContentResponse[];
  currentPage: number;
  isTransitioning: boolean;
  isOverlayOpen: boolean;
  nextPage: () => void;
  prevPage: () => void;
  setCurrentPage: (page: number) => void;
  setIsOverlayOpen: (isOverlayOpen: boolean) => void;
}

export const FairyTaleReaderContext = createContext<FairyTaleReaderContextValue | null>(null);
