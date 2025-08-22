import type { FairyTaleContentResponse } from "@/entities/fairy-tale/models";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FlipBookRef } from "react-pageflip";

export interface FairyTaleReaderContextValue {
  data: FairyTaleContentResponse[];
  currentPage: number;
  isOverlayOpen: boolean;
  flipBookRef: React.RefObject<FlipBookRef | null>;
  showText: boolean;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setCurrentPage: (page: number) => void;
  setIsOverlayOpen: (isOverlayOpen: boolean) => void;
  setShowText: Dispatch<SetStateAction<boolean>>;
}

export const FairyTaleReaderContext = createContext<FairyTaleReaderContextValue | null>(null);
